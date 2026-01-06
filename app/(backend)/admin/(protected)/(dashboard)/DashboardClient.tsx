"use client";

import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "@/public/admin/css/styles/dashboard.css";
import StatsCarousel from "../components/StatsCarousel";

export default function DashboardClient() {
  const lineChartRef = useRef<Chart | null>(null);

  useEffect(() => {
    /* ---------------- LINE CHART ---------------- */
    const canvas = document.getElementById(
      "myChart1"
    ) as HTMLCanvasElement | null;

    if (!canvas) return;

    if (lineChartRef.current) {
      lineChartRef.current.destroy();
    }

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

  return (
    <>
      <div className="page_wrap">
        {/* PAGE CONTENT ONLY — header + sidebar are in layout */}
        <div className="custom_container">
          {/* Breadcrumb */}
          <div className="custom_breadcrumb">
            <ul>
              <li><a>Dashboard</a></li>
            </ul>
          </div>

          {/* Welcome */}
          <div className="wlcm_row">
            <div className="lftcol">
              <div className="imgbox">
                <img
                  src="/admin/images/menu/logo_sm.png"
                  className="mw_25"
                  alt=""
                />
              </div>
              <h2>
                Good Morning,{" "}
                <span className="bluetext fw_600">Creators!</span>
              </h2>
            </div>

            <div className="rgtcol">
              <ul className="nav nav-pills">
                <li className="nav-item">
                  <a className="nav-link active">Day</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">Week</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link">Month</a>
                </li>
              </ul>
            </div>
          </div>

          {/* KPI CARDS (static for now) */}
          <div className="fullrow_one">
            <StatsCarousel />
          </div>

          {/* TABLE + CHART */}
          <div className="fullrow_two">
            <div className="lftcol">
              <div className="c_whitebox performing_articles">
                <div className="top_commonrow">
                  <h3>Total Pages Created</h3>
                  <div className="rbox">
                    <a className="viewall">View All &gt;</a>
                  </div>
                </div>

                <div className="tablewrap customscroll">
                  <div className="customtable">
                    {[1, 2, 3, 4].map((i) => (
                      <div className="fullrow" key={i}>
                        <div className="nbox">
                          <h4 className="btext">
                            India’s Number One Blockchain – DagChain
                          </h4>
                          <span className="ctext date">
                            <img
                              src="/admin/images/dashboard/icon_calendar.svg"
                              alt=""
                            />
                            Tuesday , 16th Dec 2025
                          </span>
                        </div>

                        <div className="rbox">
                          <strong className="btext bluetext fw_600">
                            48,900
                          </strong>
                          <span className="ctext">Total Views</span>
                        </div>

                        <div className="stbox">
                          <div className="btntype">Live</div>
                        </div>

                        <div className="indbox">
                          <strong className="btext fw_600">
                            Indexed
                          </strong>
                        </div>

                        <div className="action_box">
                          <a className="view">
                            <img
                              src="/admin/images/dashboard/icon_eye.svg"
                              alt=""
                            />
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* TRENDING TOPICS */}
            <div className="rgtcol">
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
