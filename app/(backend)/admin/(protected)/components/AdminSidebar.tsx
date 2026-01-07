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
          </ul>
        </div>
      </div>
    </div>
  );
}