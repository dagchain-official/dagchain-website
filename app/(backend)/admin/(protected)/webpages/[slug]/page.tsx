"use client";

import { supabase } from "@/lib/supabase";
import Script from "next/script";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Props = {
  params: { slug: string };
};

export const dynamic = "force-dynamic";
export const fetchCache = "force-no-store";
export const revalidate = 0;

export default function WebpageEditor({ params }: Props) {
  const isNew = params.slug === "new";
  const router = useRouter();
  const [slugTouched, setSlugTouched] = useState(false);
  const [pageId, setPageId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [imageUrl, setImageUrl] = useState("/frontend/images/article/bg_top_banner.png");
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  const slugify = (value: string) =>
    value
      .toLowerCase()
      .trim()
      .replace(/https?:\/\/(www\.)?/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)+/g, "");

  async function getAvailableSlug(baseSlug: string) {
    const res = await fetch("/api/webpages/check-slug", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: baseSlug,
        excludeId: pageId, // important when editing
      }),
    });
    if (!res.ok) return baseSlug;
    const data = await res.json();
    return data.slug || baseSlug;
  }

  const [form, setForm] = useState({
    title: "",
    slug: "",
    cta_label: "Explore Provenance for Creators",
    cta_url: "https://www.dagchain.network/",
    topic: "",
    description: "",
    metaTitle: "",
    metaDescription: "",
    metaKeywords: "",
    bannerHeading: "",
    bannerSubheading: "",
    bannerDescription: "",
    content_1: "",
    content_2: "",
    content_3: "",
    content_4: "",
    content_5: "",
    status: "draft",
    indexingStatus: "pending"
  });

  async function deleteBannerImage() {
    // 1️⃣ Clear UI immediately
    setImageUrl("");
    setForm((p) => ({
      ...p,
      bannerHeading: "",
      bannerSubheading: "",
      bannerDescription: "",
    }));

    // 2️⃣ Persist to DB
    await saveDraft({
      banner: null, // IMPORTANT
    });
  }

  /* ---------------- HELPERS ---------------- */
  const updateField = (key: string, value: string) => {
    setForm((p) => ({ ...p, [key]: value }));
    setErrors((e) => ({ ...e, [key]: false }));
  };

  const showSuccess = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.classList.add("show");
    setTimeout(() => {
      el.classList.remove("show");
    }, 4000);
  };

  useEffect(() => {
    if (!isNew && form.slug) {
      setSlugTouched(true); // existing slug must never auto-change
    }
  }, [isNew]);

  useEffect(() => {
    if (isNew) return;

    async function loadExistingPage() {
      setSaving(true);
      const res = await fetch(`/api/webpages/${params.slug}`);
      if (!res.ok) return;

      const data = await res.json();
      // VERY IMPORTANT
      setPageId(data._id);

      setForm({
        title: data.title || form.title,
        slug: data.slug || form.slug,
        topic: data.topic || form.topic,
        description: data.description || form.description,
        cta_label: data.cta_label || form.cta_label,
        cta_url: data.cta_url || form.cta_url,
        metaTitle: data.meta?.metaTitle || form.metaTitle,
        metaDescription: data.meta?.metaDescription || form.metaDescription,
        metaKeywords: data.meta?.metaKeywords ? (data.meta?.metaKeywords).join(", ") : form.metaKeywords,
        bannerHeading: data.banner?.heading || form.bannerHeading,
        bannerSubheading: data.banner?.subheading || form.bannerSubheading,
        bannerDescription: data.banner?.description || form.bannerDescription,
        content_1: data.content_1 || form.content_1,
        content_2: data.content_2 || form.content_2,
        content_3: data.content_3 || form.content_3,
        content_4: data.content_4 || form.content_4,
        content_5: data.content_5 || form.content_5,
        status: data.status || form.status,
        indexingStatus: data.indexingStatus || form.indexingStatus
      });
      setSaving(false);
      if (data.banner?.image) {
        setImageUrl(data.banner.image);
      }
    }

    loadExistingPage();
  }, [params.slug]);


  async function saveDraft(payload: any) {
    if (saving) return;
    setSaving(true);

    const res = await fetch("/api/webpages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: pageId,
        status: form.status,
        indexingStatus: form.indexingStatus,
        ...payload,
      }),
    });

    const data = await res.json();
    if (data?._id) setPageId(data._id);

    setSaving(false);
  }

  const allowNextStep = (target: string) => {
    $(document).trigger("allow-next-step", target);
  };

  /* ---------------- VALIDATIONS ---------------- */

  const validateStep1 = () => {
    const e: any = {};
    if (!form.title.trim()) e.title = true;
    if (!form.slug.trim()) e.slug = true;
    if (!form.topic.trim()) e.topic = true;
    if (!form.cta_label.trim()) e.cta_label = true;
    if (!form.cta_url.trim()) e.cta_url = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: any = {};
    if (!form.metaTitle.trim()) e.metaTitle = true;
    if (!form.metaDescription.trim()) e.metaDescription = true;
    if (!form.metaKeywords.trim()) e.metaKeywords = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep3 = () => {
    const e: any = {};
    if (imageUrl && !form.bannerHeading.trim()) e.bannerHeading = true;
    if (imageUrl && !form.bannerSubheading.trim()) e.bannerSubheading = true;
    if (imageUrl && !form.bannerDescription.trim()) e.bannerDescription = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep4 = () => {
    const e: any = {};
    if (!form.content_1.trim()) e.content_1 = true;
    if (!form.content_2.trim()) e.content_2 = true;
    if (!form.content_3.trim()) e.content_3 = true;
    if (!form.content_4.trim()) e.content_4 = true;
    if (!form.content_5.trim()) e.content_5 = true;
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  /* ---------------- BANNER UPLOAD ---------------- */

  const uploadFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const allowed = ["jpg", "jpeg", "png", "webp", "gif", "svg"];
    const ext = file.name.split(".").pop()?.toLowerCase();
    if (!ext || !allowed.includes(ext)) return;

    const path = `banners/${crypto.randomUUID()}.${ext}`;

    const { error } = await supabase.storage
      .from("dagchain-presale-storage")
      .upload(path, file, { contentType: file.type });

    if (error) return;

    const { data } = supabase.storage
      .from("dagchain-presale-storage")
      .getPublicUrl(path);

    setImageUrl(data.publicUrl);
  };

  /* ---------------- PUBLISH ---------------- */
  async function publishPage() {
    if (!validateStep4() || !pageId) return;

    const res = await fetch("/api/webpages/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: pageId, status: 'published' }),
    });

    if (res.ok) router.replace("/admin/webpages");
  }

  return (
    <>
      <link rel="stylesheet" href="/admin/css/styles/create-webpage.css" />
      <div className="page_wrap">
        <div className="custom_container">

          {/* STEP 1 – PAGE DETAILS */}
          <div className="step_content step1">
            <div className="fullrow_top">
              <h3> {(isNew ? 'Create A New ' : 'Modify ') + 'Webpage'} </h3>
              <span className="c_border"></span>
            </div>
            <div className="fullrow_mid valign_center">
              <div className="formarea">
                <div className="filedwrap mw_615">
                  <div className="row">

                    {/* Page Name */}
                    <div className="col-md-12">
                      <div className="custom_label">
                        <div className="icon">
                          <img src="/admin/images/create-webpage/icon_enter.svg" alt="icon" />
                        </div>
                        Enter the Page Name
                        <div className="mytooltip">
                          <img src="/admin/images/common-images/icon_toolitip.svg" alt="icon"
                            className="icon_tooltip" />
                          <div className="tooltip_content top">
                            <div className="arrow"></div>
                            <div className="customscroll">
                              <div className="text">
                                <p>
                                  Enter a clear, descriptive name for this webpage. This
                                  defines the page's identity and SEO focus.
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="new_inputlabel">
                        <input
                          type="text"
                          className="input"
                          value={form.title}
                          onChange={(e) => {
                            const value = e.target.value;
                            updateField("title", value);

                            // ✅ Auto-update slug ONLY if user never touched it
                            if (!slugTouched) {
                              updateField("slug", slugify(value));
                            }
                          }}
                          placeholder="Enter the Page Name"
                        />
                      </div>
                      <div className={`error_msg ${errors.title ? "" : "d-none"}`}>
                        <img src="/admin/images/common-images/icon_error.svg" alt="icon error" className="licon" />
                        <div className="textbox">
                          <strong className="ttext">Error</strong>
                          <p>
                            Page name is required | Page name is too short | Invalid characters used
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12 d-none">
                      <div className="custom_label">
                        <div className="icon">
                          <img src="/admin/images/create-webpage/icon_enter.svg" alt="icon" />
                        </div>
                        Enter the Page Description (Optional)
                        <div className="mytooltip">
                          <img src="/admin/images/common-images/icon_toolitip.svg" alt="icon"
                            className="icon_tooltip" />
                          <div className="tooltip_content top">
                            <div className="arrow"></div>
                            <div className="customscroll">
                              <div className="text">
                                <p>
                                  Enter page description
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="new_inputlabel">
                        <textarea className="textarea text_autoheight"
                          value={form.description}
                          onChange={(e) => updateField("description", e.target.value)}
                          placeholder="Page description"></textarea>
                      </div>
                      <div className={`error_msg ${errors.title ? "" : "d-none"}`}>
                        <img src="/admin/images/common-images/icon_error.svg" alt="icon error" className="licon" />
                        <div className="textbox">
                          <strong className="ttext">Error</strong>
                          <p>
                            Page description is required | Page description is too short | Invalid characters used
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Page Topic */}
                    <div className="col-md-12">
                      <div className="custom_label">
                        <div className="icon">
                          <img src="/admin/images/create-webpage/icon_topic.svg" alt="icon" />
                        </div>
                        Page Topic
                        <div className="mytooltip">
                          <img src="/admin/images/common-images/icon_toolitip.svg" alt="icon"
                            className="icon_tooltip" />
                          <div className="tooltip_content top">
                            <div className="arrow"></div>
                            <div className="customscroll">
                              <div className="text">
                                <p>Specify the main topic for this webpage. This helps organize
                                  pages and improves SEO categorization.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="new_inputlabel">
                        <input type="text" className="input"
                          value={form.topic}
                          onChange={(e) => updateField("topic", e.target.value)}
                          placeholder="e.g. DagChain – Proof of Originality for Creators in Bangalore" />
                      </div>
                      <div className={`error_msg ${errors.topic ? "" : "d-none"}`}>
                        <img src="/admin/images/common-images/icon_error.svg" alt="icon error" className="licon" />
                        <div className="textbox">
                          <strong className="ttext">Error</strong>
                          <p>Page topic is required | Topic must be more specific</p>
                        </div>
                      </div>
                    </div>

                    {/* Page URL */}
                    <div className="col-md-12">
                      <div className="custom_label">
                        <div className="icon">
                          <img src="/admin/images/create-webpage/icon_url.svg" alt="icon" />
                        </div>
                        Page URL
                        <div className="mytooltip">
                          <img src="/admin/images/common-images/icon_toolitip.svg" alt="icon"
                            className="icon_tooltip" />
                          <div className="tooltip_content top">
                            <div className="arrow"></div>
                            <div className="customscroll">
                              <div className="text">
                                <p>Review the auto-generated URL for accuracy. This URL
                                  determines how the page appears in search results and will
                                  be locked after publishing.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="new_inputlabel">
                        <input
                          type="text"
                          className="input"
                          value={form.slug}
                          onChange={(e) => {
                            // setSlugTouched(true);
                            updateField("slug", slugify(e.target.value));
                          }}
                          placeholder="e.g. blockchain-proof-of-originality-bangalore"
                        />
                      </div>
                      <div className={`error_msg ${errors.slug ? "" : "d-none"}`}>
                        <img src="/admin/images/common-images/icon_error.svg" alt="icon error" className="licon" />
                        <div className="textbox">
                          <strong className="ttext">Error</strong>
                          <p>Page URL is required | Invalid URL format | This URL already exists</p>
                        </div>
                      </div>
                    </div>

                    {/* Call To Action Label */}
                    <div className="col-md-12">
                      <div className="custom_label">
                        <div className="icon">
                          <img src="/admin/images/create-webpage/icon_url.svg" alt="icon" />
                        </div>
                        CTA Label
                        <div className="mytooltip">
                          <img src="/admin/images/common-images/icon_toolitip.svg" alt="icon"
                            className="icon_tooltip" />
                          <div className="tooltip_content top">
                            <div className="arrow"></div>
                            <div className="customscroll">
                              <div className="text">
                                <p>Label text to put on call to action button.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="new_inputlabel">
                        <input type="text" className="input"
                          value={form.cta_label}
                          onChange={(e) => updateField("cta_label", e.target.value)}
                          placeholder="e.g. call to action label" />
                      </div>
                      <div className={`error_msg ${errors.cta_label ? "" : "d-none"}`}>
                        <img src="/admin/images/common-images/icon_error.svg" alt="icon error" className="licon" />
                        <div className="textbox">
                          <strong className="ttext">Error</strong>
                          <p>Call to Action label can't be empty</p>
                        </div>
                      </div>
                    </div>

                    {/* CTA URL */}
                    <div className="col-md-12">
                      <div className="custom_label">
                        <div className="icon">
                          <img src="/admin/images/create-webpage/icon_url.svg" alt="icon" />
                        </div>
                        CTA URL
                        <div className="mytooltip">
                          <img src="/admin/images/common-images/icon_toolitip.svg" alt="icon"
                            className="icon_tooltip" />
                          <div className="tooltip_content top">
                            <div className="arrow"></div>
                            <div className="customscroll">
                              <div className="text">
                                <p>Button URL to put on call to action button.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="new_inputlabel">
                        <input type="text" className="input"
                          value={form.cta_url}
                          onChange={(e) => updateField("cta_url", e.target.value)}
                          placeholder="e.g. call to action label" />
                      </div>
                      <div className={`error_msg ${errors.cta_url ? "" : "d-none"}`}>
                        <img src="/admin/images/common-images/icon_error.svg" alt="icon error" className="licon" />
                        <div className="textbox">
                          <strong className="ttext">Error</strong>
                          <p>Call to Action URL can't be empty</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="fullrow_btm">
              <div className="progress_wrap">
                <span className="sm_text" style={{ paddingLeft: "40px" }}>Page Details</span>
                <div className="custom_progress">
                  <span className="show_progress" style={{ width: "25%" }}></span>
                </div>
              </div>
              <div className="two_btn">
                <a href="/admin/webpages" className="c_btn border_btn">Cancel</a>
                <button className="c_btn animate_arrow nextstep_btn" disabled={saving} data-target="step2"
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    if (!validateStep1()) return; // ✅ THIS WAS MISSING
                    const normalizedSlug = slugify(form.slug);
                    const finalSlug = await getAvailableSlug(normalizedSlug);
                    updateField("slug", finalSlug);
                    await saveDraft({
                      title: form.title,
                      slug: finalSlug,
                      topic: form.topic,
                      description: form.description,
                      cta_label: form.cta_label,
                      cta_url: form.cta_url
                    });

                    allowNextStep("step2");
                  }}>
                  {saving ? 'Saving changes...' : 'Save & Next'}
                  <div className="rgt_arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="13"
                      viewBox="0 0 27.387 13.266">
                      <g id="Group_50634" data-name="Group 50634" transform="translate(0 -132)">
                        <g id="Group_50633" data-name="Group 50633" transform="translate(0 132)">
                          <path id="Path_132492" data-name="Path 132492"
                            d="M27.074,139.39h0l-5.59,5.563a1.07,1.07,0,0,1-1.509-1.517l3.753-3.735H1.07a1.07,1.07,0,0,1,0-2.14H23.726l-3.753-3.735a1.07,1.07,0,0,1,1.509-1.517l5.59,5.563h0A1.071,1.071,0,0,1,27.074,139.39Z"
                            transform="translate(0 -132)" fill="#f1b3f3" />
                        </g>
                      </g>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* STEP 2 – META */}
          <div className="step_content step2 d-none">
            <div className="fullrow_top">
              <div className="prevbtn nextstep_btn" data-target="step1">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="9" viewBox="0 0 13.062 9.5">
                  <path id="Path_150814" data-name="Path 150814"
                    d="M13.469,8.156H3.027L6.17,5.014a.594.594,0,1,0-.84-.84L1.174,8.33a.594.594,0,0,0,0,.84L5.33,13.326a.594.594,0,1,0,.84-.84L3.027,9.344H13.469a.594.594,0,0,0,0-1.187Z"
                    transform="translate(-1 -4)" fill="#0023FC" />
                </svg>
                <span className="ptext">Previous</span>
              </div>
              <h3>Provide the Meta Details</h3>
              <span className="c_border"></span>
            </div>
            <div className="fullrow_mid valign_center">
              <div className="formarea">
                <div className="filedwrap mw_930">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="custom_label">
                        <div className="icon">
                          <img src="/admin/images/create-webpage/icon_title.svg" alt="icon" />
                        </div>
                        Meta Title <span className="graytext">(59-60 Characters)</span>
                        <div className="mytooltip">
                          <img src="/admin/images/common-images/icon_toolitip.svg" alt="icon"
                            className="icon_tooltip" />
                          <div className="tooltip_content top">
                            <div className="arrow"></div>
                            <div className="customscroll">
                              <div className="text">
                                <p>Write a search-friendly title within the recommended length.
                                  This appears in search results and browser tabs.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="new_inputlabel">
                        <textarea className="textarea text_autoheight"
                          value={form.metaTitle}
                          onChange={(e) => updateField("metaTitle", e.target.value)}
                          placeholder="Write a compelling, human-sounding meta title"></textarea>
                      </div>
                      <div className={`error_msg ${errors.metaTitle ? "" : "d-none"}`}>
                        <img src="/admin/images/common-images/icon_error.svg" alt="icon error" className="licon" />
                        <div className="textbox">
                          <strong className="ttext">Error</strong>
                          <p>Meta title is required | Meta title exceeds character limit</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="custom_label">
                        <div className="icon">
                          <img src="/admin/images/create-webpage/icon_content.svg" alt="icon" />
                        </div>
                        Meta Description <span className="graytext">(159-160 Characters)</span>
                        <div className="mytooltip">
                          <img src="/admin/images/common-images/icon_toolitip.svg" alt="icon"
                            className="icon_tooltip" />
                          <div className="tooltip_content top">
                            <div className="arrow"></div>
                            <div className="customscroll">
                              <div className="text">
                                <p>Write a concise summary within the recommended length. This
                                  influences search click-through rates.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="new_inputlabel">
                        <textarea className="textarea text_autoheight"
                          value={form.metaDescription}
                          onChange={(e) => updateField("metaDescription", e.target.value)}
                          placeholder="Write a professional, natural meta description"></textarea>
                      </div>
                      <div className={`error_msg ${errors.metaDescription ? "" : "d-none"}`}>
                        <img src="/admin/images/common-images/icon_error.svg" alt="icon error" className="licon" />
                        <div className="textbox">
                          <strong className="ttext">Error</strong>
                          <p>Meta description is required | Meta description exceeds character limit</p>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-12">
                      <div className="custom_label">
                        <div className="icon">
                          <img src="/admin/images/create-webpage/icon_content.svg" alt="icon" />
                        </div>
                        Meta Keywords <span className="graytext">(10-11 Keywords)</span>
                        <div className="mytooltip">
                          <img src="/admin/images/common-images/icon_toolitip.svg" alt="icon"
                            className="icon_tooltip" />
                          <div className="tooltip_content top">
                            <div className="arrow"></div>
                            <div className="customscroll">
                              <div className="text">
                                <p>Enter 10–11 relevant keywords separated by commas to support
                                  search indexing.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="new_inputlabel">
                        <textarea className="textarea text_autoheight"
                          value={form.metaKeywords}
                          onChange={(e) => updateField("metaKeywords", e.target.value)}
                          placeholder="Write a professional, natural meta description"></textarea>
                      </div>
                      <div className={`error_msg ${errors.metaKeywords ? "" : "d-none"}`}>
                        <img src="/admin/images/common-images/icon_error.svg" alt="icon error" className="licon" />
                        <div className="textbox">
                          <strong className="ttext">Error</strong>
                          <p>Keywords are required | Too few keywords added | Too many keywords added</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="fullrow_btm">
              <div className="progress_wrap">
                <span className="sm_text" style={{ paddingLeft: "100px" }}>Provide Meta Details</span>
                <div className="custom_progress">
                  <span className="show_progress" style={{ width: "50%" }}></span>
                </div>
              </div>
              <div className="two_btn">
                <a href="dashboard.html" className="c_btn border_btn">Cancel</a>
                <button className="c_btn animate_arrow nextstep_btn" disabled={saving} data-target="step3"
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (!validateStep2()) return;

                    await saveDraft({
                      meta: {
                        metaTitle: form.metaTitle,
                        metaDescription: form.metaDescription,
                        metaKeywords: form.metaKeywords
                          .split(",")
                          .map((k) => k.trim()),
                      },
                    });

                    allowNextStep("step3");
                  }}>
                  {saving ? 'Saving changes...' : 'Save & Next'}
                  <div className="rgt_arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="13"
                      viewBox="0 0 27.387 13.266">
                      <g id="Group_50634" data-name="Group 50634" transform="translate(0 -132)">
                        <g id="Group_50633" data-name="Group 50633" transform="translate(0 132)">
                          <path id="Path_132492" data-name="Path 132492"
                            d="M27.074,139.39h0l-5.59,5.563a1.07,1.07,0,0,1-1.509-1.517l3.753-3.735H1.07a1.07,1.07,0,0,1,0-2.14H23.726l-3.753-3.735a1.07,1.07,0,0,1,1.509-1.517l5.59,5.563h0A1.071,1.071,0,0,1,27.074,139.39Z"
                            transform="translate(0 -132)" fill="#f1b3f3" />
                        </g>
                      </g>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* STEP 3 – BANNER */}
          <div className="step_content step3 d-none">
            <div className="fullrow_top">
              <div className="prevbtn nextstep_btn" data-target="step2">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="9" viewBox="0 0 13.062 9.5">
                  <path id="Path_150814" data-name="Path 150814"
                    d="M13.469,8.156H3.027L6.17,5.014a.594.594,0,1,0-.84-.84L1.174,8.33a.594.594,0,0,0,0,.84L5.33,13.326a.594.594,0,1,0,.84-.84L3.027,9.344H13.469a.594.594,0,0,0,0-1.187Z"
                    transform="translate(-1 -4)" fill="#0023FC" />
                </svg>
                <span className="ptext">Previous</span>
              </div>
              <h3>Enter Webpage Banner Content</h3>
              <span className="c_border"></span>
            </div>
            <div className="fullrow_mid valign_center">
              <div className="formarea">
                <div className="filedwrap mw_655">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="custom_label">
                        <div className="icon">
                          <img src="/admin/images/create-webpage/icon_upload_img.svg" alt="icon" />
                        </div>
                        Upload Banner Image
                        <div className="mytooltip">
                          <img src="/admin/images/common-images/icon_toolitip.svg" alt="icon"
                            className="icon_tooltip" />
                          <div className="tooltip_content top">
                            <div className="arrow"></div>
                            <div className="customscroll">
                              <div className="text">
                                <p>Upload or drag a banner image. This image appears at the top
                                  of the webpage and sets the visual context.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="uploadbox">
                        <div className="ProfileUploadSection fullwidth">
                          <div className="UploadSquare">
                            <div className="containers">
                              <button
                                type="button"
                                className={`remove ${!imageUrl ? 'd-none' : ''}`}
                                onClick={(e) => {
                                  e.preventDefault();
                                  e.stopPropagation();
                                  deleteBannerImage();
                                }}
                              >
                                <img src="/admin/images/create-webpage/icon_delete.svg" alt="icon" />
                              </button>
                              <div className="imageWrapper">
                                <div className="upload_withtext">
                                  <div className="icontop">
                                    <img src="/admin/images/create-webpage/icon_upload_img2.svg" alt="icon" />
                                  </div>
                                  <h3>Upload/Drag Image or
                                    <span className="clicktext">Click to Upload</span>
                                  </h3>
                                  <p>
                                    Tip : You can also drag or paste images anywhere in the card.
                                  </p>
                                </div>
                                {imageUrl ? <img src={imageUrl} alt="image" className="uploadiimage" /> : ''}
                                <img src="/admin/images/create-webpage/icon_upload_thumbnail.svg"
                                  alt="image" className="uploadiimage d-none" />
                              </div>
                            </div>
                            <button className="file-upload">
                              <input id="uploadthumbnail" onChange={(e) => uploadFile(e)} type="file" className="file-input" />
                            </button>
                          </div>
                        </div>
                      </div>
                      <div className="error_msg d-none">
                        <img src="/admin/images/common-images/icon_error.svg" alt="icon error" className="licon" />
                        <div className="textbox">
                          <strong className="ttext">Error</strong>
                          <p>Unsupported file format | Image size exceeds the limit</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="filedwrap mw_930">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="custom_label">
                        <div className="icon">
                          <img src="/admin/images/create-webpage/icon_title.svg" alt="icon" />
                        </div>
                        Banner Heading
                        <div className="mytooltip">
                          <img src="/admin/images/common-images/icon_toolitip.svg" alt="icon"
                            className="icon_tooltip" />
                          <div className="tooltip_content top">
                            <div className="arrow"></div>
                            <div className="customscroll">
                              <div className="text">
                                <p>Enter the main headline for the banner. This is the first
                                  message users see on the page.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="new_inputlabel">
                        <textarea className="textarea text_autoheight"
                          value={form.bannerHeading}
                          onChange={(e) => updateField("bannerHeading", e.target.value)}
                          placeholder="Enter Banner Heading, eg. DagChain – Proof of Originality for Creators in Bangalore"></textarea>
                      </div>
                      <div className={`error_msg ${errors.bannerHeading ? "" : "d-none"}`}>
                        <img src="/admin/images/common-images/icon_error.svg" alt="icon error" className="licon" />
                        <div className="textbox">
                          <strong className="ttext">Error</strong>
                          <p>Banner heading is required | Banner heading is too long</p>
                        </div>
                      </div>
                    </div>

                    <div className="col-md-12">
                      <div className="custom_label">
                        <div className="icon">
                          <img src="/admin/images/create-webpage/icon_content.svg" alt="icon" />
                        </div>
                        Banner Subheading
                        <div className="mytooltip">
                          <img src="/admin/images/common-images/icon_toolitip.svg" alt="icon"
                            className="icon_tooltip" />
                          <div className="tooltip_content top">
                            <div className="arrow"></div>
                            <div className="customscroll">
                              <div className="text">
                                <p>Add a short supporting line below the banner heading to
                                  clarify the message.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="new_inputlabel">
                        <textarea className="textarea text_autoheight"
                          value={form.bannerSubheading}
                          onChange={(e) => updateField("bannerSubheading", e.target.value)}
                          placeholder="Enter Banner Subheading, eg. Verifiable content origin, ownership clarity, and long-term trust for creators"></textarea>
                      </div>
                      <div className={`error_msg ${errors.bannerSubheading ? "" : "d-none"}`}>
                        <img src="/admin/images/common-images/icon_error.svg" alt="icon error" className="licon" />
                        <div className="textbox">
                          <strong className="ttext">Error</strong>
                          <p>Banner subheading is required | Banner subheading is too long</p>
                        </div>
                      </div>

                    </div>
                    <div className="col-md-12">
                      <div className="custom_label">
                        <div className="icon">
                          <img src="/admin/images/create-webpage/icon_content.svg" alt="icon" />
                        </div>
                        Banner Description
                        <div className="mytooltip">
                          <img src="/admin/images/common-images/icon_toolitip.svg" alt="icon"
                            className="icon_tooltip" />
                          <div className="tooltip_content top">
                            <div className="arrow"></div>
                            <div className="customscroll">
                              <div className="text">
                                <p>Write a brief description for the banner section to give
                                  quick context to users.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="new_inputlabel">
                        <textarea className="textarea text_autoheight"
                          value={form.bannerDescription}
                          onChange={(e) => updateField("bannerDescription", e.target.value)}
                          placeholder="Enter Banner Description, eg. DagChain helps Bangalore creators establish proof of originality through decentralised provenance, structured records, and reliable verification without platform dependence."></textarea>
                      </div>
                      <div className={`error_msg ${errors.bannerDescription ? "" : "d-none"}`}>
                        <img src="/admin/images/common-images/icon_error.svg" alt="icon error" className="licon" />
                        <div className="textbox">
                          <strong className="ttext">Error</strong>
                          <p>Banner description is required | Banner description is too long</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="fullrow_btm">
              <div className="progress_wrap">
                <span className="sm_text" style={{ paddingLeft: "180px" }}>Banner Content</span>
                <div className="custom_progress">
                  <span className="show_progress" style={{ width: "75%" }}></span>
                </div>
              </div>
              <div className="two_btn">
                <a href="dashboard.html" className="c_btn border_btn">Cancel</a>
                <button className="c_btn animate_arrow nextstep_btn" disabled={saving} data-target="step4"
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (!validateStep3()) return;

                    await saveDraft({
                      banner: {
                        image: imageUrl,
                        heading: form.bannerHeading,
                        subheading: form.bannerSubheading,
                        description: form.bannerDescription,
                      },
                    });

                    allowNextStep("step4");
                  }}>
                  {saving ? 'Saving changes...' : 'Save & Next'}
                  <div className="rgt_arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="13"
                      viewBox="0 0 27.387 13.266">
                      <g id="Group_50634" data-name="Group 50634" transform="translate(0 -132)">
                        <g id="Group_50633" data-name="Group 50633" transform="translate(0 132)">
                          <path id="Path_132492" data-name="Path 132492"
                            d="M27.074,139.39h0l-5.59,5.563a1.07,1.07,0,0,1-1.509-1.517l3.753-3.735H1.07a1.07,1.07,0,0,1,0-2.14H23.726l-3.753-3.735a1.07,1.07,0,0,1,1.509-1.517l5.59,5.563h0A1.071,1.071,0,0,1,27.074,139.39Z"
                            transform="translate(0 -132)" fill="#f1b3f3" />
                        </g>
                      </g>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* STEP 4 – CONTENT */}
          <div className="step_content step4 d-none">
            <div className="fullrow_top">
              <div className="prevbtn nextstep_btn" data-target="step3">
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="9" viewBox="0 0 13.062 9.5">
                  <path id="Path_150814" data-name="Path 150814"
                    d="M13.469,8.156H3.027L6.17,5.014a.594.594,0,1,0-.84-.84L1.174,8.33a.594.594,0,0,0,0,.84L5.33,13.326a.594.594,0,1,0,.84-.84L3.027,9.344H13.469a.594.594,0,0,0,0-1.187Z"
                    transform="translate(-1 -4)" fill="#0023FC" />
                </svg>
                <span className="ptext">Previous</span>
              </div>
              <h3>Write A Webpage Content</h3>
              <span className="c_border"></span>
            </div>
            <div className="fullrow_mid valign_center">
              <div className="formarea">
                <div className="filedwrap mw_930">
                  <div className="row">

                    {/* section 1 */}
                    <div className="col-md-12">
                      <div className="custom_label">
                        <div className="icon">
                          <img src="/admin/images/create-webpage/icon_content.svg" alt="icon" />
                        </div>
                        Webpage Content (Section 1)
                        <div className="mytooltip">
                          <img src="/admin/images/common-images/icon_toolitip.svg" alt="icon"
                            className="icon_tooltip" />
                          <div className="tooltip_content top">
                            <div className="arrow"></div>
                            <div className="customscroll">
                              <div className="text">
                                <p>Add the complete HTML content for this webpage. Clean HTML
                                  ensures correct rendering and SEO compatibility.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="new_inputlabel">
                        <div className="edit_options">
                          <div className="lftcol">
                            <button className="common_btn html_btn htmlclear" onClick={() => window.open("https://html-cleaner.com/", "_blank")}>
                              <img src="/admin/images/create-webpage/icon_html.svg" alt="icon" />
                              Clean HTML
                            </button>
                          </div>
                        </div>
                        <textarea className="textarea text_autoheight mh_260 pt-3"
                          value={form.content_1}
                          onChange={(e) => updateField("content_1", e.target.value)}
                          placeholder="Enter HTML Content Here"></textarea>
                      </div>
                      <div className={`error_msg ${errors.content_1 ? "" : "d-none"}`}>
                        <img src="/admin/images/common-images/icon_error.svg" alt="icon error" className="licon" />
                        <div className="textbox">
                          <strong className="ttext">Error</strong>
                          <p>Webpage content cannot be empty | Invalid HTML detected</p>
                        </div>
                      </div>
                    </div>

                    {/* section 2 */}
                    <div className="col-md-12">
                      <div className="custom_label">
                        <div className="icon">
                          <img src="/admin/images/create-webpage/icon_content.svg" alt="icon" />
                        </div>
                        Webpage Content (Section 2)
                        <div className="mytooltip">
                          <img src="/admin/images/common-images/icon_toolitip.svg" alt="icon"
                            className="icon_tooltip" />
                          <div className="tooltip_content top">
                            <div className="arrow"></div>
                            <div className="customscroll">
                              <div className="text">
                                <p>Add the complete HTML content for this webpage. Clean HTML
                                  ensures correct rendering and SEO compatibility.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="new_inputlabel">
                        <div className="edit_options">
                          <div className="lftcol">
                            <button className="common_btn html_btn htmlclear" onClick={() => window.open("https://html-cleaner.com/", "_blank")}>
                              <img src="/admin/images/create-webpage/icon_html.svg" alt="icon" />
                              Clean HTML
                            </button>
                          </div>
                        </div>
                        <textarea className="textarea text_autoheight mh_260 pt-3"
                          value={form.content_2}
                          onChange={(e) => updateField("content_2", e.target.value)}
                          placeholder="Enter HTML Content Here"></textarea>
                      </div>
                      <div className={`error_msg ${errors.content_2 ? "" : "d-none"}`}>
                        <img src="/admin/images/common-images/icon_error.svg" alt="icon error" className="licon" />
                        <div className="textbox">
                          <strong className="ttext">Error</strong>
                          <p>Webpage content cannot be empty | Invalid HTML detected</p>
                        </div>
                      </div>
                    </div>

                    {/* section 3 */}
                    <div className="col-md-12">
                      <div className="custom_label">
                        <div className="icon">
                          <img src="/admin/images/create-webpage/icon_content.svg" alt="icon" />
                        </div>
                        Webpage Content (Section 3)
                        <div className="mytooltip">
                          <img src="/admin/images/common-images/icon_toolitip.svg" alt="icon"
                            className="icon_tooltip" />
                          <div className="tooltip_content top">
                            <div className="arrow"></div>
                            <div className="customscroll">
                              <div className="text">
                                <p>Add the complete HTML content for this webpage. Clean HTML
                                  ensures correct rendering and SEO compatibility.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="new_inputlabel">
                        <div className="edit_options">
                          <div className="lftcol">
                            <button className="common_btn html_btn htmlclear">
                              <img src="/admin/images/create-webpage/icon_html.svg" alt="icon" />
                              Clean HTML
                            </button>
                          </div>
                        </div>
                        <textarea className="textarea text_autoheight mh_260 pt-3"
                          value={form.content_3}
                          onChange={(e) => updateField("content_3", e.target.value)}
                          placeholder="Enter HTML Content Here"></textarea>
                      </div>
                      <div className={`error_msg ${errors.content_3 ? "" : "d-none"}`}>
                        <img src="/admin/images/common-images/icon_error.svg" alt="icon error" className="licon" />
                        <div className="textbox">
                          <strong className="ttext">Error</strong>
                          <p>Webpage content cannot be empty | Invalid HTML detected</p>
                        </div>
                      </div>
                    </div>

                    {/* section 4 */}
                    <div className="col-md-12">
                      <div className="custom_label">
                        <div className="icon">
                          <img src="/admin/images/create-webpage/icon_content.svg" alt="icon" />
                        </div>
                        Webpage Content (Section 4)
                        <div className="mytooltip">
                          <img src="/admin/images/common-images/icon_toolitip.svg" alt="icon"
                            className="icon_tooltip" />
                          <div className="tooltip_content top">
                            <div className="arrow"></div>
                            <div className="customscroll">
                              <div className="text">
                                <p>Add the complete HTML content for this webpage. Clean HTML
                                  ensures correct rendering and SEO compatibility.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="new_inputlabel">
                        <div className="edit_options">
                          <div className="lftcol">
                            <button className="common_btn html_btn htmlclear" onClick={() => window.open("https://html-cleaner.com/", "_blank")}>
                              <img src="/admin/images/create-webpage/icon_html.svg" alt="icon" />
                              Clean HTML
                            </button>
                          </div>
                        </div>
                        <textarea className="textarea text_autoheight mh_260 pt-3"
                          value={form.content_4}
                          onChange={(e) => updateField("content_4", e.target.value)}
                          placeholder="Enter HTML Content Here"></textarea>
                      </div>
                      <div className={`error_msg ${errors.content_4 ? "" : "d-none"}`}>
                        <img src="/admin/images/common-images/icon_error.svg" alt="icon error" className="licon" />
                        <div className="textbox">
                          <strong className="ttext">Error</strong>
                          <p>Webpage content cannot be empty | Invalid HTML detected</p>
                        </div>
                      </div>
                    </div>

                    {/* section 5 */}
                    <div className="col-md-12">
                      <div className="custom_label">
                        <div className="icon">
                          <img src="/admin/images/create-webpage/icon_content.svg" alt="icon" />
                        </div>
                        Webpage Content (Section 5)
                        <div className="mytooltip">
                          <img src="/admin/images/common-images/icon_toolitip.svg" alt="icon"
                            className="icon_tooltip" />
                          <div className="tooltip_content top">
                            <div className="arrow"></div>
                            <div className="customscroll">
                              <div className="text">
                                <p>Add the complete HTML content for this webpage. Clean HTML
                                  ensures correct rendering and SEO compatibility.</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="new_inputlabel">
                        <div className="edit_options">
                          <div className="lftcol">
                            <button className="common_btn html_btn htmlclear">
                              <img src="/admin/images/create-webpage/icon_html.svg" alt="icon" />
                              Clean HTML
                            </button>
                          </div>
                        </div>
                        <textarea className="textarea text_autoheight mh_260 pt-3"
                          value={form.content_5}
                          onChange={(e) => updateField("content_5", e.target.value)}
                          placeholder="Enter HTML Content Here"></textarea>
                      </div>
                      <div className={`error_msg ${errors.content_5 ? "" : "d-none"}`}>
                        <img src="/admin/images/common-images/icon_error.svg" alt="icon error" className="licon" />
                        <div className="textbox">
                          <strong className="ttext">Error</strong>
                          <p>Webpage content cannot be empty | Invalid HTML detected</p>
                        </div>
                      </div>
                    </div>

                  </div>
                </div>
              </div>
            </div>
            <div className="fullrow_btm">
              <div className="progress_wrap">
                <span className="sm_text last">Webpage Content</span>
                <div className="custom_progress">
                  <span className="show_progress" style={{ width: "100%" }}></span>
                </div>
              </div>
              <div className="two_btn">
                <a href="/admin/webpages" className="c_btn border_btn">Cancel</a>
                {
                  form.status === 'draft' ?
                    <button disabled={saving}
                      onClick={async (e) => {
                        e.preventDefault();
                        e.stopPropagation();

                        if (saving) return;
                        if (!validateStep4()) return;

                        await saveDraft({
                          content_1: form.content_1,
                          content_2: form.content_2,
                          content_3: form.content_3,
                          content_4: form.content_4,
                          content_5: form.content_5
                        });
                        showSuccess("successmsg_savedraft");
                        router.replace("/admin/webpages");
                      }}
                      className="c_btn border_btn"
                      data-target="successmsg_savedraft"
                    >
                      {saving ? 'Saving changes...' : 'Save as Draft'}
                    </button> : ''
                }

                {/* FINAL – PUBLISH */}
                <button disabled={saving}
                  onClick={async (e) => {
                    e.preventDefault();
                    e.stopPropagation();

                    if (saving) return;
                    if (!validateStep4()) return;

                    // Save draft first (same pageId)
                    await saveDraft({
                      content_1: form.content_1,
                      content_2: form.content_2,
                      content_3: form.content_3,
                      content_4: form.content_4,
                      content_5: form.content_5
                    });

                    // Publish same record
                    await publishPage();

                    // Show success
                    showSuccess("successmsg_publishpage");
                  }}
                  className="c_btn animate_arrow"
                  data-target="successmsg_publishpage"
                >
                  {saving ? 'Publishing Changes...' : ((form.status === 'published' ? 'Re' : '') + ' Publish Page')}
                  <div className="rgt_arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="27" height="13"
                      viewBox="0 0 27.387 13.266">
                      <g transform="translate(0 -132)">
                        <path
                          d="M27.074,139.39l-5.59,5.563a1.07,1.07,0,1,1-1.509-1.517l3.753-3.735H1.07a1.07,1.07,0,0,1,0-2.14H23.726l-3.753-3.735a1.07,1.07,0,1,1,1.509-1.517l5.59,5.563a1.071,1.071,0,0,1,0,1.511Z"
                          fill="#f1b3f3"
                        />
                      </g>
                    </svg>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="top_successful_msg fixed_top" id="successmsg_savedraft">
          <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45.945 45.945">
            <path id="Path_151335" data-name="Path 151335"
              d="M24.288,1.318A22.972,22.972,0,1,1,1.316,24.29,22.975,22.975,0,0,1,24.288,1.318Zm-4.77,30.434-5.624-5.629a2.461,2.461,0,0,1,3.481-3.481l3.965,3.968L31.2,16.747a2.461,2.461,0,0,1,3.481,3.481L23.077,31.834a2.467,2.467,0,0,1-3.481,0c-.027-.027-.053-.054-.078-.082Z"
              transform="translate(-1.316 -1.318)" fill="#fff" fillRule="evenodd"></path>
          </svg>
          <p>Draft saved successfully!</p>
        </div>
        <div className="top_successful_msg fixed_top" id="successmsg_publishpage">
          <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45.945 45.945">
            <path id="Path_151335" data-name="Path 151335"
              d="M24.288,1.318A22.972,22.972,0,1,1,1.316,24.29,22.975,22.975,0,0,1,24.288,1.318Zm-4.77,30.434-5.624-5.629a2.461,2.461,0,0,1,3.481-3.481l3.965,3.968L31.2,16.747a2.461,2.461,0,0,1,3.481,3.481L23.077,31.834a2.467,2.467,0,0,1-3.481,0c-.027-.027-.053-.054-.078-.082Z"
              transform="translate(-1.316 -1.318)" fill="#fff" fillRule="evenodd"></path>
          </svg>
          <p>Published successfully!</p>
        </div>
      </div>

      <Script
        src="/admin/js/create-webpage.js"
        strategy="afterInteractive"
      />
    </>
  );
}
