//vars
const async = require ('async');
const Discord = require('discord.js');
const https = require('https');
const fs = require('fs');
var dlc="";
var dlcData="";
const url='https://store.steampowered.com/api/appdetails?appids='
//var arrayData="";
var dlcArrayData="";
//var i=0;
var tempArrayData="";
var dlcString="";
var dlcPrice="";
var dlcName="";
var picTest="";
var user="";
var length;
var searchData="";
var searchArray="";
var i;

//methods


exports.main = function(msg, callback){
    user=msg.author.username;
//console.log(dlcData.length);
    parseDlc();
    if (dlcData=='null')
    {
       embedEmpty(function(dlc){
       callback(dlc);
       });
       
    }
    else
    {
   dlcInfo(callback);
   setTimeout(function(){
   //callback("\n"+dlcString);
   //}, 5000);
   embedMsg(function(dlc){
       callback(dlc); 
      });
    }, 10000);
    }
};


    
function parseDlc()
{

    searchData=fs.readFileSync('./features/textfiles/'+user+'Search.json');
    searchArray=JSON.parse(searchData);
    picTest=searchArray.pic;
    //if (searchArray.hasOwnProperty('dlc'))
    if (searchArray.dlc.length>0)
    {
    dlcData=searchArray.dlc;
    console.log('dlc = '+dlcData);
    }
    else
    {
        dlcData='null';
    }
    console.log(dlcData);
}
function dlcInfo(callback)  
{   
    i=0;
    length=dlcData.length;
    console.log(length);
    console.log("starting");
    
    dlcString="";
    
   
     var lookup = function (index) {
        if (index==length) 
        console.log("done");
        
        else
        {
        var arrayData="";
            console.log(dlcData[index]);
        https.get('https://store.steampowered.com/api/appdetails?appids='+dlcData[index]+'&cc=au', function(response) {
        response.on("data", function (data) {
        arrayData += data;
        });
        response.on("end", function() {
        var tempArrayData=JSON.parse(arrayData);
       
        dlcArrayData=tempArrayData;
       
        dlcName=dlcArrayData[dlcData[index]].data.name;
       
        if (dlcArrayData[dlcData[index]].data.hasOwnProperty('price_overview'))
        {
        dlcPrice=(dlcArrayData[dlcData[index]].data.price_overview.initial / 100);
        }
        else
        {
            dlcPrice="Free DLC";
        }
        //picTest=dlcArrayData[dlcData[index]].data.header_image;
       
        //dlcString+="DLC Name: "+dlcName+" Price: $"+dlcPrice+"\n";
        
        dlcString+= dlcName+" Price: $"+dlcPrice+"\n";
        console.log('added');
        //dlcString+="Name :"+dlcArrayData[dlcData].data.name+"Price: "+(dlcArrayData[dlcData[index]].data.price_overview.initial / 100)+"\n";
        //i++;
       
          
         //index++;
        console.log(index);
    
        lookup(index+1);
        
        
        //lookup(index+1);
        
        
         
        
        
       
        });
        });
        //console.log(index);
        // lookup(index+1);
        }
        
     
     };
    
   lookup(0);
    

}

function embedMsg(callback)
{
    console.log('embedding');
    console.log('pic is'+picTest);
   const embed = new Discord.RichEmbed()
    //.setTitle('Name '+dlcName)
    .setTitle("DLC Results")
    .setColor(0x00AE86)
    .setDescription(dlcString)
    .setTimestamp()
    .setImage(picTest);
   
    
    
    callback(embed);
}

function embedEmpty(callback)
{
    console.log("empty")
    const embed = new Discord.RichEmbed()
   
    .setTitle("DLC Results")
    .setColor(0x00AE86)
    .setDescription('No DLC!')
    .setImage(picTest)
    .setTimestamp();
    
    callback(embed);
    
}

