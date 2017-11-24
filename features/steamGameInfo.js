const Discord = require('discord.io');
const https = require('https');
const fs = require('fs');

// main variable for this feature
var gameName=""; 
var appData; 
var testName="";
var counter = 0;
var appID;
var completeAppData;
var dlcArray;
var dlcData = [];
var completeAppData1 = [];
var resultData;
var metaScore="";
var appIdArray=[];
var user="";

// gets the steam list of app ids and game names
function getGameID (callback){
  console.log('enter getGameID');
  
  // steam api url
      var url1 ='https://api.steampowered.com/ISteamApps/GetAppList/v2';
      var tempData = '';
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
        //console.log(appData.length);
        callback();
        //msg.reply('App ID : ' + info.appid + '\nGame Name : ' +info.name);
      });
    });

}

// searches through results from first api and gets appID
function countData(callback){
  console.log('enter countData');
  var y = 0;
  var z = false;
  var x = 0;
  
  // gets length of appData variable
  var listLength=appData.length;
  //while (z === false){
   //while (y<listLength && z===false) {
   //setInterval(function() {
   
   // loop through results to find game name
    var i=0;
   while (y<listLength) {
     //console.log('y : ' +y);
    //console.log(appData[y].name); 
    
  var testName = appData[y].name.toLowerCase();
  var gameSearch = testName.includes(gameName);
  var cantContain = testName.indexOf('trailer') >= 0 || 
  testName.indexOf('teaser') >=0 || testName.indexOf('gameplay') >=0 ||
  testName.indexOf('footage') >=0;
  
  //console.log('gamesearch : ' + gameSearch + "\ncantcontain : " + cantContain
 // + "\nname : " + appData[y].name );
 
  //this loop should store to an array???? 
  if (gameSearch && !cantContain){
    appIdArray[i] = appData[y].appid;
    //console.log(appIdArray);
    i++;
  } 
  //appIdArray = appData[y].appid
   // console.log(appID);
  //console.log('exit countData');
  // callback();
  
  //  break;
 //}
 // else {
    y++;
    
}

//console.log(appIdArray);
//console.log(appIdArray.length)
var y=0;
var i=0;

//var url = 'https://store.steampowered.com/api/appdetails?appids='+appIdArray[i]+'&cc=au';
var loopy = (function loop(i) {
  console.log('loop')
if (i<appIdArray.length) {
  console.log('searching');
  console.log('logging'+appIdArray[i]);
  var app = appIdArray[i];
  var arrayData="";
  
  https.get('https://store.steampowered.com/api/appdetails?appids='+appIdArray[i]+'&cc=au', function(response) {
    response.on("data", function (data) {
        arrayData += data;
     
      
 
      response.on("end", function() {
        var tempCompleteArrayData = JSON.parse(arrayData);
        console.log('114' + tempCompleteArrayData);
       completeAppData = tempCompleteArrayData;
       console.log('116' + completeAppData);
       
       
        if (completeAppData[app].success == true){
          var correct = appIdArray[i];
          appID = correct;
         callback();
         
          
      }
      else{
          console.log(correct);
           //i++; is this incrementing twice? yes it was
          loopy(i+1);
          
        }
         
      

      });
    
       
      });
  });
}
});

loopy(0);
}

          


// use appID to get game details
function getGameData (callback){
  console.log('enter getGameData');
    var finalData = '';
    var appData1;
    
    // steam api for full game details
    var url = 'https://store.steampowered.com/api/appdetails?appids='+appID+'&cc=au';
    console.log(url);
    
    // http.get to retreive data from steam api
    https.get(url, function(response) {

    // while response event is data, add incoming data into finalData variable 
      response.on("data", function (data) {
        finalData += data;
      });
      
    // on end event from response parse data and check for game data
    // uses the success == false is there is no game data
      response.on("end", function() {
       var tempCompleteAppData = JSON.parse(finalData);
       completeAppData = tempCompleteAppData;
       //console.log(completeAppData[appID].data.price_overview);
       if (completeAppData[appID].success == false){
         resultData = "No Game Data Found";
         // no game data d1 set to false to stop calling dlc function
          var d1 = false;
         callback(d1);
       }
       
       // if game data is found check for dlc data and either
       // return true if game data is found with dlc
       // reutrn ****** if game data but no dlc
       else{
      //check for metacritic score 
       var metaScore="N/A";
       if (completeAppData[appID].data.hasOwnProperty('metacritic')){
       var metaScore=completeAppData[appID].data.metacritic.score;
       console.log(metaScore);
       }
         
       // add check for dlc data here
       if (completeAppData[appID].data.hasOwnProperty('dlc')){
        // add dlc appIDs to array for use in dlc function
        dlcArray = completeAppData[appID].data.dlc;
        console.log(dlcArray);
        console.log('exit getGameData');
        var d2 = true;
        callback(d2);
       }
   
       else{
        resultData = "Game Name : " + completeAppData[appID].data.name + "\nGenre : " +
        completeAppData[appID].data.genres[0]["description"] + "\nDevelopers : " +
        completeAppData[appID].data.developers + "\nPublisher : " +
        completeAppData[appID].data.publishers[0] + "\n Release Date : " +
        completeAppData[appID].data.release_date.date + "\nMetacritic : " +
        metaScore +  "\nPrice : $" +
        //completeAppData[appID].data.metacritic.score + "\nPrice : $" +
        (completeAppData[appID].data.price_overview.initial / 100) + "\nDLC : No DLC";
        //(completeAppData[appID].data.price_overview.final / 100) + "\nDLC : No DLC";
        var d3 = "nodlc";
        callback(d3);
       }

       }
       //console.log(appData1[gameNumber].data);
      });

    });
}

