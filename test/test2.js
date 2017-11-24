function countData(data, gameName) {
  var y = 0;
  var z = false;
  while (z === false) {
    if (data[y].name != gameName) {
      y++;
    }
    else {
      z = true;
    }
  }
  return (data[y]);
}

function getGameData (gameNumber){

    var finalData = '';
    var appData1;
    var url = 'http://store.steampowered.com/api/appdetails?appids='+ gameNumber;

    http.get(url, function(response) {
      
      response.on("data", function (data) {
        finalData += data;
      });

      response.on("end", function() {
       appData1 = JSON.parse(finalData);
       console.log(appData1[gameNumber].data);
       return appData1;
      });
  
    });
  
}

else if (inputString.startsWith(test2)) {

    var getGame1 = msg.content.split(' ');
    var gameName1 = getGame1[1];
    var tempData = '';
    var tempdata1;
    var appData;
    var info = null;

    var url1 = 'https://api.steampowered.com/ISteamApps/GetAppList/v1';

    https.get(url1, function(response) {

      response.on("data", function(data) {
        tempData += data;
      });

      response.on("end", function() {
        tempdata1 = JSON.parse(tempData);
        appData = tempdata1.applist.apps.app;
        info = countData(appData, gameName1);
        msg.reply('App ID : ' + info.appid + '\nGame Name : ' + info.name);
      });
    });
  }