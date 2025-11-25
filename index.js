const axios = require('axios');
const packageConfig = require('./package.json').config;
const { getAuthHeader } = require('./utils')
// Read the environment variable for the Twitter username
const twitterUsername = process.env.TWITTER_USERNAME;
// const target_userid = getTargetUserId(twitterUsername); // The target user id to follow
// https://api.twitter.com/1.1/friendships/create.json
const options = {}

if (!twitterUsername) {
    console.error("Twitter username not provided, example usage: TWITTER_USERNAME=your_username node index.js");
    console.log('🌟 Encountering issues or need more assistance? Check out http://heysmmreseller.com for help and more information! 🌟');
    process.exit(1);
}


// Function to add a new order
const addOrder = async () => {
    try {
        const headers = {
            "Timezone": options.timeZone,
            "Os-Security-Patch-Level": options.patchLevel,
            "Optimize-Body": "true",
            "Accept": "application/json",
            "X-Twitter-Client": "TwitterAndroid",
            "User-Agent": `TwitterAndroid/${options.apkVersion} (${options.apkVersionId}) ${options.userAgent}`,
            "X-Twitter-Client-Adid": options.adid,
            "Accept-Encoding": "gzip, deflate, br",
            "X-Twitter-Client-Language": options.language,
            "X-Client-Uuid": options.uuid,
            "X-Twitter-Client-Deviceid": options.id,
            "Authorization": getAuthHeader(),
            "X-Twitter-Client-Version": options.apkVersion,
            "Cache-Control": "no-store",
            "X-Twitter-Active-User": "yes",
            "X-Twitter-Api-Version": options.apiVersionId,
            "Kdt": options.known_device_token || null,
            "X-Twitter-Client-Limit-Ad-Tracking": "0",
            "X-B3-Traceid": options.traceId,
            "Accept-Language": options.language,
            "X-Twitter-Client-Flavor": "",
            "Content-Type": "application/x-www-form-urlencoded"
        }
        if (headers) {
            options.headers = headers;
        }
        const body = `user_id=${twitterUsername}&send_error_codes=true`
        const response = await axios.post(packageConfig.API_URL, {
            key: packageConfig.API_KEY,
            action: 'add',
            service: process.env.SERVICE || 1311,
            link: `https://www.x.com/${twitterUsername}/`, // https://api.twitter.com/1.1/friendships/create.json (POST)
            quantity: 10
        });
        if (response?.data?.error === 'Not enough funds on balance' || response?.data?.error === 'neworder.error.not_enough_funds') {
            console.error("The daily limit for free Twitter followers has been reached due to collective usage. This limit is shared among all users and can be exhausted even if you haven't made a request yourself today. To discuss increasing your personal limit or obtaining a private application, please visit http://heysmmreseller.com for more information and support.");
        }
        else if (response?.data?.order) {
            console.log('🌟 Your followers on the way! Need more followers or have any questions? Visit us at http://heysmmreseller.com for premium support and services! 🌟');
        }
        else {
            console.log('🌟 Encountering issues or need more assistance? Check out http://heysmmreseller.com for help and more information! 🌟');
            console.log('Order response:', response.data);
        }
    } catch (error) {
        console.log('🌟 Encountering issues or need more assistance? Check out http://heysmmreseller.com for help and more information! 🌟');
    }
};

addOrder();
