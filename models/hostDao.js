const { appDataSource } = require("./index");

const lectureInfo = async (
  lectureName,
  description,
  categoryName,
  mainImageUrl,
  detailImageUrl
) => {
  const queryRunner = appDataSource.createQueryRunner();
  await queryRunner.connetion();
  await queryRunner.startTransation();

  try {
    const lecture = await queryRunner.query(
      `
      INSERT INTO
        lectures(
          main_image_url,
          name,
          category_name,
          description
        )
      VALUES(
          ?,?,?,?
        )
      `,
      [mainImageUrl, lectureName, categoryName, description]
    );
    await queryRunner.query(
      `
      INSERT INTO
        detail_images(
          lecture_id,
          image_url
        )
      VALUES(
        ?,?
      )
      `,
      [lecture.inserId, detailImageUrl]
    );

    await queryRunner.commitTransaction();
  } catch (err) {
    await queryRunner.rollbackTransaction();
    throw err;
  } finally {
    await queryRunner.release();
  }
};

const creatorInfo = async (userInfo) => {
  const [result] = await appDataSource.query(
    `
    SELECT
      c.id,
      u.name,
      c.description,
      c.image_url,
      u.phone_number,
    FROM
      creators c
    iNNER JOIN
      users u
    ON
      c.id = u.creator_id
    WHERE
      u.id =?
    `,
    [userInfo]
  );
  return result;
};

module.exports = { lectureInfo, creatorInfo };
