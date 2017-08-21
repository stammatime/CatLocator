var Twit = require('twit');
//You will need to create a config file similar to ./config_example for this to work
var config = require('./config');

function getSinkInfo(callback){

    var T = new Twit({
    consumer_key:         config.twitter.consumerKey,
    consumer_secret:      config.twitter.consumerSecret,
    app_only_auth:        true,
    timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests. 
    })
    var x;
    T.get('statuses/user_timeline', { screen_name: 'isacatinthesink', count: 1 }, (err, data, response) => {
    // console.log(data[0].created_at);
    // console.log(data[0].text);
    // console.log(data[0].entities.media[0].url);
    return callback(data[0]);
    })

}

exports.getSinkInfo = getSinkInfo;