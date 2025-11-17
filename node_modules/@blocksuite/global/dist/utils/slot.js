import { flattenDisposables } from './disposable.js';
// Credits to blocky-editor
// https://github.com/vincentdchan/blocky-editor
export class Slot {
    constructor() {
        this._callbacks = [];
        this._disposables = [];
        this._emitting = false;
        this.subscribe = (selector, callback, config) => {
            let prevState;
            const { filter, equalityFn = Object.is } = config ?? {};
            return this.on(state => {
                if (filter && !filter(state)) {
                    return;
                }
                const nextState = selector(state);
                if (prevState === undefined || !equalityFn(prevState, nextState)) {
                    callback(nextState);
                    prevState = nextState;
                }
            });
        };
    }
    dispose() {
        flattenDisposables(this._disposables).dispose();
        this._callbacks = [];
        this._disposables = [];
    }
    emit(v) {
        const prevEmitting = this._emitting;
        this._emitting = true;
        this._callbacks.forEach(f => {
            try {
                f(v);
            }
            catch (err) {
                console.error(err);
            }
        });
        this._emitting = prevEmitting;
    }
    filter(testFun) {
        const result = new Slot();
        // if the original slot is disposed, dispose the filtered one
        this._disposables.push({
            dispose: () => result.dispose(),
        });
        this.on((v) => {
            if (testFun(v)) {
                result.emit(v);
            }
        });
        return result;
    }
    flatMap(mapper) {
        const result = new Slot();
        this._disposables.push({
            dispose: () => result.dispose(),
        });
        this.on((v) => {
            const data = mapper(v);
            if (Array.isArray(data)) {
                data.forEach(v => result.emit(v));
            }
            else {
                result.emit(data);
            }
        });
        return result;
    }
    on(callback) {
        if (this._emitting) {
            const newCallback = [...this._callbacks, callback];
            this._callbacks = newCallback;
        }
        else {
            this._callbacks.push(callback);
        }
        return {
            dispose: () => {
                if (this._emitting) {
                    this._callbacks = this._callbacks.filter(v => v !== callback);
                }
                else {
                    const index = this._callbacks.indexOf(callback);
                    if (index > -1) {
                        this._callbacks.splice(index, 1); // remove one item only
                    }
                }
            },
        };
    }
    once(callback) {
        let dispose = undefined;
        const handler = (v) => {
            callback(v);
            if (dispose) {
                dispose();
            }
        };
        const disposable = this.on(handler);
        dispose = disposable.dispose;
        return disposable;
    }
    pipe(that) {
        this._callbacks.push(v => that.emit(v));
        return this;
    }
    toDispose(disposables) {
        disposables.push(this);
        return this;
    }
    unshift(callback) {
        if (this._emitting) {
            const newCallback = [callback, ...this._callbacks];
            this._callbacks = newCallback;
        }
        else {
            this._callbacks.unshift(callback);
        }
        return {
            dispose: () => {
                if (this._emitting) {
                    this._callbacks = this._callbacks.filter(v => v !== callback);
                }
                else {
                    const index = this._callbacks.indexOf(callback);
                    if (index > -1) {
                        this._callbacks.splice(index, 1); // remove one item only
                    }
                }
            },
        };
    }
}
//# sourceMappingURL=slot.js.map