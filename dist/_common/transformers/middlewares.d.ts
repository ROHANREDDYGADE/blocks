import type { JobMiddleware } from '@blocksuite/store';
export declare const replaceIdMiddleware: JobMiddleware;
export declare const customImageProxyMiddleware: (imageProxyURL: string) => JobMiddleware;
export declare const titleMiddleware: JobMiddleware;
export declare const docLinkBaseURLMiddlewareBuilder: (baseUrl: string) => {
    get: () => JobMiddleware;
    set: (url: string) => void;
};
export declare const docLinkBaseURLMiddleware: JobMiddleware;
export declare const setDocLinkBaseURLMiddleware: (url: string) => void;
export declare const setImageProxyMiddlewareURL: (url: string) => void;
export declare const defaultImageProxyMiddleware: JobMiddleware;
export declare const embedSyncedDocMiddleware: (type: "content") => JobMiddleware;
export declare const fileNameMiddleware: (fileName?: string) => JobMiddleware;
//# sourceMappingURL=middlewares.d.ts.map