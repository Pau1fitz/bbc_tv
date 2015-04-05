$(document).ready(function(){
   getGenres();
});

$(document).on('click', '#genres li', function(){
  var genre = $(this).attr('id');
  getTomorrowsSchedule(genre);
});

function getGenres (){
 $.ajax({
  url: "http://www.bbc.co.uk/tv/programmes/genres.json",
  dataType: "json"
  }).done(function(data){
      for (var i = 0; i < data.categories.length; i++) {
      var genres = data.categories[i].title;
      var key = data.categories[i].key;
      $('#genres').append("<li id=" + key + ">" + genres + "</li>");
    };
  });
};


function getTomorrowsSchedule(genre){
 $.ajax({
  url: "http://www.bbc.co.uk/tv/programmes/genres/" + genre + "/schedules/tomorrow.json",
  dataType: "json",
  beforeSend: function(){
    $("#programmes").empty();
    $("#programmes").append("<div id='spinner'><img src='spinner.gif' /></div>");
  }
  }).done(function(data){
    $("#spinner").remove();
          for (var i = 0; i < data.broadcasts.length; i++) {
      var deets = data.broadcasts[i].programme.display_titles.title;
      var synopsis = data.broadcasts[i].programme.short_synopsis;
      var image = data.broadcasts[i].programme.image.pid;
      var duration = data.broadcasts[i].duration;
      var minutes = Math.floor(duration / 60);
      $('#programmes').append("<li><h2>" + deets + "</h2>" + synopsis + "<br>" + " " + minutes + " mins" + "<br>" + "<img src =http://ichef.bbci.co.uk/images/ic/272x153/" + image + ".jpg >");
    };
  });
};








