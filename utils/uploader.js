const multer = require("multer");
//const mul = multer()의 기능이 필요할 것인가??
//const path = require("path");
const AWS = require("aws-sdk");
const multurS3 = require("multer-s3");
//AWS.config.loadFromPath(__dirname + "../config/awsconfig.json"); //loadFromPath path는 저장하고자하는 디렉토리에 대한 내용인것 같은데..질문해볼것
AWS.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});
const s3 = new AWS.S3();

const { upload } = multer({
  storage: multurS3({
    s3: s3,
    bucket: process.env.BUCKET,
    acl: "public-read-write",
    key: function (req, file, cb) {
      cb(null, `${Date.now()}_${path.basename(file.originalname)}`);
    },
  }),
  limits: { fileSize: 10 * 1024 * 1024 },
});

module.exports = { upload };
