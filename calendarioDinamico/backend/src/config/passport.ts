import passport from "passport"
import { Strategy as GoogleStrategy } from "passport-google-oauth20"
import { Request } from "express"
import jwt from "jsonwebtoken"

import User from "../models/User"

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
      passReqToCallback: true
    },

    async (req: Request, accessToken, refreshToken, profile, done) => {

      const state = req.query.state as string | undefined

      if (state) {

        const payload = jwt.verify(
          state,
          process.env.JWT_SECRET as string
        ) as {
          userId: string
          action: string
        }

        console.log("STATE RECEBIDO:")
        console.log(payload)

      }

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

  )
)