const Discord = require("discord.js");
const client = new Discord.Client();
const features = require('./features/index.js');

// *******************************************************

// Please add new requires/commands into features/index.js

// *******************************************************

// when the bot connects to channel log to console bot name and text
client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
  
  // Sets bots game status
  client.user.setGame('Ready to Work');
  
  // gets channel id to then find guild name
  var channelID = client.channels.find('name', 'general').id;
  var guild = client.guilds.get(channelID).name;
  
  // if connected to bits group guild set channels to variables
  // for use to sendmessages to correct channels and connect to voice channel
  if (guild === 'BITS Group'){
    var channel1 = client.channels.find('name', 'General');
    features.voiceChannelID = channel1.id.toString();
    var channel2 = client.channels.find('name', 'general');
    features.testChannelID = channel2.id.toString();
    var channel3 = client.channels.find('name', 'bot-test');
    features.textChannelID = channel3.id.toString();
  }
  // if connected to bits group guild set channels to variables
  // for use to sendmessages to correct channels and connect to voice channel  
  else if (guild === 'RMIT University'){
    var channel1 = client.channels.find('name', 'by_MyITGroup');
    features.voiceChannelID = channel1.id.toString();
    var channel2 = client.channels.find('name', 'by_myitgroup');
    features.textChannelID = channel2.id.toString();
  }
  
  // sets channel to voice channel id so bot can connect to voice channel
    let channel = client.channels.get(features.voiceChannelID);
 channel.join()
  .then(connection => features.vt.main(connection,function(res){
    var voiceString;
    
    //passes voice data to commands to select feature based on user command
    features.commands.main(client, res);

  }))
  .catch(console.error);


});

// on message recived even in discord channel
client.on('message', msg => {
  if(!msg.author.bot){
    if (msg.content.charAt(0) === '!'){
      //runs commands using switch case - also removing code double up
      features.commands.main(client, msg);
    }

}
  // gets user input and converts to lowercase
  var inputString = msg.content.toString();
  inputString = inputString.toLowerCase();
  
  //msg.channel.sendMessage('Welcome');
  // user status
  if (inputString === features.status) {
    msg.reply('Hi ' + msg.author.username + ' ' + msg.author.presence.status);
  }
});

client.on('presenceUpdate', (oldMember, newMember) => {
  //console.log(oldMember);
  console.log(oldMember.frozenPresence);
  if (oldMember.frozenPresence.status === 'offline'){
    client.channels.get(features.textChannelID).sendMessage("Welcome to the server : "+ newMember.user.username, {tts:true});
  }
})

client.on('guildMemberAdd', (member) => {
  
  var guild = member.guild;
  guild.channels.get(guild.id).sendMessage("Welcome to the server : "+ member.user.username, {tts:true});
  
});

// bot token to login to discord chat on rmit server
//client.login('Mjk0NjgwODgzMTM3NjA5NzI5.C7ZCpQ.xkbKBQ2HWLX1N72EzQStG6Oj9ec');

//token to login to bot-test non rmit
client.login('MzAwNDc4MzA0MTI4MDczNzI4.C8tBwQ.N3Auf5ZmvxWBogTKeQxSjNJ2hGg');