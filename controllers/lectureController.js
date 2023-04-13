const lectureService = require("../services/lectureService");
const { catchAsync } = require("../utils/error");

const getLectures = catchAsync(async (req, res) => {
  const { category } = req.query;
  const data = await lectureService.getLectures(category);
  return res.status(200).json({ data });
});

const getLectureDetail = catchAsync(async (req, res) => {
  const { lectureId } = req.params;
  const data = await lectureService.getLectureDetail(lectureId);
  return res.status(200).json({ data });
});

module.exports = { getLectures, getLectureDetail };
