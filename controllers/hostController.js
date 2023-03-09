const hostService = require("../services/hostService");
const { catchAsync } = require("../utils/error");

//multer를 사용하여 console로 form-data를 활용한 기능 확인, 여기서 질문! 왜 hostRouter에서 multer를 사용해서 업로드를 하는가??
const createData = catchAsync(async (req, res) => {
  console.log(req.files);
  const list = await hostService.createHost;
  return res.status(201).json({ data: list });
});

const createHost = catchAsync(async (req, res) => {
  const {
    lectureName,
    lecturePrice,
    lectureDescription,
    lectureMainImageUrl,
    creatorName,
    creatorProfileImage,
    creatorDescription,
    curriculumChapterName,
    videoName,
    videoTime,
    lectureCreatorId,
    lectureCategoryId,
    lectureStatusId,
    curriculumSequence,
    curriculumLectureId,
    videoCurriculumId,
    videoSequence,
    videoUrl,
  } = req.body;

  if (
    !lectureName ||
    !lecturePrice ||
    !lectureMainImageUrl ||
    !lectureCreatorId ||
    !lectureCategoryId ||
    !lectureStatusId ||
    !creatorName ||
    !curriculumChapterName ||
    !curriculumSequence ||
    !curriculumLectureId ||
    !videoName ||
    !videoTime ||
    !videoUrl ||
    !videoCurriculumId ||
    !videoSequence
  ) {
    const err = new Error("KEY_ERROR");
    err.statusCode = 400;
    throw err;
  }

  const createLectureList = await hostService.createLecture(
    lectureName,
    lecturePrice,
    lectureDescription,
    lectureMainImageUrl,
    creatorName,
    creatorProfileImage,
    creatorDescription,
    curriculumChapterName,
    videoName,
    videoTime,
    lectureCreatorId,
    lectureCategoryId,
    lectureStatusId,
    curriculumSequence,
    curriculumLectureId,
    videoCurriculumId,
    videoSequence,
    videoUrl
  );

  return res.status(201).json({ CREATE_LECTUR: createLectureList });
});

// const createLecture = catchAsync(async (req, res) => {
//   const { lectureName, lecturePrice, lectureMainImageUrl } = req.body;
//   const { lectureCreatorId, lectureCategoryId, lectureStatusId } = req.params;

//   if (
//     (!lectureName || !lecturePrice,
//     !lectureCreatorId || !lectureCategoryId || !lectureStatusId)
//   ) {
//     const err = new Error("KEY_ERROR");
//     err.statusCode = 400;
//     throw err;
//   }
//   const list = await hostService.createLecture(
//     lectureName,
//     lecturePrice,
//     lectureMainImageUrl,
//     lectureCreatorId,
//     lectureCategoryId,
//     lectureStatusId
//   );
//   return res.status(201).json({ data: list });
// });

// const createCreator = catchAsync(async (req, res) => {
//   const { creatorName, creatorProfileImage, creatorDescription } = req.body;
//   if (!creatorName || !creatorDescription) {
//     const err = new Error("KEY_ERROR");
//     err.statusCode = 400;
//     throw err;
//   }

//   const list = await hostService.createCreator(
//     creatorName,
//     creatorProfileImage,
//     creatorDescription
//   );
//   return res.status(201).json({ data: list });
// });

// const createCurriculum = catchAsync(async (req, res) => {
//   const { curriculumChapterName } = req.body;
//   const { curriculumSequence, curriculumLectureId } = req.params;

//   if (!curriculumChapterNam || !curriculumSequence || !curriculumLectureId) {
//     const err = new Error("KEY_ERROR");
//     err.statusCode = 400;
//     throw err;
//   }

//   const list = await hostService.createCurriculum(
//     curriculumChapterName,
//     curriculumSequence,
//     curriculumLectureId
//   );
//   return res.status(201).json({ data: list });
// });

// const createVideo = catchAsync(async (req, res) => {
//   const { videoName, videoTime } = req.body;
//   const { videoUrl } = req.formData;
//   const { videoCurriculumId, videoSequence } = req.params;

//   if (
//     !videoName ||
//     !videoTime ||
//     !videoUrl ||
//     !videoCurriculumId ||
//     !videoSequence
//   ) {
//     const err = new Error("KEY_ERROR");
//     err.statusCode = 400;
//     throw err;
//   }
//   const list = await hostService.createVideo(
//     videoName,
//     videoTime,
//     videoUrl,
//     videoCurriculumId,
//     videoSequence
//   );
//   return res.status(201).json({ data: list });
// });

module.exports = {
  createData,
};
