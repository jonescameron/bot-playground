/*
 * FILENAME commands.js
 * PURPOSE  hold all trigger/commands to accept text or voice prompts to start features
 * AUTHOR   Michael Deer, s3204085
 * DATE     May 2017
 * VERSION  1.0
 */

const features = require('./index.js');

exports.main = function (client,data){
    var userData;
    var splitContent;
    var trigger;
    if (data != null){
        splitContent = data.content.split(' ');
        trigger = splitContent[0].toLowerCase();
        if (trigger.includes('!')){
            trigger = trigger.toString().substring(trigger.indexOf("")+1);
        }
        var search = data.content.toString().substr(data.content.indexOf(" ")+ 1);

        userData = { 'author' : { 'id' : data.author.id, 'username' : data.author.username }, 
        'trigger' : trigger, 'search' : search.toLowerCase() }
        
        switch (userData.trigger){
                
        case 'ping' :
            client.channels.get(features.textChannelID).sendMessage('Pong', {tts: true});
            break;
        
        case features.help:
            features.helpFeature.main(userData, function(res){
                client.channels.get(features.textChannelID).sendEmbed(res);   
            });
            break;
            
        case features.time:
            var requestedTime = features.timeFeature.getTime(userData);
            client.channels.get(features.textChannelID).sendMessage(requestedTime);
            break;
            
        case features.twitch:
            features.twitchFeature.getStream(userData,function(link){
                client.channels.get(features.textChannelID).sendMessage(link);
            });
            break;
            
        case features.gameSoundtrack:
            features.soundtrackFeature.main(userData,function(link, preview){
                if (link == null){
                    client.channels.get(features.textChannelID).sendMessage('Unable to find result, please try again');
                }
                else if(preview != undefined){
                    client.channels.get(features.textChannelID).sendMessage(link + '\nPreview' + preview);
                }
                else{
                    client.channels.get(features.textChannelID).sendMessage(link);    
                }
            })
            break;
            
        case features.wish:
            var wishlistMessage = features.listFeature.addToList(userData, true);
            client.channels.get(features.textChannelID).sendMessage(wishlistMessage);
            break;
            
        case features.cart:
            var cartMessage = features.listFeature.addToList(userData, false);
            client.channels.get(features.textChannelID).sendMessage(cartMessage);
            break;
            
       // case features.search:
       //    features.steamGameInfo.main(userData, function(link){
       //         client.channels.get(features.textChannelID).sendMessage(link, {tts: true})
       //     });
       //     break;
       
       case features.search:
          features.steamGameInfo.main(userData, function(searchRes){
                client.channels.get(features.textChannelID).sendEmbed(searchRes, {tts: true})
            });
            break;
            
        case features.youtube:
            features.youtubeTrailer.main(userData,function(link){
                client.channels.get(features.textChannelID).sendMessage(link, {tts: true})
            });
            break;
            
        case features.reddit:
            features.redditFeature.main(userData, function(link){
                client.channels.get(features.textChannelID).sendMessage(link, {tts: true})
            });
            break;
            
        case features.currency:
            features.currencyConvert.main(userData,function(ausPrice){
                client.channels.get(features.textChannelID).sendEmbed(ausPrice, {tts: true})
            });
            break;
            
        case features.convertUSD:
            features.conversionUSD.main(userData,function(link){
                client.channels.get(features.textChannelID).sendMessage(link, {tts: true})
            });
            break;
        
        case features.convertAUD:
            features.conversionAUD.main(userData,function(link){
                client.channels.get(features.textChannelID).sendMessage(link, {tts: true})
            });
            break;
            
        case features.rates:
            var requestedRates = features.ratesUSDAUD.main(userData, function(link){
                client.channels.get(features.textChannelID).sendMessage(link, {tts: true})
            });
            break;
            
        case features.voiceRecog:
            features.voiceRecognition.main(function(res){
                client.channels.get(features.textChannelID).sendMessage(res, {tts: true})
            });
            break;
            
        case features.dlc:
            features.DLCinfo.main(userData,function(dlc){
                client.channels.get(features.textChannelID).sendEmbed(dlc, {tts: true});
            });
            break;
            
        case features.stats:
            features.statsFeature.main(userData, function(res){
                console.log(res);
                switch (res){
                    
                    case 'error' :
                        client.channels.get(features.textChannelID).sendMessage("Please enter a stat type (Top, Last or Fact)", {tts: true});
                        break;

                    case 'no facts' :
                        client.channels.get(features.textChannelID).sendMessage('Sorry, No facts found', {tts: true});
                        break;
                        
                    case 'no gameName' :
                        client.channels.get(features.textChannelID).sendMessage('Sorry, No game name entered', {tts: true});
                        break;
                    
                    default :
                        client.channels.get(features.textChannelID).sendEmbed(res, {tts: true});
                        break;
                }
            });
            break;
            
        case features.info:
            features.gameInfo.main(userData,function(info){
                client.channels.get(features.textChannelID).sendEmbed(info, {tts: true})
                // client.channels.get(features.textChannelID).sendEmbed(link, {tts: true});
            });
            break;
            
        case features.news:
            features.gameNews.getNews(userData,function(link){
                client.channels.get(features.textChannelID).sendMessage(link, {tts: true})
            });
            break;

        case features.testSearch:
            features.testGameSearch.main(function(res){
            client.channels.get(features.textChannelID).sendMessage(res);   
            });
            break;
        
        default :
            client.channels.get(features.textChannelID).sendMessage('Command received : ' + userData.trigger +
            '\nis not a valid command, please try again', {tts: true}); 
    }
            
    }
    else {
       client.channels.get(features.textChannelID).sendMessage('Unable to detect command, please try again',{tts: true}); 
    }

}