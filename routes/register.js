const express = require("express")
const router = express.Router()

/* POST register. */
router.post("/", (req, res) => {
  // Save data to DB
  // Save cookies
  // Save session
  res.redirect("/")
})

module.exports = router
