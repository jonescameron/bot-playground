const Discord = require('discord.io');
const https = require('https');


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
var embedmsg = new Client.message();
//resultData = new Client.message()


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
        console.log(appData.length);
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
   while (y<listLength) {
    console.log(appData[y].name); 
    
  var testName = appData[y].name.toLowerCase();
  
  // if game name doesn't match then increase counter to get next result
  if (testName != gameName){
    y++;
  }
  
  // if gamename matches save appID into appID variable
  else {
    //z = true;
    console.log(appData[y].appid);
    break;
   
  
  
  }
  }
 //  }, 50);
  appID = appData[y].appid;
  console.log(appID);
  console.log('exit countData');
  callback();
}

// use appID to get game details
function getGameData (callback){
  console.log('enter getGameData');
    var finalData = '';
    var appData1;
    
    // steam api for full game details
    var url = 'https://store.steampowered.com/api/appdetails?appids='+appID+'&cc=036';
    //console.log(url);
    
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
         
       // add check for dlc data here
       
       // add dlc appIDs to array for use in dlc function
       dlcArray = completeAppData[appID].data.dlc;
       console.log(dlcArray);
       console.log('exit getGameData');
       var d2 = true;
       callback(d2);
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
         dlcData[counter] = temp[dlcID].data.name;
         //console.log(dlcData[counter]);
         //console.log(dlcData[counter]);
         counter++;
         
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
   resultData.RichEmbed();
        //if (i === (counter - 1)){
    // resultData is the complete output of all data gained through previous functions      
      resultData.setTitle("Game Name :" + completeAppData[appID].data.name); //+ "\nGenre : " +
      //completeAppData[appID].data.genres[0]["description"] + "\nDevelopers : " +
    //completeAppData[appID].data.developers + "\nPublisher : " +
    //completeAppData[appID].data.publishers[0] + "\nPrice : $" +
    //(completeAppData[appID].data.price_overview.initial / 100) + "\nDLC : " + completeAppData1
  
  //};
  //  }
}

// main function for steamGameInfo
exports.main = function(search, callback){
  completeAppData1 = null;
  dlcData = [];
  counter = 0;
  // logs message to show function has been called
  console.log('enter the gates');
    var searchString = search.toString();
    gameName = searchString.toString().substr(searchString.indexOf(" ")
+ 1);
    
  // callbacks for each function to minimise time to get data
    getGameID(function(){
      countData(function(){
        getGameData(function(gameData){
    // if gameData is empty then stop here     
          if (gameData === false){
            console.log(gameData);
            return;
          }
    // if game data contains data then call dlc function      
          else{
          dlc(function(){
            returnData()
          })
        }})
      })
    });
    
    // timeout to return data to user
    // possibly remove and use callback to complete quicker
      setTimeout(function(){
  callback(resultData);
}, 30000);
}