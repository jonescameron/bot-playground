const Discord = require("discord.io");
const client = new Discord.Client();
const timeFeature = require("./time.js");
const soundtrackFeature = require("./musicSearch.js");
const trailerFeature = require("./trailer.js");
const wishlistFeature = require("./wishlist.js");
const cartFeature = require("./cart.js");
const test4f = require("./test2.js");
const test5f = require("./test5.js");
const http = require('http');
const https = require('https');

// Command constants
const ping = "!ping";
const status = "!status";
const time = "!time";
const trailer = "!trailer";
const gameSoundtrack = "!soundtrack";
const wish = "!wish";
const cart = "!cart";

// Test command constants
const test1 = "!test1";
const test2 = "!test2";

var bot = new Discord.Client({
    autorun: true,
    token: ""
});

bot.on('ready', function(event) {
    console.log('Logged in as %s - %s\n', bot.username, bot.id);
});

bot.on('message', function(user, userID, channelID, message, event) {
    if (message === "ping") {
        bot.sendMessage({
            to: channelID,
            message: "pong"
        });
    }
});
