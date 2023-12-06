export interface UrlOptions {
    queryParams?: {
        [x: string]: any;
    };
    hash?: string;
    path?: string | null;
    returnAbsoluteUrl?: boolean;
}
export default function buildUrl(inputUrl?: string | UrlOptions, options?: UrlOptions): string;
