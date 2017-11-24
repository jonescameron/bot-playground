const Discord = require('discord.js');

exports.main = function (userMessage, callback) {
    var messageString = userMessage.search;
    var commandString = messageString.split(' ');
    var feature = commandString.toString().substr(commandString.indexOf(" ") + 1);
  
    // investigate use of embeded message
    var prefix = "All text commands use a prefix !";
    var time = "time [name of capital city in Australia] [24 (optional shows 24hour time)]";
    var stats = "stats [top, last, fact] [Gamename (used with fact only)]";
    var soundtrack = "soundtrack [playlist, artist, album, track] [gameName / artist name / album name / song name]";

    //
    var search = "Search [Gamename], displays a list of information relating to the game";
    var info= "info, After search results displayed - displays player count and achievement rankings";
    var dlc1="dlc1, After search results displayed - displays available DLC and price";
    var currency="currency, After search results displayed - converts the price to Australian dollars.";
    //
    var australian = "Syntax : !australian [number] - number is the ammount of currency in AUD to convert to USD";
    var american = "Syntax : !american [number] - number is the ammount of currency in USD to convert to AUD";
    var rates = "Syntax : !rates - present worth of 1 AUD in USD and 1 USD in AUD";
    var reddit = "Syntax : !reddit [name] - name - game name to serach on reddit.com; returns URL";
    var youtube = "Syntax : !youtube [name] - name - game name to serach on youtube.com; returns URL";
    
    //
    var help = {'prefix1' : prefix, 'time' : time, 'stats' : stats, 'soundtrack' : soundtrack,
        'search' : search, 'info' : info, 'dlc1' : dlc1, 'currency' : currency, 
        'australian' : australian, 'american' : american, 'rates' : rates, 'reddit' : reddit,
        'youtube' : youtube };
    
    if (feature === '!help'){
        embedMsg(help, function(data){
            callback(data);
    })
    }
    else{
        helpInfo(help, feature, function(data){
            callback(data);
        })
    }

    //callback(help);
}


function embedMsg(help, callback)
{
    var num = Math.floor(Math.random() * 900000) + 100000;
    
   const embed = new Discord.RichEmbed()
    //.setTitle()
    .setTitle('Bot Commands')
    .setColor('#'+num)
    .setDescription('A list of commands to use with our Bot')
    .addField('Prefix ',help.prefix1)
    .addField('Commands', 'time' + '\nstats' + '\nsoundtrack' +  '\nsearch' + 
     '\ninfo' + '\ndlc1' + '\ncurrency' + '\naustralian' + '\namerican' + 
     '\nrates' + '\nreddit' + '\nyoutube')
    .addField('More Info', 'To see how to use each command type !help [command]')
    .setTimestamp()
    .setImage();
    
    callback(embed);
}

function helpInfo(help, command, callback){
    
    var num = Math.floor(Math.random() * 900000) + 100000;
    
    var data = help+'.'+command;
    const embed = new Discord.RichEmbed()
    //.setTitle()
    .setTitle('Bot Commands')
    .setColor('#'+num)
    .setDescription('How to use the ' + command + ' feature')
    .addField('Syntax',help[command])
    .setTimestamp()
    .setImage();
    
    callback(embed);
}