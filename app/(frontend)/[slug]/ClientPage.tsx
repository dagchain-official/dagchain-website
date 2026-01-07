"use client";

import { useEffect } from "react";
import RelatedArticles from "./RelatedArticles";
import StaticBanner from "./StaticBanner";

export default function ClientWebpage({ page }: { page: any }) {

    useEffect(() => {
        const t = setTimeout(() => {
            const $ = (window as any).$;
            if (!$) return;

            $(".article_content")
                .children()
                .find("a")
                .each(function (this: HTMLElement) {
                    const href = $(this).attr("href");
                    if (!href || href.startsWith("#")) return;
                    $(this)
                        .attr("target", "_blank")
                        .attr("rel", "noopener noreferrer");
                });
        }, 250);

        return () => clearTimeout(t);
    }, [page]);

    /* -------------------------------------------------
       Banner data (fallback-safe)
    --------------------------------------------------*/
    const banner = page.banner || {};
    const hasBannerImage = Boolean(banner.image);

    const bannerBgImage = hasBannerImage
        ? banner.image
        : "/frontend/images/article/bg_top_banner.png";

    const bannerHeading = page?.banner.heading || page.title;
    const bannerSubHeading = page?.banner.subheading || page.topic;
    const bannerDescription = page?.banner.description || page.description;

    return (
        <>
            <div className="page_wrap">

                {/* ================= TOP BANNER ================= */}
                <div className="top_banner">
                    <div
                        className="bg_topbanner"
                        data-heading={bannerHeading || ""}
                        data-subheading={bannerSubHeading || ""}
                        data-description={bannerDescription || ""}

                        style={{ backgroundImage: `url('${bannerBgImage}')` }}
                    />

                    <div className="custom_container">
                        <div className="textbox" data-aos="fade-up" data-aos-duration="1500">
                            {
                                bannerHeading ?
                                    <h1 className="whitetext" dangerouslySetInnerHTML={{ __html: bannerHeading }} /> : ''
                            }
                            {
                                bannerSubHeading ?
                                    <div className="c_subheading pinktext" dangerouslySetInnerHTML={{ __html: bannerSubHeading }} /> : ''
                            }
                            {
                                bannerDescription ?
                                    <p dangerouslySetInnerHTML={{ __html: bannerDescription }} /> : ''
                            }
                            <div className="full_btnrow center">
                                {
                                    page.cta_label && page.cta_url ?
                                    <a href={page.cta_url} target="_blank"
                                        className="cta_btn bgblue brand_btn animation_white_line">
                                        { page.cta_label }
                                    </a> : ''
                                }
                            </div>
                        </div>
                    </div>
                </div>

                {/* ================= ARTICLE CONTENT ================= */}
                <div className="arcticle_wrap">
                    {page.content_1 && (
                        <div className="article_content" data-aos="fade-up">
                            <div
                                className="custom_container"
                                dangerouslySetInnerHTML={{ __html: page.content_1 }}
                            />
                        </div>
                    )}

                    <StaticBanner />

                    {page.content_2 && (
                        <div className="article_content" data-aos="fade-up">
                            <div
                                className="custom_container"
                                dangerouslySetInnerHTML={{ __html: page.content_2 }}
                            />
                        </div>
                    )}

                    <StaticBanner />

                    {page.content_3 && (
                        <div className="article_content" data-aos="fade-up">
                            <div
                                className="custom_container"
                                dangerouslySetInnerHTML={{ __html: page.content_3 }}
                            />
                        </div>
                    )}

                    <StaticBanner />

                    {page.content_4 && (
                        <div className="article_content" data-aos="fade-up">
                            <div
                                className="custom_container"
                                dangerouslySetInnerHTML={{ __html: page.content_4 }}
                            />
                        </div>
                    )}

                    <StaticBanner />

                    {page.content_5 && (
                        <div className="article_content" data-aos="fade-up">
                            <div
                                className="custom_container"
                                dangerouslySetInnerHTML={{ __html: page.content_5 }}
                            />
                        </div>
                    )}

                    <StaticBanner />
                </div>

                <RelatedArticles currentSlug={page.slug} />
            </div>
        </>
    );
}
