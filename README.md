# chriscdn/build-url

A helper to build url with query params as easy way. Helpful when your application routing or state management based on URL query params.

This package is a fork of [@googlicius/build-url](https://github.com/googlicius/build-url). Full credit to the author for the code and documentation.

I forked this package for two reasons:

- to provide an ES6 build, and
- to fix [this issue](https://github.com/googlicius/build-url/issues/3).

---

## Installation

```sh
npm install @googlicius/build-url
```

Or Yarn:

```sh
yarn add @googlicius/build-url
```

## Usage

```js
import buildUrl from "@googlicius/build-url";

buildUrl("http://my-website.com/post", {
  queryParams: {
    page: 2,
  },
});

// Output: http://my-website.com/post?page=2
```

Add another query param:

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

Remove a query param:

```js
buildUrl("images?page=2&sort=title:asc", {
  queryParams: {
    page: null,
  },
});

// Output: /images?sort=title%3Aasc
```

Always returns absolute url:

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
