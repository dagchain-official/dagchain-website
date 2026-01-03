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
        <div className="dropdown search">
          <button type="button" className="dropdown-toggle common_btn" data-bs-toggle="dropdown"
            aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 13.227 13.231">
              <g id="layer1" transform="translate(-0.514 -291.161)">
                <path id="circle2017"
                  d="M6.446,291.161a5.935,5.935,0,1,0,3.7,10.567l2.471,2.47a.661.661,0,1,0,.935-.934l-2.471-2.471a5.925,5.925,0,0,0-4.63-9.633Zm0,1.319a4.616,4.616,0,1,1-4.614,4.614,4.6,4.6,0,0,1,4.614-4.614Z" />
              </g>
            </svg>
          </button>
          <div className="dropdown-menu mycommon_dropdown">
            <input type="text" className="input" placeholder="Search..." />
          </div>
        </div>
        <div className="dropdown notification">
          <button type="button" className="dropdown-toggle common_btn" data-bs-toggle="dropdown"
            aria-expanded="false">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="14" viewBox="0 0 13 14.028">
              <g id="_39-Notification" data-name="39-Notification" transform="translate(-3.02 -2)">
                <path id="Path_27" data-name="Path 27"
                  d="M15.82,12.257a8.281,8.281,0,0,0-.5-.766A4.63,4.63,0,0,1,14.4,9.554L14.193,6.6C14.068,4.313,12.731,2,10.073,2H8.962c-2.658,0-4,2.313-4.14,4.6l-.21,2.958A4.7,4.7,0,0,1,3.7,11.511c-.17.26-.34.5-.456.726a1.111,1.111,0,0,0-.1,1.166,1.2,1.2,0,0,0,1.1.611H8.106a1.5,1.5,0,1,0,2.823,0h3.864a1.2,1.2,0,0,0,1.1-.631,1.071,1.071,0,0,0-.075-1.126Zm-5.8,2.258a.5.5,0,1,1-.5-.5A.5.5,0,0,1,10.018,14.514Zm5.006-1.587c0,.04-.085.085-.21.085H4.241c-.125,0-.19-.045-.21-.085s0-.1.05-.175c.135-.23.29-.471.451-.711A5.252,5.252,0,0,0,5.608,9.624l.215-2.958C5.928,4.973,6.814,3,8.962,3h1.111c2.147,0,3.033,1.972,3.139,3.669l.215,2.953a5.092,5.092,0,0,0,1.1,2.418c.16.24.315.5.476.756A.125.125,0,0,1,15.024,12.928Z"
                  transform="translate(0 0)" />
              </g>
            </svg>
            <span className="count">05</span>
          </button>
          <div className="dropdown-menu dropdown-user">
            <div className="dropdown-user-scroll scrollbar-outer">
              <li>
                <div className="tt1"><span>Nachiket Shah</span> invited you to join</div>
                <div className="tt2">My Team</div>
                <div className="btn-sect">
                  <a href="#" className="accept"><img src="/admin/images/common-images/icon_check_green.svg" width={15} alt="Accept" /> Accept</a>
                  <a href="#" className="decline"><img src="/admin/images/common-images/icon_delete_round.svg" width={15} alt="Decline" /> Decline</a>
                </div>
              </li>
              <li>
                <div className="tt1"><span>Nachiket Shah</span> invited you to join</div>
                <div className="tt2">My Team</div>
                <div className="btn-sect">
                  <a href="#" className="accept"><img src="/admin/images/common-images/icon_check_green.svg" width={15} alt="Accept" /> Accept</a>
                  <a href="#" className="decline"><img src="/admin/images/common-images/icon_delete_round.svg" width={15} alt="Decline" /> Decline</a>
                </div>
              </li>
              <li>
                <div className="tt1"><span>Nachiket Shah</span> invited you to join</div>
                <div className="tt2">My Team</div>
                <div className="btn-sect">
                  <a href="#" className="accept"><img src="/admin/images/common-images/icon_check_green.svg" width={15} alt="Accept" /> Accept</a>
                  <a href="#" className="decline"><img src="/admin/images/common-images/icon_delete_round.svg" width={15} alt="Decline" /> Decline</a>
                </div>
              </li>
            </div>
          </div>
        </div>
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
                <li>
                  <a href="#">
                    <img src="/admin/images/header/icon_profile.svg" alt="Profile icon" />
                    My Profile
                  </a>
                </li>
                <li>
                  <a href="#">
                    <img src="/admin/images/header/icon_setting.svg" alt="Settings icon" />
                    Account Settings
                  </a>
                </li>
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