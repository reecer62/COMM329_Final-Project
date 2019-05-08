const express = require("express")
const router = express.Router()

/* GET login page. */
router.get("/", (req, res) => {
  // Load data from DB
  res.render("login", {
    title: "Player's Hut"
  })
})

module.exports = router
