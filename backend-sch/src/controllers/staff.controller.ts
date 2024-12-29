import {
  createNewNonTeachingStaff,
  createNewTeacherByEmail,
  deleleteNonTeachingStaffById,
  deleteUserById,
  getAllNonTeachingStaff,
  getAllStaff,
  getNonTeachingStaffById,
  getTeacherById,
  updateNonTeachingStaffById,
  updateNonTeachingStafProfileById,
  updateStaffBIO,
  updateTeacherById,
} from "../../services/prisma.queries";
import {
  CreateException,
  DeleteException,
  GetDataException,
  NotFoundException,
  UpdateException,
} from "../errors/error.handler";
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
      res.json({ staff: data }).status(201);
    } catch (err) {
      console.log(err);
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
  static async updateStaffById(req: any, res: any) {
    const id = parseInt(req.params.id);

    try {
      const { email, firstName, lastName } = req.body;
      const updateFields = { email, firstName, lastName };
      const data = await updateTeacherById(id, updateFields);
      res
        .json({ message: "Staff updated sucessfully", data: data })
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
      res
        .json({
          message: "there was an error updating staff bio",
          details: err,
        })
        .status(500);
    }
  }
  static async deleteStaffById(req: any, res: any) {
    const id = parseInt(req.params.id);
    try {
      const data = await deleteUserById(id);
      return res.json({ message: "teacher deleted successfully", data: data });
    } catch (error) {
      return res
        .json({ message: "could not delete the user", details: error })
        .status(500);
    }
  }

  static async addNewNonTeachinStaff(req, res, next) {
    const { email, role } = req.body;

    try {
      const data = await createNewNonTeachingStaff(email, role);
      return res.json({ message: "staff created sucessfully", detils: data });
    } catch (err) {
      return next(new CreateException());
    }
  }

  static async updateNonTeachingStaff(req, res, next) {
    const id = parseInt(req.params.id);
    const { email, role } = req.body;
    try {
      const data = await updateNonTeachingStaffById(id, { email, role });

      return res.json({ message: "staff updated successfully", detils: data });
    } catch (err) {
      return next(new UpdateException());
    }
  }

  static async deleteNonTeachingStaff(req, res, next) {
    const id = parseInt(req.params.id);
    try {
      const data = await deleleteNonTeachingStaffById(id);
      return res.json({ message: "staff deleted successfully", detils: data });
    } catch (err) {
      return next(new DeleteException());
    }
  }

  static async getAllNonTeachingStaff(req, res, next) {
    try {
      const data = await getAllNonTeachingStaff();
      return res.json({ data: data });
    } catch (err) {
      return next(new GetDataException());
    }
  }

  static async getNonTeachingStaffById(req, res, next) {
    const id = parseInt(req.params.id);
    try {
      const data = await getNonTeachingStaffById(id);
      return res.json({ data: data });
    } catch (err) {
      return next(new GetDataException());
    }
  }

  static async updateNonTeachingStaffProfile(req, res, next) {
    const id = parseInt(req.params.id);

    try {
      const data = await updateNonTeachingStafProfileById(id, req.body);
      return res.json({
        message: "profile updated succesfully",
        details: data,
      });
    } catch (error) {
      return next(new UpdateException());
    }
  }
}
