$(document).ready(function() {

    var vidId;


const getYouTubeVideo = function() {

    console.log("inside getYouTubeVideo");
    
    let key = "AIzaSyBU0Tdn2ym_MjMojWVuwp4Qd5XYr3jUzhk";
    let queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=surfing&key=" + key;

    $.ajax({ url: queryURL, method: "GET"})
        .then(function(response) {
            console.log("inside ajax");
            console.log(response);

            vidId = response.items[0].id.videoId;
            console.log(vidId)
        })



    // COPIED FROM YOUTUBE IFRAME PLAYER API

    var tag = document.createElement('script');
    tag.id = 'iframe-demo';
    tag.src = 'https://www.youtube.com/iframe_api';
    var firstScriptTag = document.getElementsByTagName('script')[0];
    firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
  
    var player;
    function onYouTubeIframeAPIReady() {
      player = new YT.Player('existing-iframe-example', {
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
      });
    }
    function onPlayerReady(event) {
      document.getElementById('existing-iframe-example').style.borderColor = '#FF6D00';
    }
    function changeBorderColor(playerStatus) {
      var color;
      if (playerStatus == -1) {
        color = "#37474F"; // unstarted = gray
      } else if (playerStatus == 0) {
        color = "#FFFF00"; // ended = yellow
      } else if (playerStatus == 1) {
        color = "#33691E"; // playing = green
      } else if (playerStatus == 2) {
        color = "#DD2C00"; // paused = red
      } else if (playerStatus == 3) {
        color = "#AA00FF"; // buffering = purple
      } else if (playerStatus == 5) {
        color = "#FF6DOO"; // video cued = orange
      }
      if (color) {
        document.getElementById('existing-iframe-example').style.borderColor = color;
      }
    }
    function onPlayerStateChange(event) {
      changeBorderColor(event.data);
    }
}

getYouTubeVideo();

}); 