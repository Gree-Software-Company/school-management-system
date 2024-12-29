export const errorMiddleware = async (err, req, res, next) => {
  return res.json({ message: "there was an error", details: err.message });
}
