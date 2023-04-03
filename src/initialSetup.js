// import { dynamoDB, s3Bucket } from "./AWS/common";

const AWS = require('aws-sdk');
const fs = require('fs');
const https = require('https');
const path = require('path');

AWS.config.update({
    accessKeyId: 'ASIA6C7XZMF5LNXB4N6T',
    secretAccessKey: '3ZIi6wOdSdaPPjw1RZc8ozZLH8YskJdEMu07Sb5t',
    sessionToken: 'FwoGZXIvYXdzEAcaDEmufGrsWevgp+fG+iLMATSt2ikvT4xot6dIWA3xqffFqUbOTLMfZbji+SKLr8KnD9nrpJg9rgeHF1aeZ9Kc7AJ5Me4Xa+BPu41QLIYEBhNokGQSNYJb3947pFTCE6+dZkqaN7sTc6k7f/IQNDbS3SN5z7glzLobmRrJrnlzBBt1t9d4kPpe/I4+2LwmpCAGK5SvViq4e2dae03lnxZ5ApyVetcdaZ1JsfrZzCrbxswRsgKacy+NhxwOo2SCWg5+8Yv16/yxuH00dbabyLLpcLIth0GFaAvaoave8Cjjx6mhBjItjmwkptXMwbLBj1h4HSghhvm6pQtYO7/r16bXeg795RsUmHJTahesy94EozP2',
    region: 'us-east-1'
});

const dynamoDB = new AWS.DynamoDB();
const s3Bucket = new AWS.S3();

//Constants
const MUSIC_TABLE = 'music'
const BUCKET_NAME = 's3827022-test-artist-images'
const SUBSCRIBE_TABLE = 'subscribe'

async function initialSetup() {

    await deletePrevData()

    //Music Table
    let rslt = await createTableParams(MUSIC_TABLE, 'title');

    if (rslt.rc == 0) {
        await extractSongData(MUSIC_TABLE)
    } else {
        console.log("ERROR IN CREATING TABLE", rslt.msg)
    }

    //S3 Bucket
    downloadImages()
    rslt = await createS3Bucket();
    if (rslt.rc == 0) {
        await uploadImages()
    } else {
        console.log("RSLT S3 BUCKET", rslt)
    }

    //Subscribe Table
    rslt = await createTableParams(SUBSCRIBE_TABLE, 'email');
}

async function deletePrevData() {
    let rslt = await getAllData(MUSIC_TABLE)

    if (rslt.rc == 0) {
        await deleteSongData(MUSIC_TABLE, 'title', rslt.data.Items)
        await deleteDynamoTable(MUSIC_TABLE)

        rslt = await getAllData(SUBSCRIBE_TABLE)

        if (rslt.rc == 0) {
            await deleteSubscribeData(SUBSCRIBE_TABLE, 'email', rslt.data.Items)
            await deleteDynamoTable(SUBSCRIBE_TABLE)
        }
    }

    rslt = await getImageData()

    if (rslt.rc == 0) {
        await deleteImages(BUCKET_NAME, rslt.data)
        await deleteS3Bucket(BUCKET_NAME)
    }
}

async function createTableParams(table, key) {
    const tableName = table;
    const partitionKey = key;

    const params = {
        TableName: tableName,
        KeySchema: [{
            AttributeName: partitionKey,
            KeyType: 'HASH'
        }],
        AttributeDefinitions: [{
            AttributeName: partitionKey,
            AttributeType: 'S'
        }],
        ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5
        },
    };

    const rslt = await createDynamoTable(dynamoDB, params)
    return rslt
}

async function createDynamoTable(dynamoDB, params) {
    let { promise, resolve } = promisify();
    dynamoDB.createTable(params, (err, data) => {

        let rslt = {};
        if (err) {
            rslt = { rc: 1, msg: err.message };
        } else {
            rslt = { rc: 0, data: data.TableDescription.TableName };
        }
        resolve(rslt);
    });
    let rslt = await promise;
    return rslt;
}

async function extractSongData(table) {
    // Read the data from a JSON file
    let data = JSON.parse(fs.readFileSync('a1.json', 'utf8'));
    data = data.songs

    for (const songData of data) {
        const params = {
            TableName: table,

            Item: {
                'title': { S: `${songData.title}` },
                'artist': { S: `${songData.artist}` },
                'year': { S: `${songData.year}` },
                'web_url': { S: `${songData.web_url}` },
                'img_url': { S: `${songData.img_url}` }
            }
        };

        await putItem(dynamoDB, params)
    }
}

