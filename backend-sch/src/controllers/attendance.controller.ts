import {
  addAttendanceStaff,
  addAttendanceStudent,
  getAllAttendaceData,
  getOneAttendance,
  updateAttendace,
  deleteAttendace,
} from "../../services/attendance.queries";

export class AttendaceController {
  async addHandler(req, res, next) {
    try {
      const { studentId, staffId } = req.body;

      if (studentId) {
        const resp = await addAttendanceStudent(studentId);
      }

      const resp = await addAttendanceStaff(staffId);
      res
        .status(200)
        .json({ message: "Attendance added successfully", detail: resp });
    } catch (error) {
      res.status(500).json({ message: "Error adding attendance" });
    }
  }

  async getHandler(req, res) {
    try {
      const data = await getAllAttendaceData();
      return res.json({ data: data });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error fetching attendance data" });
    }
  }

  async getOneHandler(req, res) {
    try {
      const id = parseInt(req.params.id);
      const data = await getOneAttendance(id);
      return res.json({ data: data });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error fetching attendance data" });
    }
  }

  async updateHandler(req, res) {
    try {
      const id = parseInt(req.params.id);
      const resp = await deleteAttendace(id);
      return res.json({
        message: "attendance deleted successfully",
        data: resp,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error fetching attendance data" });
    }
  }

  async deleteHandler(req, res) {
    try {
      const id = parseInt(req.params.id);
      const resp = await deleteAttendace(id);
      return res.json({
        message: "attendance deleted successfully",
        data: resp,
      });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error fetching attendance data" });
    }
  }
}
