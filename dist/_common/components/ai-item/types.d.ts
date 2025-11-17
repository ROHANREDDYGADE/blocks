import type { DocMode } from '@blocksuite/affine-model';
import type { Chain, EditorHost, InitCommandCtx } from '@blocksuite/block-std';
import type { TemplateResult } from 'lit';
export interface AIItemGroupConfig {
    name?: string;
    items: AIItemConfig[];
}
export interface AIItemConfig {
    name: string;
    icon: TemplateResult | (() => HTMLElement);
    showWhen?: (chain: Chain<InitCommandCtx>, editorMode: DocMode, host: EditorHost) => boolean;
    subItem?: AISubItemConfig[];
    subItemOffset?: [number, number];
    handler?: (host: EditorHost) => void;
    beta?: boolean;
}
export interface AISubItemConfig {
    type: string;
    handler?: (host: EditorHost) => void;
}
declare abstract class BaseAIError extends Error {
    abstract readonly type: AIErrorType;
}
export declare enum AIErrorType {
    GeneralNetworkError = "GeneralNetworkError",
    PaymentRequired = "PaymentRequired",
    Unauthorized = "Unauthorized"
}
export declare class UnauthorizedError extends BaseAIError {
    readonly type = AIErrorType.Unauthorized;
    constructor();
}
export declare class PaymentRequiredError extends BaseAIError {
    readonly type = AIErrorType.PaymentRequired;
    constructor();
}
export declare class GeneralNetworkError extends BaseAIError {
    readonly type = AIErrorType.GeneralNetworkError;
    constructor(message?: string);
}
export type AIError = UnauthorizedError | PaymentRequiredError | GeneralNetworkError;
export {};
//# sourceMappingURL=types.d.ts.map