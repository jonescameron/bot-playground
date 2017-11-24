//vars
const Discord = require('discord.js');
const https = require('https');
const fs = require('fs');
//const lastSearchDataFile=fs.readFileSync('./features/textfiles/Search.json');
//const searchData=JSON.parse(lastSearchDataFile);
//const gameId=searchData[0];
//const gameName=searchData[1];

const key="051D6EB0E388FD1D9AD735824833F04F";
const playersURL="https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1?appid=";
var playerCount="";
var achievementData="";
var achieveList="";
var achieveList2="";
var achievementPercentData="";
var lastSearchDataFile="";
var searchData="";
var gameId="";
var gameName="";
var achieveListArray=[];
var topTen="";
var achieveList3="";
var user="";
var pic="";
var tempAchievementData="";



exports.main = function(msg, callback){
    user = msg.author.username;
    readFile(function(){
        getAchievements(function(){
            getPlayerCount(function(){
                console.log('logging'+achievementData)
                if (achievementData==null)
                {
                    embedMsgEmpty(function (info){
                        callback(info);
                    });
                }
                else
                {
                    getAchievementPercent(function(){
                       readAchievements(function(){
                           embedMsg(function (info){
                           callback(info);
                       }); 
                    });
                });
                }
                
        });
    });

    //callback(gameName+": Total current players: "+playerCount+"\n");
   // callback("Top ten Player achievements\n"+achieveList2);
   // callback("Top ten hardest achievements\n"+achieveList3);
  
});
};



//methods

function readFile(callback)
{
    lastSearchDataFile=fs.readFileSync('./features/textfiles/'+user+'Search.json');
    searchData=JSON.parse(lastSearchDataFile);
    console.log(searchData);
    gameId=searchData.ID;
    gameName=searchData.name;
    pic=searchData.pic;
    console.log(gameId);
   callback();
    
    
    
    
}
function getPlayerCount(callback)
{
    console.log("starting");
    var arrayData="";
    var playerTotalData="";
    var tempArrayData="";
    https.get('https://api.steampowered.com/ISteamUserStats/GetNumberOfCurrentPlayers/v1?appid='+gameId, function(response) {
        response.on("data", function (data) {
            arrayData += data;
        });
        response.on("end", function() {
        tempArrayData=JSON.parse(arrayData);
        playerTotalData=tempArrayData;
        playerCount=playerTotalData.response.player_count;
        console.log("player count:"+playerCount);
        callback();
        

});
});
}

function getAchievements(callback)
//https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=051D6EB0E388FD1D9AD735824833F04F&appid=377160
//https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?gameId=377160
{
    console.log("starting acheivements");
    
   
    
    https.get('https://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?format=json&key='+key+'&appid='+gameId, function(response) {
        var arrayData="";
        response.on("data", function (data) {
        arrayData += data;
        });
        
        response.on("end", function() {
        var tempAchievementData = JSON.parse(arrayData);
   
       // console.log(arrayData);
        //if (arrayData.game != undefined)
        //if(tempAchievementData != undefined)
        if (tempAchievementData.game.hasOwnProperty('availableGameStats'))
        {
            achievementData=tempAchievementData.game.availableGameStats.achievements;
            //console.log(achievementData);
            console.log('there is data');
            callback();
        }
        else
        {
            achievementData=null;
            console.log('there is no data');
            callback();
        }
        //achievementData=tempAchievementData.game.availableGameStats.achievements;
        //console.log(achievementData.length);  //bin this
        console.log("end");
        });
    });
    
}



function getAchievementPercent(callback)
{
    console.log("starting acheivements percent");
    var arrayData="";
    var tempAchievementPercentageData="";
    https.get('https://api.steampowered.com/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v2/?gameid='+gameId, function(response) {
        response.on("data", function (data) {
        arrayData += data;
        });
        response.on("end", function() {
        tempAchievementPercentageData = JSON.parse(arrayData);
        achievementPercentData=tempAchievementPercentageData.achievementpercentages.achievements;
        console.log(achievementPercentData.length);
        callback();
        });
    });
    
}

function readAchievements(callback)
{
    achieveList2="";
    achieveList3="";
    //matches name to percent complete in order
    console.log(achievementData.length);
    var i;
    var y;
    var x=0;
    var z=0;

    //for (i=0; i<achievementData.length; i++)
    for(y=0; y<achievementPercentData.length; y++)
    {
        //for(y=0; y<achievementPercentData.length; y++)
        for (i=0; i<achievementData.length; i++)
        {
        if (achievementPercentData[y].name==achievementData[i].name)
        {
            if (y<10)
            {
            achieveList2 +=[x+1]+":"+achievementData[i].displayName+" % "+Math.round((achievementPercentData[y].percent.toFixed(4)))+"\n";
            x++;
            }
            else if (y>achievementPercentData.length-11)
            {
            achieveList3 +=[z+1]+":"+achievementData[i].displayName+" % "+Math.round((achievementPercentData[y].percent.toFixed(4)))+"\n";
            z++;
            }
        }
    }
    
    }
    callback();
    console.log(achieveList2);
    console.log(achieveList3);
    
    
    /*
    var x;
    var z;
    var b=0;
    
     for (x=0; x<10; x++)
     
    {
        for(z=0; z<achievementData.length; z++)
        {
        if (achievementPercentData[x].name==achievementData[z].name)
        {
         achieveList2 +=[x+1]+":"+achievementData[z].displayName+" % "+Math.round((achievementPercentData[x].percent.toFixed(4)))+"\n";
        }
    }
    }
    console.log(achieveList2);
    
     for ((x=achievementPercentData.length-10); (x<achievementPercentData.length); x++)
    {
        for(z=0; z<achievementData.length; z++)
        {
        if (achievementPercentData[x].name==achievementData[z].name)
        {
         achieveList3 +=[b+1]+":"+achievementData[z].displayName+" % "+Math.round((achievementPercentData[x].percent.toFixed(4)))+"\n";
         b++;
        }
    }
    }
    
    
    console.log(achieveList3);
    */
}

function embedMsg(callback)
{
    console.log('embedding');
    console.log(gameName);
    //console.log('pic is'+picTest);
    const embed = new Discord.RichEmbed()
    //.setTitle('Name '+dlcName)
    .setTitle(gameName)
    .setColor(0x00AE86)
    //.setDescription(dlcString)
    .addField('Total Players',playerCount)
    .addField('Top Ten Player Achievements',achieveList2)
    .addField('Top Ten Rarest Achievements',achieveList3)
    .setImage(pic)
    .setTimestamp();
    //.setImage(picTest);
   
    
    
    callback(embed);
}

function embedMsgEmpty(callback)
{
    console.log('empty embedding');
    const embed = new Discord.RichEmbed()
    .setTitle(gameName)
    .setColor(0x00AE86)
    .addField('Total Players',playerCount)
    .addField('Achievements','No Achievements Listed!')
    .setImage(pic)
    .setTimestamp();
    
    callback(embed);
    
}
