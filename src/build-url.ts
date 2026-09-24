import { isDefined, isNull, isNullish, isString } from "@chriscdn/type-guards";
import { joinUrlPath } from "./join-url-path";

type QueryParam = boolean | string | number | null | undefined;

type UrlOptions = {
  queryParams?: Record<string, QueryParam | QueryParam[]>;
  hash?: string;
  path?: string | null;
  appendPath?: string;
  returnAbsoluteUrl?: boolean;
};

const NOOP_URL =
  typeof window === "undefined" ? "http://example.com" : window.location.origin;

const buildUrl = (inputUrl?: string | UrlOptions, options?: UrlOptions) => {
  let url: URL;
  let isInvalidInputUrl = false;

  try {
    url = new URL(inputUrl as string);
  } catch {
    isInvalidInputUrl = true;

    url = isString(inputUrl)
      ? new URL(joinUrlPath([NOOP_URL, inputUrl]))
      : new URL(NOOP_URL);
  }

  const _options = isString(inputUrl) ? options : inputUrl;

  Object.entries(_options?.queryParams ?? {}).forEach(([key, element]) => {
    if (isNullish(element)) {
      url.searchParams.delete(key);
    } else if (Array.isArray(element)) {
      url.searchParams.delete(key);

      element
        .filter(isDefined)
        .forEach((ele) => url.searchParams.append(key, String(ele)));
    } else {
      url.searchParams.set(key, String(element));
    }
  });

  if (isString(_options?.path)) {
    url.pathname = _options.path;
  } else if (isNull(_options?.path)) {
    url.pathname = "";
  }

  if (_options?.appendPath) {
    url.pathname = joinUrlPath([url.pathname, _options.appendPath]);
  }

  // Preserve a trailing slash on non root paths while normalizing duplicate slashes.
  const hasPathWithTrailingSlash =
    url.pathname.length > 1 && url.pathname.endsWith("/");

  // Remove duplicate slashes, e.g. /a//b => /a/b.
  url.pathname = joinUrlPath(url.pathname.split("/"));

  if (hasPathWithTrailingSlash) {
    url.pathname = url.pathname + "/";
  }

  if (_options?.hash) {
    url.hash = _options.hash;
  }

  if (isInvalidInputUrl && !_options?.returnAbsoluteUrl) {
    // return a relative path
    return [url.pathname, url.search, url.hash].join("");
  } else {
    // return an absolute path
    return url.toString();
  }
};

export { buildUrl };
