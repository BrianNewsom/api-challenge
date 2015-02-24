
$(document).ready(function(){
    $( "#hot-tracks" ).on( "click", function( event ) {
        listTracks()
    })

    $( "#hot-artists" ).on( "click", function( event ) {
        listArtists()
    })

    $('#submit-btn').on('click', function(event){
        var query = $('#search-bar').val();
        showTrack('' + query, null);
    })
})
