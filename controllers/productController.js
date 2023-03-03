const productService = require('../services/productService');
const { catchAsync } = require('../utils/error');


const getproductInfo = catchAsync(async (req, res) => {
  const { information } = req.query;
  const getuserByProducts = await productService.getproductInfo(information);
  return res.status(200).json({ data: getuserByProducts });
});

module.exports = { getproductInfo };