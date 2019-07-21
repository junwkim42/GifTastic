var topics = ["dogs", "cats", "birds"];
var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=197a6pOYUhmAsSsQTpJKc3XCwLe5rMGi&limit=10";

function makeButton(){
  $("#buttonArea").empty();
  for (var i = 0; i < topics.length; i++) {

    var a = $("<button>");
    a.addClass("animals");
    a.attr("data-name", topics[i]);
    a.text(topics[i]);
    $("#buttonArea").append(a);
  }
}


$("#submit").on("click", function(){
  var topic = $("input[id=name-button]").val().trim();
  topics.push(topic);
  makeButton();
});

$(document).on("click", "button" ,function(){
  var squery = "&q=" + $(this).attr("data-name");
  console.log(squery);
  queryURL = queryURL + squery;
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {  
    console.log(response);

    for(var i = 0; i < 10; i++){
      var newRating = $("<p>");
      var newImg = $("<img>");
      newImg.attr("data-state", "still");
      newImg.attr("src", response.data[i].images["480w_still"].url);
      newImg.attr("data-still", response.data[i].images["480w_still"].url);
      newImg.attr("data-animate", response.data[i].images["downsized_medium"].url);
      newImg.addClass("gif");
      newRating.text("Rating: " + response.data[i].rating);
      $("#" + i).empty();
      $("#" + i).append(newRating);
      $("#" + i).append(newImg);
    }

  });

});

$(document).on("click", ".gif" ,function(){
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-animate"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("data-still"));
    $(this).attr("data-state", "still");
  }
});

makeButton();
