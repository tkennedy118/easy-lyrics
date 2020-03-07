$(document).ready(function() {


    /***************************************** FUNCTIONS *****************************************/

    // FUNCTION: requests lyric info from API
    const getSongInfo = function() {

        let artist = $('#artistInput').val();
        let title = $('#songInput').val();

        let queryURL = "https://private-anon-a847fd9858-lyricsovh.apiary-proxy.com/v1/" + artist + "/" + title;

        $.ajax({
            url: queryURL,
            method: "GET",
            success: function(response){

                $('.lyricsTextDiv').text (response.lyrics);
                $('.results').show();
                $('.noresult').hide();

                // get video information
                // getYouTubeVideo(artist, title);
            },
            error: function(){

                $('.lyricsTextDiv').text ("Song not found.");
                $('.results').hide();
                $('.no-results').show();
            }
          });
    }

    /************************* FUNCTIONS related to YouTube functionality *************************/

    // // FUNCTION: requests video from YouTube API
    // const getYouTubeVideo = function(artist, title) {
        
    //     // local variables
    //     let key = "AIzaSyC9UX0aa1EBEDw0181Q2V3ljFoq0cGBbNI";
    //     let search = encodeURI(artist + " " + title + " music video");
    //     let queryURL = "HTTPS://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + search + "&key=" + key;
    //     let youtubeVidId = "";


    //     // request info from YouTube API
    //     $.ajax({ url: queryURL, method: "GET"})
    //         .then(function(response) {
    //             console.log("inside ajax");
    //             console.log(response);

    //             youtubeVidId = response.items[0].id.videoId;
    //             console.log(youtubeVidId)

    //             showYouTubeVideo(youtubeVidId);
    //         });
    // }


    const showYouTubeVideo = function(youtubeVidId) {

        // local variables
        let currentVid = $("#current-vid");

        // * FOR TODAY ONLY */
        youtubeVidId = "M7lc1UVf-VE";
        let source = "https://www.youtube.com/embed/" + youtubeVidId + "?autoplay=0&showinfo=0&rel=0&modestbranding=1&playsinline=1";

        currentVid.attr("src", source);
    }

    showYouTubeVideo();
    
    /********************************************************************************************* */
    
    
    var searchlyURL = "https://searchly.asuarez.dev/api/v1/song/search" + "?query=" + encodeURI("Beatles");
    $.ajax({
        url: searchlyURL,
        method: "GET"
    }).then(function(response) {
        let songSug = response.response.results;

            songSug.forEach((element,index) => {

                
                let [songArtist, songName] = element.name.split(' - ');
                //console.log(element.name);
                console.log(songArtist);
                $(`.songSuggestion${index+1}`).text(JSON.stringify(songArtist + " - " + songName));
    
                $('.suggestionBtn1').on('click', function() {
                    console.log(songArtist);
    
                 let artistInput = $('#artistInput');
                 let songInput = $('#songInput');
    
                 artistInput.val(artistInput.val() + songArtist);
                 songInput.val(songInput.val() + songName);
        
                });
            });
    });


    /****************************** EVENT HANDLERS AND FUNCTION CALLS ******************************/

    $('.results').hide();       // show if lyrics are found
    $('.no-results').hide();    // show if lyrics are not found

    $(".searchButton").on("click", function() {

        getSongInfo();
    });
});