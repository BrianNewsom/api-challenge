function showTrack(name){
    // name can be a song title or artist name - queries for relevant articles
    console.log('showing individual track');
    var name = escape(name);
    var maxResults = 3;
    var query = "http://developer.echonest.com/api/v4/artist/news?api_key=" + echonest.api_key + "&name=" + name + "&results=" + maxResults + "&start=0";
    $.get(query, function(data){
        var news = data.response.news;
        $.get("/api-challenge/templates/trackView.jade", function(template){
            var html = jade.render(template, {items: news})
            $("#details").html(html);
        })
    })
}