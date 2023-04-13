const hostDao = require("../models/hostDao");

const lectureInfo = async (
  lectureName,
  description,
  categoryName,
  mainImageUrl,
  detailImageUrl
) => {
  return await hostDao.lectureInfo(
    lectureName,
    description,
    categoryName,
    mainImageUrl,
    detailImageUrl
  );
};

const creatorInfo = async (userInfo) => {
  return await hostDao.creatorInfo(userInfo);
};

module.exports = { lectureInfo, creatorInfo };
