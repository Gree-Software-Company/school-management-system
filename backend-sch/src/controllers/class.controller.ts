import { Request, Response } from "express";
import {
  addANewClass,
  getAllClasses,
  getClassById,
  removeClassById,
  updateClass,
  updateClassTeacherById,
} from "../../services/prisma.queries";

type modifyRequestFields = {
  name: string;
  id: string;
};

export class ClassController {
  static async getAllClassPresent(req: Request, res: Response) {
    try {
      const response = await getAllClasses();

      return res.json({ data: response });
    } catch (err) {
      return res.json({
        message: "could not retrieve all classes",
        details: err,
      });
    }
  }

  static async createNewClass(
    req: Request<{}, {}, modifyRequestFields>,
    res: Response
  ) {
    try {
      const name = req.body.name;
      const teacherId = parseInt(req.body.id);
      const data = await addANewClass(name, teacherId);
      return res.json({ message: "clased added succesfully", details: data });
    } catch (err) {
      res.json({
        message: "There was an error creating the new class ",
        details: err,
      });
    }
  }
  static async viewClassDetails(
    req: Request<{ id: any }, {}, {}>,
    res: Response
  ) {
    try {
      const id = parseInt(req.params.id);
      const data = await getClassById(id);
      res.json({ data: data });
    } catch (err) {
      res
        .json({ message: "could not view class by the specified id " })
        .status(500);
    }
  }

  static async removeAClass(req: Request<{ id: any }, {}, {}>, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const data = await removeClassById(id);
      return res.json({ message: "class deleted successfully", details: data });
    } catch (err) {
      res.json({
        message: "could not delete the specified class id",
        details: err,
      });
    }
  }

  static async setClassTeacher(
    req: Request<{ id: any }, {}, { teacherId: any }>,
    res: Response
  ) {
    try {
      const id = parseInt(req.params.id);
      const teacherId = parseInt(req.body.teacherId);
      const data = await updateClassTeacherById(id, teacherId);
      return res.json({
        message: "class assigned successfully",
        details: data,
      });
    } catch (error) {
      console.log(error);
    }
  }

  static async updateClassById(req: Request, res: Response) {
    try {
      const { name, teacherId } = req.body;
      const id = parseInt(req.params.id);
      const data = await updateClass(id, { name, teacherId });
      return res.json({ message: "class updated succesfully", details: data });
    } catch (error) {
      return res.json({ message: "could not update class", details: error });
    }
  }
}
