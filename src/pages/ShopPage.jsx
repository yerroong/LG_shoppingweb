import React, { useState } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import CategoryButton from "@/components/CategoryButton";
import SortItem from "@/components/SortItem";

const ShopPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isDown, setIsDown] = useState(false);
  const initProductsData = useLoaderData();
  const currentCategory = searchParams.get("category");
  const sortCase = searchParams.get("_sort");

  const data = initProductsData.products.data;
  const { per_page } = initProductsData;

  const handleCategoryFilter = (category) => {
    const params = new URLSearchParams(searchParams); // 현재 파라미터 정보 유지
    params.set("_page", 1); // 페이지를 1로 초기화
    params.set("_per_page", per_page); // 페이지당 상품 수를 설정
    category ? params.set("category", category) : params.delete("category"); // 카테고리 필터링
    navigate(`/shop/?${params}`); // URL 변경
  };

  const handleSort = (sortOption) => {
    const params = new URLSearchParams(searchParams);
    params.set("_page", 1);
    params.set("_sort", sortOption);
    setIsDown(false);
    navigate(`/shop/?${params}`);
  };

  const sortTextMap = {
    id: "등록순",
    price: "낮은 가격순",
    "-price": "높은 가격순",
    discount: "낮은 할인순",
    "-discount": "높은 할인순",
  };

  const getSortText = () => {
    return sortTextMap[sortCase] || "등록순";
  };

  const sortOptions = [
    { option: "id", label: "등록순" },
    { option: "price", label: "낮은 가격순" },
    { option: "-price", label: "높은 가격순" },
    { option: "discount", label: "낮은 할인순" },
    { option: "-discount", label: "높은 할인순" },
  ];

  const categories = [
    { id: "", label: "전체상품" },
    { id: "new", label: "신상품" },
    { id: "top", label: "인기상품" },
  ];
  return (
    <main style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "30px" }}>Shop Page</h2>

      {/* 필터(카테고리) 및 정렬 영역 */}
      <div
        style={{
          marginBottom: "30px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* 카테고리 버튼 */}
        <div>
          {categories.map((cate) => (
            <CategoryButton
              key={cate.id}
              cate={cate.id}
              label={cate.label}
              handleCategoryFilter={handleCategoryFilter}
              currentCategory={
                currentCategory === null && cate.id === ""
                  ? null
                  : currentCategory
              }
            />
          ))}
        </div>

        {/* 정렬 드롭다운 */}
        <div style={{ position: "relative" }}>
          <button
            onClick={() => setIsDown(!isDown)}
            style={{
              padding: "8px 16px",
              border: "1px solid #ddd",
              borderRadius: "4px",
              cursor: "pointer",
              minWidth: "120px",
            }}
          >
            {getSortText()} {isDown ? "▲" : "▼"}
          </button>
          {isDown && (
            <ul
              style={{
                position: "absolute",
                top: "100%",
                right: 0,
                marginTop: "4px",
                border: "1px solid #ddd",
                borderRadius: "4px",
                backgroundColor: "white",
                padding: 0,
                listStyle: "none",
                zIndex: 10,
              }}
            >
              {sortOptions.map((sortOpt) => (
                <SortItem
                  key={sortOpt.option}
                  option={sortOpt.option}
                  handleSort={handleSort}
                  currentSort={sortCase}
                  label={sortOpt.label}
                />
              ))}
            </ul>
          )}
        </div>
      </div>
      {/* 상품 리스트 */}
      <div>
        {data.length === 0 ? (
          <p style={{ textAlign: "center" }}>상품이 없습니다.</p>
        ) : (
          <>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(250px,1fr))",
                gap: "20px",
              }}
            >
              {data.map((product) => (
                <ProductCard key={product.id} data={product}></ProductCard>
              ))}
            </div>
            <Pagination initProductsData={initProductsData}></Pagination>
          </>
        )}
      </div>
    </main>
  );
};

export default ShopPage;
