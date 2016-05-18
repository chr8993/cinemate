var db          = require('./config');
var express     = require('express');
var passport    = require('passport');
var app         = express();
var util        = require('./util');
var bodyParser  = require('body-parser');
var session     = require('express-session');
var path        = require('path');
var cors        = require('cors');

//Enable CORS 
var o = {};
o.credentials = true;
o.origin = true;
app.use(cors(o));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(session({ 
    cookie: { maxAge: 3600000 },
    secret: "!Cin3m4t3"
}));
app.use(passport.session());
app.use(util.isAuth);

app.use('/docs', express.static('./docs'));
require('./routes')(app);

app.listen(80, function() {
    console.log('Server started..');
});
