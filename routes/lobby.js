const express = require("express")
const router = express.Router()

/* GET Lobby page. */
router.get("/", (req, res) => {
  // Load data from DB
  res.render("lobby", {
    title: "Lobby"
  })
})

/* POST Lobby. */
router.post("/", (req, res) => {
  // Load data from DB
  // Save cookies
  // Store session
  const { lobby_id } = req.params
  res.redirect(`/lobby/${lobby_id}`)
})

module.exports = router
