import { isStringWithValue } from "@chriscdn/type-guards";

type SlashBehavior = boolean | "preserve";

type JoinUrlPathOptions = {
  leading?: SlashBehavior;
  trailing?: SlashBehavior;
};

const joinUrlPath = (
  segments: readonly (string | number)[],
  { leading = "preserve", trailing = "preserve" }: JoinUrlPathOptions = {},
): string => {
  const segmentsAsStrings = segments
    .map((segment) => String(segment).trim())
    .filter(isStringWithValue);

  let url = segmentsAsStrings.length
    ? segmentsAsStrings.reduce(
        (a, b) => `${a.replace(/\/+$/, "")}/${b.replace(/^\/+/, "")}`,
      )
    : "";

  const hasLeading = url.startsWith("/");

  if (leading !== "preserve") {
    if (hasLeading && !leading) {
      url = url.slice(1);
    } else if (!hasLeading && leading) {
      url = "/" + url;
    }
  }

  const hasTrailing = url.endsWith("/");

  if (trailing !== "preserve") {
    if (hasTrailing && !trailing) {
      url = url.slice(0, -1);
    } else if (!hasTrailing && trailing) {
      url += "/";
    }
  }

  /**
   * Collapse consecutive slashes to a single slash, except for the `//`
   * in URL schemes such as `https://`.
   */
  return url.replace(/(?<!:)\/{2,}/g, "/");
};

export { joinUrlPath };
