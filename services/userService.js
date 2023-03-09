const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const axios = require("axios");

const userDao = require('../models/userDao');
const validate = require('../utils/validators');

const signUp = async (email, password, name, kakaoid, phonenumber ) => {
  await validate.validateEmail(email);
  await validate.validatePassword(password);

  const user = await userDao.getuserByEmail(email);

  if (user) {
    const err = new Error ('DUPLICATED_EMAIL');
    err.statusCode = 401;
    throw err;
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const createUser = await userDao.createUser(
    email,
    hashedPassword,
    name,
    kakaoid,
    phonenumber
  );
  return createUser
};

const signIn = async (email, password) => {
  await validate.validateEmail(email);
  await validate.validatePassword(password);

  const user = await userDao.getuserByEmail(email);

  if (!user) {
    const err = new Error('USER_DOES_NOT_EXIST');
    err.statusCode = 400;
    throw err;
  }

  const payLoad = { userId: user.id};
  const hashedPassword = user.password;
  const checkHash = await bcrypt.compare(password, hashedPassword);

  if (!checkHash) {
    const err = new Error('INVALID_PASSWORD');
    err.statusCode = 401;
    throw err;
  }

  const secretKey = process.env.SECRET_KEY;
  return jwt.sign(payLoad, secretKey);

};

const kakaoSignin = async (kakaoToken) => {
  const getKakaoToken = await axios.get("https://kapi.kakao.com/v2/user/me",{
    headers: {
      authorization: `Bearer ${kakaoToken}`,
      "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
    },
  });

  if(!getKakaoToken){
    const error = new Error("KAKAO_TOKEN_ERROR");
    error.statusCode = 400;

    throw error
  }
 
  const { data }  = getKakaoToken;
  console.log(data)
  const kakaoid = data.id;
  const name = data.properties.nickname;
  const email = data.kakao_account.email;
  const userId = await userDao.checkUserbyKakaoid(kakaoid);

  if (!userId){ 
    const newUser = await userDao.createUser(email, name, kakaoid);

    return jwt.sign({ userId: newUser.insertId},process.env.SECRET_KEY);
  }

  return jwt.sign({userId: userId},process.env.SECRET_KEY);
};



module.exports ={
  signUp,
  signIn,
  kakaoSignin
};