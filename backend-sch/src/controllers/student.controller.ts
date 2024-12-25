import { Response, Request } from "express";
import {
  addNewFees,
  createNewStudent,
  findAllStudents,
  getStudentById,
  removeStudentById,
  updateStudentById,
} from "../../services/prisma.queries";

export class StudentController {
  public static async addStudent(req: Request, res: Response | any) {
    try {
      const { firstName, lastName, classId, gender, amount, semesterId } =
        req.body;
      const data = await createNewStudent({
        firstName,
        lastName,
        classId,
        gender,
        amount,
        semesterId,
      });
      return res.json({
        message: "student created sucessfully",
        details: data,
      });
    } catch (err) {
      return res
        .json({
          message: "could not  create sucessfully",
          details: err,
        })
        .status(500);
    }
  }
  public static async getStudent(req: Request, res: Response | any) {
    try {
      const id = parseInt(req.params.id);
      const data = getStudentById(id);
      return res.json({ data: data });
    } catch (err) {
      return res
        .json({ message: "could not get the specified student" })
        .status(500);
    }
  }
  public static async getStudents(req: Request, res: Response | any) {
    try {
      const data = await findAllStudents();

      return res.json({ data: data }).status(200);
    } catch (error) {
      return res.json({
        message: "could not find all the students ",
        details: error,
      });
    }
  }
  public static async payStudentFees(req: Request, res: Response | any) {
    try {
      const studentId = parseInt(req.params.id);
      const { amount, semesterId } = req.body;
      const data = await addNewFees(studentId, amount, semesterId);
      res.json({ message: "fee added sucesssfully", detail: data }).status(201);
    } catch (err) {
      res
        .json({ message: "could not add new fees for the specified user" })
        .status(500);
    }
  }
  public static async updateStudent(
    req: Request<{ id: any }, {}, { data: any }>,
    res: Response | any
  ) {
    try {
      const id = req.params.id;
      const { data } = req.body;
      const resp = await updateStudentById(id, data);
      res.json({ message: "user details updated", details: resp }).staus(201);
    } catch (error) {
      res.json({ message: "could not update user data", details: error });
    }
  }
  public static async deleteStudent(req: Request, res: Response | any) {
    try {
      const id = parseInt(req.params.id);
      const data = await removeStudentById(id);
      return res.json({ message: "user deleted successully", details: data });
    } catch (err) {
      return res.json({ message: "could not delete the user" }).status(500);
    }
  }
}
