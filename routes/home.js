const express = require("express")
const router = express.Router()
const User = require("../models/user")
const checkLogin = require("../middleware/userAuth") // Authorization custom middleware

/* GET home page. */
router.get("/", checkLogin.requiresLogin, (req, res, next) => {
  // Load data from DB
  User.findById(req.session.userId).exec((error, user) => {
    if (error || user == null) {
      next(error)
    } else {
      res.render("home", {
        title: "Player's Hut",
        username: user.username
      })
    }
  })
})

module.exports = router
