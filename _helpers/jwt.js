const expressJwt = require("express-jwt")
const dotenv = require("dotenv")
const userService = require("../users/user.service")

module.exports = jwt

const result = dotenv.config()
if (result.error) {
  throw result.error
}

function jwt() {
  const secret = process.env.SECRET
  return expressJwt({ secret, isRevoked }).unless({
    path: [
      // public routes that don't require authentication
      "/users/authenticate",
      "/users/register"
    ]
  })
}

async function isRevoked(req, payload, done) {
  const user = await userService.getById(payload.sub)

  // revoke token if user no longer exists
  if (!user) {
    return done(null, true)
  }

  done()
}
