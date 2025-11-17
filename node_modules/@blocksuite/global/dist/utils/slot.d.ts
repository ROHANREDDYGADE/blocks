import { type Disposable } from './disposable.js';
export declare class Slot<T = void> implements Disposable {
    private _callbacks;
    private _disposables;
    private _emitting;
    subscribe: <U>(selector: (state: T) => U, callback: (value: U) => void, config?: {
        equalityFn?: (a: U, b: U) => boolean;
        filter?: (state: T) => boolean;
    }) => Disposable;
    dispose(): void;
    emit(v: T): void;
    filter(testFun: (v: T) => boolean): Slot<T>;
    flatMap<U>(mapper: (v: T) => U[] | U): Slot<U>;
    on(callback: (v: T) => unknown): Disposable;
    once(callback: (v: T) => unknown): Disposable;
    pipe(that: Slot<T>): Slot<T>;
    toDispose(disposables: Disposable[]): Slot<T>;
    unshift(callback: (v: T) => unknown): Disposable;
}
//# sourceMappingURL=slot.d.ts.map