const express = require("express")
const router = express.Router()
const User = require("../models/user")

/* GET home page. */
router.get("/", (req, res, next) => {
  // Authorization
  if (!req.session.userId) {
    const err = new Error("You are not authorized to view this page.")
    err.status = 403
    next(err)
  }
  // Load data from DB
  User.findById(req.session.userId).exec((error, user) => {
    if (error) {
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
