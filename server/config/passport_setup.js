require("dotenv").config()
import passport from "passport"
import GoogleStrategy from "passport-google-oauth20"
import {createUser, findUser} from "../db/db_user";

passport.serializeUser((user, done) => {
  done(null, user.user_id)
})

passport.deserializeUser((user_id, done) => {
  findUser(user_id).then(user => {
    done(null, user)
  })
})

passport.use(new GoogleStrategy({
  callbackURL: "/login/google/redirect",
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET
}, (accessToken, refreshToken, profile, done) => {

  findUser(profile.id)
    .then(user => {
      if (user.rowCount) {
        done(null, user.rows[0])
      } else {
        createUser(profile.id, profile.displayName, profile.emails[0].value)
          .then(res => {
            done(null, {user_id: profile.id, user_name: profile.displayName, user_email: profile.emails[0].value})
          })
          .catch(err => {
            console.log(err)
          })
      }
    })
    .catch(err => {
      console.log(err)
    })
}));