const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username: {
    type: String,
    unique: true,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  }
})

// Authenticate input against database documents
UserSchema.statics.authenticate = (username, password, callback) => {
  User.findOne({ username }).exec((error, user) => {
    if (error) {
      callback(error)
    } else if (!user) {
      const err = new Error("User not found.")
      err.status = 401
      callback(err)
    }
    bcrypt.compare(password, user.password, (error, result) => {
      if (result === true) {
        callback(null, user)
      } else {
        callback()
      }
    })
  })
}

// Hash password before saving to db
UserSchema.pre("save", function(next) {
  let user = this
  console.log(this)
  bcrypt.hash(user.password, 10, (err, hash) => {
    if (err) {
      next(err)
    }
    user.password = hash
    next()
  })
})
// Create collection and schema
const User = mongoose.model("Users", UserSchema)

module.exports = User
