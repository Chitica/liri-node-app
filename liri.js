var result = require("dotenv").config();
var keys = require("./keys");
var Twitter = require("twitter");
var request = require("request");


function myTweets(){

var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
 });

 var params = {
    q: 'lisethce123',
    count: 20,
    result_type: 'recent',
    lang: 'en'
  }
  
  client.get('search/tweets', params, function(err, data, response) {
    if(!err){
      for(let i = 0; i < data.statuses.length; i++){
        let tweets = { id: data.statuses[i].text };
        let my_tweets = tweets.id;

         console.log(my_tweets);

          if(err){
            console.log(err[0].message);
          }
      }
    } else {
      console.log(err);
    }
  })

}

function omdbMovies(){
    
    var nodeArgs = process.argv;

    var movieName = "";
    
    for (var i = 3; i < nodeArgs.length; i++) {
    
      if (i > 3 && i < nodeArgs.length) {
    
        movieName = movieName + "+" + nodeArgs[i];
    
      }
    
      else {
    
        movieName += nodeArgs[i];
    
      }
    }
    
    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy&tomatoes=true";

    console.log(queryUrl);

    request(queryUrl, function(error, response, body) {

      if (!error && response.statusCode === 200) {
        
        console.log("Movie Name: " + JSON.parse(body).Title);
        console.log("Year Released: " + JSON.parse(body).Year);
        console.log("IMBD Rating: " + JSON.parse(body).imdbRating);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).tomatoRating);
        console.log("Country Produced: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
    
      }
    });
    }
    

var command = process.argv[2];

switch(command){
    case "my-tweets":
        myTweets();
        break;
    case "movie-this":
        omdbMovies();
        break;
}


 
