'use strict';

var multi = require('multi-glob');
var trailing = /\/$/;
var expand = '**/*.{js,css,jade}';

function everything (dir) {
  return trailing.test(dir) ? dir + expand : dir + '/' + expand;
}

function api (directories, options) {
  var files = multi.glob(directories.map(everything));
  console.log(files);
  // TODO read stdin for manifest, or grab from file in options
  // TODO glob dirs
  // TODO use manifest
  // read each JS, CSS file in dir, transform urls accordingly.
}

module.exports = api;
