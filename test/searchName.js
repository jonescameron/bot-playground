var https = require('https');

exports.main = function (callback){

  // steam api url
      var url1 ='https://api.steampowered.com/ISteamApps/GetAppList/v2';
      var tempData = '';
      var tempdata1;
      var gameName = 'Fallout 4';
      
      
      // calls the steam url and processes
      https.get(url1, function(response) {
        
      // while response event is data, add all incoming data to tempData variable
      response.on("data", function (data) {
        tempData += data;
      });
      
      // on end event parse json and add data to appData variable
      response.on("end", function() {
        tempdata1 = JSON.parse(tempData);
        var list = tempdata1.applist.apps;
        
        for(var i=0;i<list.length;i++){
            if(list[i].name === gameName){
               callback(list[i].appid); 
               break;
            }
        }
      });
    });

}