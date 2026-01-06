import type { Metadata } from "next";
import Script from "next/script";

import "bootstrap/dist/css/bootstrap.min.css";
import "@/public/admin/css/common.css";

export const metadata: Metadata = {
  title: "Dagchain - Dashboard",
  icons: {
    icon: "/admin/images/favicon.png",
  },
};

export default function BackendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap"
        rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@100..900&display=swap" rel="stylesheet" />
      <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap"
        rel="stylesheet" />
    
      { children }

      {/* ================= SCRIPTS (CLIENT ONLY) ================= */}
      <Script
        src="/admin/js/jquery-3.4.1.min.js"
        strategy="beforeInteractive"
      />

      <Script
        src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.bundle.min.js"
        strategy="afterInteractive"
      />

      {/* 3️⃣ jQuery Plugins */}
      <Script
        src="/admin/js/owl.carousel.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/semantic.min.js"
        strategy="afterInteractive"
      />
      <Script
        src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min.js"
        strategy="afterInteractive"
      />

      {/* 4️⃣ Your custom JS (LAST) */}
      <Script
        src="/admin/js/custom.js"
        strategy="afterInteractive"
      />
    </>
  );
}
