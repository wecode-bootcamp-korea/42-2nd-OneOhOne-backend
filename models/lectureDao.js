const { appDataSource } = require("./index");

const getLectures = async (category) => {
  try {
    const whereClause = category ? `WHERE ca.name = "${category}"` : "";
    const data = await appDataSource.query(
      `SELECT
        l.id AS lectureId,
        l.name AS lectureName,
        l.price AS lecturePrice,
        l.description AS lectureDescription,
        l.main_image_url AS lectureMainImageUrl,
        cr.name AS creatorName,
        ca.name AS categoryName,
        ls.status AS lectureStatus,
        l.create_at AS lectureCreateAt
      FROM
        lectures l
      INNER JOIN
        creators cr
      ON
        cr.id = l.creator_id
      INNER JOIN
        categories ca
      ON
        ca.id = l.category_id
      INNER JOIN
        lecture_status ls
      ON
        ls.id = l.status_id
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

module.exports = { getLectures };
