
var searchlyURL = "https://searchly.asuarez.dev/api/v1/song/search" + "?query=" + encodeURI("Beatles");
$.ajax({
  url: searchlyURL,
  method: "GET"
}).then(function(response) {
    let songSug = response.response.results;
    console.log(songSug.length)
    songSug.forEach((element,index) => {
        //console.log(element.name);
        $(`.songSuggestion${index+1}`).text(JSON.stringify(element.name));
    });
    // for (var i = 0; i < Math.floor(Math.random() + 4); i++){
    // var randomSong =  Math.floor(Math.random() * response.response.results.length);
    // var songSug = response.response.results[randomSong].name;
    // console.log (songSug);
    // };
    

    // $(".songSuggestion1").text(JSON.stringify(songSug));
    // $(".songSuggestion2").text(JSON.stringify(songSug));
    // $(".songSuggestion3").text(JSON.stringify(songSug));
    // $(".songSuggestion4").text(JSON.stringify(songSug));


});

$(document).ready(function() {

var vidId;

const getYouTubeVideo = function() {
    
    // local variables
    let key = "AIzaSyBU0Tdn2ym_MjMojWVuwp4Qd5XYr3jUzhk";
    let search = encodeURI("Taylor Swift" + " music video");
    let queryURL = "HTTPS://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + search + "&key=" + key;


    // request info from YouTube API
    $.ajax({ url: queryURL, method: "GET"})
        .then(function(response) {
            console.log("inside ajax");
            console.log(response);

            vidId = response.items[0].id.videoId;
            console.log(vidId)

            showYouTubeVideo();
        });
}

const showYouTubeVideo = function() {

    // local variables
    let videoFrame = $("#video-frame");
    let source = "https://www.youtube.com/embed/" + vidId + "?enablejsapi=1";

    // set video attributes and src
    videoFrame.attr( {
        width: "640px",
        height: "360px",
        frameborder: "0px",
        style: "border: solid 4px #37474F",
        src: source
    });

}

getYouTubeVideo();
}); 

