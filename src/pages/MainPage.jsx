import React, { useEffect, useState } from "react";
import ProductCard from "@/components/ProductCard";
import HeroSlider from "@/organism/HeroSlider";
import { getProductsData } from "@/api/productsApi";

const MainPage = () => {
  // 더미 상품 데이터 (나중에 API로 교체)
  // const dummyProducts = [
  //   { id: 1, title: "14/18K 스타피쉬 헤어핀", price: 206584 },
  //   { id: 2, title: "14/18K 심플 진주 반지", price: 13552254 },
  //   { id: 3, title: "14/18K 데일리 볼귀걸이", price: 355241 },
  //   { id: 4, title: "14/18K 심플반지", price: 20654 },
  //   { id: 5, title: "14/18K 볼귀걸이", price: 26584 },
  //   { id: 6, title: "14/18K 헤어핀", price: 205684 },
  // ];

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        // 'new'  카테고리 상품 6개 가져오기
        const data = await getProductsData();
        setProducts(data);
        setLoading(false);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  if (loading) {
    return (
      <main style={{ padding: "40px", textAlign: "center" }}>
        <p>로딩 중...</p>
      </main>
    );
  }

  return (
    <main style={{ padding: "40px", textAlign: "center" }}>
      {/* 배너 슬라이드 */}
      <HeroSlider />

      {/* 상품 리스트 */}
      <section style={{ padding: "40px" }}>
        <h3 style={{ marginBottom: "20px", textAlign: "center" }}>신상품 </h3>
        {products.length === 0 ? (
          <p style={{ textAlign: "center" }}>상품이 없습니다.</p>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(250px,1fr))",
              gap: "20px",
              maxWidth: "1200px",
              margin: "0 auto",
            }}
          >
            {products.map((product) => (
              <ProductCard key={product.id} data={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default MainPage;
