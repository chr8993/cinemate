var redis = require('redis');
var opts   = {
    host: "127.0.0.1",
    port: 6379,
    auth_pass: "!Cin3m4t3"
};
var client = redis.createClient(opts);
module.exports = client;