import {
  createAGrade,
  getAllGrades,
  updateGradeById,
  getGradesById,
  deleteGradeById
} from "../../services/results.queries";

export class ResultsController {
  static async addHandler(req, res) {
    try {
      const resp = await await createAGrade(req.body);
      return res.json({ message: "grade added succesfully", data: resp });
    } catch (er) {
      return res
        .json({ message: "there was an error adding the grade" })
        .status(500);
    }
  }
  static async getAllHandler(req, res, next) {
    try {
      const resp = await getAllGrades();
      return res.json({ data: resp }).satus(200);
    } catch (err) {
      return res.json({ message: "could not add grades" }).status(500);
    }
  }
  static async deleteHandler(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const resp = await deleteGradeById(id);
      return res.json({ message: "grade deleted successfully", data: resp });
    } catch (er) {
      return res
        .json({ message: "there was an error deleting the grade" })
        .status(500);
    }
  }

  static async getOneHandler(req, res, next) {
    try {
      const id = parseInt(req.params.id);
      const resp = await getGradesById(id);
      return res.json({ data: resp }).status(200);
    } catch (err) {
      return res.json({ message: "could not retrieve the grade" }).status(500);
    }
  }
  static async updateHandler(req, res) {
    try {
      const id = await parseInt(req.params.id);
      const resp = await updateGradeById(id, req.body);
      return res.json({ message: "grade updated succesfully", data: resp });
    } catch (er) {
      return res
        .json({ message: "there was an error updating the grade" })
        .status(500);
    }
  }
}
