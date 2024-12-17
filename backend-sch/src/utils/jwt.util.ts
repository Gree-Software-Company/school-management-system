const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();


export function signData(data: any, expires: string) {
  var token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: expires });
  return token;
}

export function decodeToken(token: string) {
  var decoded = jwt.verify(token, process.env.JWT_SECRET);
  return decoded;
}
