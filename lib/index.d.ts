//#region src/build-url.d.ts
type QueryParam = boolean | string | number | null | undefined;
type UrlOptions = {
  queryParams?: Record<string, QueryParam | QueryParam[]>;
  hash?: string;
  path?: string | null;
  appendPath?: string;
  returnAbsoluteUrl?: boolean;
};
declare const buildUrl: (inputUrl?: string | UrlOptions, options?: UrlOptions) => string;
//#endregion
//#region src/join-url-path.d.ts
type SlashBehavior = boolean | "preserve";
type JoinUrlPathOptions = {
  leading?: SlashBehavior;
  trailing?: SlashBehavior;
};
declare const joinUrlPath: (segments: readonly (string | number)[], { leading, trailing }?: JoinUrlPathOptions) => string;
//#endregion
export { buildUrl, joinUrlPath };
//# sourceMappingURL=index.d.ts.map