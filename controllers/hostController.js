const hostService = require("../services/hostService");
const { catchAsync } = require("../utils/error");

const lectureInfo = catchAsync(async (req, res) => {
  const { lectureName, description, categoryName } = req.body;
  const { mainImageUrl, detailImageUrl } = req.file;

  if (
    !lectureName ||
    !description ||
    !categoryName ||
    !mainImageUrl ||
    !detailImageUrl
  ) {
    const error = new Error("KEY_ERROR");
    error.statusCode = 400;
    throw error;
  }

  await hostService.lectureInfo(
    lectureName,
    description,
    categoryName,
    mainImageUrl,
    detailImageUrl
  );
  return res.status(200).json({ message: `SUCCESS_CREATE_LECTURE_INFO` });
});

const creatorInfo = catchAsync(async (req, res) => {
  const userInfo = req.user;
  const data = await hostService.creatorInfo(userInfo);

  return res.status(200).json({ data });
});

module.exports = { lectureInfo, creatorInfo };
