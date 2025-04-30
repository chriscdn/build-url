# @chriscdn/build-url

A small utility for building URLs.

## Motivation

This package is a fork of [@googlicius/build-url](https://github.com/googlicius/build-url). Full credit to googlicius for the concept, source code, and documentation. 👍

I forked this package for three reasons:

- to provide an ES6 build,
- to fix [this issue](https://github.com/googlicius/build-url/issues/3), and
- to provide a named export.

## Installation

Using npm:

```bash
npm install @chriscdn/build-url
```

Using yarn:

```bash
yarn add @chriscdn/build-url
```

## Usage

Create a url:

```js
import { buildUrl } from "@chriscdn/build-url";

buildUrl("http://my-website.com/post", {
  queryParams: {
    page: 2,
  },
});

// Output: http://my-website.com/post?page=2
```

Add another query parameter:

```js
buildUrl("http://my-website.com/post?page=2", {
  queryParams: {
    sort: "title:asc",
  },
});

// Output: http://my-website.com/post?page=2&sort=title%3Aasc
```

Input url/path is omitted:

```js
buildUrl({
  queryParams: {
    sort: "title:asc",
  },
});

// Output: /?sort=title%3Aasc
```

Remove a query parameter:

```js
buildUrl("images?page=2&sort=title:asc", {
  queryParams: {
    page: null,
  },
});

// Output: /images?sort=title%3Aasc
```

Return an absolute url:

```js
// Assume that current url is: http://awesome-website.com

buildUrl("/posts", {
  returnAbsoluteUrl: true,
  queryParams: {
    page: 2,
  },
});

// Output: http://awesome-website.com/posts?page=2
```

## License

MIT
