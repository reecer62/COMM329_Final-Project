const express = require("express")
const router = express.Router()
const checkLogin = require("../middleware/userAuth")
const User = require("../models/user")
const Table = require("../models/table")

/* GET Table login page. */
router.get("/", checkLogin.requiresLogin, (req, res, next) => {
  // Load data from DB
  User.findById(req.session.userId).exec((error, user) => {
    if (error || user == null) {
      next(error)
    } else {
      res.render("table", {
        title: "Table",
        username: user.username,
        tableId: null
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
        tableId: table_id,
        username: user.username
      })
    }
  })
})

/* POST Table. */
router.post("/", checkLogin.requiresLogin, (req, res, next) => {
  console.log("POSTED")
  if (req.body.create_id && req.body.create_password) {
    var tableData = {
      table_id: req.body.create_id,
      table_password: req.body.create_password
    }

    Table.create(tableData, function(error, table) {
      if (error) {
        return next(error)
      } else {
        return res.redirect(`/table/${req.body.create_id}`)
      }
    })
  } else if (req.body.table_id && req.body.table_password) {
    Table.authenticate(req.body.table_id, req.body.table_password, function(
      error,
      table
    ) {
      if (error || !table) {
        var err = new Error("Wrong table id or password.")
        err.status = 401
        return next(err)
      } else {
        return res.redirect(`/table/${req.body.table_id}`)
      }
    })
  } else {
    var err = new Error("All fields required.")
    err.status = 400
    return next(err)
  }
  // Load data from DB
  // Save cookies
  // Store session
})

module.exports = router
