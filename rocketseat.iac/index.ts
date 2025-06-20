import * as aws from "@pulumi/aws";

const bucket = new aws.s3.BucketV2("primeiro-teste-pos-rocketseat-teste", {
    bucket: 'primeiro-teste-pos-rocketseat-teste',
    tags: {
        IAC: "true",
    }
});

export const bucketName = bucket.id;
export const bucketInfo =  bucket.bucket;
export const bucketArn  = bucket.arn;