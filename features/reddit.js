const https = require('https');
var redditKeyword;
var redditFinalWord;
var redditFinalWord1;

// main function
function getRedditPosts(callback) {
    var url = "https://www.reddit.com/r/" + redditFinalWord + "/hot/.json?limit=0";
    console.log(url);
    
    // request API
    https.get(url, function(response) {
        var json = '';
        response.on('data', function(data) {
            json += data;
          
        });
        
        // retrieve URL 
        response.on('end', function(data) {
            var redditResponse = JSON.parse(json);
            console.log("0 https://www.reddit.com" + redditResponse.data.children[0].data.permalink);
            callback("https://www.reddit.com" + redditResponse.data.children[0].data.permalink);
            
            
        });
      
    });
  
  
}

// retrieve keyword
exports.main = function (search,callback){
    
    var redditKeyword2 = search.search;
    redditKeyword = redditKeyword2.replace(" ", "+");
    var i = 0, strLength = redditKeyword.length;
    for(i; i < strLength; i++) {
      
        // replace space with plus and remove dot for correct API search
        redditFinalWord1 = redditKeyword.replace(" ", "+");
        redditFinalWord = redditFinalWord1.replace(".", "+");
      
    }
    
    if (redditFinalWord == "!reddit") {
        
        callback("No keyword found, try again");
    } else {
    // call the main function
    getRedditPosts(callback);
    
    }
    
};