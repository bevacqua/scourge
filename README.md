# scourge

> Replace resource locators in JavaScript and CSS files, great for static asset hashing

Use as a CLI or programmatically.

## Install

```shell
npm install --save-dev scourge
```

## API

The API exposes a function.

### `scourge(sources, options, done)`

Scans the provided directories and any sub-directories for JavaScript, CSS, and Jade files; fixing references according to the provided manifest.

Option      | Description
------------|--------------
 `baseUrl`  | The base url to detect, defaults to `/`
 `basePath` | Relative base path that matches `baseUrl`, defaults to `.`
 `map`      | Object mapping paths to replace with replacement paths
 `glob`     | Assume the provided paths are directories to be globbed, defaults to `true`. When set to `false`, treats them as raw file paths instead

`done` is invoked when the operation is complete.

## CLI

Usage

```shell
scourge [dir] [dir] [dir]
```

Invokes the `scourge(sources, options)` API method, using `minimist` for option parsing.

## Example

The CLI works great with `reaver`, being able to consume its output directly.

```shell
reaver public/img/* | scourge views
```

Alternatively provide a `--map` option, pointing to a JSON file.

# License

MIT
