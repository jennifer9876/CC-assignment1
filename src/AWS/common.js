const AWS = require('aws-sdk');

// AWS.config.update({
//     accessKeyId: 'AKIAR4MQS3CQYAJ5BXX3',
//     secretAccessKey: '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',
//     region: 'us-east-1'
// });

AWS.config.update({
    accessKeyId: 'ASIA6C7XZMF5P7O5EL62',
    secretAccessKey: 'oBV1HlfudhDaqUfcfmMCyQ6/FxiPp0i3/Lv8lGUi',
    sessionToken: 'FwoGZXIvYXdzEGIaDOwusOBJuuXV3vrA8iLMAXC76h7SYRgkWV8t0EAsVjVut+VLRcjhMFMnEmxsRBwP+7P3mamrBZsXaV6VXCvLxWlpmYa/ZLE8RxtiuigphrEUidCtsT79rusB6o+/DrvGHTQibZLmD0I0zs9A3XcjQ4hn/9zgdGK2sFtXKrTOEWSxMdUMeRsvRlffeOO9pP6E9HqzdxHdhyBBQprAWU4cb9PXx42wbfnMAbhi8dMfHm+jJ5B7DBNtZMU6fP1LyageUmoTmGjTaD/D2V3i0sBRTzAQ6uIwGaP9vGxlbyiSwb2hBjItYDLzF1g4b7khqdFrIlrkLejXfTMOA0BR9yBZIEiBNn3+MRLva0SeRHasf6K1',
    region: 'us-east-1'
});

const dynamoDB = new AWS.DynamoDB.DocumentClient();
const s3Bucket = new AWS.S3();

async function putItem(dynamoDB, params) {
    let { promise, resolve } = promisify();
    dynamoDB.put(params, (err, data) => {
        let rslt = {};
        if (err) {
            rslt = { rc: 1, msg: err.message };
        } else {
            rslt = { rc: 0, data: data };
        }
        resolve(rslt);
    });

    let rslt = await promise;
    return rslt;
}

async function query(dynamoDB, params) {
    let { promise, resolve } = promisify();
    dynamoDB.query(params, (err, data) => {
        let rslt = {};
        if (err) {
            rslt = { rc: 1, msg: err.message };
        } else {
            rslt = { rc: 0, data: data };
        }
        resolve(rslt);
    });

    let rslt = await promise;
    return rslt;
}

async function scan(dynamoDB, params) {
    let { promise, resolve } = promisify();
    dynamoDB.scan(params, (err, data) => {
        let rslt = {};
        if (err) {
            rslt = { rc: 1, msg: err.message };
        } else {
            rslt = { rc: 0, data: data };
        }
        resolve(rslt);
    });

    let rslt = await promise;
    return rslt;
}

function promisify() {
    let resolve;
    const promise = new Promise(function(res) {
        resolve = res;
    });
    return { promise, resolve };
}

export { dynamoDB, s3Bucket, putItem, scan, query };