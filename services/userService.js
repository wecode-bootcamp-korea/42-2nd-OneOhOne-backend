const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

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

module.exports ={
  signUp,
  signIn
};