const jwt = require("jsonwebtoken");
import type { Express, Request, Response } from "express";
import { createUser, findUserByEmail } from "../services/prisma/dmq.service";
import { makeHash } from "../utils/hasing.util";
const bcrpt = require("bcrypt");

export class AuthController {
  static async register(req: Request | any, res: Response | any) {
    const { email, password, phone, name } = req.body;

    const hashed = await makeHash(password);

    try {
      const data = await createUser(email, hashed, phone, name);
    } catch (error) {
      return res.json({ message: "could not create user" }).status(500);
    }

    return res.json({ message: "user created successfully" }).status(201);
  }

  static async login(req: Request | any, res: Response | any) {
    try {
      const { email, password } = req.body;
      const user = await findUserByEmail(email);

      if (!user) {
        return res.json({ message: "user not found" }).status(401);
      }

      const verified = bcrpt.compare(password, user.password);
      if (!verified) {
        return res.json({ message: "invalid credentials" }).status(401);
      }

      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET as string,
        {
          expiresIn: "1h",
        }
      );

      
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        secure: process.env.NODE_ENV === "production", 
        maxAge: 3600000, 
      });

      return res.json({ message: "user loggin sucesssfully" });
    } catch {}
  }
}
