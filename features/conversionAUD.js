//constants
const Discord = require("discord.js");
const https = require('https');
const client = new Discord.Client();


//variables
var exchangeUrlaud ='https://api.fixer.io/latest?base=AUD';
var tempDataaud="";
var currencyDataaud="";


//function to get API data
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
    // var searchString = search.toString();
    //var numberAud = searchString.toString().substr(searchString.indexOf(" ") + 1);
    var numberAud = search.search;
    console.log(currencyDataaud);
    parseInt(numberAud,2);
    
    if (numberAud != "!australian"){
    
    if (currencyDataaud=="") {
    GetExchangeRateaud();
    
    
    
    setTimeout(function(){
        callback(numberAud + ' Australian dollar/s is worth $'+ 
        parseFloat(Math.round((numberAud * currencyDataaud.rates.USD)*100)/100).toFixed(2) +
        ' American dollar/s.'+ '\nCurrent for '+currencyDataaud.date);
        }, 3000);
        
        
     
        
    }else {
    setTimeout(function(){
        callback(numberAud + ' Australian dollar/s is worth $'+ 
        parseFloat(Math.round((numberAud * currencyDataaud.rates.USD)*100)/100).toFixed(2) +
        ' American dollar/s.'+ '\nCurrent for '+currencyDataaud.date);
        }, 3000);
        
        
    }
    
} else {
        setTimeout(function(){
        callback("no value entered");
        }, 3000);
    }   
};