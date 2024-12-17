import assert from "assert";
import { describe, it } from "node:test";
import { signData } from "./jwt.util";

describe('testing the jwt utiles', ()=> {
    it('it should return a jwt encoded string', async()=> {
        const data = signData({"name":"james"}, '1h')
        assert.strictEqual(typeof data, "string")
    })
})