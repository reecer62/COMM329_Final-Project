const express = require("express")
const router = express.Router()
const User = require("../models/user")
const checkLogin = require("../middleware/userAuth")

/* GET login page. */
router.get("/", checkLogin.loggedOut, (req, res, next) => {
  // Load data from DB
  res.render("login", {
    title: "Login"
  })
})

/* POST login. */
router.post("/", checkLogin.loggedOut, (req, res, next) => {
  // Authenticate
  if (req.body.login_username && req.body.login_password) {
    User.authenticate(
      req.body.login_username,
      req.body.login_password,
      (error, user) => {
        if (error || !user) {
          const err = new Error("Wrong username or password.")
          err.status = 401
          next(err)
        } else {
          //Save session
          req.session.userId = user._id
          res.redirect("/")
        }
      }
    )
  } else {
    const err = new Error("Email and password are required.")
    err.status = 401
    next(err)
  }
})

module.exports = router
