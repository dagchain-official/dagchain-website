"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

export default function AdminSidebar() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    if (!pathname) return false;
    return pathname === path;
  };

  const isSectionActive = (paths: string[]) =>
    paths.some((p) => isActive(p));

  return (
    <div className="dashboard_menu">
      <span className="close_menu d-none">
        <svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 17.661 17.661">
          <g id="Group_37987" data-name="Group 37987" transform="translate(-45.732 -22.732)">
            <line id="Line_14" data-name="Line 14" x1="14.125" y2="14.125" transform="translate(47.5 24.5)"
              fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2.5" />
            <line id="Line_15" data-name="Line 15" x2="14.125" y2="14.125" transform="translate(47.5 24.5)"
              fill="none" stroke="#fff" strokeLinecap="round" strokeWidth="2.5" />
          </g>
        </svg>
      </span>
      <div className="menu_toprow open_dashboard_menu">
        <div className="menu_logo">
          <Link href="/">
            <Image
              src="/admin/images/menu/logo_sm.png"
              alt="Logo"
              width={40}
              height={40}
              className="sm_logo"
            />
            <Image
              src="/admin/images/menu/logo_big.png"
              alt="Logo"
              width={150}
              height={40}
              className="big_logo"
            />
          </Link>
        </div>
      </div>
      <div className="menu_btmrow open_dashboard_menu customscroll">
        <div className="menu_links top_menu">
          <ul>
          <li>
              <div className="main_heading">
                <a href="#" className={`menu-toggle ${isSectionActive([
                  "/admin/webpages",
                  "/admin/webpages/new",
                ])
                    ? "active"
                    : ""
                  }`}>
                  <div className="menu_icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13"
                      viewBox="0 0 14.791 13.312">
                      <g id="Group_61283" data-name="Group 61283" transform="translate(0 -0.332)">
                        <path id="Path_153746" data-name="Path 153746"
                          d="M12.942.332H1.849A1.851,1.851,0,0,0,0,2.181V11.8a1.851,1.851,0,0,0,1.849,1.849H12.942A1.851,1.851,0,0,0,14.791,11.8V2.181A1.851,1.851,0,0,0,12.942.332Zm-11.093.74H12.942a1.11,1.11,0,0,1,1.109,1.109v.37H.74v-.37A1.111,1.111,0,0,1,1.849,1.072ZM12.942,12.9H1.849A1.111,1.111,0,0,1,.74,11.8V3.29H14.051v8.5A1.111,1.111,0,0,1,12.942,12.9Zm0,0"
                          fill="#acacac" />
                        <path id="Path_153747" data-name="Path 153747"
                          d="M67.328,128.332H64.37a.37.37,0,0,0-.37.37v5.916a.369.369,0,0,0,.37.37h2.958a.37.37,0,0,0,.37-.37V128.7a.37.37,0,0,0-.37-.37Zm-.37,5.916H64.74v-5.177h2.219Zm0,0"
                          transform="translate(-61.781 -123.563)" fill="#acacac" />
                        <path id="Path_153748" data-name="Path 153748"
                          d="M218.139,128.332H213.7a.37.37,0,0,0-.37.37v2.219a.37.37,0,0,0,.37.37h4.437a.37.37,0,0,0,.37-.37V128.7a.37.37,0,0,0-.37-.37Zm-.37,2.219h-3.7v-1.479h3.7Zm0,0"
                          transform="translate(-205.937 -123.563)" fill="#acacac" />
                        <path id="Path_153749" data-name="Path 153749"
                          d="M218.139,245.668H213.7a.37.37,0,1,0,0,.74h4.437a.37.37,0,1,0,0-.74Zm0,0"
                          transform="translate(-205.937 -236.831)" fill="#acacac" />
                        <path id="Path_153750" data-name="Path 153750"
                          d="M218.139,299H213.7a.37.37,0,1,0,0,.74h4.437a.37.37,0,1,0,0-.74Zm0,0"
                          transform="translate(-205.937 -288.314)" fill="#acacac" />
                      </g>
                    </svg>
                  </div>
                  <div className="menu_text">Dashboard</div>
                </a>
              </div>
              <div className="dd_menu">
                <ul>
                  <li>
                    <Link
                      href="/admin/dashboard"
                      className={isActive("/admin/dashboard") ? "active" : ""}
                    >
                      Team Stats
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
           
            <li>
              <div className="main_heading">
                <a href="#" className={`menu-toggle ${isSectionActive([
                  "/admin/webpages",
                  "/admin/webpages/new",
                ])
                    ? "active"
                    : ""
                  }`}>
                  <div className="menu_icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="13"
                      viewBox="0 0 14.791 13.312">
                      <g id="Group_61283" data-name="Group 61283" transform="translate(0 -0.332)">
                        <path id="Path_153746" data-name="Path 153746"
                          d="M12.942.332H1.849A1.851,1.851,0,0,0,0,2.181V11.8a1.851,1.851,0,0,0,1.849,1.849H12.942A1.851,1.851,0,0,0,14.791,11.8V2.181A1.851,1.851,0,0,0,12.942.332Zm-11.093.74H12.942a1.11,1.11,0,0,1,1.109,1.109v.37H.74v-.37A1.111,1.111,0,0,1,1.849,1.072ZM12.942,12.9H1.849A1.111,1.111,0,0,1,.74,11.8V3.29H14.051v8.5A1.111,1.111,0,0,1,12.942,12.9Zm0,0"
                          fill="#acacac" />
                        <path id="Path_153747" data-name="Path 153747"
                          d="M67.328,128.332H64.37a.37.37,0,0,0-.37.37v5.916a.369.369,0,0,0,.37.37h2.958a.37.37,0,0,0,.37-.37V128.7a.37.37,0,0,0-.37-.37Zm-.37,5.916H64.74v-5.177h2.219Zm0,0"
                          transform="translate(-61.781 -123.563)" fill="#acacac" />
                        <path id="Path_153748" data-name="Path 153748"
                          d="M218.139,128.332H213.7a.37.37,0,0,0-.37.37v2.219a.37.37,0,0,0,.37.37h4.437a.37.37,0,0,0,.37-.37V128.7a.37.37,0,0,0-.37-.37Zm-.37,2.219h-3.7v-1.479h3.7Zm0,0"
                          transform="translate(-205.937 -123.563)" fill="#acacac" />
                        <path id="Path_153749" data-name="Path 153749"
                          d="M218.139,245.668H213.7a.37.37,0,1,0,0,.74h4.437a.37.37,0,1,0,0-.74Zm0,0"
                          transform="translate(-205.937 -236.831)" fill="#acacac" />
                        <path id="Path_153750" data-name="Path 153750"
                          d="M218.139,299H213.7a.37.37,0,1,0,0,.74h4.437a.37.37,0,1,0,0-.74Zm0,0"
                          transform="translate(-205.937 -288.314)" fill="#acacac" />
                      </g>
                    </svg>
                  </div>
                  <div className="menu_text">Dynamic Webpage</div>
                </a>
              </div>
              <div className="dd_menu">
                <ul>
                  <li>
                    <Link
                      href="/admin/webpages/new"
                      className={isActive("/admin/webpages/new") ? "active" : ""}
                    >
                      Create Webpage
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/webpages"
                      className={isActive("/admin/webpages") ? "active" : ""}
                    >
                      All Webpages
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <div className="main_heading">
                <a href="#" className={`menu-toggle ${isSectionActive([
                  "/admin/product-knowledge",
                  "/admin/product-knowledge/new",
                ])}`}>
                  <div className="menu_icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="16"
                      viewBox="0 0 19.33 16.309">
                      <g id="Group_61284" data-name="Group 61284" transform="translate(0 -40.006)">
                        <path id="Path_153751" data-name="Path 153751"
                          d="M17.631,44.574H11.364V41.7a1.7,1.7,0,0,0-1.7-1.7H1.7A1.7,1.7,0,0,0,0,41.7v6.833a1.7,1.7,0,0,0,1.7,1.7h.849l.963,1.284a.567.567,0,0,0,.906,0l.963-1.284H7.966v2.869a1.7,1.7,0,0,0,1.7,1.7H13.95l.963,1.284a.567.567,0,0,0,.906,0l.963-1.284h.85a1.7,1.7,0,0,0,1.7-1.7V46.273A1.7,1.7,0,0,0,17.631,44.574ZM5.1,49.1a.566.566,0,0,0-.453.227l-.68.906-.68-.906a.566.566,0,0,0-.453-.227H1.7a.567.567,0,0,1-.566-.566V41.7a.567.567,0,0,1,.566-.566H9.665a.567.567,0,0,1,.566.566v6.833a.567.567,0,0,1-.566.566Zm13.1,4a.567.567,0,0,1-.566.566H16.5a.566.566,0,0,0-.453.227l-.68.906-.68-.906a.566.566,0,0,0-.453-.227H9.665a.567.567,0,0,1-.566-.566V50.237h.566a1.7,1.7,0,0,0,1.7-1.7V45.706h6.267a.567.567,0,0,1,.566.566Z"
                          fill="#acacac" />
                        <path id="Path_153752" data-name="Path 153752"
                          d="M308.708,230.129a.654.654,0,0,0-1.216-.014l-1.459,3.831a.566.566,0,1,0,1.058.4l.223-.586h1.555l.221.585a.566.566,0,1,0,1.06-.4Zm-.963,2.5.35-.918.347.918Z"
                          transform="translate(-294.442 -182.54)" fill="#acacac" />
                        <path id="Path_153753" data-name="Path 153753"
                          d="M88.644,113.016a2.509,2.509,0,1,0-.794.808l.21.21a.566.566,0,0,0,.8-.8Zm-3.506-1.3a1.37,1.37,0,1,1,2.661.459l-.178-.178a.566.566,0,0,0-.8.8l.192.192A1.371,1.371,0,0,1,85.139,111.712Z"
                          transform="translate(-80.835 -66.59)" fill="#acacac" />
                      </g>
                    </svg>
                  </div>
                  <div className="menu_text">Product Knowledge</div>
                </a>
              </div>
              <div className="dd_menu">
                <ul>
                  <li>
                    <Link
                      href="/admin/product-knowledge/new"
                      className={isActive("/admin/product-knowledge/new") ? "active" : ""}
                    >
                      Create Product Knowledge
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="/admin/product-knowledge"
                      className={isActive("/admin/product-knowledge") ? "active" : ""}
                    >
                      All Product Knowledges
                    </Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}