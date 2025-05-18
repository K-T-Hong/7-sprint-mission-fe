const PRODUCT_URL = "https://sprint-mission-api.vercel.app/products";

// 상품 목록 가져오기
export async function getProductList(page, pageSize, keyword) {
  const url = PRODUCT_URL + "?page=" + page + "&pageSize=" + pageSize + "&keyword=" + keyword;

  try {
    const res = await fetch(url);
    if (!res.ok) {
      console.log("상품 리스트 불러오기 실패", res.status);
      throw new Error("불러오기 실패");
    }
    const data = await res.json();
    return data;
  } catch (e) {
    console.log("getProductList error", e);
  }
}

// 상품 하나 보기
export async function getProduct(id) {
  try {
    const res = await fetch(PRODUCT_URL + "/" + id);
    if (!res.ok) {
      console.log("상세보기 실패", res.status);
      throw new Error("상세 실패");
    }
    return await res.json();
  } catch (e) {
    console.log("getProduct error", e);
  }
}

// 상품 등록하기
export async function createProduct(product) {
  try {
    const res = await fetch(PRODUCT_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(product)
    });

    if (!res.ok) {
      console.log("상품 등록 실패", res.status);
      throw new Error("등록 실패");
    }

    return await res.json();
  } catch (err) {
    console.log("createProduct error", err);
  }
}

// 상품 수정하기
export async function patchProduct(id, update) {
  try {
    const res = await fetch(PRODUCT_URL + "/" + id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(update)
    });

    if (!res.ok) {
      console.log("상품 수정 실패", res.status);
      throw new Error("수정 실패");
    }

    return await res.json();
  } catch (e) {
    console.log("patchProduct error", e);
  }
}

// 상품 삭제
export async function deleteProduct(id) {
  try {
    const res = await fetch(PRODUCT_URL + "/" + id, {
      method: "DELETE"
    });

    if (!res.ok) {
      console.log("삭제 실패", res.status);
      throw new Error("삭제 실패");
    }

    return await res.json();
  } catch (e) {
    console.log("deleteProduct error", e);
  }
}