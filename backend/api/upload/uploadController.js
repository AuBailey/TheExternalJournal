const aws = require('aws-sdk'),
    multer = require('multer'),
    multerS3 = require('multer-s3');

aws.config.update({
    'accessKeyId': process.env.awsAccessKey,
    'secretAccessKey': process.env.awsSecretKey
});

const s3 = new aws.S3();

// exports.upload = multer({
//   dest: '/tmp', 
//   limits : { fileSize:100000 },
//   rename: function (fieldname, filename) {
//     return filename.replace(/\W+/g, '-').toLowerCase();
//   },
//   onFileUploadData: function (file, data, req, res) {
//     // file : { fieldname, originalname, name, encoding, mimetype, path, extension, size, truncated, buffer }
//     var params = {
//       Bucket: process.env.awsUploadBucket,
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
// });

let upload = multer({
    storage: multerS3({
        s3: s3,
        bucket: process.env.awsUploadBucket,
        acl: 'public-read',
        contentType: function(req, file, cb) {
            cb(null, file.mimetype);
        },
        key: function (req, file, cb) {
            let filepath = "entry-" + req.params.entryId + "/";
            let filename = Date.now().toString() + getExtension(file.originalname);
            cb(null,  filepath + filename);
        }
    })
});

exports.uploadArray = upload.array('files');

function getExtension(filename) {
    var i = filename.lastIndexOf('.');
    return (i < 0) ? '' : filename.substr(i);
}