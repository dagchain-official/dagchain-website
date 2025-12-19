import { useEffect } from 'react'

export function useVisitorTracking() {
  useEffect(() => {
    // Check if visitor has already been tracked in this session
    const hasTracked = sessionStorage.getItem('visitor_tracked')
    
    if (hasTracked) {
      return
    }

    // Track visitor
    const trackVisitor = async () => {
      try {
        const response = await fetch('/api/track-visitor', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            landingPage: window.location.pathname,
          }),
        })

        if (response.ok) {
          // Mark as tracked for this session
          sessionStorage.setItem('visitor_tracked', 'true')
          console.log('Visitor tracked successfully')
        }
      } catch (error) {
        console.error('Failed to track visitor:', error)
      }
    }

    // Track after a short delay to not block page load
    const timer = setTimeout(trackVisitor, 1000)

    return () => clearTimeout(timer)
  }, [])
}