// use steam api to get names of dlc
function dlc(callback){
  console.log('enter dlc');
    var finalData = '';
    var temp = '';

    // loop through dlcArray (holds dlc appIDs)
      if(counter < dlcArray.length){
        console.log('231 dlcArray Length : ' + dlcArray.length);
        var dlcID = dlcArray[counter];
        
        // steam game detail url
        var url = 'https://store.steampowered.com/api/appdetails?appids='+dlcID;
        console.log(url);
        
      // get dlc game details by calling api url  
      https.get(url, function(response) {

      // while response event is data, add incoming data to variable
        response.on("data", function (data) {
          finalData += data;
        });
        
      // on end event parse json and add dlc Name to dlcData array  
        response.on("end", function() {
          //console.log(finalData);
         temp = JSON.parse(finalData);
         //console.log('dlcid : ' + dlcID +'\n' + tempCompleteAppData);
         //if statement ? if to go here
         if (temp[dlcID].success == true) {
         dlcData[counter] = temp[dlcID].data.name;
         //dlcData[i] = temp[dlcID].data.name;
         //i++;
         //console.log(dlcData[counter]);
         //console.log(dlcData[counter]);
        // } then increment counter 
         counter++;
         }
         else{
           //continue;
           dlcArray.splice(counter, 1);
           //counter++;
         }
         //else here
         //continue will go to line 258? yes
         // check if counter is less than dlcArray length if true call dlc function
         if (counter < dlcArray.length){
          dlc();
         }
         
         // if counter is => dlcArray then call returnData function
         else{
           console.log('exit dlc');
           returnData();
         }
        });

      });
      }
}

// this function merges all data from other functions and outputs in single message
function returnData(){
  console.log('enter returnData');
  completeAppData1 = '';

  console.log('counter 4');
  var l = 0;
  
  // loops through dlc data and adds each result to completeAppData1
  for(var i = 0;i < counter;i++){
    //console.log('enter for');
    l++;
    completeAppData1 += "\n" + l + " : " + dlcData[i];
   }
        //if (i === (counter - 1)){
    // resultData is the complete output of all data gained through previous functions      
      resultData = "Game Name : " + completeAppData[appID].data.name + "\nGenre : " +
      completeAppData[appID].data.genres[0]["description"] + "\nDevelopers : " +
    completeAppData[appID].data.developers + "\nPublisher : " +
    completeAppData[appID].data.publishers[0] + "\nRelease date : " +
    completeAppData[appID].data.release_date.date + "\nMetacritic : " +
    completeAppData[appID].data.metacritic.score + "\nPrice : $" +
    (completeAppData[appID].data.price_overview.initial / 100) + "\nDLC : " + completeAppData1
  //};
  //  }
  console.log(resultData);
}
 
// main function for steamGameInfo
exports.main = function(search, callback){
  completeAppData1 = null;
  dlcData = [];
  counter = 0;
  var userID = search.author.id;
  var username = search.author.username;
  //var searchString;
  gameName = search.search;
  console.log(gameName);

  // logs message to show function has been called
  console.log('enter the gates');

   
  // callbacks for each function to minimise time to get data
    getGameID(function(){
      countData(function(){
        
        getGameData(function(gameData){
    // if gameData is empty then stop here     
          if (gameData === false){
            console.log(gameData);
            return;
          }
          // game has no dlc
          else if (gameData === "nodlc"){
            return;
          }
    // if game data contains data then call dlc function      
          else{
          dlc(function(){
            returnData()
          })
        }})
      });
    });
   // fs.writeFile('/features/textfiles/game.txt', resultData);
    // timeout to return data to user
    // possibly remove and use callback to complete quicker
    
      setTimeout(function(){
          console.log('test1'+completeAppData[appID].data.name)
       // fs.writeFileSync('./features/textfiles/gameText.txt', resultData);
       var testSearch=fs.readFileSync('./features/textfiles/testSearch.json');
       var t1 = JSON.parse(testSearch);
       if (completeAppData != undefined){
         t1.push({ 'userID' : userID, 'username' : username, 'appid' : appID,
         'name' : completeAppData[appID].data.name, 'priceInitial' : (completeAppData[appID].data.price_overview.initial /100),
         'image' : completeAppData[appID].data.header_image, 'dlc' : completeAppData1});
         fs.writeFileSync('./features/textfiles/testSearch.json', JSON.stringify(t1), 'utf8');
       }
       var user=username;
       var testData="";
       /*
       
       testData['ID']=appID;
       //console.log(completeAppData);
       testData['name']=completeAppData[appID].data.name;
       testData['price']=completeAppData[appID].data.price_overview.initial;
       testData['dlc']=dlcArray;
       testData['pic']= completeAppData[appID].data.header_image;
       */
       
       console.log(completeAppData[appID].data.name)
       var testData=({'ID' : appID, 'name' : completeAppData[appID].data.name, 'price' : completeAppData[appID].data.price_overview.initial, 'pic' : completeAppData[appID].data.header_image, 'dlc' : dlcArray  });
       
       fs.writeFileSync('./features/textfiles/'+user+'Search.json', JSON.stringify(testData), 'utf8');
       /*
       var DlcData=[];
       DlcData=dlcArray;
       fs.writeFileSync('./features/textfiles/'+user+'dlc.json', JSON.stringify(DlcData), 'utf8');
      */
      
 //callback(resultData);
 callback(resultData);
}, 30000);
}