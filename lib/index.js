import { isDefined, isNull, isNullish, isString, isStringWithValue } from "@chriscdn/type-guards";
//#region src/join-url-path.ts
const joinUrlPath = (segments, { leading = "preserve", trailing = "preserve" } = {}) => {
	const segmentsAsStrings = segments.map((segment) => String(segment).trim()).filter(isStringWithValue);
	let url = segmentsAsStrings.length ? segmentsAsStrings.reduce((a, b) => `${a.replace(/\/+$/, "")}/${b.replace(/^\/+/, "")}`) : "";
	const hasLeading = url.startsWith("/");
	if (leading !== "preserve") {
		if (hasLeading && !leading) url = url.slice(1);
		else if (!hasLeading && leading) url = "/" + url;
	}
	const hasTrailing = url.endsWith("/");
	if (trailing !== "preserve") {
		if (hasTrailing && !trailing) url = url.slice(0, -1);
		else if (!hasTrailing && trailing) url += "/";
	}
	/**
	* Collapse consecutive slashes to a single slash, except for the `//`
	* in URL schemes such as `https://`.
	*/
	return url.replace(/(?<!:)\/{2,}/g, "/");
};
//#endregion
//#region src/build-url.ts
const NOOP_URL = typeof window === "undefined" ? "http://example.com" : window.location.origin;
const buildUrl = (inputUrl, options) => {
	let url;
	let isInvalidInputUrl = false;
	try {
		url = new URL(inputUrl);
	} catch {
		isInvalidInputUrl = true;
		url = isString(inputUrl) ? new URL(joinUrlPath([NOOP_URL, inputUrl])) : new URL(NOOP_URL);
	}
	const _options = isString(inputUrl) ? options : inputUrl;
	Object.entries(_options?.queryParams ?? {}).forEach(([key, element]) => {
		if (isNullish(element)) url.searchParams.delete(key);
		else if (Array.isArray(element)) {
			url.searchParams.delete(key);
			element.filter(isDefined).forEach((ele) => url.searchParams.append(key, String(ele)));
		} else url.searchParams.set(key, String(element));
	});
	if (isString(_options?.path)) url.pathname = _options.path;
	else if (isNull(_options?.path)) url.pathname = "";
	if (_options?.appendPath) url.pathname = joinUrlPath([url.pathname, _options.appendPath]);
	const hasPathWithTrailingSlash = url.pathname.length > 1 && url.pathname.endsWith("/");
	url.pathname = joinUrlPath(url.pathname.split("/"));
	if (hasPathWithTrailingSlash) url.pathname = url.pathname + "/";
	if (_options?.hash) url.hash = _options.hash;
	if (isInvalidInputUrl && !_options?.returnAbsoluteUrl) return [
		url.pathname,
		url.search,
		url.hash
	].join("");
	else return url.toString();
};
//#endregion
export { buildUrl, joinUrlPath };

//# sourceMappingURL=index.js.map