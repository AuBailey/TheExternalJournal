const aws = require('aws-sdk'),
multer = require('multer'),
multerS3 = require('multer-s3');

aws.config.update({
    'accessKeyId': process.env.awsAccessKey,
    'secretAccessKey': process.env.awsSecretKey
});

const s3 = new aws.S3();

// app.use(multer({ // https://github.com/expressjs/multer
//   dest: './public/uploads/', 
//   limits : { fileSize:100000 },
//   rename: function (fieldname, filename) {
//     return filename.replace(/\W+/g, '-').toLowerCase();
//   },
//   onFileUploadData: function (file, data, req, res) {
//     // file : { fieldname, originalname, name, encoding, mimetype, path, extension, size, truncated, buffer }
//     var params = {
//       Bucket: 'makersquest',
//       Key: file.name,
//       Body: data
//     };

//     s3.putObject(params, function (perr, pres) {
//       if (perr) {
//         console.log("Error uploading data: ", perr);
//       } else {
//         console.log("Successfully uploaded data to myBucket/myKey");
//       }
//     });
//   }
// }));

exports.upload = multer({
  storage: multerS3({
      s3: s3,
      bucket: process.env.awsUploadBucket,
      metadata: function (req, file, cb) {
          cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
          cb(null, Date.now().toString())
      }
  })
});