function loggedOut(req, res, next) {
  if (req.session && req.session.userId) {
    res.redirect("/")
  }
  return next()
}

module.exports.loggedOut = loggedOut
