const videoService = require("../services/videoService");
const { catchAsync } = require("../utils/error");

const getVideo = catchAsync(async (req, res) => {
  const {videoId} = req.params;
  const data = await videoService.getVideo(videoId);
  return res.status(200).json({ data });
});

const getLectureDetails = catchAsync(async (req, res) => {
  const {lectureId} = req.params;
  const data = await videoService.getLectureDetails(lectureId);
  return res.status(200).json({ data });
  
 
});

module.exports={ 
  getVideo,
  getLectureDetails
 };