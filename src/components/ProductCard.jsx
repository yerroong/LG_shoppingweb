import React from "react";
import { Link } from "react-router-dom";
import { formatCurrency } from "@/utils/features";

const ProductCard = ({ data }) => {
  return (
    <div
      style={{
        border: "1px solid #ddd",
        borderRadius: "8px",
        padding: "16px",
        textAlign: "center",
        cursor: "pointer",
      }}
    >
      <div
        style={{
          width: "100%",
          height: "200px",
          backgroundColor: "#f0f0f0",
          marginBottom: "12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "4px",
        }}
      >
        이미지 영역
        {/* <img src={`/public/img/${data.img}`}></img> */}
      </div>
      <h4 style={{ margin: "8px 0 " }}>{data.title}</h4>
      <p style={{ fontSize: "18px", fontWeight: "bold", color: "#e74c3c" }}>
        {formatCurrency(data.price)}
      </p>
      <p>할인율 : {data.discount}%</p>
      <Link
        to={`/detail/${data.id}`}
        style={{
          display: "inline-block",
          marginTop: "12px",
          padding: "8px 16px",
          backgroundColor: "#3498db",
          color: "white",
          textDecoration: "none",
          borderRadius: "4px",
        }}
      >
        상세보기
      </Link>
    </div>
  );
};

export default ProductCard;
