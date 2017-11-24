const https = require('https');
// api key for sotify
const apiKey = '27ff1bdc72904e969416504297a98b4d';
var search;

// function to search spotify api for game name and return results
function getLink(gameName, type, callback){
  var finalData = '';
  var preview;
  var testUrl;
  var search;
  // search = users game name iputted in discord chat
  //console.log(type);
  if (type === 'track' || type === 'playlist'){
    search = gameName + ' soundtrack';
  }
  else if (type === 'artist' || type === 'album') {
    search = gameName;
  }
  else if (search === undefined){
    callback(null, null);
  }
  //console.log(search);
  //spotify api requires spaces be replaced with %20 or +
  var i = 0,strLength = search.length;
 
  for(i; i < strLength; i++) {
 
  search = search.replace(" ", "+");
 
  }

  //api url + search + apikey to get results
  //console.log('22 : ' + search);
  var url = 'https://api.spotify.com/v1/search?q='+ search + '&type='+type+'&client_id='+apiKey;
  //console.log(url);
  
  //use http.get to call url and get response
  https.get(url, function(response) {

  //while http is responding with "data" event get stream and add to finaldata
    response.on("data", function (data) {
      finalData += data;
    });
    
  // when the end event is sent parse recieved data and get first
  // result from the parsed json and assign to items variable
    response.on("end", function() {
     var temp = JSON.parse(finalData);
     //console.log(temp);
     var items;
     if (type === 'playlist'){
        items = temp.playlists.items[0].external_urls.spotify;
     }
     if (type === 'track'){
        items = temp.tracks.items[0].external_urls.spotify;
        preview = temp.tracks.items[0].preview_url;
        //console.log(temp.tracks.items[0]);
     }
     if (type === 'album'){
        items = temp.albums.items[0].external_urls.spotify;
     }
     if (type === 'artist'){
        items = temp.artists.items[0].external_urls.spotify;
     }
     //console.log(items);
     testUrl = items;
     callback(testUrl, preview);
  });

});

}

// musicSearch main 
exports.main = function(search, callback){
  // log to console to show its entered this function
  //console.log('enter the gates');
  var searchString = search.search;
  var typeString = searchString.split(' ');
  var type = typeString[0];
  var gameName = searchString.toString().substr(searchString.indexOf(" ") + 1);
  
  //console.log(type);
  //console.log(gameName);

  // run function passing gameName variable
  getLink(gameName, type, function(res, preview){
    callback(res, preview);
  });
  
  // return callback result after 5 seconds
  //setTimeout(function(){
  
  //}, 5000);

};
