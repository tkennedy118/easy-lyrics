$(document).ready(function() {

    var vidId;

    $('.results').hide();

    $('.searchButton').click(function () {

        $('.results').show();

        var artist = $('#artistInput').val();
        var title = $('#songInput').val();

        var queryURL = "https://private-anon-a847fd9858-lyricsovh.apiary-proxy.com/v1/" + artist + "/" + title;

        $.ajax({
            url: queryURL,
            method: "GET",
            success: function(response){
                $('.lyricsTextDiv').text (response.lyrics);
            },
            error: function(){
                $('.lyricsTextDiv').text ("Song not found.");
            }
          });
    });
    
    /* const getYouTubeVideo = function() {
        
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
    } */

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
    });

    // getYouTubeVideo();
});