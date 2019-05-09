const express = require("express")
const router = express.Router()
const checkLogin = require("../middleware/userAuth")
const User = require("../models/user")

/* GET Lobby login page. */
router.get("/", checkLogin.requiresLogin, (req, res, next) => {
  // Load data from DB
  User.findById(req.session.userId).exec((error, user) => {
    if (error || user == null) {
      next(error)
    } else {
      res.render("lobby", {
        title: "Lobby",
        username: user.username
      })
    }
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
