"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";

export default function AdminHeader() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.replace("/admin/login");
    location.reload();
  }

  return (
    <div className="header fixed_header">
      <div className="roundbtn_wrap">
        <div className="roundbtn open_menusect">
          <div className="center">
            <span />
            <span />
            <span />
          </div>
        </div>
        <strong className="page_title">Dashboard</strong>
      </div>

      <div className="right_header">
        <div className="dropdown user">
          <button type="button" className="dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
            <div className="userimg">
              <Image
                src="/admin/images/header/logo_sm.png"
                alt="User"
                width={15}
                height={15}
                className="mw_15"
              />
            </div>
          </button>
          <div className="dropdown-menu mycommon_dropdown">
            <div className="user_settings">
              <ul>
                <li className="logout">
                  <a href="#" onClick={handleLogout}>
                    <img src="/admin/images/header/icon_logout.svg" alt="Logout icon" />
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}