const fs = require('fs');
var exec = require('child_process').exec;

exports.main = function(connection, callback){
    const fs = require('fs');
    console.log('Voice Connected');
    const receiveVoice = connection.createReceiver();
    
    
    connection.on('speaking', (user, speaking) => {
        var voiceFile = './features/voiceRecording/'+Date.now()+'.pcm';
        var tempVoiceFile = './features/tempVoice/test.pcm';
        
        const stream = (channel, user) => {
            return fs.createWriteStream(tempVoiceFile);
        };

        if (speaking){
            console.log('Im Listening to : ' + user);
            const voiceStream = receiveVoice.createPCMStream(user);
            const saveStream = fs.createWriteStream(voiceFile);
            //const file = stream(channel, user);
            
            voiceStream.pipe(saveStream);
            //console.log(file);
            //saveStream.pipe(voiceStream);
            voiceStream.once('end', () =>{
                //saveStream.end(null,null,convertSpeech(tempVoiceFile));
                saveStream.end(null,null,convertFile(voiceFile, user, function(res, test){callback(res)}));
                console.log("no longer listening");
                //convertSpeech(tempVoiceFile);
            
            })
        }
    })
    
    
    
}

function convertFile (file, user, callback) {
        var newFile = './features/voiceRecording/'+Date.now()+'.wav';
        exec("ffmpeg -f s16le -ar 48.0k -ac 2 -i " + file + " -ac 1 " + newFile, function (error, stdout, stderr) {
        if (error !== null) {
        console.log('exec error: ' + error);
        }
        else {
            convertSpeech(newFile, user, function(res, test){
                callback(res, test)
            });
        }

});

}

function convertSpeech (file, user, callback){
    console.log('hi there');
    var speech = require('@google-cloud/speech')({
        projectId: 'forward-bee-166304',
        keyFilename: './features/googlekey/key.json'
    });
    
    console.log(file);
    
var config = {
  encoding: 'LINEAR16',
  languageCode: 'en-AU',
  sampleRateHertz: 48000,
  verbose: true
};


//var file1 = './features/tempVoice/test1.wav';

speech.recognize(file, config, function(err, results) {
  if (err) {
    // Error handling omitted.
    console.log(err);
  }
    console.log(results);
    console.log(user);
    if(results.length > 0 && results[0].confidence > 50){
        var res = { 'author' : { 'id' : user.id, 'username' : user.username }, 
        'content' : results[0].transcript };
        callback(res);
    }
    else {
        callback(null);
    }
  // results = [
  //   {
  //     transcript: "how old is the Brooklyn Bridge",
  //     confidence: 88.15,
  //     alternatives: [
  //       {
  //         transcript: "how old is the Brooklyn brim",
  //         confidence: 22.39
  //       }
  //     ]
  //   }
  // ]
});
}