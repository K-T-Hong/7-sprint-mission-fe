import Link from "next/link";
import styles from "@/styles/signUp.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";
import Toast from "@/components/Toast";
import axios from "@/lib/axios";
import { useAuth } from "@/contexts/AuthContext";

export default function SingUp() {
  const [email, setEmail] = useState("");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [passCheck, setPassCheck] = useState("");
  const [emailError, setEmailError] = useState("");
  const [nicknameError, setNicknameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passCheckError, setPassCheckError] = useState("");
  const [show, setShow] = useState(false);
  const [showCheck, setShowCheck] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalMsg, setModalMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
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
  const canSignUp =
    isEmail(email) &&
    nickname.length > 0 &&
    nickname.length <= 10 &&
    password.length >= 8 &&
    password === passCheck;

  function handleKeyDown(e) {
    if (e.key === "Enter" && canSignUp && !loading) {
      handleSubmit(e);
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    setEmailError("");
    setNicknameError("");
    setPasswordError("");
    setPassCheckError("");
    setModalOpen(false);
    setModalMsg("");
    let valid = true;

    if (!isEmail(email)) {
      setEmailError("올바른 이메일 형식이 아닙니다.");
      valid = false;
    }

    if (nickname.length > 10) {
      setNicknameError("닉네임은 10자까지 입력 가능합니다.");
      valid = false;
    }

    if (password.length < 8) {
      setPasswordError("비밀번호를 8자 이상 입력해주세요.");
      valid = false;
    }

    if (password !== passCheck) {
      setPassCheckError("비밀번호가 일치하지 않습니다.");
      valid = false;
    }

    if (!valid) return;

    setLoading(true);
    try {
      const res = await axios.post("/auth/signUp", {
        email,
        nickname,
        password,
        passwordConfirmation: passCheck,
      });

      const { accessToken, user } = res.data;
      if (accessToken && user) {
        login(accessToken, user);
      } else if (accessToken) {
        const userRes = await axios.get("/users/me", {
          headers: { Authorization: `Bearer ${accessToken}` },
        });
        login(accessToken, userRes.data);
      }

      setToastMsg("회원 가입 성공!");
      setTimeout(() => router.push("/items"), 1000);
    } catch (error) {
      setModalMsg(error.response?.data?.message || "회원가입에 실패했습니다.");
      setModalOpen(true);
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
          <label className={styles.label}>닉네임</label>
          <div>
            <input
              className={`${styles.input} ${nicknameError ? styles.error : ""}`}
              value={nickname}
              onChange={e => setNickname(e.target.value)}
              placeholder="닉네임을 입력해주세요"
            />
            {nicknameError && (
              <div className={styles.errorMsg}>{nicknameError}</div>
            )}
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
        <div className={styles.box}>
          <label className={styles.label}>비밀번호 확인</label>
          <div className={styles.inputWrap}>
            <input
              className={`${styles.input} ${
                passCheckError ? styles.error : ""
              }`}
              type={showCheck ? "text" : "password"}
              value={passCheck}
              onKeyDown={handleKeyDown}
              onChange={e => setPassCheck(e.target.value)}
              placeholder="비밀번호를 다시 한 번 입력해주세요"
            />
            <button
              type="button"
              className={styles.eyeBtn}
              aria-label={showCheck ? "비밀번호 숨기기" : "비밀번호 보이기"}
              onClick={() => setShowCheck(v => !v)}
              tabIndex={-1}
            >
              <img
                src={showCheck ? "/ic_eye_off.svg" : "/ic_eye_open.svg"}
                width={24}
                height={24}
              />
            </button>
            {passCheckError && (
              <div className={styles.errorMsg}>{passCheckError}</div>
            )}
          </div>
        </div>
        <button
          className={`${styles.btn} ${
            canSignUp && !loading ? styles.active : ""
          }`}
          type="submit"
          disabled={!canSignUp || loading}
        >
          회원가입
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
        <div className={styles.login}>
          <span className={styles.loginText}>
            이미 회원이신가요?
            <Link className={styles.loginLink} href="/login">
              로그인
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
