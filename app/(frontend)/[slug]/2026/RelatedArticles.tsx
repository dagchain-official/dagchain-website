"use client";

import { useEffect, useState } from "react";

type RelatedPage = {
  _id: string;
  title: string;
  slug: string;
  banner?: {
    image?: string;
  };
};

export default function RelatedArticles({
  currentSlug,
}: {
  currentSlug: string;
}) {
  const [pages, setPages] = useState<RelatedPage[]>([]);
  const [loading, setLoading] = useState(true);

  /* ---------------- Fetch related pages ---------------- */
  useEffect(() => {
    fetch(`/api/webpages/related?slug=${currentSlug}`)
      .then((res) => res.json())
      .then((data) => {
        if (data?.success && Array.isArray(data.pages)) {
          setPages(data.pages);
        }
      })
      .finally(() => setLoading(false));
  }, [currentSlug]);

  /* ---------------- Init Owl Carousel ---------------- */
  useEffect(() => {
    if (pages.length < 3) return; // 🚫 don't init unless enough items

    const t = setTimeout(() => {
      const $ = (window as any)?.$;
      if (!$) return;

      const $carousel = $(".related_carousel");

      if ($carousel.length) {
        // destroy previous instance if exists
        if ($carousel.hasClass("owl-loaded")) {
          $carousel.trigger("destroy.owl.carousel");
          $carousel.removeClass("owl-loaded");
        }

        $carousel.owlCarousel({
          items: 3,
          loop: true,
          margin: 30,
          autoplay: true,
          autoplayTimeout: 6000,
          autoplayHoverPause: true,
          responsive: {
            0: { items: 1 },
            768: { items: 2 },
            1024: { items: 3 },
          },
        });
      }
    }, 250);

    return () => clearTimeout(t);
  }, [pages]);

  /* ---------------- Render guard ---------------- */
  if (loading) return null;

  // 🚫 Hide section if less than 3 related articles
  if (pages.length < 3) return null;

  return (
    <div className="related_articles">
      <div className="custom_container">
        <h2
          className="c_heading center"
          data-aos="fade-up"
          data-aos-duration="1500"
        >
          Related Articles
        </h2>

        <div data-aos="fade-up" data-aos-duration="1500">
          <div className="owl-carousel related_carousel">
            {pages.map((page) => (
              <div className="item" key={page._id}>
                <div className="imgbox">
                  <img
                    src={
                      page.banner?.image ||
                      "/frontend/images/article/img_related_articles1.png"
                    }
                    alt={page.title}
                  />
                </div>

                <h3>{page.title}</h3>

                <a
                  href={`/${page.slug}/webpage`}
                  className="cta_btn no_bg animate_arrow"
                >
                  READ NOW
                  <div className="rgt_arrow">&gt;</div>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
