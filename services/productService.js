const serviceDao = require("../models/productDao");

const getproductInfo = async (information) => {
 
  return serviceDao.getproductInfo(information);
};

module.exports = { getproductInfo };