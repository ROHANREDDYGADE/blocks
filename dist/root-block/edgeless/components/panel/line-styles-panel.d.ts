import { type LineWidth, StrokeStyle } from '@blocksuite/affine-model';
export type LineStyleEvent = {
    type: 'size';
    value: LineWidth;
} | {
    type: 'lineStyle';
    value: StrokeStyle;
};
interface LineStylesPanelProps {
    onClick?: (e: LineStyleEvent) => void;
    selectedLineSize?: LineWidth;
    selectedLineStyle?: StrokeStyle;
    lineStyles?: StrokeStyle[];
}
export declare function LineStylesPanel({ onClick, selectedLineSize, selectedLineStyle, lineStyles, }?: LineStylesPanelProps): import("lit-html").TemplateResult<1>;
export {};
//# sourceMappingURL=line-styles-panel.d.ts.map