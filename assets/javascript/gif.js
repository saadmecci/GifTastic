$(document).ready(function() {

	//array of gif button topics that will be preset on the webpage
    var artists = [
        "Taylor Swift",
        "Drake",
        "DJ Khaled",
        "Kanye West",
        "The Weeknd",
        "Jay-Z"
    ];

    //artists array is then converted to buttons and then displayed on the html
    function renderButtons() {

    	//.empty placed here so that the buttons do not start repeating themselves
        $(".gifButtons").empty();

        for (var i = 0; i < artists.length; i++) {

            var artistButton = $("<button>").attr("id", "searchButton");

            $(artistButton).append(artists[i]);

            $(".gifButtons").append(artistButton);
        }
    }
    //call the button appending function
    renderButtons();


    //function that will make the api call and place the gifs on the page
    function displayGif(button) {

    	//store the name of the button as a variable
    	var currentSearch = $(button).html();

    	//the url that will be used for the ajax call from giphy
    	var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + currentSearch + "&api_key=dc6zaTOxFJmzC&limit=10";

        $.ajax({
            url: queryURL,
            method: "GET"
        }).done(function(response) {

            console.log(response);

            var results = response.data;

            //for loop to display the 10 gifs from the ajax call
            for (var i = 0; i < results.length; i++) {

                var gifDiv = $("<div class='float'>");
                var rating = $("<p>").text("Rating: " + results[i].rating);

                var gifImage = $("<img id='gifImage'>");

                //this url will display the gif still
                gifImage.attr("src", results[i].images.fixed_height_still.url);

                gifDiv.append(gifImage);
                gifDiv.append(rating);

                $(".gifsAppearHere").append(gifDiv);
            }

            //on click function needed to replace the stil url with the moving gif url when user clicks on the gif
            
        });
    }

    //function that will call on the displayGif function depending upon what artist button has been clicked by the user
    $(document).on("click", "#searchButton", function() {
        event.preventDefault();

        //.empty required so that the current 10 gifs get replaced by the next button that is clicked
        $(".gifsAppearHere").empty();
        displayGif(this);
        renderButtons();
    });

    //function that will make new buttons appear that the user wants to add so they can search for those gifs
    $(".buttonAppender").on("click", function(event) {
        event.preventDefault();
        var userArtist = $("#searchBox").val().trim();
        artists.push(userArtist);
        renderButtons();
     });

});