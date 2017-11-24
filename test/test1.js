  else if (inputString.startsWith(test1)) {

    var getGame = msg.content.split(' ');
    var gameNumber = getGame[1];

    var url = 'http://store.steampowered.com/api/appdetails?appids' + gameNumber;

    http.get(url, function(response) {
      var finalData = "";

      response.on("data", function(data) {
        finalData += data.toString();
      });

      response.on("end", function() {
        msg.reply(finalData);
      });

    });



  }