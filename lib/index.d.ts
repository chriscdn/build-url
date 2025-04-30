export type UrlOptions = {
    queryParams?: {
        [x: string]: any;
    };
    hash?: string;
    path?: string | null;
    returnAbsoluteUrl?: boolean;
};
export declare const buildUrl: (inputUrl?: string | UrlOptions, options?: UrlOptions) => string;
