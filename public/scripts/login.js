var loginForm = document.getElementById("login-form")
var loginSection = document.getElementById("login-section")
var signupSection = document.getElementById("signup-section")
var inputs = document.getElementsByTagName("input")
var loginUsername = document.getElementById("login_username")
var loginPassword = document.getElementById("login_password")

const selectLogin = function() {
  if (signupSection.classList.contains("selected")) {
    signupSection.classList.remove("selected")
  }
  if (!loginSection.classList.contains("selected")) {
    loginSection.className += " selected"
  }
  loginForm.setAttribute("action", "/login")
}

const selectSignup = function() {
  if (!loginUsername.value || !loginPassword.value) {
    if (loginSection.classList.contains("selected")) {
      loginSection.classList.remove("selected")
    }
    if (!signupSection.classList.contains("selected")) {
      signupSection.className += " selected"
    }
    loginForm.setAttribute("action", "/register")
  }
}

loginSection.addEventListener("click", e => {
  selectLogin()
})

signupSection.addEventListener("click", e => {
  selectSignup()
})

for (let i = 0; i < inputs.length; i++) {
  inputs[i].addEventListener("focus", e => {
    if (e.target.classList.contains("login")) {
      selectLogin()
    } else if (e.target.classList.contains("signup")) {
      selectSignup()
    }
  })
}
