const hostDao = require("../models/hostDao");

const createHost = async () => {
  const createHost = await hostDao.createHost(
    lectureName,
    lecturePrice,
    lectureDescription,
    lectureMainImageUrl,
    lectureCreatorId,
    lectureCategoryId,
    lectureStatusId
  );
  return createHost;
};

module.exports = { createHost };
