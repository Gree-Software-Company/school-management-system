const bcrypt = require("bcrypt");
import { Request, Response } from "express";
import { signData } from "../utils/jwt.util";
import { makeHash, verifyHash } from "../utils/hashing.util";
import { createAdmin, findAdmin } from "../../services/prisma.queries";

export class AuthController {
  static async register(req: Request | any, res: Response | any) {
    const { email, password } = req.body;

    try {
      const existingAdmin = await findAdmin(email);
      if (existingAdmin) {
        return res.status(400).json({ message: "Admin already exists" });
      }
      const hashedPassword = await makeHash(password);
      const data = await createAdmin(email, hashedPassword); // Ensure password is hashed in createAdmin
      return res.status(201).json({
        message: "Admin created successfully",
        data: data,
      });
    } catch (err) {
      console.error("Error creating admin:", err); // Log the error for debugging
      return res.status(500).json({
        message: "There was an error creating the user",
      });
    }
  }

  static async login(req: Request | any, res: Response | any) {
    const { email, password } = req.body;

    try {
      const user = await findAdmin(email);
      if (!user) {
        return res.status(400).json({ error: "User not found!" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ error: "Invalid credentials", data: isPasswordValid });
      }

      const token = signData(user, "1h");

      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "strict",
        maxAge: 3600000,
      });

      return res.json({
        message: "User logged in successfully",
      });
    } catch (err) {
      console.error("Error during login:", err); 
      return res.status(500).json({
        message: "There was an error logging in",
      });
    }
  }
}
