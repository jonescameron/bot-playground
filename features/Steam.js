//Steam Game Info
//
//constants
const Discord = require('discord.js');
const https = require('https');
const fs = require('fs');

//Global Vars
var tempDlcData="";
var gameData="";
var gameName=""; 
var appData; 
var testName="";
var trueAppID;
var completeAppData;
var dlcArray=[];
var trueDlcArray=[];
var dlcData=[];
var completeAppData1 = [];
var resultData;
var appIdArray=[];
var user="";
var arrayData="";
var trueAppID;
//global for embed reply
var dlcString="";
var metaScore="";
var name="";
var price;
var publisher="";
var genre="";
var developer="";
var releaseDate="";
var gamePic="";
//writetofile
var username="";
var userID="";
var testData="";
var trueDlcID=[];

function getIDList (callback){
  console.log('enter getGameID');
  
  // steam api url
      var url1 ='https://api.steampowered.com/ISteamApps/GetAppList/v2';
      var tempData ="";
      var tempdata1;
      
      // calls the steam url and processes
      https.get(url1, function(response) {
        
      // while response event is data, add all incoming data to tempData variable
      response.on("data", function (data) {
        tempData += data;
      });
      
      // on end event parse json and add data to appData variable
      response.on("end", function() {
        tempdata1 = JSON.parse(tempData);
        appData = tempdata1.applist.apps;
        console.log('exit getGameID');
        callback();
        
      });
    });

}

function findGameID (callback){
    
 console.log("start findGameID");
 //variables
 var i=0;
 var y=0;
// appIdArray.length=0;
 var listLength=appData.length; 
 console.log(listLength);
 
 //loop through appData
 //reset appIdArray here? try
 appIdArray=[];
   while (y<listLength) {
    var testName=appData[y].name.toLowerCase();
    var gameSearch = testName.includes(gameName);
    var cantContain = testName.indexOf('trailer') >= 0 || 
   testName.indexOf('teaser') >=0 || testName.indexOf('gameplay') >=0 ||
   testName.indexOf('footage') >=0;  
    
    //if match found add to array of id numbers to check for bad entries
    if (gameSearch && !cantContain)
    {
    appIdArray[i] = appData[y].appid;
    i++;
    }
        y++;
    }
    if (appIdArray.length==0)
    {
        appIdArray=null;
    }
    
    callback();
    console.log('matches'+appIdArray);
}
//check for multiple/bad entries
function badEntrySearch (callback){
    console.log("bad entry search");
 //variables   
var length=appIdArray.length;

var lookup = function (entryCounter) {
    console.log("starting");
    
        if (length==0)
        {
            trueAppID=appIdArray[0];
        }
        else
        {
            var IDcheck=appIdArray[entryCounter];
            var arrayData="";
            var completeAppData="";
             https.get('https://store.steampowered.com/api/appdetails?appids='+IDcheck+'&cc=au', function(response) {
    response.on("data", function (data) {
        arrayData += data;
    });
        response.on("end", function() {
            
            completeAppData = JSON.parse(arrayData);
            
             if (completeAppData[IDcheck].success == true)
             {
                 
            trueAppID=IDcheck;
            console.log('appid '+trueAppID);
         callback();
             
                 
             }
             else
        {
            lookup(entryCounter+1);
        }
        
        });
        });
        
        }
     };
     lookup(0);
}
    

   


function getGameData(callback)
{
    console.log('enter getGameData');
    gameData="";
    var tempGameData="";
    
    
    // steam api for full game details
    var url = 'https://store.steampowered.com/api/appdetails?appids='+trueAppID+'&cc=au';
    
    https.get(url, function(response) {
      response.on("data", function (data) {
        tempGameData += data;
      });
      
      response.on("end", function() {
          gameData = JSON.parse(tempGameData);
          callback();
 });
    
     }); 
}


function dlcCheck(callback)
{
    console.log('dlccheck');
    dlcArray.length=0;
    if (gameData[trueAppID].data.hasOwnProperty('dlc'))
    {
        dlcArray=gameData[trueAppID].data.dlc;
    }
    else
    {
        dlcString="No DLC";
    }
    
    callback();
    
}

function metacriticCheck(callback)
{
    console.log('metacritic check')
     if (gameData[trueAppID].data.hasOwnProperty('metacritic'))
     {
         metaScore=gameData[trueAppID].data.metacritic.score;
     }
     else
     {
         metaScore="No Metacritic Score available";
     }
    callback();
    
}



