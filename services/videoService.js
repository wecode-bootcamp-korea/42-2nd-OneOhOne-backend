const videoDao = require("../models/videoDao");

const getVideo = async (videoId) => {
  return videoDao.getVideo(videoId);
};

const getLectureDetails = async (lectureId) => {
  return videoDao.getLectureDetails(lectureId);
};

/*const getAllvideolist = async (lectureId) => {

  const lectureList = await videoDao.getLecturelist(lectureId);
  const curriculumList = await videoDao.getCurriculumlist(lectureId);
  const videolist = await videoDao.getVideolist(lectureId);

  const listArray = [];
  
  const videoTocurriculum = 


  

}*/

module.exports =  { 
  getVideo,
  getLectureDetails
};