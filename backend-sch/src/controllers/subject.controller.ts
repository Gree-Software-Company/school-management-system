import {
  createANewSubject,
  deleteSubjectbyID,
  getAllSubjects,
  updateSujectName,
} from "../../services/prisma.queries";
import e, { Request, Response } from "express";

type ModifyRequestBody = {
  name: string;
};

type addNewRouteParams = {
  id: any;
};

export class SubjectController {
  static async getAllSubjectsPresent(req: Request, res: Response) {
    try {
      const data = await getAllSubjects();
      res.json({ subjects: data });
    } catch (err) {
      res.json({ message: "could not get subjects" }).status(500);
    }
  }

  static async addNewSubject(
    req: Request<{}, {}, ModifyRequestBody>,
    res: Response | any
  ) {
    const { name } = req.body;
    try {
      const data = await createANewSubject(name);
      return res
        .json({ message: "subject created sucesssfully", data: data })
        .status(201);
    } catch (error) {
      return res.json({ message: "could not create subject", details: error });
    }
  }

  static async deleteSubject(
    req: Request<addNewRouteParams, {}, {}>,
    res: Response
  ) {
    const id: any = parseInt(req.params.id);
    try {
      const response = await deleteSubjectbyID(id);
      res
        .json({ message: "subject deleted successfully", details: response })
        .status(201);
    } catch (error) {
      res
        .json({ message: "could not delete subject", details: error })
        .status(500);
    }
  }

  static async modifySubject(
    req: Request<addNewRouteParams, {}, ModifyRequestBody>,
    res: Response | any
  ) {
    const id = parseInt(req.params.id);
    try {
      const { name } = req.body;
      const response = await updateSujectName(name, id);
      return res
        .json({
          messge: "subject name updated sucessfully",
          details: response,
        })
        .status(201);
    } catch (error) {
      console.log(error);
      res.json({ message: "could not update subject name" }).status(500);
    }
  }
}
