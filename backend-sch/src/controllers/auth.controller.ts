const bcrypt = require("bcrypt");
import { Request, Response } from "express";
import { decodeToken, signData } from "../utils/jwt.util";
import { makeHash, verifyHash } from "../utils/hashing.util";
import {
  createAdmin,
  findAdmin,
  updateAdmin,
} from "../../services/prisma.queries";

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
      const userWithoutPassword = {
        ...user,
        password: undefined,
        token: token,
      };
      return res.json({
        message: "User logged in successfully",
        data: userWithoutPassword,
      });
    } catch (err) {
      console.error("Error during login:", err);
      return res.status(500).json({
        message: "There was an error logging in",
      });
    }
  }

  static async getUser(req: Request | any, res: Response | any) {
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decoded = decodeToken(token);
      const user = await findAdmin(decoded.email);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const userWithoutPassword = {
        ...user,
        password: undefined,
      };

      return res.json({
        message: "User retrieved successfully",
        data: userWithoutPassword,
      });
    } catch (err) {
      console.error("Error retrieving user from token:", err);
      return res.status(500).json({
        message: "There was an error retrieving the user",
      });
    }
  }

  static async updateUser(req: Request | any, res: Response | any) {
    const { email, password, name } = req.body;
    const token = req.cookies.token;

    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }

    try {
      const decoded = decodeToken(token);
      const existingAdmin = await findAdmin(decoded.email);

      if (!existingAdmin) {
        return res.status(404).json({ message: "User not found" });
      }

      // Prepare updated fields
      const updatedFields: any = { email, name };

      // Hash password only if provided
      if (password) {
        updatedFields.password = await makeHash(password);
      }

      // Update the admin
      const updatedAdmin = await updateAdmin(decoded.email, updatedFields);

      return res.json({
        message: "User updated successfully",
        data: updatedAdmin,
      });
    } catch (err) {
      console.error("Error updating user:", err);
      return res.status(500).json({
        message: "There was an error updating the user",
      });
    }
  }
}
