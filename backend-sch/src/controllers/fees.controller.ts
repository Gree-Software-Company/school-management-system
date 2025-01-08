import { Request, Response } from "express";
import {
  addNewFees,
  getFees,
  getFeeDetail,
  updateFees,
} from "../../services/fees.queries";
export class FeesController {
  // Changed to an instance method instead of static
  public async addHandler(req: Request, res: Response) {
    try {
      const feeData = req.body;
      const newFee = await addNewFees(feeData);
      res.status(201).json({ message: "fees sucessfully added", data: newFee });
    } catch (error) {
      res.status(500).json({ message: "Error adding fee", error });
    }
  }
  public async getAllHandler(req: Request, res: Response) {
    try {
      const feeData = await getFees();
      res.status(200).json({ data: feeData });
    } catch (error) {
      res.status(500).json({ message: "Error getting all fees", error });
    }
  }
  public async getOneHandler(req: Request, res: Response) {
    try {
      const id = parseInt(req.params.id);
      const fee = await getFeeDetail(id);
      res.status(200).json(fee);
    } catch (error) {
      res.status(500).json({ message: "Error getting fee", error });
    }
  }
  public async updateHandler(req: Request, res: Response) {
    try {
      const feeData = req.body;
      const id = parseInt(req.params.id);
      const newFee = await updateFees(id, feeData);
      res.status(201).json(newFee);
    } catch (error) {
      res.status(500).json({ message: "Error adding fee", error });
    }
  }
  public async deleteHandler(req: Request, res: Response) {
    try {
      const feeData = req.body;
      const newFee = await addNewFees(feeData);
      res.status(201).json(newFee);
    } catch (error) {
      res.status(500).json({ message: "Error adding fee", error });
    }
  }
}
