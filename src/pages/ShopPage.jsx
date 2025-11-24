import React, { useState } from "react";
import { useLoaderData, useNavigate, useSearchParams } from "react-router-dom";
import ProductCard from "@/components/ProductCard";
import Pagination from "@/components/Pagination";
import CategoryButton from "@/components/CategoryButton";
import SortItem from "@/components/SortItem";
import css from "./ShopPage.module.css";

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
    <main>
      <section className={css.shopPage}>
        <h2>Shop Page</h2>

        {/* 필터(카테고리) 및 정렬 영역 */}
        <div className={css.searchFn}>
          {/* 카테고리 버튼 */}
          <div className={css.category}>
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
          <div className={`${css.sort} ${isDown ? css.active : ""}`}>
            <button
              onClick={() => setIsDown(!isDown)}
              className={css.sortHeader}
            >
              {getSortText()}
              <i>{isDown ? "▲" : "▼"}</i>
            </button>
            {isDown && (
              <ul>
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
        <div className={css.productList}>
          {data.length === 0 ? (
            <p>상품이 없습니다.</p>
          ) : (
            <>
              <div className={css.list}>
                {data.map((product) => (
                  <ProductCard key={product.id} data={product}></ProductCard>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
      <Pagination initProductsData={initProductsData}></Pagination>
    </main>
  );
};

export default ShopPage;