async function putItem(dynamoDB, params) {
    let { promise, resolve } = promisify();
    dynamoDB.putItem(params, (err, data) => {
        let rslt = {};
        if (err) {
            rslt = { rc: 1, msg: err.message };
            console.log("ERROR", JSON.stringify(params), "MESSAGE", err.message)
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

async function deleteSongData(table, key, data) {

    for (const item of data) {
        const params = {
            TableName: table,
            Key: {
                'title': item[key]
            }
        };
        await deleteItem(dynamoDB, params)
    }
}

async function deleteSubscribeData(table, key, data) {

    for (const item of data) {
        const params = {
            TableName: table,
            Key: {
                'email': item[key]
            }
        };
        await deleteItem(dynamoDB, params)
    }
}

async function deleteItem(dynamoDB, params) {
    let { promise, resolve } = promisify();
    dynamoDB.deleteItem(params, (err, data) => {
        let rslt = {};
        if (err) {
            rslt = { rc: 1, msg: err.message };
            console.log("ERROR", err.message)
        } else {
            rslt = { rc: 0, data: data };
        }
        resolve(rslt);
    });

    let rslt = await promise;
    return rslt;
}

async function deleteDynamoTable(tableName) {
    const params = {
        TableName: tableName,
    };

    let { promise, resolve } = promisify();
    dynamoDB.deleteTable(params, (err, data) => {
        let rslt = {};
        if (err) {
            rslt = { rc: 1, msg: err.message };
            console.log("Error in deleting the table", err.message)
        } else {
            rslt = { rc: 0, data: data };
        }
        resolve(rslt);
    });

    let rslt = await promise;
    return rslt;
}

function downloadImages() {
    const folderPath = './images';
    let data = JSON.parse(fs.readFileSync('a1.json', 'utf8'));
    data = data.songs

    let counter = 1;

    for (const songData of data) {

        if (counter < 10) counter = '0' + counter;

        const imageUrl = songData.img_url;
        const imageArr = imageUrl.split("/");
        const fileName = counter + imageArr[imageArr.length - 1];
        const filePath = path.join(folderPath, fileName);

        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath);
        }

        const file = fs.createWriteStream(filePath);
        const request = https.get(imageUrl, function(response) {
            response.pipe(file);
        });

        request.on('error', function(err) {
            console.error(err);
        });

        file.on('finish', function() {
            console.log(`File saved to ${filePath}`);
        });

        file.on('error', function(err) {
            console.error(err);
        });

        counter++;
    }
}

async function createS3Bucket() {
    const bucketName = BUCKET_NAME;

    const params = {
        Bucket: bucketName
    };

    let { promise, resolve } = promisify();
    s3Bucket.createBucket(params, (err, data) => {
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

async function getImageData() {
    const bucketName = BUCKET_NAME;

    const params = {
        Bucket: bucketName
    };

    let { promise, resolve } = promisify();
    s3Bucket.listObjects(params, (err, data) => {
        let rslt = {};
        if (err) {
            rslt = { rc: 1, msg: err.message };
        } else {
            const objectKeys = data.Contents.map((object) => object.Key);
            rslt = { rc: 0, data: objectKeys };
        }
        resolve(rslt);
    });

    let rslt = await promise;
    return rslt;
}

async function deleteImages(bucketName, contents) {

    let objArr = []

    for (const content of contents) {
        let key = { Key: content }
        objArr.push(key)
    }

    const params = {
        Bucket: bucketName,
        Delete: {
            Objects: objArr,
            Quiet: false
        }
    };

    s3Bucket.deleteObjects(params, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });
}

async function deleteS3Bucket(bucketName) {
    const params = {
        Bucket: bucketName,
    };

    s3Bucket.deleteBucket(params, (err, data) => {
        if (err) {
            console.log(err);
        } else {
            console.log(data);
        }
    });
}

async function uploadImages() {
    const folderPath = './images';

    fs.readdir(folderPath, function(err, files) {
        if (err) {
            console.error('Error reading folder:', err);
            return;
        } else {
            files.forEach(function(file) {
                const filePath = path.join(folderPath, file);
                const fileContent = fs.readFileSync(filePath);

                const params = {
                    Bucket: BUCKET_NAME,
                    Key: file,
                    Body: fileContent
                };

                s3Bucket.upload(params, function(err, data) {
                    if (err) {
                        console.error('Error uploading file:', err);
                        return;
                    }

                    console.log(`File uploaded successfully to ${data.Location}`);
                });
            });
        }

    })
}

async function getAllData(tableName) {
    const params = {
        TableName: tableName,
    };

    let rslt = await scan(dynamoDB, params)
    return rslt;
}

function promisify() {
    let resolve;
    const promise = new Promise(function(res) {
        resolve = res;
    });
    return { promise, resolve };
}

export { initialSetup }