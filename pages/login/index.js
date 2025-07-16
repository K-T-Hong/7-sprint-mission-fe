import Link from "next/link";
import styles from "@/styles/login.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Toast from "@/components/Toast";
import axios from "@/lib/axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [show, setShow] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        router.replace("/items");
      }
    }
  }, [router]);

  const isEmail = email => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const canLogin = isEmail(email) && password.length >= 8;

  function handleKeyDown(e) {
    if (e.key === "Enter" && canLogin && !loading) {
      handleSubmit(e);
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setEmailError("");
    setPasswordError("");
    let valid = true;

    if (!isEmail(email)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
      valid = false;
    }

    if (password.length < 8) {
      setPasswordError("비밀번호를 8자 이상 입력해주세요.");
      valid = false;
    }

    if (!valid) return;

    setLoading(true);
    try {
      const res = await axios.post("/auth/signIn", {
        email,
        password,
      });

      const accessToken = res.data?.accessToken;
      if (accessToken) {
        localStorage.setItem("accessToken", accessToken);
      }

      setToastMsg("로그인 성공!");
      setTimeout(() => router.push("/items"), 1000);
    } catch (error) {
      const data = error.response?.data;

      if (data?.errorType === "email") {
        setEmailError(data.message);
      } else if (data?.errorType === "password") {
        setPasswordError(data.message);
      } else {
        setModalMsg(data?.message);
        setModalOpen(true);
      }
    } finally {
      setLoading(false);
    }
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
              onKeyDown={handleKeyDown}
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
        <button
          className={`${styles.btn} ${
            canLogin && !loading ? styles.active : ""
          }`}
          type="submit"
          disabled={!canLogin || loading}
        >
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
      <Toast message={toastMsg} onClose={() => setToastMsg("")} />
      <Modal
        open={modalOpen}
        message={modalMsg}
        onClose={() => setModalOpen(false)}
      />
    </div>
  );
}
