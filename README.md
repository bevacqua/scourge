# scourge

> Replace resource locators in JavaScript and CSS files, great for static asset hashing

Use as a CLI or programmatically.

## Install

```shell
npm install --save-dev scourge
```

## API

The API exposes a function.

### `scourge(directories, options)`

Scans the provided directories and any sub-directories for JavaScript or CSS files, fixing references according to the provided manifest.

Option      | Description
------------|--------------
 `baseUrl`  | The base url to detect, defaults to `/`
 `basePath` | Relative base path that matches `baseUrl`, defaults to `.`

## CLI

Usage

```shell
scourge [dir] [dir] [dir]
```

Invokes the `scourge(directories, options)` API method, using `minimist` for option parsing.

## Example

The CLI works great with `reaver`, being able to consume its output directly.

```shell
reaver public/img/* | scourge views
```

# License

MIT
