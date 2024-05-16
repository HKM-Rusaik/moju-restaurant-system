import aws from "aws-sdk";

const region = "";
const accessKeyId = "";
const secretAccessKey = "";

const s3 = new aws.S3({
    region,
    accessKeyId
})
