import { fetchGeneralAnalytics } from "../../services/prisma.queries";

export class AnalyticsController {
  public static async getGeneralAnalytics(req: Request, res: Response | any) {
    try {
      const data = await fetchGeneralAnalytics();
      return res.json({ analytics: data }).status(200);
    } catch (error) {
      return res
        .json({
          message: "could not fetch general analytics ",
          details: error,
        })
        .status(500);
    }
  }
}
