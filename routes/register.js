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
    }
  }
  // Save cookies
  // Save session
  res.redirect("/")
})

module.exports = router
