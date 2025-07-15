import Link from "next/link";
import styles from "@/styles/login.module.css";
import { useState } from "react";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [show, setShow] = useState(false);

  const isEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleSubmit = e => {
    e.preventDefault();
    let valid = true;

    if (!isEmail(email)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
      valid = false;
    } else {
      setEmailError("");
    }

    if (password.length < 8) {
      setPasswordError("비밀번호를 8자 이상 입력해주세요.");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;
    // 로그인 로직
  };

  return (
    <div className={styles.area}>
      <form className={styles.form} onSubmit={handleSubmit}>
        <Link className={styles.logo} href="/" />
        <div className={styles.box}>
          <label className={styles.label}>이메일</label>
          <div>
            <input
              className={`${styles.input} ${emailError ? styles.error : ""}`}
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="이메일을 입력해주세요"
            />
            {emailError && <div className={styles.errorMsg}>{emailError}</div>}
          </div>
        </div>
        <div className={styles.box}>
          <label className={styles.label}>비밀번호</label>
          <div className={styles.inputWrap}>
            <input
              className={`${styles.input} ${passwordError ? styles.error : ""}`}
              type={show ? "text" : "password"}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해주세요"
            />
            <button
              type="button"
              className={styles.eyeBtn}
              aria-label={show ? "비밀번호 숨기기" : "비밀번호 보이기"}
              onClick={() => setShow(v => !v)}
              tabIndex={-1}
            >
              <img
                src={show ? "/ic_eye_off.svg" : "/ic_eye_open.svg"}
                width={24}
                height={24}
              />
            </button>
            {passwordError && (
              <div className={styles.errorMsg}>{passwordError}</div>
            )}
          </div>
        </div>
        <button className={styles.btn} type="submit">
          로그인
        </button>
        <div className={styles.snsLogin}>
          <span className={styles.linkText}>간편 로그인하기</span>
          <div className={styles.snsLink}>
            <Link className={styles.google} href="http://www.google.com/" />
            <div className={styles.kakaoBox}>
              <Link
                className={styles.kakao}
                href="http://www.kakaocorp.com/page/"
              >
                <span className={styles.kakaoIcon} />
              </Link>
            </div>
          </div>
        </div>
        <div className={styles.singup}>
          <span className={styles.singupText}>
            판다마켓이 처음이신가요?
            <Link className={styles.singupLink} href="/signup">
              회원가입
            </Link>
          </span>
        </div>
      </form>
    </div>
  );
}
