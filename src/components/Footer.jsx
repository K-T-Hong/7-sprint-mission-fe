import React from "react";
import "./Footer.css";
import Instagram from "../assets/ic_instagram.svg";
import Youtube from "../assets/ic_youtube.svg";
import Twitter from "../assets/ic_twitter.svg";
import Facebook from "../assets/ic_facebook.svg";

function Footer() {
  return (
    <footer className="footerArea">
      <div className="codeit">
        <p>©codeit - 2024</p>
      </div>
      <div className="linkPage">
        <p>Privacy Policy</p>
        <p>FAQ</p>
      </div>
      <div className="linkSns">
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Instagram} alt="인스타 링크" width={20} />
        </a>
        <a
          href="https://www.youtube.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Youtube} alt="유튜브 링크" width={20} />
        </a>
        <a
          href="https://www.twitter.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Twitter} alt="트위터 링크" width={20} />
        </a>
        <a
          href="https://www.facebook.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <img src={Facebook} alt="페이스북 링크" width={20} />
        </a>
      </div>
    </footer>
  );
}
export default Footer;
