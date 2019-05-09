const express = require("express")
const router = express.Router()
const checkLogin = require("../middleware/userAuth")
const User = require("../models/user")

/* GET Table login page. */
router.get("/", checkLogin.requiresLogin, (req, res, next) => {
  // Load data from DB
  User.findById(req.session.userId).exec((error, user) => {
    if (error || user == null) {
      next(error)
    } else {
      res.render("table", {
        title: "Table",
        username: user.username
      })
    }
  })
})

/* GET table page. */
router.get("/:table_id", checkLogin.requiresLogin, (req, res, next) => {
  const { table_id } = req.params
  // Load data from DB
  User.findById(req.session.userId).exec((error, user) => {
    if (error || user == null) {
      next(error)
    } else {
      res.render("table", {
        title: `Table: ${table_id}`,
        username: user.username
      })
    }
  })
})

/* POST Table. */
router.post("/", checkLogin.requiresLogin, (req, res, next) => {
  // Load data from DB
  // Save cookies
  // Store session
  const { table_id } = req.body
  res.redirect(`/table/${table_id}`)
})

module.exports = router
