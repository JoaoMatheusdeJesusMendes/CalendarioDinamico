import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"

import User from "../models/User"

passport.use(
    new GoogleStrategy(
    {
        clientID: process.env.GOOGLE_CLIENT_ID!,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        callbackURL:"/auth/google/callback"
    },

    async (accessToken, refreshToken, profile, done) => {

        const email = profile.emails?.[0].value

        if (!email) {
            return done(null, false)
        }

        const existingUser = await User.findOne({ email })

        if (existingUser && !existingUser.googleId) {

            return done(null, false, {
                message: "Este email já possui uma conta cadastrada com senha."
            })

        }

        if (existingUser) {
            return done(null, existingUser)
        }

        const newUser = await User.create({
            name: profile.displayName,
            email,
            googleId: profile.id,
            isVerified: true
        })

        return done(null, newUser)

    }

))