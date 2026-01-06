"use client";

import { useEffect } from "react";

export default function FrontendScripts() {
  useEffect(() => {
    const init = () => {
      const win = window as any;
      const $ = win.$;

      /* ---------------- AOS ---------------- */
      if (win.AOS) {
        win.AOS.init({ duration: 1500 });
        win.AOS.refreshHard();
      }

      if (!$) return;

      /* -------- Owl Carousel -------- */
      if ($(".related_carousel").length && $.fn.owlCarousel) {
        $(".related_carousel").owlCarousel({
          items: 3,
          loop: true,
          autoplay: true,
          autoplayTimeout: 6000,
          autoplayHoverPause: true,
          responsive: {
            0: { items: 1 },
            600: { items: 2 },
            992: { items: 3 },
          },
        });
      }

      /* -------- CounterUp -------- */
      if ($(".counter").length && $.fn.counterUp) {
        $(".counter").counterUp({
          delay: 40,
          time: 1000,
        });
      }
    };

    // delay ensures scripts are loaded
    const timer = setTimeout(init, 300);

    return () => clearTimeout(timer);
  }, []);

  return null;
}
