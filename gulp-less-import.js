/*jshint node: true*/
'use strict';

var path = require('path');
var through = require('through2');
var gutil = require('gulp-util');

module.exports = function (outname) {
  var imports = '';

  function write(file, enc, done) {
    if (file.path !== 'undefined') {
      imports =  imports + '@import "' + path.relative(__dirname, file.path) + '";' + '\n';
    }
    done();
  }

  function flush(dobe) {
    /*jshint validthis:true */

    var newFile = new gutil.File({
      path: __dirname + '/' + outname,
      contents: new Buffer(imports)
    });

    this.push(newFile);
    dobe();
  }

  return through.obj(write, flush);
};