function dlcLookUp(callback)
{
    var length;
    trueDlcArray.length = 0;
    trueDlcID.length=0;
    console.log('dlc look up');
    var i=0;
    if (dlcArray!=undefined)
    {
        length=dlcArray.length;
    }
    else
    {
        length=0;
    }
    console.log(dlcArray);
    
    var counter = function (dlcCounter)
    {
    if (dlcCounter==length)
    {
        console.log(trueDlcArray);
        callback();
    }
    else
    {
        
        var tempDlcData="";
        var dlcCheckData="";
        var url='https://store.steampowered.com/api/appdetails?appids='+dlcArray[dlcCounter];
        var ID=dlcArray[dlcCounter];
         https.get(url, function(response) {
      response.on("data", function (data) {
        tempDlcData += data;
      });
    response.on("end", function(){
          //var dlcDataCheck=JSON.parse(tempDlcData);
          
          dlcCheckData=JSON.parse(tempDlcData);
          
          
           if (dlcCheckData[ID].success == true)
        console.log("!!!")
            {
            trueDlcArray[i]=dlcCheckData[ID].data.name; //array
            trueDlcID[i]=ID;
            i++
            //console.log("true"+trueDlcArray[i]);
         }
          
         counter(dlcCounter+1);
    });
         });
}
};
counter(0);
}

function checkPrice(callback)
{
    if (gameData[trueAppID].data.hasOwnProperty('price_overview'))
    {
       price=(gameData[trueAppID].data.price_overview.initial /100); 
    }
    else
    {
        price="Free Game"
    }
    callback();
}


function getGameInfo(callback)
{
    dlcString="";
    console.log('get game info');
    name=gameData[trueAppID].data.name;
    releaseDate=gameData[trueAppID].data.release_date.date;
    genre=gameData[trueAppID].data.genres[0].description;
    publisher=gameData[trueAppID].data.publishers[0];
    developer=gameData[trueAppID].data.developers;
    //price=(gameData[trueAppID].data.price_overview.initial /100);
    gamePic=gameData[trueAppID].data.header_image;
    if (trueDlcArray.length != 0){
    for (var i=0; i<trueDlcArray.length; i++)
    {
        dlcString += "\n" + [i+1] + " : " + trueDlcArray[i];
        
    }}
    else{
        dlcString = "No DLC!";
    }
    callback();
}

function embedMsg(callback)
{
    console.log('embed Msg')
    const embed = new Discord.RichEmbed()
    .setTitle(name)
    .setColor(0x00AE86)
    .addField('Release Date',releaseDate)
    //.addField(releaseDate)
    .addField('Publisher',publisher)
    //.addField(publisher)
    .addField('Developer',developer)
    //.addField(developer)
    .addField('Genre',genre)
    //.addField(genre)
    .addField('Metacritic Score',metaScore)
    //.addField(metaScore)
    .addField('Price',price)
    .addField('Store Link', 'http://store.steampowered.com/app/'+ trueAppID)
    //.addField(price)
    .addField('DLC',dlcString)
    //.addField(dlcString)
    .setImage(gamePic);
    
    console.log('msg passed'+embed+dlcString);
    callback (embed);
    
}


function embedMsgEmpty(callback)
{
    const embed = new Discord.RichEmbed()
    .setTitle('Empty Search Invalid')
    .setColor(0x00AE86)
    //.addDescription('Please enter a valid name')
    .setTimestamp();
    
    callback(embed);
    
    
    
}

function embedMsgNotFound(callback)
{
    const embed = new Discord.RichEmbed()
    .setTitle('Game not found')
    .setColor(0x00AE86)
    //.addDescription('Please enter a valid name')
    .setTimestamp();
    
    callback(embed);
}



function writeData(callback)
{
    var testSearch=fs.readFileSync('./features/textfiles/testSearch.json');
       var t1 = JSON.parse(testSearch);
       if (gameData != undefined){
         t1.push({ 'userID' : userID, 'username' : username, 'appid' : trueAppID,
         'name' : gameData[trueAppID].data.name, 'priceInitial' : price,
         'image' : gameData[trueAppID].data.header_image, 'dlc' : trueDlcID});
         fs.writeFileSync('./features/textfiles/testSearch.json', JSON.stringify(t1), 'utf8');
       }
    
    var testData="";
    
    testData=({'ID' : trueAppID, 'name' : gameData[trueAppID].data.name, 'price' : price, 'pic' : gameData[trueAppID].data.header_image, 'dlc' : trueDlcID});
       
       fs.writeFileSync('./features/textfiles/'+username+'Search.json', JSON.stringify(testData), 'utf8');
       console.log("data written")
       callback();
    
    
    
}

exports.main = function(search, callback){
    //user=msg.author.username;
  userID = search.author.id;
  username = search.author.username;
    gameName = search.search;
    console.log('search'+search.search);
    //console.log('empty?'+gameName);
    if (gameName=='!search')
    {
       embedMsgEmpty(function(searchRes){
           callback(searchRes)
       }); 
    }
    else{
    getIDList(function(){
       findGameID(function(){
           if (appIdArray==null)
           {
              embedMsgNotFound(function(searchRes){
                   console.log('exiting')
           callback(searchRes)
               });
           }
           else
           {
           badEntrySearch(function(){
              getGameData(function(){
              dlcCheck(function(){
                  
                dlcLookUp(function(){
                
                    metacriticCheck(function(){
                        checkPrice(function(){
                              getGameInfo(function(){
                                  writeData(function(){
                                  embedMsg(function(searchRes){
                                      callback(searchRes)
                  
              });
           });
       });
    });
                });
   
    });
});
});
});
}
});
    });   
    
    }
                     
}