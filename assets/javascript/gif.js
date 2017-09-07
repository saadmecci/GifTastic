$(document).ready(function () {

	var artists = [
		"Taylor Swift", 
		"Drake", 
		"DJ Khaled", 
		"Kanye West", 
		"The Weeknd", 
		"Jay-Z"
	];


	function renderButtons () {

		$(".gifButtons").empty();

		for (var i = 0; i < artists.length; i++) {

			$(".gifButtons").append("<button class='searchButton'>" + artists[i] + "</button>");
		}
	}

	renderButtons();

	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + $(".searchButton").html() + "&api_key=dc6zaTOxFJmzC&limit=10"

	function displayGif () {
		$.ajax({
			url: queryURL,
			method: "GET"
		}).done(function(response){

			
			console.log(response);
			$(".gifsAppearHere").html(response);
		})
	}

	function buttonClicker () {

		$(".searchButton").on("click", function () {
			event.preventDefault();
			displayGif();
		})
	}

	buttonClicker();

	$(".buttonAppender").on("click", function (event) {
		event.preventDefault();
		var userArtist = $("#searchBox").val().trim();
		artists.push(userArtist);
		renderButtons();
	});

});


