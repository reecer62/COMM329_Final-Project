function loggedOut(req, res, next) {
  if (req.session && req.session.userId) {
    res.redirect("/")
  }
  return next()
}

function requiresLogin(req, res, next) {
  if (req.session && req.session.userId) {
    return next()
  } else {
    const err = new Error("You must be logged in to view this page.")
    err.status = 401
    next(err)
  }
}

module.exports.loggedOut = loggedOut
module.exports.requiresLogin = requiresLogin
