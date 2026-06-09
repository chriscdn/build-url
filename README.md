# @chriscdn/build-url

A small utility for building URLs.

## Motivation

This package is a fork of [@googlicius/build-url](https://github.com/googlicius/build-url). Full credit to googlicius for the concept, source code, and documentation. 👍

I forked this package for three reasons:

- to provide an ESM build,
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

## Usage - buildUrl

Create a url:

```ts
import { buildUrl } from "@chriscdn/build-url";

buildUrl("http://my-website.com/post", {
  queryParams: {
    page: 2,
  },
});

// Output: http://my-website.com/post?page=2
```

Add another query parameter:

```ts
buildUrl("http://my-website.com/post?page=2", {
  queryParams: {
    sort: "title:asc",
  },
});

// Output: http://my-website.com/post?page=2&sort=title%3Aasc
```

Input url/path is omitted:

```ts
buildUrl({
  queryParams: {
    sort: "title:asc",
  },
});

// Output: /?sort=title%3Aasc
```

Remove a query parameter:

```ts
buildUrl("images?page=2&sort=title:asc", {
  queryParams: {
    page: null,
  },
});

// Output: /images?sort=title%3Aasc
```

Return an absolute url:

```ts
// Assume that current url is: http://awesome-website.com

buildUrl("/posts", {
  returnAbsoluteUrl: true,
  queryParams: {
    page: 2,
  },
});

// Output: http://awesome-website.com/posts?page=2
```

## Usage - joinUrlPath

The **`joinUrlPath(segments, options?)`** function joins an array of path segments into a clean URL path, collapsing redundant slashes between segments. By default it _preserves_ the leading slash of the first segment and the trailing slash of the last segment (`"preserve"`), but both can be forced on (`true`) or stripped (`false`) via the `leading` and `trailing` options. Segments can be strings or numbers.

```ts
import { joinUrlPath } from "@chriscdn/build-url";

joinUrlPath(["api", "users", 42]); // "api/users/42"
joinUrlPath(["/api/", "/users/", "/42/"]); // "/api/users/42/"
joinUrlPath(["/api/", "users"], { trailing: true }); // "/api/users/"
joinUrlPath(["/api/", "users"], { leading: false }); // "api/users"
```

## License

[MIT](LICENSE)
