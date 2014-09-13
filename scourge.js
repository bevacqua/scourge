'use strict';

var fs = require('fs');
var path = require('path');
var util = require('util');
var multi = require('multi-glob');
var trailing = /\/$/;
var expand = '**/*.{js,css,html,jade}';
var escapegoat = /[-\\/[\]{}().?+*^$|]/g;

function everything (dir) {
  return trailing.test(dir) ? dir + expand : dir + '/' + expand;
}

function api (sources, options, done) {
  var o = options;
  if (done === void 0) {
    done = o;
    o = {};
  }
  o.basePath = path.resolve(o.basePath || './public');

  if (o.baseUrl === void 0) { o.baseUrl = '/'; }
  if (o.map === void 0) { done(new Error('The `map` option is required.')); return; }
  if (o.glob === false) {
    handle(null, sources);
  } else {
    multi.glob(sources.map(everything), handle);
  }

  function handle (err, files) {
    if (err) {
      done(err); return;
    }
    files.forEach(analyze);
  }

  function analyze (file) {
    var ext = path.extname(file).substr(1);
    var orig = read(file);
    var diff = transform(orig);
    if (diff.length !== orig.length) {
      write(file, diff); // use case is asset hashing, meaning the length will always differ
    }
  }

  function transform (data) {
    var domain = escape(o.domain);
    return Object.keys(o.map).reduce(convert, data);

    function convert (result, key) {
      var url = uri(key);
      var replacement = uri(o.map[key]);
      var pattern = util.format('[\'"(](%s)?%s[\'")]', domain, escape(url));
      var r = new RegExp(pattern, 'g');
      return result.replace(r, '$1' + replacement);
    }
  }

  function escape (text) {
    return text.replace(escapegoat, '\\$&');
  }

  function read (file) {
    return fs.readFileSync(file, { encoding: 'utf8' });
  }

  function write (file, data) {
    fs.writeFileSync(file, data, { encoding: 'utf8' });
  }

  function uri (file) {
    return file.replace(o.basePath, o.baseUrl);
  }

  function phys (url) {
    return url.replace(o.baseUrl, o.basePath);
  }
}

module.exports = api;
