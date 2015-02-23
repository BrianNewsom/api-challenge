function showTrack(name, artist_id){
    // name can be a song title or artist name - queries for relevant articles
    console.log('showing individual track');
    var name = escape(name);
    var maxResults = 3;
    var query = "http://developer.echonest.com/api/v4/artist/news?api_key=" + echonest.api_key + "&name=" + name + "&results=" + maxResults + "&start=0";
    $.get(query, function(data){
        var news = data.response.news;
        getPic(artist_id, function(err, picURL){
            $.get("/api-challenge/templates/trackView.jade", function(template){
                var html = jade.render(template, {items: news, picURL: picURL})
                $("#details").html(html);
            })
        })
    })
}

function getPic(artist_id, cb){
    // Deferred objects
    var picQuery = 'http://developer.echonest.com/api/v4/artist/images?api_key=' + echonest.api_key + '&id=' + artist_id + '&format=json&results=1&start=0';
    $.get(picQuery, function(picData){
        var picURL = picData.response.images[0].url;
        cb(null, picURL);
    })
}

