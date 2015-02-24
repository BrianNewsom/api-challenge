function listArtists(){
    console.log('listing hot Artists');
    var queryString = 'http://developer.echonest.com/api/v4/artist/top_hottt?api_key=' + echonest.api_key + '&format=json&results=12&start=0&bucket=hotttnesss'
    $.get(queryString, function(data){
        var artists = data.response.artists;
        $.get("/api-challenge/templates/artistList.jade", function(template){
            var html = jade.render(template, {items: artists});
            $('#list').html(html);
            showTrack(artists[0].name,artists[0].id)
        })
    })
}

/* Executing all pic requests in parallel
function getPics(artists, cb){
    console.log(artists);
    // Deferred objects
    var picQuery = 'http://developer.echonest.com/api/v4/artist/images?api_key=' + echonest.api_key + '&id=' + artists[0].id + '&format=json&results=1&start=0';
    $.get(picQuery, function(picData){
        console.log(picData);
        console.log(picData.response.images[0].url)
    })

    cb(null, artists);
}
*/
