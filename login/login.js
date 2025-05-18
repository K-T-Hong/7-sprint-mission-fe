const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const loginButton = document.querySelector('.login-button');

const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');

const alertBox = document.getElementById("custom-alert");
const alertMessage = document.getElementById("alert-message");
const alertButton = document.getElementById("alert-button");

// 로그인 데이터 베이스
const USER_DATA = {
  "codeit1@codeit.com" : "codeit101!",
  "codeit2@codeit.com" : "codeit202!",
  "codeit3@codeit.com" : "codeit303!",
  "codeit4@codeit.com" : "codeit404!",
  "codeit5@codeit.com" : "codeit505!",
  "codeit6@codeit.com" : "codeit606!",
};

// 이메일 형식 검증
function checkEmail(email) {
  const emailForm = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailForm.test(email);
}
// 에러 메세지
function buttonEvent() {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  let allOk = true;

  // 이메일 에러 확인
  if (!checkEmail(email)) {
    emailError.textContent = '잘못된 이메일 형식입니다.';
    emailInput.classList.add('error');
    allOk = false;
  } else {
    emailError.textContent = '';
    emailInput.classList.remove('error');
  }
  // 비밀번호 에러 확인
  if (password.length < 8 ) {
    passwordError.textContent = '비밀번호를 8자 이상 입력해주세요.'
    passwordInput.classList.add('error');
    allOk = false;
  } else {
    passwordError.textContent = '';
    passwordInput.classList.remove('error');
  }

  if (allOk) {
    loginButton.classList.add('active');
  } else {
    loginButton.classList.remove('active');
  }
}
emailInput.addEventListener('input', buttonEvent);
passwordInput.addEventListener('input', buttonEvent);

// 비빌번호 보이기/숨기기 버튼
const seeButton = document.getElementById("seebutton");
seeButton.addEventListener('click', () => {
  const passwordInput = document.getElementById("password");
  const seeButton = document.getElementById("seebutton");

  const isPasswordVisible = passwordInput.type === "text";
  passwordInput.type = isPasswordVisible ? "password" : "text";
  seeButton.src = isPasswordVisible ? "./image/close eye.png" : "./image/open eye.png";
  seeButton.alt = isPasswordVisible ? "비밀번호 보기" : "비밀번호 숨기기";
})
// alert 메세지
function showAlert(message) {
  alertMessage.textContent = message;
  alertBox.style.display = 'flex';
}
function closeAlert() {
  alertBox.style.display = 'none';
}
alertButton.addEventListener("click", closeAlert);

// 데이터 베이스에 저장된 정보로 로그인
document.getElementById('login-form').addEventListener("submit", function (event) {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();

  if (!USER_DATA[email]) {
    showAlert("존재하지 않는 이메일입니다.");
  } else if (USER_DATA[email] !== password) {
    showAlert("비밀번호가 일치하지 않습니다.");
  } else {
    window.location.href = "../items.html";
  }
});
