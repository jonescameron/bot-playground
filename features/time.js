//main time function
exports.getTime = function (userMessage){
  //get date
const currentDate = new Date();
// check for !time

if (userMessage.content === '!time' || userMessage === 'time'){
      returnMessage = 'Please enter a valid city (ex. melbourne)';
      return returnMessage;
}
    //console.log(userMessage);
    //function variables
    var daylightSavings;
    var offsetTimezone;
    var returnMessage;
    var dateNow = Date.now();
    var startDaylightSavings = Date.parse('Oct 2, 2016');
    var endDaylightSavings = Date.parse('Apr 2, 2017');
    var city = userMessage.search.split(' ');
    var citySelectedInitial = city[0];
    var citySelected = citySelectedInitial.toLowerCase();
    
    //If to check dates to see if daylight savings is active
    if (dateNow >= startDaylightSavings && dateNow <= endDaylightSavings){
      daylightSavings = 'Active';
    }
    else {
      daylightSavings = 'Not Active';
    }

    
    currentDate.getDate();

    //check if city is melbourne, sydney, canberra or hobart
    //to set correct timezone offset
    if (citySelected === 'melbourne' || citySelected === 'sydney' ||
    citySelected === 'canberra' || citySelected === 'hobart'){
      if (daylightSavings === 'Active'){
        offsetTimezone = 11;
      }
      else {
        offsetTimezone = 10;
      }
      
    }
    
    //check if city is adelaide
    //to set correct timezone offset
    else if (citySelected === 'adelaide'){
      if (daylightSavings === 'Active'){
        offsetTimezone = 10.5;
      }
      else {
        offsetTimezone = 9.5;
      }
      
    }
    
    //check if city is brisbane
    //to set correct timezone offset
    else if (citySelected === 'brisbane'){
      offsetTimezone = 10;
      daylightSavings = 'Not Observed';
    }
    
    //check if city is darwin
    //to set correct timezone offset
    else if (citySelected === 'darwin'){
      offsetTimezone = 9.5;
      daylightSavings = 'Not Observed';
    }
    
    //check if city is perth
    //to set correct timezone offset
    else if (citySelected === 'perth'){
      offsetTimezone = 8;
      daylightSavings = 'Not Observed';
    }
    
    //if city is not found print enter valid city
    else {
      returnMessage = 'Please enter a valid city (ex. melbourne)';
      return returnMessage;
    }

    var serverTime = currentDate.getTime();
    var offsetTime = serverTime + (offsetTimezone * 3600000);
    var workOutTimeReadable = new Date(offsetTime);
    var hour = workOutTimeReadable.getHours();
    var minutes = workOutTimeReadable.getMinutes();
    var seconds = workOutTimeReadable.getSeconds();
    var ampm;

    // if 24 is present after city show in 24hr time and format correctly
    if (city[1] === '24'){
      ampm = '';
      
      if (hour< 10){
        hour = '0' + hour;
      }
      
      if (minutes < 10){
        minutes = '0' + minutes;
      }
      if (seconds < 10){
        seconds = '0' + seconds;
      }
    }
    else if (city[1] != '24' && city[1] != null) {
      returnMessage = "Sorry, this option can only accept 24 to show time in 24hour format";
      return(returnMessage);
    }
    
    //format time to show AM/PM 
    else {
      if (hour < 10){
        hour = '0' + hour;
        ampm = 'AM';
      }
      else if (hour == 10 || hour == 11){
        ampm = 'AM';    
      }
      else if (hour == 12){
        ampm = 'PM';
      }
      else if (hour > 12 && hour < 22){
        hour = '0' + (hour - 12);
        ampm = 'PM';
      }
      else if (hour >= 22 && hour < 24){
        hour = hour - 12;
        ampm = 'PM';
      }
      else if (hour == 24 || hour == 0){
        hour = 12;
        ampm = 'AM';
      }

      if (minutes < 10){
        minutes = '0' + minutes;
      }
      if (seconds < 10){
        seconds = '0' + seconds;
      }
    }
    
    
    //format and combine hour:minutes:seconds AM/PM
    //show time zone offset city and if daylight savings is active
    returnMessage = 'Current Time is : ' + hour + ':' + minutes + ':'
    + seconds + ' ' + ampm +'\nTimezone : + ' + offsetTimezone + ' hours' +
    '\nCity : ' + city[0] + '\nDaylight Savings : ' + daylightSavings;
    return (returnMessage);
}