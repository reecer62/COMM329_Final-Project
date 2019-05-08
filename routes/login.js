const express = require("express")
const router = express.Router()

/* GET login page. */
router.get("/", (req, res, next) => {
  // Load data from DB
  res.render("login", {
    title: "Login"
  })
})

/* POST login. */
router.post("/", (req, res, next) => {
  // Authenticate
  // Save cookies
  // Save session
  res.redirect("/")
})

module.exports = router
