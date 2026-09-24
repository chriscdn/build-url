# @chriscdn/build-url

A small utility for building URLs.

## Motivation

This package is a fork of [@googlicius/build-url](https://github.com/googlicius/build-url). Full credit to googlicius for the concept, source code, and original documentation. 👍

I forked this package for three reasons:

- to provide an ESM build,
- to fix [this issue](https://github.com/googlicius/build-url/issues/3), and
- to provide a named export.

## Installation

```bash
npm install @chriscdn/build-url
```

## Usage - buildUrl

The **`buildUrl(inputUrl?, options?)`** function builds and normalizes a URL. It accepts either a URL string followed by options, or an options object as the first argument.

### Signature

```ts
buildUrl(inputUrl?: string, options?: UrlOptions): string;

buildUrl(options?: UrlOptions): string;
```

### Options

```ts
type QueryParam = boolean | string | number | null | undefined;

type UrlOptions = {
  queryParams?: Record<string, QueryParam | QueryParam[]>;
  hash?: string;
  path?: string | null;
  appendPath?: string;
  returnAbsoluteUrl?: boolean;
};
```

| Option              | Description                                                                                                                                                |
| ------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `queryParams`       | Sets, appends, or removes query parameters. A value sets the parameter, an array creates multiple values, and `null` or `undefined` removes the parameter. |
| `hash`              | Sets the URL fragment.                                                                                                                                     |
| `path`              | Replaces the URL pathname. `null` clears the pathname.                                                                                                     |
| `appendPath`        | Appends a path to the existing pathname and normalizes repeated slashes.                                                                                   |
| `returnAbsoluteUrl` | Returns an absolute URL instead of a relative URL when the input URL is relative or omitted.                                                               |

### Query parameters

A scalar value sets a query parameter:

```ts
import { buildUrl } from "@chriscdn/build-url";

buildUrl("/posts", {
  queryParams: {
    page: 2,
    published: true,
  },
});

// Output: /posts?page=2&published=true
```

An array creates multiple values for the same parameter:

```ts
buildUrl("/posts", {
  queryParams: {
    tag: ["typescript", "javascript"],
  },
});

// Output: /posts?tag=typescript&tag=javascript
```

`null` and `undefined` remove an existing parameter:

```ts
buildUrl("images?page=2&sort=title:asc", {
  queryParams: {
    page: null,
  },
});

// Output: /images?sort=title%3Aasc
```

When an array is supplied, `null` and `undefined` elements are ignored:

```ts
buildUrl("/posts", {
  queryParams: {
    tag: ["typescript", null, "javascript"],
  },
});

// Output: /posts?tag=typescript&tag=javascript
```

### Path options

`path` replaces the existing pathname:

```ts
buildUrl("https://example.com/posts/123", {
  path: "/users/42",
});

// Output: https://example.com/users/42
```

Setting `path` to `null` clears the pathname:

```ts
buildUrl("https://example.com/posts/123", {
  path: null,
});

// Output: https://example.com
```

`appendPath` appends to the existing pathname:

```ts
buildUrl("/posts", {
  appendPath: "/123",
});

// Output: /posts/123
```

Repeated slashes are normalized when the path is processed:

```ts
buildUrl("/posts//", {
  appendPath: "//123//comments",
});

// Output: /posts/123/comments
```

### Hash

Set a URL fragment with `hash`:

```ts
buildUrl("/posts/123", {
  hash: "comments",
});

// Output: /posts/123#comments
```

### Absolute URLs

By default, relative URLs remain relative:

```ts
buildUrl("/posts", {
  queryParams: {
    page: 2,
  },
});

// Output: /posts?page=2
```

Set `returnAbsoluteUrl` to `true` to return an absolute URL.

In a browser, the current browser origin is used:

```ts
buildUrl("/posts", {
  returnAbsoluteUrl: true,
  queryParams: {
    page: 2,
  },
});

// Output: http://awesome-website.com/posts?page=2
// assuming window.location.origin is "http://awesome-website.com"
```

In Node.js, where there is no browser origin, `http://example.com` is used as the fallback origin. To produce a meaningful absolute URL in Node.js, provide an absolute input URL:

```ts
buildUrl("https://my-website.com/posts", {
  returnAbsoluteUrl: true,
  queryParams: {
    page: 2,
  },
});

// Output: https://my-website.com/posts?page=2
```

When `returnAbsoluteUrl` is `true`, a relative input URL is resolved against the current browser origin.

### Options as the first argument

When there is no input URL, the options object can be passed directly:

```ts
buildUrl({
  queryParams: {
    sort: "title:asc",
  },
});

// Output: /?sort=title%3Aasc
```

This is equivalent to:

```ts
buildUrl(undefined, {
  queryParams: {
    sort: "title:asc",
  },
});
```

## Usage - joinUrlPath

The **`joinUrlPath(segments, options?)`** function joins URL path segments into a normalized URL path.

It collapses consecutive slashes to a single slash, including repeated slashes within segments, while preserving the `//` in URL schemes such as `https://`.

By default, it _preserves_ the leading slash of the first segment and the trailing slash of the last segment (`"preserve"`). Both can be forced on (`true`) or stripped (`false`) via the `leading` and `trailing` options.

Segments can be strings or numbers.

### Signature

```ts
joinUrlPath(
  segments: readonly (string | number)[],
  options?: JoinUrlPathOptions,
): string;
```

### Options

```ts
type SlashBehavior = boolean | "preserve";

type JoinUrlPathOptions = {
  leading?: SlashBehavior;
  trailing?: SlashBehavior;
};
```

| Option     | Description                                                                                                                       |
| ---------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `leading`  | Controls the leading slash. `"preserve"` preserves the current behavior, `true` forces a leading slash, and `false` removes it.   |
| `trailing` | Controls the trailing slash. `"preserve"` preserves the current behavior, `true` forces a trailing slash, and `false` removes it. |

### Examples

```ts
import { joinUrlPath } from "@chriscdn/build-url";

joinUrlPath(["api", "users", 42]);
// "api/users/42"

joinUrlPath(["/api////", "/users//", "/42////"]);
// "/api/users/42/"

joinUrlPath(["/api/", "users"], { trailing: true });
// "/api/users/"

joinUrlPath(["/api/", "users"], { leading: false });
// "api/users"

joinUrlPath(["https://example.com////", "/api//users"]);
// "https://example.com/api/users"
```

## License

[MIT](LICENSE)
