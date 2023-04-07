import { dynamoDB, scan, query, putItem, listObjects } from "./common";

async function getAllMusic() {
    //Get user data
    const params = {
        TableName: 'music',
    };

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

        subscriptionData.push(subObj)
    }

    return subscriptionData;
}

export { getAllMusic, getAllImages, mapSubscriptionData }