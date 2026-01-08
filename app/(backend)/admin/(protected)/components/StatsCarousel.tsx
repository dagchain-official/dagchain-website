"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const stats = [
  { label: "Total Pages", value: 500 },
  { label: "Draft Pages", value: 120 },
  { label: "Live Pages", value: 300 },
  { label: "Paused Pages", value: 80 },
];

export default function StatsCarousel() {
  return (
    <Swiper slidesPerView={4} spaceBetween={15}>
      {stats.map((s) => (
        <SwiperSlide key={s.label}>
          <div className="item">
            <div className="b_text">{s.value}</div>
            <p>{s.label}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
