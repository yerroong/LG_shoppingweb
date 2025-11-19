import React, { useState } from "react";

const DetailTabInfo = () => {
  const [activeTab, setActive] = useState(0);
  const tabTitles = ["상품정보", "리뷰", "배송/교환/반품"];

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "1200px",
        margin: "0 auto",
      }}
    >
      <div
        style={{ display: "flex", gap: "8px", borderBottom: "1px solid #ddd" }}
      >
        {tabTitles.map((title, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              padding: "12px 24px",
              border: "none",
              borderBottom: activeTab === i ? "2px solid #3498db" : "none",
              backgroundColor: "transparent",
              cursor: "pointer",
              fontWeight: activeTab === i ? "bold" : "normal",
            }}
          >
            {title}
          </button>
        ))}
      </div>
      <div style={{ padding: "20px 0" }}>
        {activeTab === 0 && (
          <div>
            <h3>상품 정보</h3>
            <p>상품의 자세한 정보가 여기에 표시됩니다.</p>
          </div>
        )}
        {activeTab === 1 && (
          <div>
            <h3>리뷰</h3>
            <p>고객 리뷰가 여기에 표시됩니다.</p>
          </div>
        )}
        {activeTab === 2 && (
          <div>
            <h3>배송/교환/반품 안내</h3>
            <p>배송 및 교환/반품 안내입니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DetailTabInfo;
