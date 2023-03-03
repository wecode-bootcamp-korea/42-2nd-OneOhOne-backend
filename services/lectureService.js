const lectureDao = require("../models/lectureDao");

const getLectures = async (category) => {
  return lectureDao.getLectures(category);
};

const getLectureDetail = async (lectureId) => {
  let lectureDetail = {};

  const lectureData = await lectureDao.getLecture(lectureId);
  const detailImages = await lectureDao.getDetailImage(lectureId);
  const curriculums = await lectureDao.getCurriculum(lectureId);
  const videos = await lectureDao.getVideo(lectureId);

  lectureDetail = lectureData[0];
  lectureData[0].detailImages = detailImages;
  lectureDetail.curriculums = curriculums[0];
  curriculums[0].videos = videos;

  const curriculumsWithVideos = curriculums.map((curriculum) => {
    const videosForCurriculum = videos.filter((video) => {
      return video.curriculumId === curriculum.curriculumId;
    });
    curriculum.videos = videosForCurriculum;
    return curriculum;
  });
  lectureDetail.curriculums = curriculumsWithVideos;

  return lectureDetail;
};

module.exports = { getLectures, getLectureDetail };
