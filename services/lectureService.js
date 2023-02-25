const lectureDao = require("../models/lectureDao");

const getLectures = async (category) => {
  return lectureDao.getLectures(category);
};

module.exports = { getLectures };
