export declare class Zip {
    private compressed;
    private finalize?;
    private finalized;
    private zip;
    file(path: string, content: Blob | File | string): Promise<void>;
    folder(folderPath: string): {
        folder: (folderPath2: string) => /*elided*/ any;
        file: (name: string, blob: Blob) => Promise<void>;
        generate: () => Promise<Blob>;
    };
    generate(): Promise<Blob>;
}
export declare class Unzip {
    private unzipped?;
    load(blob: Blob): Promise<void>;
    [Symbol.iterator](): Generator<{
        path: string;
        content: Blob;
        index: number;
    }, void, unknown>;
}
export declare function createAssetsArchive(assetsMap: Map<string, Blob>, assetsIds: string[]): Promise<Zip>;
export declare function download(blob: Blob, name: string): void;
//# sourceMappingURL=utils.d.ts.map