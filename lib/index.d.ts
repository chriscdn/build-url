type QueryParam = boolean | string | number | null | undefined;
type UrlOptions = {
    queryParams?: Record<string, QueryParam | QueryParam[]>;
    hash?: string;
    path?: string | null;
    returnAbsoluteUrl?: boolean;
};
declare const buildUrl: (inputUrl?: string | UrlOptions, options?: UrlOptions) => string;

type SlashBehavior = boolean | "preserve";
type JoinUrlPathOptions = {
    leading?: SlashBehavior;
    trailing?: SlashBehavior;
};
declare const joinUrlPath: (segments: Array<string | number>, { leading, trailing }?: JoinUrlPathOptions) => string;

export { buildUrl, joinUrlPath };
