'use strict';

var multi = require('multi-glob');
var trailing = /\/$/;
var expand = '**/*.{js,css,jade}';

function everything (dir) {
  return trailing.test(dir) ? dir + expand : dir + '/' + expand;
}

function api (sources, options, done) {
  if (options.glob === false) {
    transform(null, sources);
  } else {
    multi.glob(sources.map(everything), transform);
  }

  function transform (err, files) {
    if (err) {
      done(err); return;
    }
    files.forEach(analyze);
  }

  function analyze (file) {
    console.log(file);
    // read file
    // compare urls to map (take into account url to absolute and absolute to url)
    // replace as needed
    // write back to disk
  }
}

module.exports = api;
