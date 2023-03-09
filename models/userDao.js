const { appDataSource } = require("./index");

const createUser = async (email, name, kakaoid, password, phonenumber ) => {
  return appDataSource.query(
    `
    INSERT INTO users(
      email,
      name,
      kakao_id,
      password,
      phone_number,
      point
    ) VALUES (
      ?,
      ?,
      ?,
      ?,
      ?,
      1000000
    )
    `, 
    [email, name, kakaoid, password,  phonenumber]
  );
};

const getuserByEmail = async (email) => {

  const [user] = await appDataSource.query(
    `
    SELECT
    u.id,
    u.email,
    u.password
    FROM users u
    WHERE u.email=?
    `, 
    [email]
  );

  return user;
};

const checkUserbyKakaoid = async (kakaoId) => {
  const [result] = await appDataSource.query(
    `SELECT
    u.kakao_id AS kakaoId
    FROM users as u
    WHERE u.kakao_id=?`,
    [kakaoId]
  );
  return result;
};

const getUserByKakao = async(kakaoId) => {
  const user = await appDataSource.query(
    `SELECT
    u.id,
    u.name,
    u.email,
    u.password
    FROM users AS u
    WHERE u.kakao_id=?`,
    [kakaoId]
  );
  return user;
  };
module.exports = { 
  createUser,
  getuserByEmail,
  getUserByKakao,
  checkUserbyKakaoid
};