const { appDataSource } = require("./index");

const createHost = async (
  lectureName,
  lecturePrice,
  lectureDescription,
  lectureMainImageUrl,
  lectureCreatorId,
  lectureCategoryId,
  lectureStatusId
) => {
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connect();
  await queryRunner.startTransaction();

  try {
    const createLecture = await queryRunner.query(
      `
      INSERT
      INTO
        lectues l
          l.name AS lectureName,
          l.price AS lecturePrice,
          l.description AS lectureDescription,
          l.main_image_url AS lectureMainImageUrl,
          l.careator_id AS lectureCreatorId,
          l.category_id AS lectureCategoryId,
          l.status_id AS lectureStatusId
      VALUES
          (?,?,?,?,?,?,?)`,
      [
        lectureName,
        lecturePrice,
        lectureDescription,
        lectureMainImageUrl,
        lectureCreatorId,
        lectureCategoryId,
        lectureStatusId,
      ]
    );

    const createCreator = await queryRunner.query(
      `
      INSERT
      INTO
        creators cr
          cr.name AS creatorName,
          cr.description AS creatorDescription
      VLAUES
          (?,?)
    `,
      [creatorName, creatorDescription]
    );

    const createCurriculum = await queryRunner.query(
      `
      INSERT
      INTO
        curriculums cu
          cu.chapter_name AS curriculumChapterName,
          cu.sequence AS curriculumSequence,
          cu.lecture_id AS curriculumLectureId
      VALUES
          (?,?,?)
    `,
      [curriculumChapterNam, curriculumSequence, curriculumLectureId]
    );

    const createVideo = await queryRunner.query(
      `
      INSERT
      INTO
       videos v
        v.name = videoName,
        v.time = videoTime,
        v.video_url = videoUrl,
        v.curruculum_id = videoCurriculumId,
        v.sequence = videoSequence
      VALUES
        (?,?,?,?,?)
    `,
      [videoName, videoTime, videoUrl, videoCurriculumId, videoSequence]
    );
  } catch (err) {
    await queryRunner.rollbackTransaction();
    const error = new Error("FAILED_HOST_LECTURE");
    const statusCode = 400;
    throw error;
  } finally {
    await queryRunner.release();
  }
};

const getUserInfo = async () => {
  const userInfo = await appDataSource.query(
    `
    SELECT
      u.id AS userId
      u.kakao_id AS userKakaoId,
      u.name AS userName,
    FROM
      users u
    `
  );
  return userInfo;
};

const getLectureStatusInfo = async (lectureId) => {
  const lectureStatusInfo = await appDataSource.query(
    `
    SELECT
      ls.status AS lectureStatus
    FROM
      lecture_status ls
    INNER JOIN
      lectures l
    ON
      l.status_id = ls.id`
  );
  return lectureStatusInfo;
};

const getCategoryInfo = async (lectureId) => {
  const lectureCategoryInfo = await appDataSource.query(
    `
    SELECT
      ca.name AS categoryName
    FROM
      categories ca
    INNER JOIN
      lectures l
    ON
      l.category_id = ca.id`
  );
  return lectureCategoryInfo;
};

// const createLecture = async (
//   lectureName,
//   lecturePrice,
//   lectureDescription,
//   lectureMainImageUrl,
//   lectureCreatorId,
//   lectureCategoryId,
//   lectureStatusId
// ) => {
//   try {
//     return await appDataSource.query(
//       `
//       INSERT
//       INTO
//         lectues l
//           l.name AS lectureName,
//           l.price AS lecturePrice,
//           l.description AS lectureDescription,
//           l.main_image_url AS lectureMainImageUrl,
//           l.careator_id AS lectureCreatorId,
//           l.category_id AS lectureCategoryId,
//           l.status_id AS lectureStatusId
//       VALUES
//           (?,?,?,?,?,?,?)`,
//       [
//         lectureName,
//         lecturePrice,
//         lectureDescription,
//         lectureMainImageUrl,
//         lectureCreatorId,
//         lectureCategoryId,
//         lectureStatusId,
//       ]
//     );
//   } catch (err) {
//     const error = new Error("FAIL_TO_CREATE_LECTURE");
//     error.statusCode = 400;
//     throw error;
//   }
// };

// const createCreator = async (creatorName, creatorDescription) => {
//   try {
//     return appDataSource.query(
//       `
//       INSERT
//       INTO
//         creators cr
//           cr.name AS creatorName,
//           cr.description AS creatorDescription
//       VLAUES
//           (?,?)
//     `,
//       [creatorName, creatorDescription]
//     );
//   } catch (err) {
//     const error = new Error("FAIL_TO_CREATE_CREATOR");
//     error.statusCode = 400;
//     throw error;
//   }
// };

// const createCurriculum = async (
//   curriculumChapterNam,
//   curriculumSequence,
//   curriculumLectureId
// ) => {
//   try {
//     return appDataSource.query(
//       `
//       INSERT
//       INTO
//         curriculums cu
//           cu.chapter_name AS curriculumChapterName,
//           cu.sequence AS curriculumSequence,
//           cu.lecture_id AS curriculumLectureId
//       VALUES
//           (?,?,?)
//     `,
//       [curriculumChapterNam, curriculumSequence, curriculumLectureId]
//     );
//   } catch (err) {
//     const error = new Error("FAIL_TO_CREATE_CURRICULUM");
//     error.statusCode = 400;
//     throw error;
//   }
// };

// const createVideo = async (
//   videoName,
//   videoTime,
//   videoUrl,
//   videoCurriculumId,
//   videoSequence
// ) => {
//   try {
//     return appDataSource.query(
//       `
//       INSERT
//       INTO
//        videos v
//         v.name = videoName,
//         v.time = videoTime,
//         v.video_url = videoUrl,
//         v.curruculum_id = videoCurriculumId,
//         v.sequence = videoSequence
//       VALUES
//         (?,?,?,?,?)
//     `,
//       [videoName, videoTime, videoUrl, videoCurriculumId, videoSequence]
//     );
//   } catch (err) {
//     const error = new Error("FAIL_TO_CREATE_CURRICULUM");
//     error.statusCode = 400;
//     throw error;
//   }
// };
module.exports = {
  createHost,
};
