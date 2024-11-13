export const validateQuestionData = (req, res, next) => {
  const invalidReqData = "Invalid request data.";
  if (!req.body.title) {
    return res.status(400).json({
      message: `${invalidReqData} Title is required.`,
    });
  }

  if (!req.body.description) {
    return res.status(400).json({
      message: `${invalidReqData} Description is required`,
    });
  }

  if (!req.body.category) {
    return res.status(400).json({
      message: `${invalidReqData} Category is required`,
    });
  }

  if (typeof req.body.title !== "string") {
    return res.status(400).json({
      message: `${invalidReqData} Title must be a string`,
    });
  }

  if (typeof req.body.description !== "string") {
    return res.status(400).json({
      message: `${invalidReqData} Description must be a string`,
    });
  }

  if (typeof req.body.category !== "string") {
    return res.status(400).json({
      message: `${invalidReqData} Category must be a string`,
    });
  }

  next();
};
