const { appDataSource } = require("./index");

const getproductInfo = async (information) => {
  try {
    return appDataSource.query(
      `SELECT
        l.id AS lectureId,
        l.name AS lectureName,
        l.price,
        c.name AS categoryName,
        ct.name AS creatorName,
        cr.name AS curriculumsName,

      FROM
        lectures l 
      INNERJOIN 
      creators cr
      ON
      cr.id 
      WHERE
        l.name LIKE "%${information}%"
      or
        l.category_id LIKE "%${information}%"
      or
        c.name LIKE "%${information}%"
      or
        cu.chapter_name LIKE "%${information}"
      
      or cr.name LIKE "%${information}",
      
      or l.price LIKE "%${information}",
      
      or lectures_status LIKE "%${information}"`
      );
  } catch (err) {
    err.statusCode = 400;
    throw err;
  }
};

module.exports = { getproductInfo };