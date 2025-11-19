import axios from "axios";

// 모든 상품 데이터 가져오기 (쿼리 파라미터 지원)
export const getProductsData = async (query = "") => {
  try {
    const res = await axios.get(`/api/products/?${query}`);
    return res.data;
  } catch (err) {
    console.log("productApi.js : getProductsData -err", err);
    return [];
  }
};

// 특정 상품 ID로 상품 정보 가져오기
export const getProductsById = async (id) => {
  try {
    const res = await axios.get(`/api/products/${id}`);
    return res.data;
  } catch (err) {
    console.log("productApi.js : getProductsById -err", err);
    return null;
  }
};

// 카테고리별 상품 가져오기
export const getProductsByCategory = async (category, limit = 10) => {
  try {
    const res = await axios.get(`/api/products/`, {
      params: {
        category,
        _limit: limit,
      },
    });
    return res.data;
  } catch (err) {
    console.log("productApi.js : getProductsByCategory -err", err);
    return [];
  }
};
