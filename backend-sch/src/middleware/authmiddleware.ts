import { decodeToken } from "../utils/jwt.util";

function authenticateToken(req: any, res: any, next: Function) {
  const token = req.cookies.token;

  if (!token) return res.sendStatus(401);

  try {
    const user = decodeToken(token);
    req.user = user;
  } catch (error) {
    res.json({ message: "could not decode token" }).status(401);
  }

  next();
}

module.exports = { authenticateToken };
