//constants
const Discord = require("discord.js");
const https = require('https');
const client = new Discord.Client();


//variables
var exchangeUrlusd ='https://api.fixer.io/latest?base=USD';
var tempDatausd="";
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


exports.main = function (search,callback){
    //var searchString = search.toString();
    //var numberUsd = searchString.toString().substr(searchString.indexOf(" ") + 1);
    var numberUsd = search.search;
    console.log(currencyDatausd);
    parseInt(numberUsd,2);
    
    if (numberUsd != "!american"){
    
    if (currencyDatausd=="") {
    GetExchangeRateusd();
    
    setTimeout(function(){
        callback(numberUsd + ' American dollar/s is worth $'+ 
        parseFloat(Math.round((numberUsd * currencyDatausd.rates.AUD)*100)/100).toFixed(2) +
        ' Australian dollar/s.'+ '\nCurrent for '+currencyDatausd.date);
        }, 3000);
        
        
    }
    else {
    setTimeout(function(){
        callback(numberUsd + ' American dollar/s is worth $'+ 
        parseFloat(Math.round((numberUsd * currencyDatausd.rates.AUD)*100)/100).toFixed(2) +
        ' Australian dollar/s.'+ '\nCurrent for '+currencyDatausd.date);
        }, 3000);
    }
    }
    else {
        setTimeout(function(){
        callback("no value entered");
        }, 3000);
    }
    

};