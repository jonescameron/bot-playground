//testing for Steam Search
const Discord = require('discord.io');
const https = require('https');
const client = new Discord.Client();

client.on('message', function(search) {

  if (search.content.startsWith("!test3")) {
    //var getGame = search.content.split(' '); // need a space
    //var game=getGame[1];
    //var replyMsg = "retreiving info"
    //replyMsg.embeds.url("https://api.steampowered.com/ISteamUser/GetPlayerSummaries/v2/?key=051D6EB0E388FD1D9AD735824833F04F&steamids=76561197960361544")
    //search.reply("Search for " +game );
    //search.channel.sendMessage("Searching for "+game);
    //search.channel.sendMessage(replyMsg);
    var appid = 72850;
    var gameinfo = "";
    var urltest = 'https://store.steampowered.com/api/appdetails?appids=';// + appid;
    //var urltest='https://store.steampowered.com/api/appdetails?appids=489830'
    var temp = "";
    var temp1 = "";
    var i = 0
    var dlc = "";
    var dlctemp="";
    var dlcid="";
    var urldlc='https://store.steampowered.com/api/appdetails?appids='
    var loopurl="";
    var length;
    var array=[];


    https.get(urltest + appid, function(response) {
        response.on("data", function(data) {
          temp1 += data;
        });


        response.on("end", function() {
            gameinfo = JSON.parse(temp1);
            search.reply(gameinfo[appid].data.name);
            search.reply(gameinfo[appid].data.genres[0]["description"]);
            search.reply(gameinfo[appid].data.developers);
            search.reply(gameinfo[appid].data.publishers[0]);
            search.reply(gameinfo[appid].data.price_overview.initial);
            //length=gameinfo[appid].data.dlc.length;
            //var i = 0;
            //console.log(length);
            //if( i < length){

           //for (let i = length; i > 0; i--) {
              //while (i<length){
              //gameinfo[appid].data.dlc[i]);
              //urldlc='https://store.steampowered.com/api/appdetails?appids='
              //dlcid = gameinfo[appid].data.dlc[i];
              //array=gameinfo[appid].data.dlc[i];
              //loopurl=urldlc+dlcid
              //console.log('dlcid is : ' + dlcid);
              
              
            
              //https.get(loopurl, function(response) {
               //   response.on("data", function(data) {
                //    dlctemp += data;
               //   });
                  
                //  response.on("end", function() {
                  
                  //  dlc = JSON.parse(dlctemp);
                    //console.log('dlc : ' + dlctemp.toString());
                    //dlcid = dlc[appid].data.dlc[i];
                    //while (dlc != ""){
                      //console.log(dlc);
                  //  search.reply(dlc[dlcid].data.name);
                  
                     
              
                    
                  

                    //}

                  });
                })
            //i++;
              
              
            

          
  }
    })