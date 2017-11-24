//constant variables
const Discord = require("discord.js");
const https = require('https');
const client = new Discord.Client();
const fs = require('fs');

//vars
var exchangeUrl ='https://api.fixer.io/latest?base=USD';
var tempData="";
var currencyData="";
var msg="";
var AUS="";
var rates="";
var ratesMsg="";
var returnRates="";
var msg3="";
var msg2=" Australian dollars"
var gameData="";
var price="";
var rate;
var name="";
var user="";

function GetExchangeRate(callback) {
    var tempData="";
    console.log("exchange rate")
    https.get(exchangeUrl, function (response){
        response.on("data", function (data){
            tempData+=data;
            
        });
        
      response.on("end", function() {
          currencyData=JSON.parse(tempData);
          //console.log(currencyData);
          //callback(currencyData);
          rate=currencyData.rates.AUD;
           console.log("rate test"+rate)
          callback();
          });
          //msg3='One American dollars is worth '+currencyData.rates.AUD+' Australian dollars';
        
          //callback(currencyData);
          //AUS=currencyData[rates].AUD;
        //msg="One US dollar is worth "+AUS;
      });
  
   
}
function GetPrice(callback){
    console.log("Price");
    var file=fs.readFileSync('./features/textfiles/'+user+'Search.json');
    gameData=JSON.parse(file);
    price = gameData.price;
    if (price != "Free Game")
    {
        price='Price in AUD $'+parseFloat(Math.round((price*rate)*100)/100).toFixed(2)
    }
    name=gameData.name;
    
    callback();
   
    
    
}

function embedMsg(callback){
    
    const embed = new Discord.RichEmbed()
    //.setTitle('Name '+dlcName)
    .setTitle(name)
    .setColor(0x00AE86)
    //.setDescription('Price converted to AUD $'+parseFloat(Math.round((price*rate)*100)/100).toFixed(2))
    .setDescription(price)
    .setTimestamp();
    //.setImage();
   
    
    
    callback(embed);
    
    
}

//function GetAUConversion(){
//    console.log("data is"+currencyData)
//    AUS=currencyData.rates.AUD;
//    msg="One US dollar is worth "+AUS;
    //return msg;

    exports.main = function (msg, callback){
        user = msg.author.username;
        GetExchangeRate(function(){
        GetPrice(function(){
        embedMsg(function (ausPrice){
            callback(ausPrice);
            
        });
        });
        });
    };   
        /*
        
        GetExchangeRate(function(){
            GetPrice();
        });
        
        //console.log(price);
        //console.log(data[2]);

       // var rates=currencyData.rates.AUD;
       // var auPrice=rates*price
              setTimeout(function(){
                  console.log(price);
                 //var rate = currencyData.rates.AUD;
                 price = (price/100);                                                               //Serge changed this line
            //callback('One American dollar is worth $'+currencyData.rates.AUD+' Australian dollars.\nCurrent for '+price);
            //callback('game price is AUD $'+Math.round(price/100)*(currencyData.rates.AUD));
            callback(name+' price converted to AUD $'+parseFloat(Math.round((price*rate)*100)/100).toFixed(2));                       //Serge changed this line
            
            //callback(msg3)
            }, 5000);
       */
        
        
   
    
            
        

    
    
