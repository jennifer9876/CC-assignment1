import { dynamoDB, scan, query, putItem, listObjects, deleteItem } from "./common";
import { getLocalUser } from "../AWS/userService";

async function getAllMusic() {
    //Get user data
    const params = {
        TableName: 'music',
    };

    let rslt = await scan(params)
    return rslt.data.Items;
}

async function getSubcribedMusic() {
    let loginInfo = getLocalUser();

    //Get user data
    const params = {
        TableName: 'subscribe',

        KeyConditionExpression: '#pk = :pk',
        ExpressionAttributeNames: {
            '#pk': 'email'
        },
        ExpressionAttributeValues: {
            ':pk': `${loginInfo.email}`
        }
    };

    let rslt = await query(params)
    return rslt.data.Items;
}

async function deleteSubscriber(title) {
    let loginInfo = getLocalUser();

    const params = {
        TableName: 'subscribe',
        Key: {
            'email': loginInfo.email,
            'title': title
        }
    };

    let rslt = await deleteItem(params)
    return rslt;
}

async function createSubscriber(title) {
    let loginInfo = getLocalUser();

    const params = {
        TableName: 'subscribe',
        Item: {
            'email': `${loginInfo.email}`,
            'title': `${title}`
        }
    };

    let rslt = await putItem(params)
    return rslt;
}

async function getQueriedData(titleText, artistText, yearText) {

    const queryValues = {
        title: `${titleText}`,
        artist: `${artistText}`,
        year: `${yearText}`
    };

    const filterExpressions = [];
    const expressionAttributeValues = {};

    Object.entries(queryValues).forEach(([attribute, value]) => {
        if (value) {
            if (attribute == 'year' && yearText) {
                let attributeTitle = "#yearVal"
                filterExpressions.push(`${attributeTitle} = :${attribute}`);

            } else {
                filterExpressions.push(`${attribute} = :${attribute}`);
            }

            expressionAttributeValues[`:${attribute}`] = value;
        }
    });


    let params = {
        TableName: 'music',
        FilterExpression: filterExpressions.join(' and '),
        ExpressionAttributeValues: expressionAttributeValues,
    };

    if (yearText) {
        params["ExpressionAttributeNames"] = {
            "#yearVal": "year"
        }
    }

    let rslt = await scan(params)
    return rslt.data.Items;
}

function getAllImages() {

    function importAll(r) {
        let images = {};
        r.keys().forEach((item, index) => { images[item.replace('./', '')] = r(item); });
        return images
    }
    const images = importAll(require.context('../images', false, /\.(png|jpe?g|svg)$/));

    return images
}

async function mapSubscriptionData() {

    let subscriptionData = []

    let allMusic = await getAllMusic()
    let subscribedMusic = await getSubcribedMusic()
    let allImages = getAllImages()

    for (let i in allMusic) {
        let subObj = {}
        const musicData = allMusic[i]

        const imageUrl = musicData.img_url;
        const imageArr = imageUrl.split("/");
        const imgFileName = imageArr[imageArr.length - 1];

        subObj["title"] = musicData.title;
        subObj["artist"] = musicData.artist;
        subObj["year"] = musicData.year;
        subObj["image"] = allImages[imgFileName];
        subObj["subscribedStatus"] = "Subscribe";

        for (let j in subscribedMusic) {
            const subscribedData = subscribedMusic[j]

            if (subscribedData.title == musicData.title)
                subObj["subscribedStatus"] = "Remove";

        }

        subscriptionData.push(subObj)
    }

    return subscriptionData;
}

export { getAllMusic, getAllImages, mapSubscriptionData, deleteSubscriber, createSubscriber, getQueriedData }