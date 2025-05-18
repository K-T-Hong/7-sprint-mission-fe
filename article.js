const ARTICLE_URL = "https://sprint-mission-api.vercel.app/articles";

// 글 목록 불러오기
export function getArticleList(page, pageSize, keyword) {
  const url = ARTICLE_URL + "?page=" + page + "&pageSize=" + pageSize + "&keyword=" + keyword;

  return fetch(url)
    .then(function(response) {
      if (!response.ok) {
        console.log("리스트 불러오기 실패", response.status);
        throw new Error("불러오기 실패");
      }
      return response.json();
    })
    .catch(function(error) {
      console.log("getArticleList error", error);
    });
}

// 글 하나 보기
export function getArticle(id) {
  return fetch(ARTICLE_URL + "/" + id)
    .then(function(response) {
      if (!response.ok) {
        console.log("글 불러오기 실패", response.status);
        throw new Error("불러오기 실패");
      }
      return response.json();
    })
    .catch(function(err) {
      console.log("getArticle error", err);
    });
}

// 글 만들기
export function createArticle(article) {
  return fetch(ARTICLE_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(article)
  })
    .then(function(response) {
      if (!response.ok) {
        console.log("글 작성 실패", response.status);
        throw new Error("작성 실패");
      }
      return response.json();
    })
    .catch(function(err) {
      console.log("createArticle error", err);
    });
}

// 글 수정하기
export function patchArticle(id, data) {
  return fetch(ARTICLE_URL + "/" + id, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(function(response) {
      if (!response.ok) {
        console.log("수정 실패", response.status);
        throw new Error("수정 실패");
      }
      return response.json();
    })
    .catch(function(err) {
      console.log("patchArticle error", err);
    });
}

// 글 삭제
export function deleteArticle(id) {
  return fetch(ARTICLE_URL + "/" + id, {
    method: "DELETE"
  })
    .then(function(res) {
      if (!res.ok) {
        console.log("삭제 실패", res.status);
        throw new Error("삭제 실패");
      }
      return res.json();
    })
    .catch(function(err) {
      console.log("deleteArticle error", err);
    });
}
