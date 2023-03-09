const { appDataSource } = require("./index");

const getLectures = async (category) => {
  try {
    const whereClause = category ? `WHERE l.category_name = "${category}"` : "";
    const data = await appDataSource.query(
      `SELECT
        l.id AS lectureId,
        l.name AS lectureName,
        l.price AS lecturePrice,
        l.description AS lectureDescription,
        l.main_image_url AS lectureMainImageUrl,
        u.name AS creatorName,
        l.category_name AS categoryName,
        l.create_at AS lectureCreateAt
      FROM
        lectures l
      INNER JOIN
        users u
      ON
        u.id = l.user_id
      ${whereClause}
      ORDER BY
        l.id ASC`
    );
    return data;
  } catch (err) {
    const error = new Error("INVALID_LIST");
    error.statusCode = 400;
    throw error;
  }
};

const getLecture = async (lectureId) => {
  try {
    const getLectureQuery = await appDataSource.query(
      `SELECT
        l.id AS lectureId,
        l.name AS lectureName,
        l.price AS lecturePrice,
        l.description AS lectureDescription,
        l.main_image_url AS lectureMainImageUrl,
        u.name AS creatorName,
        cr.description AS creatorDescription,
        l.category_name AS categoryName
      FROM
        lectures l
      INNER JOIN
        creators cr
      ON
        cr.id = l.creator_id
      INNER JOIN
        users u
      ON
        u.id = l.user_id
      WHERE l.id=?
  `,
      [lectureId]
    );
    return getLectureQuery;
  } catch (err) {
    console.error(err);
    const error = new Error("INAVALID_LECTURE_FOR_DETAIL_PAGE");
    error.statusCode = 400;
    throw error;
  }
};

const getDetailImage = async (lectureId) => {
  try {
    const getDetailImageQuery = await appDataSource.query(
      `SELECT
        di.lecture_id AS detailImageLectureId,
        di.sequence AS  detailImageSequence,
        di.image_url AS detailImageUrl
      FROM
        detail_images di
      INNER JOIN
        lectures l
      ON
        di.lecture_id = l.id
      WHERE l.id=?
      GROUP BY
        di.id
        `,
      [lectureId]
    );
    return getDetailImageQuery;
  } catch (err) {
    console.error(err);
    const error = new Error("INAVALID_DETAIL_IMAGE_FOR_DETAIL_PAGE");
    error.statusCode = 400;
    throw error;
  }
};

const getCurriculum = async (lectureId) => {
  try {
    const getCurriculumQuery = await appDataSource.query(
      `SELECT
        c.id AS curriculumId,
        c.chapter_name AS curriculumChapterName,
        c.sequence AS curriculumSequence
      FROM
        curriculums c
      INNER JOIN
        lectures l
      ON
        c.lecture_id = l.id
      WHERE l.id=?
      GROUP BY
        c.id
      `,
      [lectureId]
    );
    return getCurriculumQuery;
  } catch (err) {
    console.error(err);
    const error = new Error("INAVALID_CURRICULUM_FOR_DETAIL_PAGE");
    error.statusCode = 400;
    throw error;
  }
};

const getVideo = async (lectureId) => {
  try {
    const getVideoQuery = await appDataSource.query(
      `SELECT
        v.id AS videoId,
        v.name AS videoName,
        v.sequence AS videoSequence,
        c.id AS curriculumId
      FROM
        videos v
      INNER JOIN
        curriculums c
      ON
        v.curriculum_id = c.id
      INNER JOIN
        lectures l
      ON
       c.lecture_id = l.id
      WHERE l.id = ?
       GROUP BY
        v.id`,
      [lectureId]
    );
    return getVideoQuery;
  } catch (err) {
    console.error(err);
    const error = new Error("INAVALID_VIDEO_FOR_DETAIL_PAGE");
    error.statusCode = 400;
    throw error;
  }
};

module.exports = {
  getLectures,
  getLecture,
  getDetailImage,
  getCurriculum,
  getVideo,
};
