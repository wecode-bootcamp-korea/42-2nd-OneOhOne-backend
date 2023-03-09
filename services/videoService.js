const videoDao = require("../models/videoDao");

const getVideo = async (videoId) => {
  return videoDao.getVideo(videoId);
};

const getLectureDetails = async (lectureId) => {
  return videoDao.getLectureDetails(lectureId);
};


module.exports =  { 
  getVideo,
  getLectureDetails
};