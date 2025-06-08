import React from "react";
import "./LandingPage.css";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
      <main>
        <section className="title area">
          <div className="title-position">
            <div className="title-content">
              <h1 className="title-word">일상의 모든 물건을 거래해 보세요</h1>
              <div className="see-container">
                <Link to="/sightseeing" className="see-button">
                  구경하러 가기
                </Link>
              </div>
            </div>
            <div className="title-img"></div>
          </div>
        </section>
        <section className="content area">
          <div className="top position">
            <div className="top-page-img"></div>
            <div className="top-page container">
              <p className="tag">Hot item</p>
              <div className="right word-box">
                <h1>인기 상품을 확인해 보세요</h1>
                <p className="sentence">
                  가장 HOT한 중고거래 물품을 판다 마켓에서 확인해 보세요
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="content area">
          <div className="center position">
            <div className="center-page container">
              <p className="tag">Search</p>
              <div className="left word-box">
                <h1>구매를 원하는 상품을 검색하세요</h1>
                <p className="sentence">
                  구매하고 싶은 물품은 검색해서 쉽게 찾아보세요
                </p>
              </div>
            </div>
            <div className="center-page-img"></div>
          </div>
        </section>

        <section className="content area">
          <div className="bottom position">
            <div className="bottom-page-img"></div>
            <div className="bottom-page container">
              <p className="tag">Register</p>
              <div className="right word-box">
                <h1>판매를 원하는 상품을 등록하세요</h1>
                <p className="sentence">
                  어떤 물건이든 판매하고 싶은 상품을 쉽게 등록하세요
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="end area">
          <div className="end-position">
            <h1 className="end-title">
              믿을 수 있는
              <br />
              판다마켓 중고 거래
            </h1>
            <div className="bottom-img"></div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default LandingPage;
