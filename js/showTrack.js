function showTrack(unescaped_name, artist_id){
    // name can be a song title or artist name - queries for relevant articles
    console.log('showing individual track');
    var name = escape(unescaped_name);
    var maxResults = 3;
    var query = "http://developer.echonest.com/api/v4/artist/news?api_key=" + echonest.api_key + "&name=" + name + "&results=" + maxResults + "&start=0";
    $.get(query, function(data){
        var news = data.response.news;
        getPic(name,artist_id, function(err, picURL){
            $.get("/api-challenge/templates/trackView.jade", function(template){
                var html = jade.render(template, {items: news, picURL: picURL, query: unescaped_name})
                $("#details").html(html);
            })
        })
    })
}

function getPic(name,artist_id, cb){
    // Kill to break infinite loop
    if (!name && !artist_id) {
        cb('Pic not found', null);
        console.log('No pic found');
        return;
    }
    // If we don't have id, get it
    if (artist_id == null) {
        var idQuery = 'http://developer.echonest.com/api/v4/artist/search?api_key=' + echonest.api_key + '&name=' + name
        $.get(idQuery, function(idData){
            if(idData.response.artists[0]) {
                var new_artist_id = idData.response.artists[0].id;
            } else {
                var new_artist_id = null;
            }
                // Recurse with id
                getPic(name, new_artist_id, cb);
                return;
        })
    } else {
        // Deferred objects
        var picQuery = 'http://developer.echonest.com/api/v4/artist/images?api_key=' + echonest.api_key + '&id=' + artist_id + '&format=json&results=1&start=0';
        $.get(picQuery, function(picData){
            var picURL = picData.response.images[0].url;
            cb(null, picURL);
        })
    }
}

