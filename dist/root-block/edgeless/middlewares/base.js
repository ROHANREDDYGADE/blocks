import { EditPropsStore } from '@blocksuite/affine-shared/services';
import { SurfaceMiddlewareBuilder, } from '@blocksuite/block-std/gfx';
import { getLastPropsKey } from '../utils/get-last-props-key.js';
export class EditPropsMiddlewareBuilder extends SurfaceMiddlewareBuilder {
    constructor() {
        super(...arguments);
        this.middleware = ctx => {
            if (ctx.type === 'beforeAdd') {
                const { type, props } = ctx.payload;
                const key = getLastPropsKey(type, props);
                const nProps = key
                    ? this.std.get(EditPropsStore).applyLastProps(key, ctx.payload.props)
                    : null;
                ctx.payload.props = {
                    ...(nProps ?? props),
                    index: props.index ?? this.gfx.layer.generateIndex(),
                };
            }
        };
    }
    static { this.key = 'editProps'; }
}
//# sourceMappingURL=base.js.map