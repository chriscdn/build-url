export type UrlOptions = {
    queryParams?: {
        [x: string]: any;
    };
    hash?: string;
    path?: string | null;
    returnAbsoluteUrl?: boolean;
};
declare const buildUrl: (inputUrl?: string | UrlOptions, options?: UrlOptions) => string;
export { buildUrl };
