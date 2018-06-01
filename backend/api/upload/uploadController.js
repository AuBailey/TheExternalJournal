var multer = require('multer');
var AWS = require('aws-sdk');

AWS.config.update({
    'accessKeyId': process.env.accessKeyId,
    'secretAccessKey': process.env.secretAccessKey
});

var s3 = new AWS.S3();

app.use(multer({ // https://github.com/expressjs/multer
  dest: './public/uploads/', 
  limits : { fileSize:100000 },
  rename: function (fieldname, filename) {
    return filename.replace(/\W+/g, '-').toLowerCase();
  },
  onFileUploadData: function (file, data, req, res) {
    // file : { fieldname, originalname, name, encoding, mimetype, path, extension, size, truncated, buffer }
    var params = {
      Bucket: 'makersquest',
      Key: file.name,
      Body: data
    };

    s3.putObject(params, function (perr, pres) {
      if (perr) {
        console.log("Error uploading data: ", perr);
      } else {
        console.log("Successfully uploaded data to myBucket/myKey");
      }
    });
  }
}));