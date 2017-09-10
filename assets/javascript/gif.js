$(document).ready(function() {

    var artists = [
        "Taylor Swift",
        "Drake",
        "DJ Khaled",
        "Kanye West",
        "The Weeknd",
        "Jay-Z"
    ];


    function renderButtons() {

        $(".gifButtons").empty();

        for (var i = 0; i < artists.length; i++) {

            var artistButton = $("<button>").attr("id", "searchButton");

            $(artistButton).append(artists[i]);

            $(".gifButtons").append(artistButton);
        }
    }

    renderButtons();

    function displayGif(button) {

    	var currentSearch = $(button).html();
    	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + currentSearch + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            console.log(response);

            var results = response.data

            for (var i = 0; i < results.length; i++) {

                var gifDiv = $("<div class='float'>");
                var rating = $("<p>").text("Rating: " + results[i].rating);

                var gifImage = $("<img>");

                gifImage.attr("src", results[i].images.fixed_height.url);

                gifDiv.append(gifImage);
                gifDiv.prepend(rating);

                $(".gifsAppearHere").append(gifDiv);
            }
        });
    }


    $(document).on("click", "#searchButton", function() {
        event.preventDefault();
        $(".gifsAppearHere").empty();
        displayGif(this);
        renderButtons();
    });

    $(".buttonAppender").on("click", function(event) {
        event.preventDefault();
        var userArtist = $("#searchBox").val().trim();
        artists.push(userArtist);
        renderButtons();
     });



});