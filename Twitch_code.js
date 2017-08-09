var streamers = ["dreamhackcs", "skyzhar", "freecodecamp", "faceittv", "comster404", "brunofin", "terakilobyte",
                "robotcaleb", "sheevergaming", "esl_sc2", "ogamingsc2", "jacksofamerica"];

var twitchURL = "https://api.twitch.tv/kraken/channels/" ;
var streamingURL = "https://api.twitch.tv/kraken/streams/" ;
var APIKey = "?client_id=n4w6p8y0b2csq0r972djznn089ojy2" ;

function connectToStreamer(streamer)
{
  $.ajax({
           url: twitchURL + streamer + APIKey ,
           dataType: "jsonp",
           data: {
               format: "json"
           },
           success: function (data) {
               getStreamerInfo(data);
           },
           error: function () {
               console.log("unable to access json");
           }
       });
}

function getStreamingStatus(streamer)
{
  $.getJSON(streamingURL + streamer + APIKey, function(channel) {

    if (channel["stream"] == null) {
        alert("yes") ; 
    } else {
       alert("die !") ;
    }
  });
}

function getStreamerInfo(data)
{
  var name = data.display_name ;
  var game = data.game ;
  var status = data.status ;
  var url = data.url ;
  var views = data.views ;
  var followers = data.followers ;
  var logo = data.logo ;
  getStreamingStatus("dreamhackcs") ;
  var div = document.getElementById('info');
  //div.innerHTML = stream ;
}

$(document).ready(function(){
  connectToStreamer("dreamhackcs") ;
})
