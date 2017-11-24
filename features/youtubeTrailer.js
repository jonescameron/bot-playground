const https = require('https');
// youtube api key
const apiKey = 'AIzaSyBx0yiC_8pgdLKgsfuHcqOarxzHeMYqAXg';
const watchUrl = 'https://www.youtube.com/watch?v='
var testUrl;

// takes game name, adds offcial trailer prefix and passes to youtube api
function getLink(gameName){
  var finalData = '';
  var search = 'offical trailer '+ gameName;

  // youtube api to search
  var url = 'https://www.googleapis.com/youtube/v3/search?part=snippet&q='+ search + '&key='+apiKey;
  //console.log(url);
  
  // https.get to submit request to api and deal with response
  https.get(url, function(response) {

  // adds data to finaldata variable while event is data
    response.on("data", function (data) {
      finalData += data;
    });
    
    // on end event parse json and get video id to end of youtube watch url
    response.on("end", function() {
     var temp = JSON.parse(finalData);
     var items = temp.items;
     console.log(items);
     testUrl = watchUrl + items[0].id.videoId;
  });

});

}

// youtube trailer main function
exports.main = function(search, callback){
  
  // log to console to check the function is called
  console.log('enter the gates');
  //var searchString = search.toString();
  //var gameName = searchString.toString().substr(searchString.indexOf(" ") + 1);
  var gameName = search.search;

  // calls function to get video url
  getLink(gameName);
  
  //after 5 seconds return the video url and send to user
  setTimeout(function(){
  callback(testUrl);
}, 5000);

};
