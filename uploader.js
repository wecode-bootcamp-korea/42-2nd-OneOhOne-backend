const AWS = require("aws-sdk"); // AWS SDK를 가져옴
const multer = require("multer"); // 파일 업로드를 위한 multer 모듈을 가져옴
const multerS3 = require("multer-s3"); // AWS S3에 파일을 업로드하기 위한 multer-s3 모듈을 가져옴
const uuid = require("uuid4"); // 파일 이름 중복을 방지하기 위한 uuid 모듈을 가져옴

AWS.config.update({
  region: "ap-northeast-2", // AWS S3 버킷이 위치한 지역을 설정
  accessKeyId: process.env.S3_ACCESS_KEY, // AWS S3 엑세스 키를 환경 변수에서 가져옴
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY, // AWS S3 시크릿 엑세스 키를 환경 변수에서 가져옴
});

const s3 = new AWS.S3(); // AWS S3 객체를 생성

const storage = multerS3({
  s3, // AWS S3 객체를 사용
  acl: "public-read", // 업로드된 파일이 public-read로 설정됨
  bucket: "s3test-my-bucket", // 업로드할 AWS S3 버킷 이름
  contentType: multerS3.AUTO_CONTENT_TYPE, // 업로드된 파일의 컨텐츠 타입을 자동으로 설정
  key: (req, file, cb) => {
    // 업로드된 파일의 이름을 설정
    cb(null, Date.now().toString() + uuid() + file.originalname); // 현재 시간과 uuid, 파일 원래 이름을 조합하여 파일 이름을 생성
  },
});

const upload = multer({
  storage, // 파일 업로드를 위한 storage 객체를 사용
  defaultValue: { path: "", mimetype: "" }, // 기본값으로 path와 mimetype을 빈 문자열로 설정
});

const deleteImage = (fileKey) => {
  // AWS S3에서 파일을 삭제하는 함수
  s3.deleteObject(
    {
      Bucket: "s3test-my-bucket", // 삭제할 파일이 있는 AWS S3 버킷 이름
      Key: fileKey, // 삭제할 파일의 이름
    },
    (err, data) => {
      // 삭제 결과를 처리하는 콜백 함수
      if (err) {
        // 에러가 발생한 경우
        throw err; // 에러를 던짐
      } else {
        // 에러가 발생하지 않은 경우
        console.log("Image Deleted"); // "Image Deleted" 메시지를 출력
      }
    }
  );
};

module.exports = { upload, deleteImage }; // upload와 deleteImage 함수를 모듈로 내보냄
