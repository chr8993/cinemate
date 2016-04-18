//configure database connection
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/cinemate');
module.exports = mongoose;