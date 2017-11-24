/*
 * FILENAME twitch.js
 * PURPOSE  code to retrieve the live stream of searched-for game on Twitch with the highest current views
 * AUTHOR   Cameron Jones, s3551610
 * DATE     April 2017
 * VERSION  1.0
 */
 
 const https = require('https');
 const client_id = "9eo4p05cfmatf9jluc2tw942l01uq0";    // api key
 const search_url = "https://api.twitch.tv/kraken/search/streams?query=";   // twitch api search url
 const limit = "1"; // only return one result
 
 var result_data = "";  // stores the result of the API call
 var parsed_data = '';  // stores the parsed JSON data
 var stream_url = '';   // final stream URL to return
 
 exports.getStream = function(userMessage, callback)
 {
    var gameName = userMessage.search;  // get name of game
    var url = search_url + gameName + "&limit=" + limit + "&client_id=" + client_id;    // construct API call URL
    
    stream_url = '';    // initialise return string
    
    // call the twitch API to search for requested game
    https.get(url, function(response)
    {
        // when data is retrieved
        response.on("data", function(data)
        {
           result_data = data;
        });
        
        // once all data is retrieved
        response.on("end", function()
        {
            parsed_data = JSON.parse(result_data);  // parse data and store
            //console.log(parsed_data._total);
            
            // if game not found
            if (parsed_data._total === 0)
            {
                stream_url = 'No Results';
            }
            
            else
            {
                stream_url = (parsed_data.streams[0]._links.self).toString();   // get stream URL from retrieved data
                stream_url = fixURL(stream_url);    // replace api.twitch with www.twitch
            }
        });
    });

    setTimeout(function()
    {
        callback(stream_url);   // return final URL
    }, 5000);
 };
 
 // all calls to the twitch API returned URLs in http://api.twitch.tv format.
 // this function replaces api with www so Discord can interpret it and embed the stream.
 function fixURL(apiurl)
 {
     var parsed_data = apiurl.substr(apiurl.lastIndexOf('/') + 1);
     var finalURL = 'https://www.twitch.tv/' + parsed_data;
     
     return finalURL;
 }