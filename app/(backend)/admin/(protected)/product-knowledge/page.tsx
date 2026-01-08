"use client";
import "@/public/admin/css/styles/listing.css";
import Script from "next/script";
import { useEffect, useState } from "react";
import moment from "moment";
import { useRouter } from "next/navigation";

type Webpage = {
  _id: string;
  title: string;
  topic?: string;
  slug?: string;
  status?: "draft" | "paused" | "published";
  indexingAt?: string;
  indexingStatus?: "indexed" | "pending";
  createdAt: string;
  updatedAt: string;
};

export default function WebpagesListing() {

  const [publishErrors, setPublishErrors] = useState<string[]>([]);
  const [pages, setPages] = useState<Webpage[]>([]);
  const [currentPageId, setCurrentPageId] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const PAGE_SIZE = 10; // change as needed

  const filteredPages = pages.filter((page) => {
    if (!search.trim()) return true;

    const q = search.toLowerCase();

    return (
      page.title?.toLowerCase().includes(q) ||
      page.topic?.toLowerCase().includes(q) ||
      page.slug?.toLowerCase().includes(q)
    );
  });

  const [role, setRole] = useState<"admin" | "writer" | null>(null);

  useEffect(() => {
    fetch("/api/auth/me")
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data?.user?.role) setRole(data.user.role);
      });
  }, []);

  const totalPages = Math.ceil(filteredPages.length / PAGE_SIZE);

  const paginatedPages = filteredPages.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const VALIDATION_RULES = {
    root: ["title", "slug", "topic", "cta_url", "cta_label"],

    meta: {
      requiredIfExists: ["metaTitle", "metaDescription"],
      optional: ["metaKeywords"],
    },

    banner: {
      conditionalRequired: {
        when: "image",
        require: ["image", "heading", "subheading", "description"],
      },
    },

    questions: {
      minCount: 1,
      required: ["title", "answer"],
    },
  } as const;

  const showSuccess = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.classList.add("show");
    setTimeout(() => {
      el.classList.remove("show");
    }, 4000);
  };

  function isEmpty(value: any) {
    if (value === null || value === undefined) return true;
    if (typeof value === "string") return value.trim() === "";
    if (Array.isArray(value)) return value.length === 0;
    if (typeof value === "object") return Object.keys(value).length === 0;
    return false;
  }

  function validateObject(
    obj: Record<string, any> | undefined,
    requiredKeys: readonly string[],
    prefix: string
  ) {
    if (!obj) {
      return requiredKeys.map((k) => `${prefix}.${k}`);
    }

    return requiredKeys
      .filter((key) => isEmpty(obj[key]))
      .map((key) => `${prefix}.${key}`);
  }

  function validatePageBeforePublish(page: any) {
    const missing: string[] = [];

    /* ---------------- Root fields ---------------- */
    VALIDATION_RULES.root.forEach((field) => {
      if (isEmpty(page[field])) {
        missing.push(field);
      }
    });

    /* ---------------- Meta ---------------- */
    if (page.meta) {
      missing.push(
        ...validateObject(
          page.meta,
          VALIDATION_RULES.meta.requiredIfExists,
          "meta"
        )
      );
    }

    /* ---------------- Banner (conditional) ---------------- */
    const banner = page.banner;
    const bannerRule = VALIDATION_RULES.banner.conditionalRequired;

    if (banner?.[bannerRule.when]) {
      missing.push(
        ...validateObject(
          banner,
          bannerRule.require,
          "banner"
        )
      );
    }

    /* ---------------- QUESTIONS ---------------- */
    const questions = page.questions;

    if (!Array.isArray(questions) || questions.length < VALIDATION_RULES.questions.minCount) {
      missing.push("questions (at least one required)");
    } else {
      questions.forEach((q: any, index: number) => {
        VALIDATION_RULES.questions.required.forEach((field) => {
          if (isEmpty(q[field])) {
            missing.push(`questions[${index + 1}].${field}`);
          }
        });
      });
    }

    return {
      valid: missing.length === 0,
      missing,
    };
  }


  useEffect(() => {
    fetch("/api/webpages?type=knowledge")
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setPages(data.pages);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const copyUrl = (slug?: string) => {
    if (!slug) return;
    const url = `${window.location.origin}/${slug}`;
    navigator.clipboard.writeText(url).then(() => {
      alert("URL copied to clipboard");
    });
  };

  const editPage = (id: string) => {
    router.push(`/admin/product-knowledge/${id}`);
  };

  const viewPage = (slug?: string) => {
    if (!slug) return;
    window.open(`/${slug}?preview=true`, "_blank");
  };

  /* ---------------- PUBLISH ---------------- */
  async function changeStatus(pageId: string, status: string) {
    const res = await fetch("/api/webpages/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: pageId, status: status }),
    });
    if (res.ok) {
      if (['paused', 'draft'].includes(status)) {
        await changeIndexingStatus(pageId, 'pending');
      } else {
        await changeIndexingStatus(pageId, 'indexed');
      }
    };
  }

  /* ---------------- CHANGE INDEXING STATUS ---------------- */
  async function changeIndexingStatus(pageId: string, indexingStatus: string) {
    const res = await fetch("/api/webpages/indexing", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: pageId, indexingStatus }),
    });
    if (res.ok) {
      router.replace("/admin/product-knowledge")
      setTimeout(() => { location.reload() }, 250);
    };
  }

  return (
    <>
      <link rel="stylesheet" href="/admin/css/styles/listing.css" />
      <div className="page_wrap">
        <div className="fullheight">
          <div className="listing_area">
            <div className="top_section">
              <div className="topbox">
                <div className="custom_container">
                  <div className="page_tilte">
                    <h2>All Product Knowledge Pages</h2>
                  </div>
                </div>
              </div>
              <div className="search_full">
                <div className="custom_container">
                  <div className="search_wrap">
                    <input
                      type="text"
                      className="input"
                      placeholder="Search Pages by Name, Topic, URL"
                      value={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1); // reset pagination on search
                      }}
                    />
                    <button className="c_btn bgred" onClick={() => setCurrentPage(1)}>Search</button>
                  </div>
                </div>
              </div>
            </div>
            <div className="tab_content">
              <div className="custom_container">
                <div className="tab-content">
                  <div className="tab-pane active">
                    <div className="tableresponsive customscroll">
                      <table className="article_table">
                        <thead>
                          <tr>
                            <th>
                              <div className="fullrow">
                                <div className="name_box">Page Name</div>
                                <div className="topic_box">Page Topic</div>
                                <div className="status_box">Status</div>
                                <div className="indexing_box">Indexing</div>
                                <div className="action_box">Actions</div>
                                <div className="action_box2">&nbsp;</div>
                              </div>
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {loading && (
                            <tr>
                              <td>
                                <div className="fullrow">
                                  <div className="nodata">
                                    <div className="centerbox">
                                      <strong>Loading webpages...</strong>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}

                          {!loading && paginatedPages.length === 0 && (
                            <tr>
                              <td>
                                <div className="fullrow">
                                  <div className="nodata">
                                    <div className="centerbox">
                                      <img src="images/common-images/img_nodata.svg"
                                        alt="image" />
                                      <strong>No Data Found.</strong>
                                    </div>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}

                          {!loading &&
                            paginatedPages.map((page) => (
                              <tr key={page?._id}>
                                <td>
                                  <div className="fullrow">
                                    <div className="toprow">
                                      <div className="name_box">
                                        <div className="imgbox">
                                          <img src="images/create-webpage/img_brand.png"
                                            alt="icon" />
                                        </div>
                                        <div className="textbox">
                                          <div className="btext">
                                            {page.title}
                                          </div>
                                          <div className="ctext">
                                            <div className="icon">
                                              <img src="images/create-webpage/icon_calendar.svg"
                                                alt="icon" />
                                            </div>
                                            {moment(page.updatedAt).format('LLLL')}
                                          </div>
                                        </div>
                                      </div>
                                      <div className="topic_box">
                                        <div className="btext fw_400">
                                          {page.topic}
                                        </div>
                                        <div className="btext bluetext">
                                          /{page.slug}
                                        </div>
                                      </div>
                                      <div className="status_box">
                                        <div className={`capitalize btntype ${page.status === 'published' ? 'green' : page.status === 'paused' ? 'ylw' : 'gray'}`}>
                                          {page.status === 'published' ? 'live' : page.status}
                                        </div>
                                      </div>
                                      <div className="indexing_box">
                                        <div className="toprow">
                                          <div className={`btntype capitalize ${page.indexingStatus === 'pending' ? 'red' : 'green'}`}>
                                            {page.indexingStatus}
                                          </div>
                                          <div className="dropdown">
                                            <button type="button"
                                              className="dotsclick dropdown-toggle round_btn"
                                              data-bs-toggle="dropdown"
                                              aria-expanded="false">
                                              <img src="images/common-images/icon_threedots.svg"
                                                alt="icon" />
                                            </button>

                                            <div className="dropdown-menu mycommon_dropdown">
                                              <ul>
                                                <li>
                                                  <a className="dropdown-item"
                                                    href="#"
                                                    onClick={(e) => {
                                                      e.preventDefault();
                                                      copyUrl(page.slug);
                                                    }}>
                                                    <div className="icon">
                                                      <img src="images/create-webpage/icon_copy.png"
                                                        alt="icon" />
                                                    </div>
                                                    Copy URL
                                                  </a>
                                                </li>
                                                <li>
                                                  <a href="#"
                                                    onClick={(e) => {
                                                      e.preventDefault();
                                                      editPage(page._id);
                                                    }}
                                                    className="dropdown-item">
                                                    <div className="icon">
                                                      <img src="images/create-webpage/icon_edit.svg"
                                                        alt="icon" />
                                                    </div>
                                                    Edit Webpage
                                                  </a>
                                                </li>
                                                {
                                                  page.status === 'published' && page.indexingStatus === 'pending' ?
                                                    <li>
                                                      <a onClick={async (e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        // de same record
                                                        await changeIndexingStatus(page?._id, 'indexed');
                                                        // Show success
                                                        showSuccess("successmsg_indexingStartmodal");

                                                      }} className="dropdown-item" href="#">
                                                        <div className="icon">
                                                          <img src="images/create-webpage/icon_indexing.png"
                                                            alt="icon" />
                                                        </div>
                                                        Start Indexing
                                                      </a>
                                                    </li> : ''
                                                }

                                                {
                                                  page.status === 'published' && page.indexingStatus === 'indexed' ?
                                                    <li>
                                                      <a onClick={async (e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        // de same record
                                                        await changeIndexingStatus(page?._id, 'pending');
                                                        // Show success
                                                        showSuccess("successmsg_indexingStopmodal");

                                                      }} className="dropdown-item" href="#">
                                                        <div className="icon">
                                                          <img src="images/create-webpage/icon_indexing.png"
                                                            alt="icon" />
                                                        </div>
                                                        Stop Indexing
                                                      </a>
                                                    </li> : ''
                                                }
                                              </ul>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="ctext">
                                          <img src="images/create-webpage/icon_calendar.svg"
                                            alt="icon" />
                                          {moment(page.indexingAt).format("LL")}
                                        </div>
                                      </div>
                                      <div className="action_box">
                                        <div className="togglecheck_box">
                                          <input
                                            className="checkbox"
                                            id={`status-${page._id}`}
                                            type="checkbox"
                                            checked={page.status === "published"}
                                            // disabled={page.status === "draft"}
                                            onChange={async () => {
                                              const nextStatus =
                                                page.status === "published" ? "paused" : "published";

                                              // ✅ Validate ONLY when publishing
                                              if (nextStatus === "published") {
                                                const { valid, missing } =
                                                  validatePageBeforePublish(page);

                                                if (!valid) {
                                                  setPublishErrors(missing);

                                                  const modal = new (window as any).bootstrap.Modal(
                                                    document.getElementById("publish_error_modal")
                                                  );
                                                  modal.show();

                                                  return;
                                                }
                                              }

                                              await changeStatus(page._id, nextStatus);
                                            }}
                                          />
                                          <label
                                            htmlFor={`status-${page._id}`}
                                            className="checkbox-label"
                                          >
                                            <span className="c_text on">Live</span>
                                            <span className="c_text off">Paused</span>
                                          </label>
                                        </div>

                                      </div>
                                      <div className="action_box2">
                                        <a className="round_btn" href="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            editPage(page._id);
                                          }}>
                                          <img src="images/create-webpage/icon_edit_black.svg"
                                            alt="icon" />
                                        </a>
                                        <a className="round_btn" href="#"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            viewPage(page.slug);
                                          }}>
                                          <img src="images/create-webpage/icon_eye_black.png"
                                            alt="icon" />
                                        </a>
                                        <div className="dropdown">
                                          <button type="button"
                                            className="dotsclick dropdown-toggle round_btn"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                            <img src="images/common-images/icon_threedots2.svg"
                                              alt="icon" />
                                          </button>

                                          <div className="dropdown-menu mycommon_dropdown">
                                            <ul>
                                              <li>
                                                <a className="dropdown-item" href="#"
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    viewPage(page.slug);
                                                  }}>
                                                  <div className="icon">
                                                    <img src="images/create-webpage/icon_eye_black.svg"
                                                      alt="icon" />
                                                  </div>
                                                  View Webpage
                                                </a>
                                              </li>
                                              <li>
                                                <a href="#"
                                                  onClick={(e) => {
                                                    e.preventDefault();
                                                    editPage(page._id);
                                                  }}
                                                  className="dropdown-item">
                                                  <div className="icon">
                                                    <img src="images/create-webpage/icon_edit.svg"
                                                      alt="icon" />
                                                  </div>
                                                  Edit Webpage
                                                </a>
                                              </li>
                                              {
                                                page?.status && ['paused', 'draft'].includes(page?.status) ?
                                                  <li>
                                                    <a
                                                      className="dropdown-item"
                                                      href="#"
                                                      onClick={async (e) => {
                                                        e.preventDefault();

                                                        const { valid, missing } =
                                                          validatePageBeforePublish(page);

                                                        if (!valid) {
                                                          setPublishErrors(missing);

                                                          const modal = new (window as any).bootstrap.Modal(
                                                            document.getElementById("publish_error_modal")
                                                          );
                                                          modal.show();

                                                          return;
                                                        }

                                                        await changeStatus(page._id, "published");
                                                      }}
                                                    >
                                                      <div className="icon">
                                                        <img src="images/create-webpage/icon_check.svg" alt="icon" />
                                                      </div>
                                                      Live Webpage
                                                    </a>

                                                  </li> : ''
                                              }

                                              {
                                                page?.status && ['published'].includes(page?.status) ?
                                                  <li>
                                                    <a className="dropdown-item" onClick={() => setCurrentPageId(page?._id)}
                                                      data-bs-toggle="modal"
                                                      data-bs-target="#pause_modal">
                                                      <div className="icon">
                                                        <img src="images/create-webpage/icon_pause.svg"
                                                          alt="icon" />
                                                      </div>
                                                      Pause Webpage
                                                    </a>
                                                  </li> : ''
                                              }
                                              {
                                                role === "admin" && (
                                                  <li>
                                                    <a
                                                      onClick={() => setCurrentPageId(page._id)}
                                                      className="dropdown-item text-red-600"
                                                      data-bs-toggle="modal"
                                                      data-bs-target="#delete_modal"
                                                    >
                                                      <div className="icon">
                                                        <img src="images/create-webpage/icon_delete2.svg" alt="icon" />
                                                      </div>
                                                      Delete Webpage
                                                    </a>
                                                  </li>
                                                )
                                              }
                                            </ul>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </td>
                              </tr>
                            ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="pagination_bar">
          <div className="custom_container">
            <div className="aboutbox">
              Showing{" "}
              {(currentPage - 1) * PAGE_SIZE + 1} to{" "}
              {Math.min(currentPage * PAGE_SIZE, filteredPages.length)} of{" "}
              <span className="redtext">{filteredPages.length} entries</span>
            </div>

            <ul>
              <li
                className={currentPage === 1 ? "disabled" : ""}
                onClick={() => setCurrentPage(1)}
              >
                <img src="images/common-images/icon_pagination_first.svg" />
                First
              </li>

              <li
                className={currentPage === 1 ? "disabled" : ""}
                onClick={() =>
                  setCurrentPage((p) => Math.max(1, p - 1))
                }
              >
                <img src="images/common-images/icon_pagination_previous.svg" />
                Previous
              </li>

              {Array.from({ length: totalPages }).map((_, i) => (
                <li
                  key={i}
                  className={currentPage === i + 1 ? "active" : ""}
                  onClick={() => setCurrentPage(i + 1)}
                >
                  {String(i + 1).padStart(2, "0")}
                </li>
              ))}

              <li
                className={currentPage === totalPages ? "disabled" : ""}
                onClick={() =>
                  setCurrentPage((p) =>
                    Math.min(totalPages, p + 1)
                  )
                }
              >
                Next
                <img src="images/common-images/icon_pagination_next.svg" />
              </li>

              <li
                className={currentPage === totalPages ? "disabled" : ""}
                onClick={() => setCurrentPage(totalPages)}
              >
                Last
                <img src="images/common-images/icon_pagination_last.svg" />
              </li>
            </ul>
          </div>
        </div>


        <div aria-labelledby="myModalLabel" className="modal fade common_modal" id="pause_modal" role="dialog" tabIndex={-1}
          aria-modal="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content ">
              <button className="close" aria-label="Close" data-bs-dismiss="modal" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17.661 17.661">
                  <g id="Group_34552" data-name="Group 34552" transform="translate(-45.732 -22.732)">
                    <line id="Line_14" data-name="Line 14" x1="14.125" y2="14.125"
                      transform="translate(47.5 24.5)" fill="none" stroke="#E1003E" strokeLinecap="round"
                      strokeWidth="2.5" />
                    <line id="Line_15" data-name="Line 15" x2="14.125" y2="14.125"
                      transform="translate(47.5 24.5)" fill="none" stroke="#E1003E" strokeLinecap="round"
                      strokeWidth="2.5" />
                  </g>
                </svg>
              </button>
              <div className="modal_body">
                <div className="centerbox delete">
                  <img src="images/create-webpage/icon_paused_modal.svg" alt="icon" className="mainimg" />
                  <strong className="sure_text">Are You Sure Want to <span className="bluetext">Pause the
                    Webpage?</span></strong>
                  <p className="confirm_text">
                    Once you confirm, this cannot be undone.<br />
                    Still want to proceed?
                  </p>
                  <div className="btnrow center">
                    <button className="c_btn border_btn" aria-label="Close" data-bs-dismiss="modal"
                      type="button">
                      No, Cancel it
                    </button>
                    <button onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // de same record
                      await changeStatus(currentPageId, 'paused');
                      // Show success
                      showSuccess("successmsg_pausemodal");

                    }} className="c_btn show_successmsg" aria-label="Close" data-bs-dismiss="modal"
                      data-target="successmsg_pausemodal">
                      Yes! I am sure
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="top_successful_msg fixed_top" id="successmsg_pausemodal">
          <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45.945 45.945">
            <path id="Path_151335" data-name="Path 151335"
              d="M24.288,1.318A22.972,22.972,0,1,1,1.316,24.29,22.975,22.975,0,0,1,24.288,1.318Zm-4.77,30.434-5.624-5.629a2.461,2.461,0,0,1,3.481-3.481l3.965,3.968L31.2,16.747a2.461,2.461,0,0,1,3.481,3.481L23.077,31.834a2.467,2.467,0,0,1-3.481,0c-.027-.027-.053-.054-.078-.082Z"
              transform="translate(-1.316 -1.318)" fill="#fff" fillRule="evenodd" />
          </svg>
          <p>Webpage paused successfully.</p>
        </div>

        <div className="top_successful_msg fixed_top" id="successmsg_indexingStartmodal">
          <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45.945 45.945">
            <path id="Path_151335" data-name="Path 151335"
              d="M24.288,1.318A22.972,22.972,0,1,1,1.316,24.29,22.975,22.975,0,0,1,24.288,1.318Zm-4.77,30.434-5.624-5.629a2.461,2.461,0,0,1,3.481-3.481l3.965,3.968L31.2,16.747a2.461,2.461,0,0,1,3.481,3.481L23.077,31.834a2.467,2.467,0,0,1-3.481,0c-.027-.027-.053-.054-.078-.082Z"
              transform="translate(-1.316 -1.318)" fill="#fff" fillRule="evenodd" />
          </svg>
          <p>Webpage indexing started successfully.</p>
        </div>

        <div className="top_successful_msg fixed_top" id="successmsg_indexingStopmodal">
          <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45.945 45.945">
            <path id="Path_151335" data-name="Path 151335"
              d="M24.288,1.318A22.972,22.972,0,1,1,1.316,24.29,22.975,22.975,0,0,1,24.288,1.318Zm-4.77,30.434-5.624-5.629a2.461,2.461,0,0,1,3.481-3.481l3.965,3.968L31.2,16.747a2.461,2.461,0,0,1,3.481,3.481L23.077,31.834a2.467,2.467,0,0,1-3.481,0c-.027-.027-.053-.054-.078-.082Z"
              transform="translate(-1.316 -1.318)" fill="#fff" fillRule="evenodd" />
          </svg>
          <p>Webpage indexing stopped successfully.</p>
        </div>

        <div aria-labelledby="myModalLabel" className="modal fade common_modal" id="delete_modal" role="dialog" aria-modal="true">
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content ">
              <button onClick={() => setCurrentPageId("")} className="close" aria-label="Close" data-bs-dismiss="modal" type="button">
                <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17.661 17.661">
                  <g id="Group_34552" data-name="Group 34552" transform="translate(-45.732 -22.732)">
                    <line id="Line_14" data-name="Line 14" x1="14.125" y2="14.125"
                      transform="translate(47.5 24.5)" fill="none" stroke="#E1003E" strokeLinecap="round"
                      strokeWidth="2.5" />
                    <line id="Line_15" data-name="Line 15" x2="14.125" y2="14.125"
                      transform="translate(47.5 24.5)" fill="none" stroke="#E1003E" strokeLinecap="round"
                      strokeWidth="2.5" />
                  </g>
                </svg>
              </button>
              <div className="modal_body">
                <div className="centerbox delete">
                  <img src="images/create-webpage/icon_delete_modal.svg" alt="icon" className="mainimg" />
                  <strong className="sure_text redtext">Are You Sure Want to Delete?</strong>
                  <p className="confirm_text">
                    Once you confirm, this cannot be undone. <br />
                    Still want to proceed?
                  </p>
                  <div className="btnrow center">
                    <button onClick={() => setCurrentPageId("")} className="c_btn border_btn" aria-label="Close" data-bs-dismiss="modal"
                      type="button">
                      No, Cancel it
                    </button>
                    <button onClick={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      // de same record
                      await changeStatus(currentPageId, 'deleted');
                      // Show success
                      showSuccess("successmsg_deletemodal");

                    }} className="c_btn show_successmsg" aria-label="Close" data-bs-dismiss="modal"
                      data-target="successmsg_deletemodal">
                      Yes! I am sure
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="top_successful_msg fixed_top" id="successmsg_deletemodal">
          <svg xmlns="http://www.w3.org/2000/svg" width="45" height="45" viewBox="0 0 45.945 45.945">
            <path id="Path_151335" data-name="Path 151335"
              d="M24.288,1.318A22.972,22.972,0,1,1,1.316,24.29,22.975,22.975,0,0,1,24.288,1.318Zm-4.77,30.434-5.624-5.629a2.461,2.461,0,0,1,3.481-3.481l3.965,3.968L31.2,16.747a2.461,2.461,0,0,1,3.481,3.481L23.077,31.834a2.467,2.467,0,0,1-3.481,0c-.027-.027-.053-.054-.078-.082Z"
              transform="translate(-1.316 -1.318)" fill="#fff" fillRule="evenodd" />
          </svg>
          <p>Deleted successfully!</p>
        </div>

        <div
          className="modal fade common_modal"
          id="publish_error_modal"
          tabIndex={-1}
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <button
                type="button"
                className="close"
                data-bs-dismiss="modal"
                aria-label="Close"
              >
                ✕
              </button>

              <div className="modal_body">
                <div className="centerbox delete">
                  <strong className="sure_text redtext">
                    Cannot Publish Webpage
                  </strong>

                  <p className="confirm_text">
                    Please fix the following issues before publishing:
                  </p>

                  <ul style={{ textAlign: "left", marginTop: 12 }}>
                    {publishErrors.map((err, i) => (
                      <li key={i}>• {err}</li>
                    ))}
                  </ul>

                  <div className="btnrow center">
                    <button
                      className="c_btn border_btn"
                      data-bs-dismiss="modal"
                      type="button"
                    >
                      OK, I’ll fix them
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>


        {/* <div className="modal-backdrop fade show"></div> */}
      </div>

      <Script
        src="/admin/js/webpages-listing.js"
        strategy="afterInteractive"
      />
    </>
  );
}