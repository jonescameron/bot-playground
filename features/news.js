/*
 * FILENAME news.js
 * PURPOSE  code to retrieve the lastest news/update/announcement for a searched game that was published to Steam
 * AUTHOR   Cameron Jones, s3551610
 * DATE     May 2017
 * VERSION  1.0
 */
 
 const https = require('https');
 const http = require('http');
 const url_prefix = 'http://api.steampowered.com/ISteamNews/GetNewsForApp/v0002/?appid=';   // first part of URL
 const url_suffix = '&count=1&maxlength=300&format=json';   // last part of URL
 
 var result_data = "";  // stores the result of the API call
 var parsed_data = '';  // stores the parsed JSON data
 var gameName = '';     // stores name of requested game
 
 var final_url = '';    // url of news object to return
 
 exports.getNews = function(userMessage, callback)
 {
    gameName = userMessage.search;  // populate game name
    var appid;                      // Steam app ID number of game name
    
    // get app ID from game name
    getAppId(gameName, function(res)
    {
        appid = res; // appid outisde of function
        
        // get URL of most recent news item for game
        getUrl(appid, function(res)
        {
            callback(res);  // return URL to discord
        });
    });
 };
 
 // function to fetch app ID of the searched game
 function getAppId(gName, callback)
 {
    const appid_url = 'https://api.steampowered.com/ISteamApps/GetAppList/v2';
    var parsed_dataData = '';
    var parsed_dataData1;
     
    https.get(appid_url, function(response)
    {
        response.on("data", function (data)
        {
            parsed_dataData += data;
        });
        
        response.on("end", function()
        {
            parsed_dataData1 = JSON.parse(parsed_dataData);
            var list = parsed_dataData1.applist.apps;
            
            for(var i = 0; i < list.length; i++)
            {
                if(list[i].name.toLowerCase() === gName)
                {
                    callback(list[i].appid);
                }
            }
        });
    });
 }
 
 function getUrl(appid, callback)
 {
    var final_query_URL = url_prefix + appid + url_suffix;
    
    http.get(final_query_URL, function(response)
    {
       response.on("data", function(data)
       {
           result_data = data;
       }); 
       
       response.on("end", function()
       {
           parsed_data = JSON.parse(result_data);
           final_url = (parsed_data.appnews.newsitems[0].url).toString();
           
           //console.log(final_url);;
           
           callback(final_url);
       });
    });
 }