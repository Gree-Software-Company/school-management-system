import {
  createNewTeacherByEmail,
  getTeacherById,
} from "../../services/prisma.queries";

export class StaffController {
  static async addNewTeacher(req: any, res: any) {
    const { email } = req.body;
    try {
      const data = await createNewTeacherByEmail(email);
      res
        .json({ message: "teacher created sucessfully", data: data })
        .status(201);
    } catch (err) {
      res
        .json({ message: "there was an error creating a new teacher" })
        .status(500);
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

  static async updateTeacherProfile(req: any, res: any) {}
}
