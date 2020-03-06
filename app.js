$(document).ready(function() {

    /****************************** VARIABLES related to YouTube API ******************************/

    var youtubeVidId;                                           // id of specific video on youtube
    var player;                                                 // YouTube Player object


    // load the IFrame Player API code asynchronously
    let tag = document.createElement("script");
    tag.src = "http://www.youtube.com/iframe_api";

    let iframeScriptTag = document.getElementsByTagName("script")[0];
    iframeScriptTag.parentNode.insertBefore(tag, iframeScriptTag);

    /**********************************************************************************************/


    $('.searchButton').click(function () {

        var artist = $('#artistInput').val();
        var title = $('#songInput').val();

        var queryURL = "https://private-anon-a847fd9858-lyricsovh.apiary-proxy.com/v1/" + artist + "/" + title;

        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response) {
            $('.lyricsTextDiv').text (response.lyrics);
            console.log (response.lyrics);
        });
    });
    

    /************************* FUNCTIONS related to YouTube functionality *************************/

    // FUNCTION: requests video from YouTube API
    const getYouTubeVideo = function() {
        
        // local variables
        let key = "AIzaSyBU0Tdn2ym_MjMojWVuwp4Qd5XYr3jUzhk";
        let search = encodeURI("Taylor Swift" + " music video");
        let queryURL = "HTTPS://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + search + "&key=" + key;


        // request info from YouTube API
        $.ajax({ url: queryURL, method: "GET"})
            .then(function(response) {

                youtubeVidId = response.items[0].id.videoId;
            });
    }

    // GLOBAL FUNCTION: create an <iframe> and a YouTube Player object after the API code downloads
    window.onYouTubeIframeAPIReady = function() {

        player = new YT.Player('player', {
            height: '390',
            width: '640',
            videoId: 'M7lc1UVf-VE',
            events: {
                'onReady': onPlayerReady,
                // 'onStateChange': onPlayerStateChange
            }
        });
    }

    // FUNCTION: the YouTube API calls this function when the video player is ready
    const onPlayerReady = function(event) {
        event.target.playVideo();
    }

    // FUNCTION: the YouTube API calls this function when the player's state changes.
    // const onPlayerStateChange = function(event) {

    //     if (event.data == YT.PlayerState.PLAYING) {
    //         stopVideo;
    //     }
    // }

    // FUNCTION: stop the video 
    const stopVideo = function() {
        player.stopVideo();
      }

    /********************************************************************************************* */


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

    getYouTubeVideo();
});