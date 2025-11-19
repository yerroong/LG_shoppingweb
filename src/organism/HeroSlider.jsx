import React, { useState, useEffect } from "react";
import { getBannerData } from "@/api/bannerApi";

const HeroSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [banners, setBanners] = useState([]);
  const [loading, setLoading] = useState(true);

  // 배너 데이터 가져오기
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const data = await getBannerData();
        setBanners(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchBanners();
  }, []);

  // 자동 슬라이드
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [banners.length]);

  if (loading || banners.length === 0) {
    return (
      <section
        style={{
          height: "400px",
          backgroundColor: "#3498db",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white",
        }}
      >
        <p>로딩 중...</p>
      </section>
    );
  }

  return (
    <section
      style={{
        position: "relative",
        height: "400px",
        backgroundColor: "#3498db",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        overflow: "hidden",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <h2 style={{ fontSize: "48px", marginBottom: "20px" }}>
          {banners[currentIndex].title}
        </h2>
        {/* <img src={banners[currentIndex].img}></img> */}
        <p style={{ fontSize: "24px" }}>{banners[currentIndex].description}</p>
      </div>

      {/* 인디케이터 */}
      <div
        style={{
          position: "absolute",
          bottom: "20px",
          display: "flex",
          gap: "10px",
        }}
      >
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            style={{
              width: "12px",
              height: "12px",
              borderRadius: " 50%",
              border: "none",
              backgroundColor:
                currentIndex === index ? "white" : "rgba(255,255,255,0.5)",
              cursor: "pointer",
            }}
          ></button>
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
