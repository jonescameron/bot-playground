//constants
const Discord = require("discord.js");
const https = require('https');
const client = new Discord.Client();


//variables
var exchangeUrlusd ='https://api.fixer.io/latest?base=USD';
var exchangeUrlaud ='https://api.fixer.io/latest?base=AUD';
var tempDataaud="";
var tempDatausd="";
var currencyDataaud="";
var currencyDatausd="";


//function to get API data
function GetExchangeRateusd(callback) {
    https.get(exchangeUrlusd, function (response){
        response.on("data", function (data){
            tempDatausd+=data;
            
        });
        
        response.on("end", function() {
            currencyDatausd=JSON.parse(tempDatausd);
            console.log(currencyDatausd);
            
          
            });
          
        });
        
}

function GetExchangeRateaud(callback) {
    https.get(exchangeUrlaud, function (response){
        response.on("data", function (data){
            tempDataaud+=data;
            
        });
        
        response.on("end", function() {
            currencyDataaud=JSON.parse(tempDataaud);
            console.log(currencyDataaud);
            
          
            });
          
        });
        
}


exports.main = function (search,callback){
    console.log(currencyDatausd);
    console.log(currencyDataaud);
    if (currencyDatausd=="", currencyDataaud=="") {
        GetExchangeRateusd();
        GetExchangeRateaud();
        
        setTimeout(function(){
        callback('One American dollar is worth $'+Math.round((currencyDatausd.rates.AUD)*100)/100+
        ' Australian dollar/s.'+ ' And One Australian dollar is worth $'+Math.round((currencyDataaud.rates.USD)*100)/100+
        'American dollar/s'+'\nCurrent for '+currencyDataaud.date);
        }, 3000);
    }
    
    else {
    
    setTimeout(function(){
        callback('One American dollar is worth $'+Math.round((currencyDatausd.rates.AUD)*100)/100+
        ' Australian dollar/s.'+ ' And One Australian dollar is worth $'+Math.round((currencyDataaud.rates.USD)*100)/100+
        'American dollar/s'+'\nCurrent for '+currencyDataaud.date);
        }, 3000);
        
    }
};