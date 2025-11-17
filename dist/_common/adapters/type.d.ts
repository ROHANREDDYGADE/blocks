import type { BaseAdapter, Job } from '@blocksuite/store';
export type AdapterFactory = {
    get: (job: Job) => BaseAdapter;
};
export declare const AdapterFactoryIdentifier: import("@blocksuite/global/di").ServiceIdentifier<AdapterFactory> & ((variant: import("@blocksuite/global/di").ServiceVariant) => import("@blocksuite/global/di").ServiceIdentifier<AdapterFactory>);
//# sourceMappingURL=type.d.ts.map