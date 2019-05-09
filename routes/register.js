const express = require("express")
const router = express.Router()
const User = require("../models/user")
const checkLogin = require("../middleware/userAuth")

/* POST register. */
router.post("/", checkLogin.loggedOut, (req, res, next) => {
  // Save data to DB
  if (
    req.body.signup_username &&
    req.body.password &&
    req.body.confirm_password
  ) {
    if (req.body.password === req.body.confirm_password) {
      // Create object with form input
      const userData = {
        username: req.body.signup_username,
        password: req.body.password
      }
      // Insert user into mongo
      User.create(userData, (err, user) => {
        if (err) {
          next(err)
        } else {
          //Save session
          req.session.userId = user._id
          res.cookie("username", user.username)
          res.redirect("/")
        }
      })
    } else {
      const err = new Error("Passwords do not match.")
      err.status = 400
      next(err)
    }
  } else {
    const err = new Error("All fields required.")
    err.status = 400
    next(err)
  }
})

module.exports = router
