type QueryParam = string | number | null | undefined;

type UrlOptions = {
  queryParams?: Record<string, QueryParam | QueryParam[]>;
  hash?: string;
  path?: string | null;
  returnAbsoluteUrl?: boolean;
};

const isNullOrUndefined = (value: unknown) =>
  value === null || value === undefined;

const isDefined = (value: unknown) => !isNullOrUndefined(value);

const buildUrl = (inputUrl?: string | UrlOptions, options?: UrlOptions) => {
  let url: URL;
  let isValidInputUrl = false;

  try {
    url = new URL(inputUrl as string);
  } catch (error) {
    isValidInputUrl = true;

    if (typeof inputUrl === "string") {
      const host =
        typeof window === "undefined"
          ? "http://example.com"
          : window.location.origin;

      url = new URL(`${host}/${inputUrl.replace(/^\/|\/$/g, "")}`);
    } else {
      url =
        typeof window === "undefined"
          ? new URL("http://example.com")
          : new URL(window.location.href);
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

export { buildUrl };
