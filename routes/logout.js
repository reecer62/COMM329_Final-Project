const express = require("express")
const router = express.Router()

/* GET logout. */
router.get("/", (req, res, next) => {
  if (req.session) {
    // Delete session
    req.session.destroy(err => {
      if (err) {
        next(err)
      } else {
        res.clearCookie("connect.sid")
        res.redirect("/login")
      }
    })
  }
})

module.exports = router
