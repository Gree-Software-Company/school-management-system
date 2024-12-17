const bcrypt = require("bcrypt");

export async function makeHash(input: string) {
  const hash = await bcrypt.hash(input, 10);
  return hash;
}

export async function verifyHash(password: string, hash: string) {
  const decoded = await bcrypt.compare(password, hash);
  return decoded;
}
