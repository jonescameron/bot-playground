/*
 * FILENAME index.js
 * PURPOSE  hold all feature files and command constansts
 * AUTHOR   Group
 * DATE     May 2017
 * VERSION  1.0
 */

//Feature Files
//Usage : exports.[featureName] = require('[path to file]');
exports.timeFeature = require("./time.js");
exports.soundtrackFeature = require("./musicSearch.js");
exports.twitchFeature = require("./twitch.js");
exports.listFeature = require("./list.js");
//exports.steamGameInfo = require("./steamGameInfo.js");
exports.steamGameInfo = require("./Steam.js");
exports.steamGameInfoBackup = require ("./steamGameInfo.1.js")
exports.youtubeTrailer = require("./youtubeTrailer.js");
exports.redditFeature = require("./reddit.js");
exports.currencyConvert = require("./currency.js");
exports.conversionUSD = require("./conversionUSD.js");
exports.conversionAUD = require("./conversionAUD.js");
exports.ratesUSDAUD = require("./rates.js");
exports.voiceRecognition = require("./voicerecognition.js");
exports.statsFeature = require("./gameStats.js");
exports.DLCinfo = require("./DLCinfo.js");
exports.gameInfo = require("./Info.js");
exports.gameNews = require("./news.js");
exports.vt = require("./voiceTest.js");
exports.commands = require("./commands.js");
exports.helpFeature = require("./help.js");
exports.testGameSearch = require("../test/searchName.js");


// Command constants
// Usage : exports.[featureName] = '[trigger]';
exports.help = "help";
exports.ping = "ping";
exports.status = "!status";
exports.time = "time";
exports.twitch = "twitch";
exports.gameSoundtrack = "soundtrack";
exports.wish = "wish";
exports.cart = "cart";
exports.search = "search";
exports.youtube = "youtube";
exports.reddit = "reddit";
exports.currency = "currency";
exports.convertUSD = "american";
exports.convertAUD = "australian";
exports.rates = "rates";
exports.voiceRecog = "voice";
exports.dlc = "dlc";
exports.dlc1 = "dlc1";
exports.stats = "stats";
exports.info = "info";
exports.news = "news";
exports.testSearch = "testSearch";

// Variables
exports.vtConnection = null;
exports.voiceChannelID;
exports.textChannelID;
exports.testChannelID;