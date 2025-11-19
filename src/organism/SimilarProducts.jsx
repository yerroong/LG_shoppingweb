import React from "react";
import ProductCard from "@/components/ProductCard";

const SimilarProducts = ({ relatedProducts }) => {
  if (!relatedProducts || relatedProducts.length === 0) {
    return null;
  }

  return (
    <div style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h3 style={{ marginBottom: "20px" }}>유사 상품 추천</h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))",
          gap: "20px",
        }}
      >
        {relatedProducts.slice(0, 5).map((product) => (
          <ProductCard key={product.id} data={product} />
        ))}
      </div>
    </div>
  );
};

export default SimilarProducts;
