const { appDataSource } = require("./index");

const createUser = async (email, password, name, kakaoid, phonenumber ) => {
  return appDataSource.query(
    `
    INSERT INTO users(
      email,
      password,
      name,
      kakao_id,
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
    [email, password, name, kakaoid, phonenumber]
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


module.exports = { 
  createUser,
  getuserByEmail
};