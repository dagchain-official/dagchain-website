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

    const banner = page.banner || {};
    const hasBannerImage = Boolean(banner.image);

    const bannerBgImage = hasBannerImage
        ? banner.image
        : "/frontend/images/article/bg_top_banner.png";

    const bannerHeading = banner.heading || page.title;
    const bannerSubHeading = banner.subheading || page.topic;
    const bannerDescription = banner.description || page.description;

    const isKnowledgePage = page.type === "knowledge";

    return (
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
                        {isKnowledgePage ? (
                            <>
                                <h1 className="c_heading center whitetext flex justify-center flex-col">
                                    Question and Answer
                                    <div className="dlogo flex justify-center">
                                        <img
                                            src="/frontend/images/question-answer/img_dagchain.png"
                                            alt="image"
                                        />
                                    </div>
                                </h1>

                                {bannerDescription && (
                                    <p dangerouslySetInnerHTML={{ __html: bannerDescription }} />
                                )}
                            </>
                        ) : (
                            <>
                                {bannerHeading && (
                                    <h1
                                        className="whitetext"
                                        dangerouslySetInnerHTML={{ __html: bannerHeading }}
                                    />
                                )}

                                {bannerSubHeading && (
                                    <div
                                        className="c_subheading pinktext"
                                        dangerouslySetInnerHTML={{ __html: bannerSubHeading }}
                                    />
                                )}

                                {bannerDescription && (
                                    <p dangerouslySetInnerHTML={{ __html: bannerDescription }} />
                                )}
                            </>
                        )}

                        {page.cta_label && page.cta_url && (
                            <div className="full_btnrow center">
                                <a
                                    href={page.cta_url}
                                    target="_blank"
                                    className="cta_btn bgblue brand_btn animation_white_line"
                                >
                                    {page.cta_label}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ================= PAGE CONTENT ================= */}
            {isKnowledgePage ? (
                <KnowledgeContent page={page} />
            ) : (
                <ArticleContent page={page} />
            )}

            <RelatedArticles currentSlug={page.slug} />
        </div>
    );
}

function KnowledgeContent({ page }: { page: any }) {
    return (
        <div className="section1">
            <div className="custom_container">
                <div className="faq_content">
                    {Array.isArray(page.questions) && page.questions.length > 0 ? (
                        page.questions.map((q: any, index: number) => (
                            <div
                                key={index}
                                className="common_section"
                                data-aos="fade-up"
                                data-aos-duration="1500"
                            >
                                <div className="l_circle"></div>
                                <h2>{q.title}</h2>

                                {q.answer && (
                                    <div
                                        dangerouslySetInnerHTML={{ __html: q.answer }}
                                    />
                                )}
                            </div>
                        ))
                    ) : (
                        <p>No questions available.</p>
                    )}
                </div>
            </div>
        </div>
    );
}

function ArticleContent({ page }: { page: any }) {
    return (
        <div className="arcticle_wrap">
            {[page.content_1, page.content_2, page.content_3, page.content_4, page.content_5]
                .filter(Boolean)
                .map((content, index) => (
                    <div key={index}>
                        <div className="article_content" data-aos="fade-up">
                            <div
                                className="custom_container"
                                dangerouslySetInnerHTML={{ __html: content }}
                            />
                        </div>
                        <StaticBanner />
                    </div>
                ))}
        </div>
    );
}
