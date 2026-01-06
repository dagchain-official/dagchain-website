"use client";

import { useEffect } from "react";

export default function StaticBanner() {
  /* Optional: re-init counters if you rely on jQuery counter plugins */
  useEffect(() => {
    const $ = (window as any)?.$;
    if ($ && $(".counter").length) {
      $(".counter").counterUp?.({
        delay: 40,
        time: 1000,
      });
    }
  }, []);

  return (
    <div
      className="article_banner"
      data-aos="fade-up"
      data-aos-duration="1500"
    >
      <div className="top_patch">
        <img
          src="/frontend/images/article/patch3.png"
          alt="image"
        />
      </div>

      <div className="custom_container">
        {/* ---------------- Numbers ---------------- */}
        <div className="number_wrap">
          <div className="common">
            <div className="number">
              <strong className="counter">01</strong>+
            </div>
            <div className="animate_border fullred"></div>
            <p>
              Unified DAG <br /> Execution Layer
            </p>
          </div>

          <div className="common">
            <div className="number">
              <strong className="counter">03</strong>+
            </div>
            <div className="animate_border fullred"></div>
            <p>
              Parallel Validation <br /> Paths
            </p>
          </div>

          <div className="common">
            <div className="number">
              <strong className="counter">06</strong>+
            </div>
            <div className="animate_border fullred"></div>
            <p>
              Native AI <br /> Trust Modules
            </p>
          </div>

          <div className="common">
            <div className="number">
              <strong className="counter">10</strong>+
            </div>
            <div className="animate_border fullred"></div>
            <p>
              Interoperable Intelligence <br /> Rails
            </p>
          </div>

          <div className="common">
            <div className="number">
              <strong className="counter">10</strong>+
            </div>
            <div className="animate_border fullred"></div>
            <p>
              Agent-First Economic <br /> Primitives
            </p>
          </div>
        </div>

        {/* ---------------- Text + CTAs ---------------- */}
        <div className="textbox">
          <h3>Create Across Formats Without Losing Control</h3>
          <h4>DAGGPT – One Workspace For Serious Creators</h4>
          <p>
            Write, design, and produce videos while your work stays
            private, secure, and remembered.
          </p>

          <ul className="btnwrap">
            <li>
              <div className="fullrow">
                <div className="icon">
                  <img
                    src="/frontend/images/article/icon_tool.svg"
                    alt="icon"
                  />
                </div>
                <strong className="htext">
                  Create Without <br /> Tool Chaos
                </strong>
              </div>
              <a href="#" className="cta_btn animate_arrow">
                Explore DAGGPT
                <div className="rgt_arrow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="10"
                    viewBox="0 0 20.798 10.074"
                  >
                    <path
                      d="M20.56,137.612h0l-4.245,4.225a.812.812,0,0,1-1.146-1.152l2.85-2.836H.812a.812.812,0,0,1,0-1.625H18.018l-2.85-2.836a.812.812,0,0,1,1.146-1.152l4.245,4.225h0A.813.813,0,0,1,20.56,137.612Z"
                      transform="translate(0 -132)"
                      fill="#fdec07"
                    />
                  </svg>
                </div>
              </a>
            </li>

            <li>
              <div className="fullrow">
                <div className="icon">
                  <img
                    src="/frontend/images/article/icon_infrastructure.svg"
                    alt="icon"
                  />
                </div>
                <strong className="htext">
                  Build On Trust <br /> Infrastructure
                </strong>
              </div>
              <a href="#" className="cta_btn animate_arrow">
                Explore DAGCHAIN
                <div className="rgt_arrow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="10"
                    viewBox="0 0 20.798 10.074"
                  >
                    <path
                      d="M20.56,137.612h0l-4.245,4.225a.812.812,0,0,1-1.146-1.152l2.85-2.836H.812a.812.812,0,0,1,0-1.625H18.018l-2.85-2.836a.812.812,0,0,1,1.146-1.152l4.245,4.225h0A.813.813,0,0,1,20.56,137.612Z"
                      transform="translate(0 -132)"
                      fill="#fdec07"
                    />
                  </svg>
                </div>
              </a>
            </li>

            <li>
              <div className="fullrow">
                <div className="icon">
                  <img
                    src="/frontend/images/article/icon_community.svg"
                    alt="icon"
                  />
                </div>
                <strong className="htext">
                  Build With The <br /> Community
                </strong>
              </div>
              <a
                href="join-dagarmy.html"
                className="cta_btn animate_arrow"
              >
                Join DAGARMY
                <div className="rgt_arrow">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="10"
                    viewBox="0 0 20.798 10.074"
                  >
                    <path
                      d="M20.56,137.612h0l-4.245,4.225a.812.812,0,0,1-1.146-1.152l2.85-2.836H.812a.812.812,0,0,1,0-1.625H18.018l-2.85-2.836a.812.812,0,0,1,1.146-1.152l4.245,4.225h0A.813.813,0,0,1,20.56,137.612Z"
                      transform="translate(0 -132)"
                      fill="#fdec07"
                    />
                  </svg>
                </div>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
