const express = require("express")
const router = express.Router()

/* GET home page. */
router.get("/", (req, res) => {
  // Load data from DB
  res.render("home", {
    title: "Player's Hut"
  })
})

module.exports = router
