const express = require("express")
const bodyParser = require("body-parser")
const path = require("path")
const helmet = require("helmet")
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const logger = require("morgan")

// Load environment variables
const result = dotenv.config()
if (result.error) {
  throw result.error
}
console.log(result.parsed)

const port = process.env.PORT || 3000

// Connect to db
mongoose
  .connect(process.env.PROD_MONGODB, { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected!"))
  .catch(err => console.log(err))

const app = express()

// Configure app
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "ejs")

// Use Middleware
app.use(express.static(path.join(__dirname, "bower_components")))
app.use(express.static(path.join(__dirname, "public")))
app.use(bodyParser.json())
app.use(logger("dev"))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(helmet())

// Define Routes
app.use("/", require("./routes/home"))
app.use("/login", require("./routes/login"))
app.use("/register", require("./routes/register"))
app.use("/lobby", require("./routes/lobby"))
// Catch 404 and pass to error handler
app.use((req, res, next) => {
  const err = new Error("File Not Found")
  err.status = 404
  next(err)
})
// Error handler
app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.render("error", {
    message: err.message,
    error: err.status
  })
})

// Start server
const http = require("http").Server(app)
const io = require("socket.io")(http)
http.listen(port, () => console.log(`Server started on port ${port}`))

// Socket connection
io.on("connection", client => {
  // Client has connected
  io.emit("message", client.id + " joined")

  // Relay message
  client.on("message", msg => {
    io.emit("message", msg)
  })

  // Client typing
  client.on("typing", () => {
    io.emit("typing", client.id)
  })

  // Client stop typing
  client.on("stop typing", () => {
    io.emit("stop typing", client.id)
  })

  // Client disconnects
  client.on("disconnect", () => {
    console.log("client disconnect...", client.id)
    io.emit("message", client.id + " left")
  })

  // Error handling
  client.on("error", err => {
    console.log("received error from client: ", client.id)
    console.log(err)
  })
})
