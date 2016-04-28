var db          = require('./config');
var express     = require('express');
var passport    = require('passport');
var app         = express();
var util        = require('./util');
var bodyParser  = require('body-parser');
var session     = require('express-session');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(session({ 
    cookie: { maxAge: 3600000 },
    secret: "!Cin3m4t3"
}));
app.use(passport.session());
app.use(util.isAuth);

//Enable CORS 
var cors = [];
cors[0] =  "Access-Control-Allow-Origin";
cors[1] =  "Access-Control-Allow-Headers";
cors[2] =  "*";
cors[3] =  "Origin, X-Requested-With, ";
cors[3] += "Content-Type, Accept";
app.use(function(req, res, next) {
  res.header(cors[0], cors[2]);
  res.header(cors[1], cors[3]);
  next();
});

app.use('/docs', express.static('./docs'));
require('./routes')(app);

app.listen(80, function() {
    console.log('Server started..');
});
