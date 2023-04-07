import { dynamoDB } from "./common";

const USER_KEY = "loggedInUser"

async function getUser(email) {
    //Get user data
    const params = {
        TableName: 'login',
        KeyConditionExpression: '#pk = :pk',
        ExpressionAttributeNames: {
            '#pk': 'email'
        },
        ExpressionAttributeValues: {
            ':pk': `${email}`
        }
    };

    let rslt = await query(dynamoDB, params)
    return rslt;
}

async function getAllUsers() {
    //Get user data
    const params = {
        TableName: 'login',
    };

    let rslt = await scan(dynamoDB, params)
    return rslt;
}

async function putUser(email, username, password) {
    const params = {
        TableName: 'login',
        Item: {
            'email': `${email}`,
            'user_name': `${username}`,
            'password': `${password}`
        }
    };

    let rslt = await putItem(dynamoDB, params)
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

function promisify() {
    let resolve;
    const promise = new Promise(function(res) {
        resolve = res;
    });
    return { promise, resolve };
}

function setLocalUser(user) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
}

function getLocalUser() {
    return JSON.parse(localStorage.getItem(USER_KEY));
}

function removeLocalUser() {
    localStorage.removeItem(USER_KEY);
}


export { getUser, getAllUsers, putUser, setLocalUser, getLocalUser, removeLocalUser }