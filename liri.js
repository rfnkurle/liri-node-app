
require("dotenv").config();
// variables
var keys = require("./keys.js");
var fs = require("fs");
var Spotify = require('node-spotify-api');
var spotify = new Spotify(keys.spotify);
var userOption = process.argv.slice(3).join("+");
var inputInfo = process.argv[2];
var axios = require("axios");

UserInputs();


function UserInputs() {
//switch case takes in functions into commands for node
    switch (inputInfo) {
        case "concert-this":
            concertInfo(userOption);
            break;
        case "spotify-this-song":
            spotifyThis(userOption);
            break;
        case "movie-this":
            findMovie(userOption);
            break;
        case "do-what-it-says":
            doWhatISay();
            break;
        default:
            console.log("Invalid Option. DO BETTER")

    }
}
//function for concert info. Nickelback concert info if user fails to name an artist 
function concertInfo(userOption) {
    var moment = require('moment'); moment().format();
    // var userOption = process.argv.slice(3).join(" ");
    if (!userOption) {
        userOption = "Nickelback";
    } 
    axios.get("https://rest.bandsintown.com/artists/" + userOption + "/events?app_id=codingbootcamp")
        .then(function (response) {
            for (var i = 0; i < 1; i++) {
                console.log("-------------------------------------")
                console.log("Artist: " + userOption)
                console.log("Venue Name: " + response.data[i].venue.name);
                console.log("Venue Location: " + response.data[i].venue.city + ", " + response.data[i].venue.country);
                console.log("Date of the Event: " + moment(response.data[i].datetime).format("L"));
                console.log("-------------------------------------")

            }
        });
}

// spotify info on a song of user's choice
function spotifyThis(userOption) {
    if (!userOption) {
        spotify.search({
            type: 'track',
            query: "the sign, ace of base",
            limit: 1
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            console.log("-------------------------------------")
            console.log(`\n\nArtist(s): ${data.tracks.items[0].artists[0].name}`);
            console.log(`Song: ${data.tracks.items[0].name}`)
            console.log(`Preview: ${data.tracks.items[0].preview_url}`)
            console.log(`Album: ${data.tracks.items[0].album.name}\n`)
            console.log("-------------------------------------")
           
        })
    } else {
        spotify.search({
            type: 'track',
            query: userOption,
            limit: 1
        }, function (err, data) {
            if (err) {
                return console.log('Error occurred: ' + err);
            }
            
            console.log("-------------------------------------")
            console.log(`\n\nArtist(s): ${data.tracks.items[0].artists[0].name}`);
            console.log(`Song: ${data.tracks.items[0].name}`)
            console.log(`Preview: ${data.tracks.items[0].preview_url}`)
            console.log(`Album: ${data.tracks.items[0].album.name}\n`)
            console.log("-------------------------------------")
            

        })
    }
}
// finds movies information based on user input
function findMovie(userOption) {

    
    var queryUrl = "http://www.omdbapi.com/?t=" + userOption + "&y=&plot=short&apikey=trilogy";

    if (!userOption){
    axios.get("http://www.omdbapi.com/?t=mr+nobody&y=&plot=short&apikey=trilogy").then(
        function (response) {
            console.log("-------------------------------------")
            console.log(`\nTitle: ${response.data.Title}`);
            console.log(`Year: ${response.data.Year}`);
            console.log(`Rating: ${response.data.imdbRating}`);
            console.log(`Rotten Tomatoes rating: ${response.data.Ratings[1].Value}`);
            console.log(`Country: ${response.data.Country}`);
            console.log(`Language: ${response.data.Language}`);
            console.log(`Plot: ${response.data.Plot}`);
            console.log(`Actors: ${response.data.Actors}\n`);
            console.log ("-------------------------------------")

        });
    } 
     (process.argv.length === 3) 
        axios.get(queryUrl).then(
            function (response) {
                console.log("-------------------------------------")
                console.log("Movie title: " + response.data.Title);
                console.log("Release year: " + response.data.Year)
                console.log("IMDB Rating: " + response.data.imdbRating)
                console.log("Rotten Tomatoes Rating: " + response.data.Ratings[1].Value)
                console.log("Country: " + response.data.Country)
                console.log("Language: " + response.data.Language)
                console.log("Plot: " + response.data.Plot)
                console.log("Actors: " + response.data.Actors)
                console.log("-------------------------------------")

            }); 
        }

    




// functions that reads random.txt in order to execute one of the above functions

function doWhatISay() {
    // reads random.txt and executes function
    fs.readFile('random.txt', 'utf8', function (err, data) {
        if (err) {
            return console.log(err);

        } 
       
        var dataArr = data.split(",");
        inputInfo = dataArr[0];
        userOption = dataArr[1].trim();
        UserInputs();
        console.log(userOption)

        
        
        
    });
    
      
}


