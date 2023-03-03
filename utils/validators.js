const validateEmail = async (email) => {
  const emailRegex = new RegExp(
    /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/
  );

  if (!emailRegex.test(email)) {
    const err = new Error('INVALID_EMAIL');
    err.statusCode = 400;
    throw err;
  }
};

const validatePassword = async (password) => {
  const passwordRegex =new RegExp(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,20}/
  )

  if (!passwordRegex.test(password)) {
    const err = new Error('INVALID_PASSWORD');
    err.statusCode = 400;
  }
};

module.exports = { 
  validateEmail, 
  validatePassword
};