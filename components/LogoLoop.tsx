"use client"

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  memo
} from "react"
import "./LogoLoop.css"

/* -------------------------------
   CONSTANTS
-------------------------------- */
const ANIMATION_CONFIG = {
  SMOOTH_TAU: 0.25,
  MIN_COPIES: 2,
  COPY_HEADROOM: 2
}

const { SMOOTH_TAU } = ANIMATION_CONFIG

const toCssLength = (value: any) =>
  typeof value === "number" ? `${value}px` : value ?? undefined

/* -------------------------------
   HOOKS
-------------------------------- */
const useResizeObserver = (
  callback: () => void,
  elements: React.RefObject<HTMLElement>[],
  dependencies: any[]
) => {
  useEffect(() => {
    if (!window.ResizeObserver) {
      const handleResize = () => callback()
      window.addEventListener("resize", handleResize)
      callback()
      return () => window.removeEventListener("resize", handleResize)
    }

    const observers = elements.map(ref => {
      if (!ref.current) return null
      const observer = new ResizeObserver(callback)
      observer.observe(ref.current)
      return observer
    })

    callback()

    return () => {
      observers.forEach(o => o?.disconnect())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}

const useImageLoader = (
  seqRef: React.RefObject<HTMLElement>,
  onLoad: () => void,
  dependencies: any[]
) => {
  useEffect(() => {
    const images = seqRef.current?.querySelectorAll("img") ?? []
    if (images.length === 0) {
      onLoad()
      return
    }

    let remaining = images.length
    const handleLoad = () => {
      remaining--
      if (remaining === 0) onLoad()
    }

    images.forEach(img => {
      const el = img as HTMLImageElement
      if (el.complete) handleLoad()
      else {
        el.addEventListener("load", handleLoad, { once: true })
        el.addEventListener("error", handleLoad, { once: true })
      }
    })

    return () => {
      images.forEach(img => {
        img.removeEventListener("load", handleLoad)
        img.removeEventListener("error", handleLoad)
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, dependencies)
}

const useAnimationLoop = (
  trackRef: React.RefObject<HTMLElement>,
  targetVelocity: number,
  seqWidth: number,
  isHovered: boolean,
  pauseOnHover: boolean
) => {
  const rafRef = useRef<number | null>(null)
  const lastTimeRef = useRef<number | null>(null)
  const offsetRef = useRef(0)
  const velocityRef = useRef(0)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    const animate = (time: number) => {
      if (lastTimeRef.current === null) lastTimeRef.current = time
      const dt = (time - lastTimeRef.current) / 1000
      lastTimeRef.current = time

      const target = pauseOnHover && isHovered ? 0 : targetVelocity
      const easing = 1 - Math.exp(-dt / SMOOTH_TAU)
      velocityRef.current += (target - velocityRef.current) * easing

      if (seqWidth > 0) {
        offsetRef.current =
          ((offsetRef.current + velocityRef.current * dt) % seqWidth + seqWidth) % seqWidth
        track.style.transform = `translate3d(${-offsetRef.current}px,0,0)`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      rafRef.current = null
      lastTimeRef.current = null
    }
  }, [targetVelocity, seqWidth, isHovered, pauseOnHover])
}

/* -------------------------------
   TYPES
-------------------------------- */
interface LogoItem {
  node?: React.ReactNode
  src?: string
  width?: number
  height?: number
  alt?: string
  title?: string
  href?: string
  ariaLabel?: string
}

interface LogoLoopProps {
  logos: LogoItem[]
  speed?: number
  direction?: "left" | "right"
  width?: string | number
  logoHeight?: number
  gap?: number
  pauseOnHover?: boolean
  fadeOut?: boolean
  fadeOutColor?: string
  scaleOnHover?: boolean
  ariaLabel?: string
  className?: string
  style?: React.CSSProperties
}

/* -------------------------------
   COMPONENT
-------------------------------- */
export const LogoLoop = memo<LogoLoopProps>(
  ({
    logos,
    speed = 120,
    direction = "left",
    width = "100%",
    logoHeight = 28,
    gap = 32,
    pauseOnHover = true,
    fadeOut = false,
    fadeOutColor,
    scaleOnHover = false,
    ariaLabel = "Partner logos",
    className,
    style
  }) => {
    const containerRef = useRef<HTMLDivElement>(null)
    const trackRef = useRef<HTMLDivElement>(null)
    const seqRef = useRef<HTMLUListElement>(null)

    const [seqWidth, setSeqWidth] = useState(0)
    const [copyCount, setCopyCount] = useState(ANIMATION_CONFIG.MIN_COPIES)
    const [isHovered, setIsHovered] = useState(false)

    const targetVelocity = useMemo(() => {
      const mag = Math.abs(speed)
      const dir = direction === "left" ? 1 : -1
      return mag * dir * (speed < 0 ? -1 : 1)
    }, [speed, direction])

    const updateDimensions = useCallback(() => {
      const cw = containerRef.current?.clientWidth ?? 0
      const sw = seqRef.current?.getBoundingClientRect()?.width ?? 0
      if (sw > 0) {
        setSeqWidth(Math.ceil(sw))
        setCopyCount(
          Math.max(
            ANIMATION_CONFIG.MIN_COPIES,
            Math.ceil(cw / sw) + ANIMATION_CONFIG.COPY_HEADROOM
          )
        )
      }
    }, [])

    useResizeObserver(updateDimensions, [containerRef, seqRef], [logos.length, gap, logoHeight])
    useImageLoader(seqRef, updateDimensions, [logos.length, gap, logoHeight])
    useAnimationLoop(trackRef, targetVelocity, seqWidth, isHovered, pauseOnHover)

    const cssVars = useMemo(
      () => ({
        "--logoloop-gap": `${gap}px`,
        "--logoloop-logoHeight": `${logoHeight}px`,
        ...(fadeOutColor && { "--logoloop-fadeColor": fadeOutColor })
      }),
      [gap, logoHeight, fadeOutColor]
    )

    const rootClass = useMemo(
      () =>
        ["logoloop", fadeOut && "logoloop--fade", scaleOnHover && "logoloop--scale-hover", className]
          .filter(Boolean)
          .join(" "),
      [fadeOut, scaleOnHover, className]
    )

    return (
      <div
        ref={containerRef}
        className={rootClass}
        style={{ width: toCssLength(width), ...cssVars, ...style }}
        role="region"
        aria-label={ariaLabel}
        onMouseEnter={() => pauseOnHover && setIsHovered(true)}
        onMouseLeave={() => pauseOnHover && setIsHovered(false)}
      >
        <div className="logoloop__track" ref={trackRef}>
          {Array.from({ length: copyCount }).map((_, ci) => (
            <ul
              className="logoloop__list"
              key={ci}
              aria-hidden={ci !== 0}
              ref={ci === 0 ? seqRef : undefined}
            >
              {logos.map((item, i) => (
                <li className="logoloop__item" key={`${ci}-${i}`}>
                  {item.href ? (
                    <a href={item.href} target="_blank" rel="noopener noreferrer">
                      <span className="logoloop__node">{item.node}</span>
                    </a>
                  ) : (
                    <span className="logoloop__node">{item.node}</span>
                  )}
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    )
  }
)

LogoLoop.displayName = "LogoLoop"
export default LogoLoop
