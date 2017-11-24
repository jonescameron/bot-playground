
exports.main = function(callback){
  
    callback('Under Development');
    var recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition || window.mozSpeechRecognition || window.msSpeechRecognition)();
    recognition.lang = 'en-AU';
    recognition.interimResults = false;
    recognition.maxAlternatives = 5;
    recognition.start();
    
    recognition.onresult = function(event) {
      console.log('You said: ', event.results[0][0].transcript);
    };
};
