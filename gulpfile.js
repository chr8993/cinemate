var gulp  = require('gulp'); 
var jsdoc = require('gulp-angular-jsdoc');
var path  = require('path');
var shell = require('gulp-shell');


var files = [
    "./models/*.js",
    "./controllers/*.js",
    "./routes/*.js",
    "./README.md"
]; 

var p = path.resolve('node_modules/jsdoc/jsdoc.js');
var conf = path.resolve('node_modules/angular-jsdoc/conf.json');
var docs = path.resolve('docs');
var js = path.resolve('./models');
var temp = path.resolve('node_modules/angular-jsdoc/template');
var readme = path.resolve('README.md');
gulp.task('docs', function() {
    shell.task([
    'node ' + p +
    ' -c ' + conf +
    ' -t '+ temp +
    ' -d ' + docs +
    ' -r ' + js +
    ' --readme ' + readme
    ]);
});
