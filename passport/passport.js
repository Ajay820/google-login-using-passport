const passport = require('passport')

const User = require("../model/user.js")

var GoogleStrategy = require('passport-google-oauth20').Strategy;


// passport.serializeUser(function(user, done) {
//     done(null, user.id); 
//    // where is this user.id going? Are we supposed to access this anywhere?
// });

// // used to deserialize the user
// passport.deserializeUser(function(id, done) {
//     User.findById(id, function(err, user) {
//         done(err, user);
//     });
// });

passport.serializeUser(function(user, cb) {
    process.nextTick(function() {
      cb(null, { id: user.id, username: user.username });
    });
  });
  
  passport.deserializeUser(function(user, cb) {
    process.nextTick(function() {
      return cb(null, user);
    });
  });

passport.use(new GoogleStrategy({
    clientID: "969483647188-hhir5kvkqg8irlu74m1ieu2h4s9mddr6.apps.googleusercontent.com",
    clientSecret: "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",
    callbackURL: "http://localhost:4000/auth/google/callback"
  },
  (accessToken,refreshToken,profile,next)=>{
    console.log("my profile",profile._json.email);
    User.findOne({email: profile._json.email})
    .then((user)=>{
        if(user){
            console.log("user exist",user)
            // cookieToken()
            next(null,user)
        }
        else{
            User.create({
                name:profile.displayName,
                googleID:profile.id,
                email:profile._json.email
            })
            .then((user)=>{
                console.log(user)
                next(null,user)
            })
            .catch(error=>console.log(error))
        }
    })


    next()
  }
));