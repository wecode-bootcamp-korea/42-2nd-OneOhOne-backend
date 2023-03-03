const userService = require("../services/userService");
const { catchAsync } = require("../utils/error");

const signUp = catchAsync(async (req, res) => {
  const { email, password, name, kakakoid, phonenumber } = req.body;

  if ( !email || !password || !name  )  {
    throw new Error("KEY_ERROR!");
  }
  
  await userService.signUp(email, password, name, kakakoid, phonenumber);
  return res.status(201).json({ message: "SIGNUP_SUCCESS"});
  });

  const signIn = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      throw new Error("KEY_ERROR");
    }
    const token = await userService.signIn(email, password);

    return res.status(200).json({ message:`SIGNIN_SUCCESS!!  TOKEN_NUMBER:${token}`});
  });

  module.exports = {
    signUp,
    signIn
  };