const express = require("express")
const router = express.Router()

/* GET Lobby page. */
router.get("/", (req, res) => {
  // Load data from DB
  res.render("lobby", {
    title: "Lobby"
  })
})

module.exports = router
