var db          = require('./config');
var express     = require('express');
var app         = express();

require('./routes')(app);

app.listen(80, function() {
    console.log('Server started..');
});
