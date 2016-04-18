var db          = require('./config');
var Movie       = require('./controllers/movies');
var _           = require('lodash');
var $q          = require('q');
var cloudinary  = require('cloudinary');
var http        = require('http');

// var api_key    = "848759767376558";
// var api_secret = "D1g-P-6b3NFAi0m_F9VmXgNAU60";
// cloudinary.config({ 
//   cloud_name: 'cinemate', 
//   api_key: api_key, 
//   api_secret: api_secret 
// });
// Movie.getTop(10)
// .then(function(res) {
//   var rank = 1;
//   var movies = res._data;
//   _.forEach(movies, function(val) {
//       http.get({
//         host: 'webservice.fanart.tv',
//         path: '/v3/movies/' + val.imdbID + '?api_key=9f60752bc1436e4b6ebe74a0fd5c03cb'
//     }, function(response) {
//         // Continuously update stream with data
//         var body = '';
//         response.on('data', function(d) {
//             body += d;
//         });
//         response.on('end', function() {
//             console.log(body);
//         });
//      });
//       rank++;
//   })
// });
// Movie.loadAll()
// .then(function(res) {
//     if(res) {
//         var rank = 1;
        
//         var updatePoster = function(movie) {
//             var d = $q.defer();
//             var poster = movie.poster;
//             if(poster) {
//                 var imdbId = movie.imdbID;
//                 var id = movie._id;
//                 var opts = {};
//                 opts.public_id = id;
//                 cloudinary.uploader
//                 .upload(poster, function(result) { 
//                   console.log(result);
//                   d.resolve(true);
//                 }, opts);
//             }
//             return d.promise;
//         };
        
//         var promises = [];
//         var movies = res;
//         _.forEach(movies, function(val) {
//             var movie = val;
//             promises.push(updatePoster(movie));
//         });
        
//         $q.all(promises).then(function() {
//             console.log("ALLL DONE!!!");
//         });
//     }
// });
Movie.getTop(10)
.then(function(res) {
    if(res) {
        var rank = 1;
        var updatePoster = function(movie) {
            var d = $q.defer();
            var id = movie.imdbID;
            if(id) {
                var key = "9f60752bc1436e4b6ebe74a0fd5c03cb";
                var host = "webservice.fanart.tv";
                var path = "/v3/movies/" + id + "";
                path += "?api_key=" + key;
                http.get({
                    host: host,
                    path: path
                }, function(response) {
                    var body = "";
                    response.on("data", function(a) {
                        body += a;
                    });
                    response.on("end", function(r) {
                        var stats = JSON.parse(body);
                        var bg = stats.moviebackground[0].url;
                        console.log(movie.title + ":" + bg);
                        d.resolve(true);
                    });
                })
            }
            return d.promise;
        };
        
        var promises = [];
        var movies = res._data;
        _.forEach(movies, function(val) {
            var movie = val;
            promises.push(updatePoster(movie));
        });
        
        $q.all(promises).then(function() {
            console.log("ALLL DONE!!!");
        });
    }
});