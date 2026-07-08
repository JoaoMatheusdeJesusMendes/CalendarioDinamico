import { Router } from "express"
import { forgotPassword, login, register, resetPassword } from "../controllers/authController"
import { verifyEmail } from "../controllers/authController"
import passport from "passport"
import jwt from "jsonwebtoken"

const router = Router()

router.post("/login", login)
router.post("/register", register)
router.get("/verify/:token", verifyEmail)
router.post("/forgot-password", forgotPassword)
router.post("/reset-password", resetPassword)
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"]
  })
)

router.get(
  "/google/callback",
  (req, res, next) => {

    passport.authenticate(
      "google",
      {
        session: false
      },
      (err: any, user: any, info: any) => {

        if (err) {
          return next(err)
        }

        if (!user) {

            const error = encodeURIComponent(info?.message || "Erro ao autenticar")

            return res.redirect(
                `http://localhost:5173/login?error=${error}`
            )

        }

        const token = jwt.sign(
          {
            userId: user._id
          },
          process.env.JWT_SECRET as string,
          {
            expiresIn: "1d"
          }
        )

        res.redirect(
          `http://localhost:5173/google-success?token=${token}`
        )

      }

    )(req, res, next)

  }
)

export default router