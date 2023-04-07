import { dynamoDB, scan, query, putItem } from "./common";

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