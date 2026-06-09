type SlashBehavior = boolean | "preserve";

type JoinUrlPathOptions = {
  leading?: SlashBehavior; // "preserve" (default) | true = force | false = strip
  trailing?: SlashBehavior; // "preserve" (default) | true = force | false = strip
};

const stripTrailingLeadingSlashes = (item: string) =>
  item.replace(/^\/+|\/+$/g, "");

const joinUrlPath = (
  segments: Array<string | number>,
  { leading = "preserve", trailing = "preserve" }: JoinUrlPathOptions = {},
): string => {
  const segmentsAsStrings = segments.map((segment) => String(segment).trim());

  const hasLeading = segments.length
    ? segmentsAsStrings[0]!.startsWith("/")
    : false;

  const hasTrailing = segments.length
    ? segmentsAsStrings[segmentsAsStrings.length - 1]!.endsWith("/")
    : false;

  // Collapse consecutive slashes, strip both ends to get a clean core
  const pathString = segmentsAsStrings
    .map(stripTrailingLeadingSlashes)
    .join("/");

  const addLeading = leading === "preserve" ? hasLeading : leading;
  const addTrailing = trailing === "preserve" ? hasTrailing : trailing;

  return `${addLeading ? "/" : ""}${pathString}${addTrailing ? "/" : ""}`.replaceAll(
    "//",
    "/",
  );
};

export { joinUrlPath };
