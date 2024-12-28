import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { authRouter } from "./routers/auth.router";
import { staffRouter } from "./routers/staff.router";
import { subjectRouter } from "./routers/subject.router";
// import { ClassController } from "./controllers/class.controller";
import { classRouter } from "./routers/class.router";
import { semesterRouter } from "./routers/semester.router";
import { studnetRouter } from "./routers/student.router";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use("/auth", authRouter);
app.use("/staff", staffRouter);
app.use("/subjects", subjectRouter);
app.use("/class", classRouter);
app.use("/semesters", semesterRouter);
app.use("/students", studnetRouter);

const PORT = process.env.PORT || 3400;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
