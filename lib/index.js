// src/build-url.ts
var isNullOrUndefined = (value) => value === null || value === void 0;
var isDefined = (value) => !isNullOrUndefined(value);
var buildUrl = (inputUrl, options) => {
  let url;
  let isValidInputUrl = false;
  try {
    url = new URL(inputUrl);
  } catch (error) {
    isValidInputUrl = true;
    if (typeof inputUrl === "string") {
      const host = typeof window === "undefined" ? "http://example.com" : window.location.origin;
      url = new URL(`${host}/${inputUrl.replace(/^\/|\/$/g, "")}`);
    } else {
      url = typeof window === "undefined" ? new URL("http://example.com") : new URL(window.location.href);
    }
  }
  const _options = typeof inputUrl === "string" ? options : inputUrl;
  Object.entries(_options?.queryParams ?? {}).forEach(([key, element]) => {
    if (isNullOrUndefined(element)) {
      url.searchParams.delete(key);
    } else if (Array.isArray(element)) {
      element.forEach((ele) => {
        if (isDefined(ele)) {
          url.searchParams.append(key, String(ele));
        }
      });
    } else {
      url.searchParams.set(key, String(element));
    }
  });
  if (_options?.path) {
    url.pathname = _options.path;
  }
  if (_options?.path === null) {
    url.pathname = "";
  }
  if (_options?.hash) {
    url.hash = _options.hash;
  }
  if (isValidInputUrl && !_options?.returnAbsoluteUrl) {
    return url.pathname + url.search + url.hash;
  } else {
    return url.toString();
  }
};

// src/join-url-path.ts
var stripTrailingLeadingSlashes = (item) => item.replace(/^\/+|\/+$/g, "");
var joinUrlPath = (segments, { leading = "preserve", trailing = "preserve" } = {}) => {
  const segmentsAsStrings = segments.map((segment) => String(segment).trim());
  const hasLeading = segments.length ? segmentsAsStrings[0].startsWith("/") : false;
  const hasTrailing = segments.length ? segmentsAsStrings[segmentsAsStrings.length - 1].endsWith("/") : false;
  const pathString = segmentsAsStrings.map(stripTrailingLeadingSlashes).join("/");
  const addLeading = leading === "preserve" ? hasLeading : leading;
  const addTrailing = trailing === "preserve" ? hasTrailing : trailing;
  return `${addLeading ? "/" : ""}${pathString}${addTrailing ? "/" : ""}`.replaceAll(
    "//",
    "/"
  );
};
export {
  buildUrl,
  joinUrlPath
};
//# sourceMappingURL=index.js.map