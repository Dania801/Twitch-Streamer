var streamers = ["dreamhackcs", "skyzhar", "freecodecamp", "faceittv" , "esl_sc2", "ogamingsc2", "jacksofamerica"];

var channelURL = "https://api.twitch.tv/kraken/channels/" ;
var streamingURL = "https://api.twitch.tv/kraken/streams/" ;
var APIKey = "?client_id=n4w6p8y0b2csq0r972djznn089ojy2" ;




function getOnlineStreamers(streamer){
  $.ajax({
           url: streamingURL + streamer + APIKey ,
           dataType: "jsonp",
           data: {
               format: "json"
           },
           success: function (data) {
              getStreamerInfo(data , streamer);
           },
           error: function () {
               console.log("unable to access json");
           }
       });
}

function getOfflineStreamers(streamer){
  $.ajax({
           url: streamingURL + streamer + APIKey ,
           dataType: "jsonp",
           data: {
               format: "json"
           },
           success: function (data) {
             if(data.stream == null){
               $.ajax({
                       url: channelURL + streamer + APIKey ,
                       dataType: "jsonp" ,
                       data: {
                         format: "json"
                       },
                       success: function(data){

                         getChannelInfo(data) ;
                       },
                       error: function(){
                         info.innerHTML = "ERROR" ;
                       }
               });
             }
           },
           error: function () {
               console.log("unable to access json");
           }
       });
}

function getChannelInfo(data){

  var name = data.display_name ;
  var game = data.game ;
  var status = data.status ;
  var url = data.url ;
  var views = data.views ;
  var followers = data.followers ;
  var logo = data.logo ;
  var lang = data.broadcaster_language ;
  offline.innerHTML += '<li class="w3-padding-16 w3-red w3-animate-right">'+
                    '<img src="'+logo+'" class="w3-left w3-circle w3-margin-right" style="width:50px"/>'+
                    '<span class="w3-large">'+name+'</span><br>'+
                    '<span>'+game+'</span>'+
                    '</li>'
}

function getStreamerInfo(data , streamer)
{


  if(data.stream != null) {
    var name = data.stream.channel.display_name ;
    var game = data.stream.channel.game ;
    var status = data.stream.channel.status ;
    var url = data.stream.channel.url ;
    var views = data.stream.channel.views ;
    var followers = data.stream.channel.followers ;
    var logo = data.stream.channel.logo ;
    var lang = data.stream.channel.broadcaster_language ;
    online.innerHTML += '<li class="w3-padding-16 w3-green w3-animate-left">'+
                      '<img src="'+logo+'" class="w3-left w3-circle w3-margin-right" style="width:50px"/>'+
                      '<span class="w3-large">'+name+'</span><br>'+
                      '<span>'+game+'</span>'+
                      '</li>'
  }

}

function getAllUsers(){
  for(var i = 0 ; i < streamers.length ; i++){
    online.innerHTML = "" ;
    offline.innerHTML = "" ;
    getOnlineStreamers(streamers[i]) ;
    getOfflineStreamers(streamers[i]) ;
  }
}

function getOnlineUsers(){
  online.innerHTML = "" ;
  offline.innerHTML = "" ;
  for(var i = 0 ; i < streamers.length ; i++){
    getOnlineStreamers(streamers[i]) ;
  }
}

function getOfflineUsers(){
  online.innerHTML = "" ;
  offline.innerHTML = "" ;
  for(var i = 0 ; i < streamers.length ; i++){
    getOfflineStreamers(streamers[i]) ;
  }
}

$(document).ready(function(){
  for(var i = 0 ; i < streamers.length ; i++){
    getOnlineStreamers(streamers[i]) ;
    getOfflineStreamers(streamers[i]) ;
  }
})
