function listTracks(){
    console.log('listing hot tracks');
    var queryString = 'http://developer.echonest.com/api/v4/song/search?api_key=' + echonest.api_key + '&sort=song_hotttnesss-desc&bucket=song_hotttnesss'
    $.get(queryString, function(data){
        var unique = _.uniq(data.response.songs, function(item){
            return item.title;
        })
        $.get("/api-challenge/templates/trackList.jade", function(template){
            var html = jade.render(template, {items: unique});
            $('#list').html(html);
            console.log(unique);
            showTrack(unique[0].title,unique[0].artist_id)
        })



    })
}
