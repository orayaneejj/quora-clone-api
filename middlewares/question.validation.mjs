export const validateQuestionData = (req, res, next) => {
  if (!req.body.title) {
    return res.status(400).json({
      message: "Title is required",
    });
  }

  if (!req.body.description) {
    return res.status(400).json({
      message: "Description is required",
    });
  }

  if (!req.body.category) {
    return res.status(400).json({
      message: "Category is required",
    });
  }

  if (typeof req.body.title !== "string") {
    return res.status(400).json({
      message: "Title must be a string",
    });
  }

  if (typeof req.body.description !== "string") {
    return res.status(400).json({
      message: "Description must be a string",
    });
  }

  if (typeof req.body.category !== "string") {
    return res.status(400).json({
      message: "Category must be a string",
    });
  }

  next();
};
