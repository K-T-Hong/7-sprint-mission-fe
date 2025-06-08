import React from "react";
import "./RegistrationPage.css";
import { useErrorCheck } from "./hooks/useErrorCheck";
import { useNavigate } from "react-router-dom";
import { useTagBox } from "./hooks/useTagBox";
import { getProduct } from "../api";

const textSize = v =>
  v.trim() === ""
    ? "필수 입력 항목입니다."
    : v.length > 10
    ? "10자 이내로 입력해주세요"
    : "";

const textLongSize = v =>
  v.trim() === ""
    ? "필수 입력 항목입니다."
    : v.length < 10
    ? "10자 이상 입력해주세요"
    : v.length > 100
    ? "100자 이내로 입력해주세요"
    : "";

const onlyNumber = v =>
  v.trim() === ""
    ? "필수 입력 항목입니다."
    : isNaN(v)
    ? "숫자로 입력해주세요"
    : "";

function RegistrationPage() {
  const navigate = useNavigate();
  const [itemName, itemNameChange, itemNameError] = useErrorCheck("", textSize);
  const [itemInfor, itemInforChange, itemInforError] = useErrorCheck(
    "",
    textLongSize
  );
  const [itemPrice, itemPriceChange, itemPriceError] = useErrorCheck(
    "",
    onlyNumber
  );

  const isDisabled = () =>
    !itemName ||
    itemNameError ||
    !itemInfor ||
    itemInforError ||
    !itemPrice ||
    itemPriceError;

  const handleSubmit = async e => {
    e.preventDefault();
    if (itemNameError || itemInforError || itemPriceError) {
      return;
    }

    const res = await fetch("http://localhost:4000/products", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        name: itemName,
        description: itemInfor,
        price: Number(itemPrice),
        tags: tags,
      }),
    });

    if (res.ok) {
      alert("등록 완료!");
      navigate("/items/제품상세페이지");
    } else {
      alert("등록 실패!");
    }
  };

  const {
    tagInput,
    tags,
    tagInputChange,
    tagInputKeyDown,
    removeTagBox,
    tagInputError,
  } = useTagBox();

  return (
    <div className="formArea">
      <form
        onSubmit={handleSubmit}
        onKeyDown={e => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
      >
        <div className="titleArea">
          <h1 className="titleWord">상품 등록하기</h1>
          <button
            className="submitButton"
            type="submit"
            disabled={isDisabled()}
          >
            등록
          </button>
        </div>
        <div className="inputArea">
          <div className="inputBox">
            <label className="labelText" htmlFor="itemName">
              상품명
            </label>
            <div>
              <input
                className={itemNameError ? " inputError" : ""}
                value={itemName}
                onChange={itemNameChange}
                type="text"
                id="itemName"
                placeholder="상품명을 입력해주세요"
              />
              <div className="errorMessage" id="nameError">
                {itemNameError}
              </div>
            </div>
          </div>
          <div className="inputBox">
            <label className="labelText" htmlFor="itemInfor">
              상품 소개
            </label>
            <div>
              <textarea
                className={itemInforError ? "inputError" : ""}
                value={itemInfor}
                onChange={itemInforChange}
                type="text"
                id="itemInfor"
                placeholder="상품 소개를 입력해주세요"
              />
              <div className="errorMessage" id="inforError">
                {itemInforError}
              </div>
            </div>
          </div>
          <div className="inputBox">
            <label className="labelText" htmlFor="itemPrice">
              판매가격
            </label>
            <div>
              <input
                className={itemPriceError ? " inputError" : ""}
                value={itemPrice}
                onChange={itemPriceChange}
                type="number"
                id="itemPrice"
                placeholder="판매 가격을 입력해주세요"
              />
              <div className="errorMessage" id="priceError">
                {itemPriceError}
              </div>
            </div>
          </div>
          <div className="inputBox">
            <label className="labelText" htmlFor="tag">
              태그
            </label>
            <div>
              <input
                className={tagInputError ? " inputError" : ""}
                value={tagInput}
                onChange={tagInputChange}
                onKeyDown={tagInputKeyDown}
                type="text"
                id="itemTag"
                placeholder="태그를 입력해주세요"
              />
              <div className="errorMessage" id="tagError">
                {tagInputError}
              </div>
              <div className="tagBoxArea">
                {tags.map((tag, idx) => (
                  <span className="tagBox" key={idx}>
                    #{tag}
                    <button
                      className="tagDeleteButton"
                      type="button"
                      onClick={() => removeTagBox(tag)}
                    />
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default RegistrationPage;
