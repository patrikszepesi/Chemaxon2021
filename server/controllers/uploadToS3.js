//could use import instead of require, but didnt want .mjs files or other configurations
const AWS = require("aws-sdk");
const { nanoid } = require("nanoid");


const awsConfig = {
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
  apiVersion: process.env.AWS_API_VERSION,
};


const S3 = new AWS.S3(awsConfig);

//could use export const with .mjs file
exports.uploadDocument = async (req, res) => {
  try {
    const base64 = req.body.result;


    // prepare document
    const base64Data = Buffer.from(base64.replace(/^data:application\/\w+;base64,/, ""), "base64");


    // document params
    const params = {
      Bucket: "vidz-online",
      Key: `${nanoid()}`,
      Body: base64Data,
      ACL: "public-read",
      ContentEncoding: "base64",
      contentType: "application/json",
    };

    // upload to s3
    S3.upload(params, (err, data) => {
      if (err) {
        console.log(err);
        return res.sendStatus(400);
      }
      res.send(data);
    });
  } catch (err) {
    console.log(err);
  }
};
