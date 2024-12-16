export class HomeController {
  static async home(req: Request | any, res: Response | any) {
    return res.json({ message: "hello"});
  }
}
