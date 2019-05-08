const express = require("express")
const router = express.Router()
const User = require("../models/user")

/* POST register. */
router.post("/", (req, res, next) => {
  // Save data to DB
  if (
    req.body.signup_username &&
    req.body.password &&
    req.body.confirm_password
  ) {
    if (req.body.password == req.body.confirm_password) {
      // Create object with form input
      const userData = {
        username: req.body.signup_username,
        password: req.body.password
      }
      // Insert user into mongo
      User.create(userData, (err, user) => {
        console.log(`Created user: ${userData}`)
      })
    } else {
      const err = new Error("Passwords do not match.")
      err.status = 400
      return next(err)
    }
  } else {
    const err = new Error("All fields required.")
    err.status = 400
    return next(err)
  }
  // Save cookies
  // Save session
})

module.exports = router
