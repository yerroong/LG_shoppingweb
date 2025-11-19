import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { formatCurrency } from "@/utils/features";
import DetailTabInfo from "@/organism/DetailTabInfo";
import SimilarProducts from "@/organism/SimilarProducts";
import Modal from "@/components/Modal";

const DetailPage = () => {
  const { product, filteredRelatedProducts } = useLoaderData();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [count, setCount] = useState(1);

  if (!product) {
    return (
      <main style={{ padding: "40px", textAlign: "center" }}>
        <p>상품을 찾을 수 없습니다.</p>
      </main>
    );
  }

  const decrease = () => {
    setCount((prev) => (prev > 1 ? prev - 1 : 1));
  };
  const increase = () => {
    setCount((prev) => prev + 1);
  };

  const handleAddToCart = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <main>
      {/* 상품 상세 정보 */}
      <div
        style={{
          display: "flex",
          gap: "40px",
          padding: "40px",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        {/* 상품 이미지 */}
        <div style={{ flex: "0 0 400px" }}>
          <div
            style={{
              width: "100%",
              height: "400px",
              backgroundColor: "#f0f0f0",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "8px",
              marginBottom: "16px",
            }}
          >
            상품 이미지
          </div>
          {product.discount > 0 && (
            <span
              style={{
                display: "inline-block",
                padding: "4px 12px",
                backgroundColor: "#e74c3c",
                color: "white",
                borderRadius: "4px",
              }}
            >
              {product.discount}% 할인
            </span>
          )}
        </div>
        {/* 상품 정보 */}
        <div style={{ flex: "1" }}>
          <h2 style={{ fontSize: "32px", marginBottom: "16px" }}>
            {product.title}
          </h2>
          <p
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              color: "#e74c3c",
              marginBottom: "16px",
            }}
          >
            {formatCurrency(product.price)}
          </p>
          <p style={{ marginBottom: "24px" }}>카테고리 : {product.category}</p>
        </div>
      </div>
    </main>
  );
};

export default DetailPage;
