class RandomPicker {
    constructor(array) {
        this._originalArray = [...array];
        this._copyArray = [...array];
    }
    randomIndex(max) {
        return Math.floor(Math.random() * max);
    }
    pick() {
        if (this._copyArray.length === 0) {
            this._copyArray = [...this._originalArray];
        }
        const index = this.randomIndex(this._copyArray.length);
        const item = this._copyArray[index];
        this._copyArray.splice(index, 1);
        return item;
    }
}
export const multiPlayersColor = new RandomPicker([
    'var(--affine-multi-players-purple)',
    'var(--affine-multi-players-magenta)',
    'var(--affine-multi-players-red)',
    'var(--affine-multi-players-orange)',
    'var(--affine-multi-players-green)',
    'var(--affine-multi-players-blue)',
    'var(--affine-multi-players-brown)',
    'var(--affine-multi-players-grey)',
]);
//# sourceMappingURL=color-picker.js.map