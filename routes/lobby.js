const express = require("express")
const router = express.Router()
const checkLogin = require("../middleware/index")

/* GET Lobby login page. */
router.get("/", checkLogin.requiresLogin, (req, res, next) => {
  // Load data from DB
  res.render("lobby", {
    title: "Lobby"
  })
})

/* GET lobby page. */
router.get("/:lobby_id", checkLogin.requiresLogin, (req, res, next) => {
  const { lobby_id } = req.params
  // Load data from DB
  res.render("lobby", {
    title: `Lobby: ${lobby_id}`
  })
})

/* POST Lobby. */
router.post("/", checkLogin.requiresLogin, (req, res, next) => {
  // Load data from DB
  // Save cookies
  // Store session
  const { lobby_id } = req.body
  res.redirect(`/lobby/${lobby_id}`)
})

module.exports = router
