const express = require("express")

const mongoose = require("mongoose")

const auth = require("./routes/routes")

const passportConfig = require('./passport/passport')

const cookieSession =  require('cookie-session')

const passport = require("passport")

mongoose.connect('mongodb://127.0.0.1:27017/passport')

const app = express()

app.set("view engine","ejs")

app.use(passport.initialize())


app.use(cookieSession({
    maxAge: 24 * 60 * 60 * 1000,
    keys: ['thisismykey'],

  }))

  app.use("/auth",auth)


app.get("/",(req,res)=>{
    res.render("home")
})


app.listen(4000,()=>{
    console.log("the app is running at port 4000")
})

