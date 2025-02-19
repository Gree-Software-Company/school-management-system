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
import { errorMiddleware } from "./middleware/errormiddleware";
import { resultsRouter } from "./routers/results.router";
import { feesRouter } from "./routers/fees.router";
import { attendaceRouter } from "./routers/attendance.router";

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
app.use("/fees", feesRouter);
app.use("/grades", resultsRouter);
app.use("/attendance", attendaceRouter);

app.use(errorMiddleware);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
