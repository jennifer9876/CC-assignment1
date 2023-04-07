import { dynamoDB } from "./common";

async function getAllMusic() {
    //Get user data
    const params = {
        TableName: 'music',
    };

    let rslt = await scan(dynamoDB, params)
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