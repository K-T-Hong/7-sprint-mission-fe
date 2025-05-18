const emailInput = document.getElementById('email');
const nameInput = document.getElementById('name');
const passwordInput = document.getElementById('password');
const passwordCheckInput = document.getElementById('password-check');
const signupButton = document.querySelector('.signup-button');

const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');
const passwordCheckError = document.getElementById('password-check-error');

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
  const name = nameInput.value.trim();
  const password = passwordInput.value.trim();
  const passwordCheck = passwordCheckInput.value.trim();

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
// 비밀번호 재확인
  if (password !== passwordCheck) {
    passwordCheckError.textContent = '비밀번호가 일치하지 않습니다.';
    passwordCheckInput.classList.add('error');
    allOk = false;
  } else {
    passwordCheckError.textContent = '';
    passwordCheckInput.classList.remove('error');
  }
// 모두 입력시 회원가입 버튼 활성화
  if (allOk && name !== '') {
    signupButton.classList.add('active');
  } else {
    signupButton.classList.remove('active');
  }
}
emailInput.addEventListener('input', buttonEvent);
nameInput.addEventListener('input', buttonEvent);
passwordInput.addEventListener('input', buttonEvent);
passwordCheckInput.addEventListener('input', buttonEvent);

// 비빌번호 보이기/숨기기 버튼
const seeButtons = document.querySelectorAll('.seebutton');

seeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const targetId = button.dataset.target;
    const input = document.getElementById(targetId);

    const isVisible = input.type === 'text';
    input.type = isVisible ? 'password' : 'text';

    button.src = isVisible ? './image/close eye.png' : './image/open eye.png';
    button.alt = isVisible ? '비밀번호 보기' : '비밀번호 숨기기';
  });
});

// alert 메세지
function showAlert(message) {
  alertMessage.textContent = message;
  alertBox.style.display = 'flex';
}
function closeAlert() {
  alertBox.style.display = 'none';
}
alertButton.addEventListener("click", closeAlert);

// 데이터 베이스에 저장된 이메일과 중복 확인
document.getElementById('signup-form').addEventListener("submit", function (event) {
  event.preventDefault();

  const email = emailInput.value.trim();

  if (USER_DATA[email]) {
    showAlert("사용 중인 이메일입니다.");
  } else {
    window.location.href = "./login.html";
  }
});

