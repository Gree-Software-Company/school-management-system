import {
  createNewTeacherByEmail,
  deleteUserById,
  getAllStaff,
  getTeacherById,
  updateStaffBIO,
} from "../../services/prisma.queries";
import { staffBioDataI } from "../interfaces/staff.interface";

export class StaffController {
  static async addNewTeacher(req: any, res: any) {
    const { email, firstName, lastName } = req.body;
    try {
      const data = await createNewTeacherByEmail(email, firstName, lastName);
      res
        .json({ message: "teacher created sucessfully", data: data })
        .status(201);
    } catch (err) {
      res
        .json({ message: "there was an error creating a new teacher" })
        .status(500);
    }
  }

  static async getAllStaff(req: any, res: any) {
    try {
      const data = await getAllStaff();
      res.json({ data: data }).status(201);
    } catch (err) {
      res.json({ message: "there was an error get all staff" }).status(500);
    }
  }

  static async getTeacherDetails(req: any, res: any) {
    const id = parseInt(req.params.id);
    try {
      const data = await getTeacherById(id);
      res
        .json({ message: "teacher created sucessfully", data: data })
        .status(201);
    } catch (err) {
      res
        .json({ message: "there was an error creating a new teacher" })
        .status(500);
    }
  }

  static async updateStaffProfile(req: any, res: any) {
    const id = parseInt(req.params.id);
    try {
      const {
        firstName,
        lastName,
        profileImage,
        qulifications,
      }: staffBioDataI = req.body;

      const results = await updateStaffBIO(
        { firstName, lastName, profileImage, qulifications },
        id
      );
      return res
        .json({ message: "profile updated successfully", data: results })
        .status(201);
    } catch (err) {
      res.json({
        message: "there was an error updating staff bio",
        details: err,
      });
    }
  }
  static async deleteStaffById(req: any, res: any) {
    const id = parseInt(req.params.id);
    try {
      const data = await deleteUserById(id);
      return res.json({ message: "teacher deleted successfully", data: data });
    } catch (error) {
      return res.json({ message: "could not delete the user", details: error });
    }
  }
}
