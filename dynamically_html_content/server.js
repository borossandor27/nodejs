const express = require('express')
const app = express()
const path =require('path')
app.use(express.static(path.join(__dirname, 'public')))
app.set('view engine', 'ejs')
  
app.get("/", (req, res) => {
  res.render("statictext.ejs", { variableName: "Hello World!" })
})
  
app.listen(3000, (req, res) => {
  console.log("App is running on port 3000")
})