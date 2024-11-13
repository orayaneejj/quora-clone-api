export const validateAnswerData = (req, res, next) => {
  const invalidReqData = "Invalid request data.";
  if (!req.body.content) {
    return res.status(400).json({
      message: `${invalidReqData} Content is required.`,
    });
  }
  if (typeof req.body.content !== "string") {
    return res.status(400).json({
      message: `${invalidReqData} Content must be a string`,
    });
  }
  next();
};
