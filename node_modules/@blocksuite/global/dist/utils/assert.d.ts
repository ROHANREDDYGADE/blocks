import { ErrorCode } from '../exceptions/code.js';
export declare function isPrimitive(a: unknown): a is null | undefined | boolean | number | string;
export declare function assertType<T>(_: unknown): asserts _ is T;
/**
 * @deprecated Avoid using this util as escape hatch of error handling.
 * For non-framework code, please handle error in application level instead.
 */
export declare function assertExists<T>(val: T | null | undefined, message?: string | Error, errorCode?: ErrorCode): asserts val is T;
export declare function assertNotExists<T>(val: T | null | undefined, message?: string, errorCode?: ErrorCode): asserts val is null | undefined;
export type Equals<X, Y> = (<T>() => T extends X ? 1 : 2) extends <T>() => T extends Y ? 1 : 2 ? true : false;
type Allowed = unknown | void | null | undefined | boolean | number | string | unknown[] | object;
export declare function isEqual<T extends Allowed, U extends T>(val: T, expected: U): Equals<T, U>;
export declare function assertEquals<T extends Allowed, U extends T>(val: T, expected: U, message?: string, errorCode?: ErrorCode): asserts val is U;
type Class<T> = new (...args: any[]) => T;
export declare function assertInstanceOf<T>(val: unknown, expected: Class<T>, message?: string, errorCode?: ErrorCode): asserts val is T;
export {};
//# sourceMappingURL=assert.d.ts.map