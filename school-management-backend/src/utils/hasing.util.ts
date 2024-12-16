const bcrypt = require("bcrypt");

export async function makeHash(value: string) {
  const hashed = bcrypt.hash(value, 10);
  return hashed;
}
