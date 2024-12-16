const {createUser} = require('../src/services/prisma/dmq.service')
import { makeHash } from "../src/utils/hasing.util";

describe("queries test", () => {

  describe('testing creating fucntions', () => { 
    it ('should return data created', async() => {
      const pass = await makeHash('password')
      const data = createUser('admin@school.com', pass )

      expect(data).toBeDefined()
    })
  })
  it("should return a number", async () => {
   
  });
});
