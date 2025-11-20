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

          {/* 수량 선택 및 장바구니 버튼 */}
          <div
            style={{
              display: "flex",
              gap: "16px",
              alignItems: "center",
              marginBottom: "40px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                border: "1px solid #ddd",
                borderRadius: "4px",
              }}
            >
              <button
                onClick={decrease}
                style={{
                  padding: "8px 16px ",
                  border: "none",
                  backgroundColor: "#f5f5f5",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                -
              </button>
              <span
                style={{
                  padding: " 8px 24px",
                  minWidth: "60px",
                  textAlign: "center",
                }}
              >
                {count}
              </span>
              <button
                onClick={increase}
                style={{
                  padding: "8px 16px ",
                  border: "none",
                  backgroundColor: "#f5f5f5",
                  cursor: "pointer",
                  fontSize: "18px",
                }}
              >
                +
              </button>
            </div>
            <button
              onClick={handleAddToCart}
              style={{
                padding: "12px 32px",
                backgroundColor: "#3498db",
                color: "white",
                border: "none",
                borderRadius: "4px",
                fontSize: "16px",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              장바구니 담기
            </button>
          </div>
        </div>
      </div>
      {/* 탭 정보 */}
      <DetailTabInfo />

      {/* 유사 상품 */}
      <SimilarProducts relatedProducts={filteredRelatedProducts} />

      {/* 모달 */}
      {isModalOpen && (
        <Modal product={product} count={count} onClose={closeModal} />
      )}
    </main>
  );
};

export default DetailPage;
