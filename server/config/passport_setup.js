import passport from "passport"
import GoogleStrategy from "passport-google-oauth20"

passport.use(new GoogleStrategy({
  callbackURL: "/auth/google/redirect",
  clientID: "511466395059-k1q7qbv73occve8asnp78vtkh9bmmi8a.apps.googleusercontent.com",
  clientSecret: "Tx4zsiNcYLx4Y-lLkKNrpHb-"
}, () => {
}))