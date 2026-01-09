"use client";

import { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "@/public/admin/css/styles/dashboard.css";
import StatsCarousel from "../components/StatsCarousel";

type DashboardRow = {
  email: string;
  webpageCount: number;
  knowledgeCount: number;
  webpageUrls: string[];
  knowledgeUrls: string[];
};

export default function DashboardClient() {
  const [data, setData] = useState<DashboardRow[]>([]);
  const [loading, setLoading] = useState(true);
  const lineChartRef = useRef<Chart | null>(null);

  useEffect(() => {
    fetch("/api/webpages/dashboard")
      .then((res) => res.json())
      .then((res) => {
        if (res.success) setData(res.data);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const canvas = document.getElementById(
      "myChart1"
    ) as HTMLCanvasElement | null;

    if (!canvas) return;

    if (lineChartRef.current) lineChartRef.current.destroy();

    lineChartRef.current = new Chart(canvas, {
      type: "line",
      data: {
        labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        datasets: [
          {
            data: [6, 3, 4, 10, 10, 9, 14],
            borderColor: "#2f5597",
            borderWidth: 1,
            tension: 0,
          },
          {
            data: [0, 5, 4, 4, 10, 11, 8],
            borderColor: "#c00000",
            borderWidth: 1,
            tension: 0,
          },
          {
            data: [12, 8, 9, 9, 3, 2, 5],
            borderColor: "#ffd966",
            borderWidth: 1,
            tension: 0,
          },
        ],
      },
      options: {
        plugins: { legend: { display: false } },
        scales: { y: { beginAtZero: true, max: 15 } },
      },
    });

    return () => {
      lineChartRef.current?.destroy();
      lineChartRef.current = null;
    };
  }, []);

  // Copy URLs to clipboard
  const copyUrls = (urls: string[], type: string) => {
    if (!urls.length) return;
    const fullUrls = urls.map((slug) => `${window.location.origin}/${slug}`);
    navigator.clipboard.writeText(fullUrls.join("\n"));
    alert(`${type} URLs copied to clipboard`);
  };

  // Download URLs as a .txt file
  const downloadUrls = (urls: string[], type: string) => {
    if (!urls.length) return;
    const fullUrls = urls.map((slug) => `${window.location.origin}/${slug}`);
    const blob = new Blob([fullUrls.join("\n")], { type: "text/plain" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${type}_URLs.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="page_wrap">
      <div className="custom_container">
        {/* Breadcrumb */}
        <div className="custom_breadcrumb">
          <ul>
            <li><a>Dashboard</a></li>
          </ul>
        </div>

        {/* TABLE + CHART */}
        <div className="fullrow_two">
          {/* Dashboard Table */}
          <div className="lftcol">
            <div className="c_whitebox performing_articles">
              <div className="top_commonrow">
                <h3>Team Dashboard</h3>
              </div>

              <div className="tablewrap customscroll">
                <div className="customtable">
                  {/* Header Row */}
                  <div className="fullrow tophead">
                    <div className="nbox btext">Email</div>
                    <div className="rbox btext"><strong>Webpages</strong></div>
                    <div className="stbox btext"><strong>Knowledge</strong></div>
                  </div>

                  {loading && (
                    <div className="fullrow">
                      <div className="centerbox">
                        <strong>Loading dashboard…</strong>
                      </div>
                    </div>
                  )}

                  {!loading && data.length === 0 && (
                    <div className="fullrow">
                      <div className="centerbox">
                        <strong>No data found</strong>
                      </div>
                    </div>
                  )}

                  {!loading &&
                    data.map((row) => (
                      <div className="fullrow" key={row.email}>
                        <div className="nbox">
                          <div className="btext">{row.email}</div>
                        </div>

                        <div className="rbox" style={{ flexDirection: "row", display: "flex", alignItems: "center", gap: "5px" }}>
                          <span
                            className="btext fw_400 clickable"
                            onClick={() => copyUrls(row.webpageUrls, "Webpage")}
                            title="Click to copy webpage URLs"
                          >
                            {row.webpageCount}
                          </span>
                          <img
                            src="/admin/images/create-webpage/icon_download.svg"
                            alt="Download"
                            className="ml_5 clickable"
                            style={{ cursor: "pointer", width: "16px", verticalAlign: "middle" }}
                            onClick={() => downloadUrls(row.webpageUrls, "Webpage")}
                            title="Download Webpage URLs"
                          />
                        </div>

                        <div className="stbox" style={{ flexDirection: "row",display: "flex", alignItems: "center", gap: "5px" }}>
                          <span
                            className="btext fw_400 clickable"
                            onClick={() => copyUrls(row.knowledgeUrls, "Knowledge")}
                            title="Click to copy knowledge URLs"
                          >
                            {row.knowledgeCount}
                          </span>
                          <img
                            src="/admin/images/create-webpage/icon_download.svg"
                            alt="Download"
                            className="ml_5 clickable"
                            style={{ cursor: "pointer", width: "16px", verticalAlign: "middle" }}
                            onClick={() => downloadUrls(row.knowledgeUrls, "Knowledge")}
                            title="Download Knowledge URLs"
                          />
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>

          {/* Trending Chart */}
          {/* <div className="rgtcol">
            <div className="c_whitebox trending_topic">
              <div className="top_commonrow">
                <h3>Trending Topics</h3>
              </div>

              <div className="grapharea">
                <div className="g_text">
                  <ul>
                    <li>Artificial Intelligence</li>
                    <li className="bgblue">Global Politics</li>
                    <li className="bgylw">Renewable Energy</li>
                  </ul>
                </div>

                <div className="graph">
                  <canvas id="myChart1" />
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </div>
  );
}
