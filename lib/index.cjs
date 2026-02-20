"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var index_exports = {};
__export(index_exports, {
  buildUrl: () => buildUrl
});
module.exports = __toCommonJS(index_exports);
var isEmpty = (value) => value === null || value === void 0;
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
  if (_options?.queryParams) {
    for (const key in _options.queryParams) {
      if (Object.prototype.hasOwnProperty.call(_options.queryParams, key)) {
        const element = _options.queryParams[key];
        if (isEmpty(element)) {
          url.searchParams.delete(key);
        } else {
          url.searchParams.set(key, element);
        }
      }
    }
  }
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
  }
  return url.toString();
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  buildUrl
});
//# sourceMappingURL=index.cjs.map