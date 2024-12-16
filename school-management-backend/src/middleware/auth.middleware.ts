import type { NextFunction, Response, Request } from "express";
const jwt = require("jsonwebtoken");

export function isAuthenticated(
  req: Request | any,
  res: Response,
  next: NextFunction
) {
  const token = req.cookies.token;
  if (!token) {
    return res.json({ message: "authtication is required" }).status(501);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
}
