$(document).ready(function() {

    var vidId;
    var artistG = "";
    var titleG = "";

    $('.results').hide();

    /****************************** VARIABLES related to YouTube API ******************************/

    var youtubeVidId;                                           // id of specific video on youtube
    var player;                                                 // YouTube Player object

    /**********************************************************************************************/



    $('.searchButton').click(function () {

        $('.results').show();

        artist = $('#artistInput').val();
        title = $('#songInput').val();

        var queryURL = "https://private-anon-a847fd9858-lyricsovh.apiary-proxy.com/v1/" + artist + "/" + title;

        $.ajax({
            url: queryURL,
            method: "GET",
            success: function(response){
                $('.lyricsTextDiv').text (response.lyrics);
                artistG = artist;
                titleG = title;
            },
            error: function(){
                $('.lyricsTextDiv').text ("Song not found.");

            }
          });
    });
    

    /************************* FUNCTIONS related to YouTube functionality *************************/

    // // FUNCTION: requests video from YouTube API
    // const getYouTubeVideo = function() {
        
    //     // local variables
    //     let key = "AIzaSyC9UX0aa1EBEDw0181Q2V3ljFoq0cGBbNI";
    //     let search = encodeURI("Taylor Swift" + " music video");
    //     let queryURL = "HTTPS://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + search + "&key=" + key;


    //     // request info from YouTube API
    //     $.ajax({ url: queryURL, method: "GET"})
    //         .then(function(response) {
    //             console.log("inside ajax");
    //             console.log(response);

    //             youtubeVidId = response.items[0].id.videoId;
    //             console.log(youtubeVidId)

    //             showYouTubeVideo();
    //         });
    // }

    const showYouTubeVideo = function() {

        // local variables
        let currentVid = $("#current-vid");

        // * FOR TODAY ONLY */
        youtubeVidId = "M7lc1UVf-VE";
        let source = "https://www.youtube.com/embed/" + youtubeVidId + "?autoplay=0&showinfo=0&rel=0&modestbranding=1&playsinline=1";

        currentVid.attr("src", source);
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


    // getYouTubeVideo();
    showYouTubeVideo();
});