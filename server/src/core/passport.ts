import passport from "passport";
import jwt from 'jsonwebtoken'
import { Strategy as JwtStrategy, JwtFromRequestFunction } from 'passport-jwt'
import { Strategy as LocalStrategy } from 'passport-local'
import { User } from "../models/User";
import bcrypt from 'bcryptjs'
import express from "express";

const extractJwt = (req: express.Request) => {
   console.log(req.session)
   const verify = jwt.verify((req.session as any)?.token, process.env.SECRET as string)

   if (verify) return (req.session as any).token;

   return null
}

passport.use(new JwtStrategy({
   secretOrKey: process.env.SECRET as string,
   jwtFromRequest: extractJwt as JwtFromRequestFunction
},
   async (payload, done) => {
      try {
         console.log(payload)
         if (payload.id) {
            return done(null, payload.id);
         } else {
            return done(null, false);
         }

      } catch (err) {
         return done(err, false);
      }
   }));

passport.use(new LocalStrategy({
   usernameField: 'email'
},
   async (email, password, done) => {
      try {
         const user = await User.findOne({ email })

         if (!user) {
            return done(null, false);
         } else {
            const check = await bcrypt.compare(password, user.password)
            if (!check) return done('Error', false)

            return done(null, user._id)
         }

      } catch (err) {
         return done(err, false);
      }
   }));

passport.serializeUser((id: any, done) => {
   done(null, id);
});

passport.deserializeUser(async (id, done) => {
   const user = await User.findById(id);
   done(null, user);
});

export { passport };
