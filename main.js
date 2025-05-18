import {
  getArticleList,
  getArticle,
  createArticle,
  patchArticle,
  deleteArticle
} from "./article.js";

import {
  getProductList,
  getProduct,
  createProduct,
  patchProduct,
  deleteProduct
} from "./product.js";

// 전역 변수로 생성된 ID 저장
let articleId = null;
let productId = null;

// 글 테스트
function testArticle() {
  // 글 목록 보기
  getArticleList(1, 5, "").then((list) => {
    console.log("글 목록:", list);
  });

  // 글 작성
  createArticle({
    title: "글 테스트 제목",
    content: "글 테스트 내용",
    image: "https://picsum.photos/600/400"
  }).then((result) => {
    console.log("글 작성됨:", result);
    articleId = result.id;

    // 상세 보기
    getArticle(articleId).then((data) => {
      console.log("글 상세보기:", data);
    });

    // 수정
    patchArticle(articleId, { title: "수정된 제목" }).then((res) => {
      console.log("글 수정 결과:", res);
    });

    // 삭제
    deleteArticle(articleId).then((res) => {
      console.log("글 삭제 결과:", res);
    });
  });
}

// 상품 테스트
async function testProduct() {
  try {
    // 상품 목록 보기
    const list = await getProductList(1, 5, "");
    console.log("상품 목록:", list);

    // 상품 생성
    const newProduct = await createProduct({
      name: "테스트 상품",
      description: "상품 설명입니다",
      price: 3000,
      tags: ["테스트"],
      images: ["https://picsum.photos/600/400"]
    });

    console.log("상품 등록됨:", newProduct);
    productId = newProduct.id;

    // 상세 보기
    const detail = await getProduct(productId);
    console.log("상품 상세보기:", detail);

    // 수정
    const updated = await patchProduct(productId, { price: 9999 });
    console.log("상품 수정 결과:", updated);

    // 삭제
    const deleted = await deleteProduct(productId);
    console.log("상품 삭제 결과:", deleted);
  } catch (err) {
    console.error("상품 처리 에러:", err);
  }
}

// 두 테스트 실행
testArticle();
testProduct();
