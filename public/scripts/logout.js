var logout = function() {
  console.log("USER CLICKED LOGOUT")
  const Http = new XMLHttpRequest()
  const url = window.location.origin + "/logout"
  Http.open("GET", url)
  Http.send()
  Http.onreadystatechange = e => {
    window.location.href = "/login"
  }
}
