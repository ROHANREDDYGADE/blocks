import { EditPropsStore } from '@blocksuite/affine-shared/services';
import { multiPlayersColor } from './color-picker.js';
export class RemoteColorManager {
    get awarenessStore() {
        return this.std.doc.collection.awarenessStore;
    }
    constructor(std) {
        this.std = std;
        const sessionColor = this.std.get(EditPropsStore).getStorage('remoteColor');
        if (sessionColor) {
            this.awarenessStore.awareness.setLocalStateField('color', sessionColor);
            return;
        }
        const pickColor = multiPlayersColor.pick();
        this.awarenessStore.awareness.setLocalStateField('color', pickColor);
        this.std.get(EditPropsStore).setStorage('remoteColor', pickColor);
    }
    get(id) {
        const awarenessColor = this.awarenessStore.getStates().get(id)?.color;
        if (awarenessColor) {
            return awarenessColor;
        }
        if (id !== this.awarenessStore.awareness.clientID)
            return null;
        const sessionColor = this.std.get(EditPropsStore).getStorage('remoteColor');
        if (sessionColor) {
            this.awarenessStore.awareness.setLocalStateField('color', sessionColor);
            return sessionColor;
        }
        const pickColor = multiPlayersColor.pick();
        this.awarenessStore.awareness.setLocalStateField('color', pickColor);
        this.std.get(EditPropsStore).setStorage('remoteColor', pickColor);
        return pickColor;
    }
}
//# sourceMappingURL=remote-color-manager.js.map