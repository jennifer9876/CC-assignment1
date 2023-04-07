import { dynamoDB, scan, query, putItem, listObjects } from "./common";

async function getAllMusic() {
    //Get user data
    const params = {
        TableName: 'music',
    };

    let rslt = await scan(params)
    return rslt;
}

async function getAllImages() {
    //Get user data
    const params = {
        Bucket: 's3827022-test-artist-images',
    };

    let rslt = await listObjects(params)
    return rslt;
}



export { getAllMusic, getAllImages }