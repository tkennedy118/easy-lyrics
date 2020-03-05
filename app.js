var queryURL = "https://searchly.asuarez.dev/api/v1/song/search" + "?query=" + encodeURI("Beatles");
$.ajax({
  url: queryURL,
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