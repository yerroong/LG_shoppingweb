import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import { formatCurrency } from "@/utils/features";
import { updateCartItemCount, removeFromCart } from "@/api/cartApi";

const CartPage = () => {
  const cartList = useLoaderData();
  const [items, setItems] = useState(Array.isArray(cartList) ? cartList : []);

  // 총 수량 계산
  const totalCount = items.reduce((sum, item) => sum + item.count, 0);

  // 총 금액 계산
  const totalSum = items.reduce(
    (sum, item) =>
      sum +
      Math.round(item.price * item.count * (1 - (item.discount || 0) / 100)),
    0
  );

  // 수량 증가
  const increase = (id) => {
    const currentItem = items.find((item) => item.id === id);
    if (!currentItem) return;

    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, count: item.count + 1 } : item
      )
    );
    const newCount = currentItem.count + 1;
    updateCartItemCount(id, newCount).catch((err) => console.log("err", err));
  };

  // 수량 감소
  const decrease = (id) => {
    const currentItem = items.find((item) => item.id === id);
    if (!currentItem) return;

    if (currentItem.count > 1) {
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, count: item.count - 1 } : item
        )
      );
      const newCount = currentItem.count - 1;
      updateCartItemCount(id, newCount).catch((err) => console.log("err", err));
    }
  };

  // 장바구니에서 삭제
  const handleDelete = (id) => {
    if (window.confirm("정말 삭제하시겠습니까?")) {
      setItems((prev) => prev.filter((item) => item.id !== id));
      removeFromCart(id).catch((err) => console.log("err", err));
    }
  };

  return (
    <main style={{ padding: "40px", maxWidth: "1200px", margin: "0 auto" }}>
      <h2 style={{ marginBottom: "30px" }}>My Cart</h2>
      {items.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px" }}>
          <p style={{ fontSize: "24px", marginBottom: "20px" }}>
            장바구니가 비었습니다.{" "}
          </p>
          <p style={{ fontSize: "18px" }}>신상품이나 인기상품을 찾아보세요. </p>
        </div>
      ) : (
        <>
          <p style={{ marginBottom: "20px" }}>
            장바구니 리스트는 <strong>{items.length}</strong> 개 이고 , 총 상품
            갯수는<strong>{totalCount}</strong> 개 입니다.
          </p>

          {/* 장바구니 아이템 리스트 */}
          <div style={{ marginBottom: "40px" }}>
            {items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: "grid",
                  gridTemplateColumns: "100px 2fr 1fr 150px 1fr 50px",
                  gap: "20px",
                  alignItems: "center",
                  padding: "20px",
                  borderBottom: "1px solid #ddd",
                }}
              >
                {/* 이미지 */}
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "4px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  이미지
                </div>

                {/* 상품명 */}
                <div>
                  <strong>{item.title}</strong>
                </div>

                {/* 가격 */}
                <div>{formatCurrency(item.price)}</div>

                {/* 수량 조절 */}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                  }}
                >
                  <button
                    onClick={() => decrease(item.id)}
                    style={{
                      padding: "4px 12px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    -
                  </button>
                  <span style={{ minWidth: "40px", textAlign: "center" }}>
                    {item.count}
                  </span>
                  <button
                    onClick={() => increase(item.id)}
                    style={{
                      padding: "4px 12px",
                      border: "1px solid #ddd",
                      borderRadius: "4px",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </div>

                {/* 소계 */}
                <div style={{ fontWeight: "bold" }}>
                  {formatCurrency(
                    Math.round(
                      item.price * item.count * (1 - (item.discount || 0) / 100)
                    )
                  )}
                </div>

                {/* 삭제 버튼 */}
                <button
                  onClick={() => handleDelete(item.id)}
                  style={{
                    padding: "8px",
                    border: "none",
                    backgroundColor: "transparent",
                    cursor: "pointer",
                    fontSize: "20px",
                  }}
                >
                  X
                </button>
              </div>
            ))}
          </div>
          {/* 총 금액 */}
          <div
            style={{
              padding: "20px",
              backgroundColor: "#f5f5f5",
              borderRadius: "8px",
              textAlign: "right",
            }}
          >
            <p style={{ fontSize: "20px", marginBottom: "10px" }}>
              총금액 : <strong>{formatCurrency(totalSum)}</strong>
            </p>
          </div>
        </>
      )}
    </main>
  );
};

export default CartPage;
