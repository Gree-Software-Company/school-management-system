import { Response, Request } from "express";
import {
  createNewSemester,
  deleteSemesterById,
  findAllSemestersPresent,
  getSemesterById,
  updateSemesterById,
} from "../../services/prisma.queries";

export class SemesterController {
  public static async addNewSem(req: Request, res: Response | any) {
    try {
      const { name, academicYear } = req.body;
      const data = await createNewSemester(name, academicYear);
      return res.json({
        message: "semester created successfully",
        details: data,
      });
    } catch (err) {
      res.json({ message: "could not create the semster", details: err });
    }
  }

  public static async deleteSemester(req: Request, res: Response | any) {
    try {
      const id = parseInt(req.params.id);
      const data = await deleteSemesterById(id);
      return res.json({
        message: "semester deleted sucessfulyy",
        details: data,
      });
    } catch (error) {
      return res.json({ message: "could not delete semester", details: error });
    }
  }

  public static async getSemester(
    req: Request<{ id: any }>,
    res: Response | any
  ) {
    try {
      const id = parseInt(req.params.id);
      const data = await getSemesterById(id);
      return res.json({
        // message: "semester ",
        details: data,
      });
    } catch (error) {
      return res.json({ message: "could not delete semester", details: error });
    }
  }

  public static async updateSemester(req: Request, res: Response | any) {
    try {
      const { name, academicYear } = req.body;
      const id = parseInt(req.params.id);
      const data = await updateSemesterById(id, { name, academicYear });
      return res.json({
        message: "semester updated sucessfulyy",
        details: data,
      });
    } catch (error) {
      return res.json({
        message: "could not update secified semester",
        details: error,
      });
    }
  }
  public static async getAllSemester(req: Request, res: Response) {
    try {
      const data = await findAllSemestersPresent();
      res.json({ data: data });
    } catch (err) {
      res.json({ message: "could not fetch all semsesters", details: err });
    }
  }
}
