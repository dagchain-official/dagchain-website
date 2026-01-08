import type { ReactNode } from "react";
import Script from "next/script";

import "@/public/frontend/css/article.css";
import "@/public/frontend/css/question-answer.css";
import FrontendScripts from "./_components/FrontendScripts";


export default function FrontendLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <link rel="stylesheet" href="/admin/js/owl.carousel.min.css" />
      <link rel="stylesheet" href="/admin/js/owl.theme.default.min.css" />
      <link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet" />
      {/* ---------------- PAGE CONTENT ---------------- */}
      {children}

      {/* ---------------- SCRIPTS ---------------- */}
      <Script
        src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.0/jquery.min.js"
        strategy="beforeInteractive"
      />

      <Script
        src="/frontend/js/owl.carousel.js"
        strategy="afterInteractive"
      />

      <Script
        src="/frontend/js/waypoints.min.js"
        strategy="afterInteractive"
      />

      <Script
        src="/frontend/js/jquery.counterup.min.js"
        strategy="afterInteractive"
      />

      <Script
        src="https://unpkg.com/aos@2.3.1/dist/aos.js"
        strategy="afterInteractive"
      />

      <FrontendScripts />
    </>
  );
}
