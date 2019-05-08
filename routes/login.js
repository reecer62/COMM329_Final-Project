const express = require("express")
const router = express.Router()

/* GET login page. */
router.get("/", (req, res) => {
  // Load data from DB
  res.render("login", {
    title: "Login"
  })
})

/* POST login. */
router.post("/", (req, res) => {
  // Authenticate
  // Save cookies
  // Save session
  res.redirect("/")
})

module.exports = router