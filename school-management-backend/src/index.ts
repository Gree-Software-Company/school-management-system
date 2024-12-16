import express from "express";
import { AuthController } from "./controllers/auth.controller";
import { authRouter } from "./routers/auth.router";
import { homeRouter } from "./routers/home.router";
const cookieParse = require('cookie-parser')
const app = express();

app.use(express.json());
app.use(cookieParse())
app.use("/auth", authRouter);
app.use("/admin", homeRouter)
app.get("/", async (req: Request | any, res: Response | any) => {
  return res.json({ message: "heyy welcome" });
});

const server = app.listen(3000, () =>
  console.log(`
🚀 Server ready at: http://localhost:3000

  `)
);
