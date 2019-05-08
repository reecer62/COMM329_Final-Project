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
