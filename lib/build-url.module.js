var isEmpty = function isEmpty(value) {
  return value === null || value === undefined;
};
var buildUrl = function buildUrl(inputUrl, options) {
  var url;
  var isValidInputUrl = false;
  try {
    url = new URL(inputUrl);
  } catch (error) {
    isValidInputUrl = true;
    if (typeof inputUrl === "string") {
      var host = typeof window === "undefined" ? "http://example.com" : window.location.origin;
      url = new URL(host + "/" + inputUrl.replace(/^\/|\/$/g, ""));
    } else {
      url = typeof window === "undefined" ? new URL("http://example.com") : new URL(window.location.href);
    }
  }
  var _options = typeof inputUrl === "string" ? options : inputUrl;
  if (_options != null && _options.queryParams) {
    for (var key in _options.queryParams) {
      if (Object.prototype.hasOwnProperty.call(_options.queryParams, key)) {
        var element = _options.queryParams[key];
        if (isEmpty(element)) {
          url.searchParams["delete"](key);
        } else {
          url.searchParams.set(key, element);
        }
      }
    }
  }
  if (_options != null && _options.path) {
    url.pathname = _options.path;
  }
  if ((_options == null ? void 0 : _options.path) === null) {
    url.pathname = "";
  }
  if (_options != null && _options.hash) {
    url.hash = _options.hash;
  }
  if (isValidInputUrl && !(_options != null && _options.returnAbsoluteUrl)) {
    return url.pathname + url.search + url.hash;
  }
  return url.toString();
};

export { buildUrl };
//# sourceMappingURL=build-url.module.js.map
