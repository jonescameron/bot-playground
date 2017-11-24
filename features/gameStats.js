//variables

const Discord = require("discord.js");
// https://github.com/IonicaBizau/scrape-it
const scrapeIt = require("scrape-it");

//main function
exports.main = function(msg,callback){
    
    //read local file
    var fs = require('fs');
    var testSearch=fs.readFileSync('./features/textfiles/testSearch.json');
    var fileData = JSON.parse(testSearch);
    
    //var searchString = msg.search.toString();
    var gameName = msg.search.toString().substr(msg.search.indexOf(" ")+ 1);
    var tempType = msg.search.split(' ');
    var statType = tempType[0];
    //console.log("19 : " + msg.search);
    
    switch (statType){
        case 'last' :
            lastStat(fileData,function(res){
                callback(res);   
            });
            break;
            
        case 'top' :
            topStat(fileData, function(res){
                callback(res);
            });
            break;
            
        case 'fact' :
            factStat(gameName, function(res){
                callback(res);
            });
            break;
            
        default :
            callback('error');
            break;
    }
   
}

function lastStat(fileData,callback){
    var length = fileData.length - 1;
    var title = 'Last Search';
    var gameName = fileData[length].name;
    messageEmbed(title, gameName, fileData[length], function(res){
       callback(res); 
    })
    
}

function topStat(fileData, callback){
    var title = 'Top Searches';
    var statsData = {};
    var data1 = []
    var groupBy = 'appid';
    var temp = 0;
    for (var i=0;i < fileData.length;i++){
        if (!statsData[fileData[i][groupBy]]){
            statsData[fileData[i][groupBy]] = [];
    		statsData[fileData[i][groupBy]].push({'appid' : fileData[i].appid, 'name' : fileData[i].name, 'count' : 0});
    		data1.push({'appid' : fileData[i].appid, 'name' : fileData[i].name, 'count' : 0});
        }
        temp++;
    }
    while (temp == fileData.length){
            temp++;
            countTopStat(data1, fileData, function(res){
                res = res.sort(function (a, b) {
                    return b.count - a.count;
                });
                messageEmbed(title, null, res, function(res){
                    callback(res);
                //callback(res);
            })
        })
    }
    
    //messageEmbed(title, null, statsData, function(res){
    //    callback(res);
    //})
    
}

function countTopStat(statsData, fileData, callback){
    var temp = 0;
    //console.log(statsData);
    //statsData = JSON.parse(statsData);
    //var length = Object.keys(statsData).length;
    //console.log('stats : ' + statsData[0].appid + '\nfileData : ' + fileData[0].appid);
    for (var i=0;i < statsData.length;i++){
        var appid = statsData[i].appid;
        for (var j=0; j < fileData.length;j++){
            if (fileData[j].appid == appid){
                statsData[i].count = statsData[i].count + 1;
            }
        }
       temp++;
       //console.log(temp);
       if (temp == statsData.length){
           callback(statsData);
        }
    }
}

function factStat(gameName, callback){
    var title = 'Random Fact';
    var gn = gameName;
    if (gameName != 'fact'){
        gameName = gameName.replace(/\s+/g, '');
        scrapeIt("https://www.vgfacts.com/game/" + gameName + "/", {
    facts: {
        listItem : ".triviabox",
        data : {
           fact : ".trivia-content"
       }
    }
}).then(page => {
    if (page.facts.length > 0){
    var random = Math.floor((Math.random() * page.facts.length));
    messageEmbed(title, gn, page.facts[random].fact, function(res){
                    callback(res);
    })
    }
    else {
        messageEmbed(title, gn, null, function(res){
                    callback(res);
    })
    }
});
}
else {
    callback('no gameName');
}
}

function messageEmbed(title, gameName,data, callback){
    var description = '';
    var image = '';
    if (title === 'Last Search'){
        description = 'The Last Searched Game';
        var embedTextTitle = '\n'+title;
        var embedTextData = '\nAppid : ' + data.appid + '\nGame Name : ' + gameName + 
  '\nUser : ' + data.username;
    image = data.image;
  
    }
    if (title === 'Top Searches'){
        description = 'The Top Searched Game';
        var embedTextTitle = '\n'+title;
        var embedTextData = '\n1 : ' + data[0].name + '\nTimes Searched : ' + data[0].count
        + '\n\n2 : ' + data[1].name + '\nTimes Searched : ' + data[1].count +
        '\n\n3 : ' + data[2].name + '\nTimes Searched : ' + data[2].count + 
        '\n\n4 : ' + data[3].name + '\nTimes Searched : ' + data[3].count +
        '\n\n5 : ' + data[4].name +  '\nTimes Searched : ' + data[4].count;
        image = null;
    }
    if (title === 'Random Fact'){
        if (data != null){
        description = 'Game Random Fact';
        var embedTextTitle = '\n'+title + ' - ' +gameName;
        var embedTextData = data + '\n\nFacts provided by : https://www.vgfacts.com';
        image = null;
        }
        else{
            var embedTextData = 'no facts';
        }
    }
    if (embedTextData !=null){
//https://yorkaargh.gitbooks.io/discord-js-bot-guide/content/samples/using-embeds-in-messages.html    
  const embed = new Discord.RichEmbed()
  //.setTitle(title)
  //.setAuthor('GabenSoul', 'http://i.imgur.com/ONMlTYL.jpg')
  /*
   * Alternatively, use '#00AE86', [0, 174, 134] or an integer number.
   */
  .setColor(0x2eb82e)
  //.setDescription(description)
  //.setFooter('This is the footer text, it can hold 2048 characters', 'http://i.imgur.com/w1vhFSR.png')
  .setImage(image)
  //.setThumbnail(data.image)
  /*
   * Takes a Date object, defaults to current date.
   */
  .setTimestamp()
  //.setURL('https://discord.js.org/#/docs/main/indev/class/RichEmbed')
  .addField(embedTextTitle,embedTextData)
  /*
   * Inline fields may not display as inline if the thumbnail and/or image is too big.
   */
  //.addField('Inline Field', 'They can also be inline.', true)
  /*
   * Blank field, useful to create some space.
   */
  //.addField('\u200b', '\u200b', true)
  //.addField('Inline Field 3', 'You can have a maximum of 25 fields.', true);
  
  callback(embed);}
  else{
      callback(null);
  }
}