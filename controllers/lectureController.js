const lectureService = require("../services/lectureService");
const { catchAsync } = require("../utils/error");

const getLectures = catchAsync(async (req, res) => {
  const { category } = req.query;
  const lists = await lectureService.getLectures(category);
  return res.status(200).json({ data: lists });
});

module.exports = { getLectures };
