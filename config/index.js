//configure database connection
var mongoose = require('mongoose');
var opts = {
    user: "cinemate",
    pass: "!Cin3m4t3"
};
mongoose.connect('mongodb://localhost:27017/cinemate');
module.exports = mongoose;