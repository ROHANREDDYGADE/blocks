import type { CanvasRenderer } from '@blocksuite/affine-block-surface';
import type { NoteBlockModel } from '@blocksuite/affine-model';
import { type EditorHost } from '@blocksuite/block-std';
import { ShadowlessElement } from '@blocksuite/block-std';
import { type Query } from '@blocksuite/store';
import { nothing } from 'lit';
declare const SurfaceRefNotePortal_base: typeof ShadowlessElement & import("@blocksuite/global/utils").Constructor<import("@blocksuite/global/utils").DisposableClass>;
export declare class SurfaceRefNotePortal extends SurfaceRefNotePortal_base {
    static styles: import("lit").CSSResult;
    ancestors: Set<string>;
    query: Query | null;
    connectedCallback(): void;
    firstUpdated(): void;
    render(): import("lit-html").TemplateResult | typeof nothing;
    renderPreview(): EditorHost | typeof nothing;
    updated(): void;
    accessor host: EditorHost;
    accessor index: number;
    accessor model: NoteBlockModel;
    accessor renderer: CanvasRenderer;
}
declare global {
    interface HTMLElementTagNameMap {
        'surface-ref-note-portal': SurfaceRefNotePortal;
    }
}
export {};
//# sourceMappingURL=note.d.ts.map