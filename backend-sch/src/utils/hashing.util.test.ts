import { describe, it } from "node:test";
import assert from "node:assert"; // Use assert instead of expect
import { makeHash } from "./hashing.util";

describe("testing hash generation", () => {
  it("should return a hash string", async () => {
    const data = await makeHash("password");
    assert.strictEqual(typeof data, "string"); 
  });
});
