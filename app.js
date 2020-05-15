$(document).ready(function() {


    /***************************************** FUNCTIONS *****************************************/

    // FUNCTION: requests lyric info from API
    const getSongInfo = function() {

        let artist = $('#artistInput').val();
        let title = $('#songInput').val();

        let queryURL = "https://api.lyrics.ovh/v1/" + encodeURI(artist) + "/" + encodeURI(title);

        $.ajax({
            url: queryURL,
            method: "GET",
            success: function(response){

                // split lyrics by , and .
                let lyricsArr = response.lyrics.split(/\.|\?|\!|\,/);

                // clear current    fields
                $('.lyricsText').empty();

                // insert lyrics
                lyricsArr.forEach(function(line, index) {

                    let p = $("<p>");
                    p.text(line);

                    $('.lyricsText').append(p);
                });

                // insert title
                $('#song-name').text(title.toUpperCase());

                $('#results').show();
                $('#no-results').hide();

                // get video information
                getYouTubeVideo(artist, title);

                // get related videos
                showRelated(artist);
            },
            error: function(){

                $('.lyricsText').text ("Song not found.");
                $('#results').hide();
                $('#no-results').show();
            }
          });
    }

    /************************* FUNCTIONS related to YouTube functionality *************************/

    // FUNCTION: requests video from YouTube API
    const getYouTubeVideo = function(artist, title) {
        
        // get key from either local config file or from heroku environment.
        if (process.env.YOUTUBE_API_KEY) { key = process.env.YOUTUBE_API_KEY }
        else { key = YOUTUBE_API_KEY }

        let search = encodeURI(artist + " " + title + " music video");
        let queryURL = "https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=" + search + "&key=" + key;
        let youtubeVidId = "";


        // request info from YouTube API
        $.ajax({ url: queryURL, method: "GET"})
            .then(function(response) {

                youtubeVidId = response.items[0].id.videoId;
                showYouTubeVideo(youtubeVidId);
            });
    }

    // FUNCTION: uses YouTube video ID to set the source of the iframe.
    const showYouTubeVideo = function(youtubeVidId) {

        let currentVid = $("#current-vid");

        let source = "https://www.youtube.com/embed/" + encodeURI(youtubeVidId) + "?autoplay=0&showinfo=0&rel=0&modestbranding=1&playsinline=1";
        currentVid.attr("src", source);
    }
    
    /********************************************************************************************* */
    
    // FUNCTION: get related songs 
    const showRelated = function(artist) {

        // remove "the" and , from title names to optimize search
        artist = artist.replace(/the|\,/gi, "");

        var searchlyURL = "https://searchly.asuarez.dev/api/v1/song/search" + "?query=" + encodeURI(artist);

        $.ajax( {
            url: searchlyURL,
            method: "GET"
        }).then(function(response) {

            let songSug = response.response.results;
            let max = songSug.length;

            // give each button a random song
            $('.suggestionBtn').each(function() {
                
                let random = Math.floor(Math.random() * max);
                let [songArtist, songName] = songSug[random].name.split(' - ');

                // adjust song artist name to compensate for things like "beatles, the"
                songArtist = songArtist.replace(", the", "");

                $(this).text((songArtist + ": " + songName));
            });
        });
    }


    /****************************** EVENT HANDLERS AND FUNCTION CALLS ******************************/

    $('#results').hide();       // show if lyrics are found
    $('#no-results').hide();    // show if lyrics are not found

    $("#searchButton").on("click", function(event) {

        // prevent page reload
        event.preventDefault();

        getSongInfo();
    });


    $(".suggestionBtn").on("click", function() {

        // get artist and name
        let [artist, song] = $(this).text().split(": ");

        // set input values
        $("#artistInput").val(artist);
        $("#songInput").val(song);

        // set text values
        $("#artistInput").text(artist);
        $("#songInput").text(song);

        getSongInfo();
    });
});