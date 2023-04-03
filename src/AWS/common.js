const AWS = require('aws-sdk');

// AWS.config.update({
//     accessKeyId: 'AKIAR4MQS3CQYAJ5BXX3',
//     secretAccessKey: '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',
//     region: 'us-east-1'
// });

AWS.config.update({
    accessKeyId: 'ASIA6C7XZMF5LNXB4N6T',
    secretAccessKey: '3ZIi6wOdSdaPPjw1RZc8ozZLH8YskJdEMu07Sb5t',
    sessionToken: 'FwoGZXIvYXdzEAcaDEmufGrsWevgp+fG+iLMATSt2ikvT4xot6dIWA3xqffFqUbOTLMfZbji+SKLr8KnD9nrpJg9rgeHF1aeZ9Kc7AJ5Me4Xa+BPu41QLIYEBhNokGQSNYJb3947pFTCE6+dZkqaN7sTc6k7f/IQNDbS3SN5z7glzLobmRrJrnlzBBt1t9d4kPpe/I4+2LwmpCAGK5SvViq4e2dae03lnxZ5ApyVetcdaZ1JsfrZzCrbxswRsgKacy+NhxwOo2SCWg5+8Yv16/yxuH00dbabyLLpcLIth0GFaAvaoave8Cjjx6mhBjItjmwkptXMwbLBj1h4HSghhvm6pQtYO7/r16bXeg795RsUmHJTahesy94EozP2',
    region: 'us-east-1'
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const s3Bucket = new AWS.S3();

export { dynamoDB, s3Bucket };