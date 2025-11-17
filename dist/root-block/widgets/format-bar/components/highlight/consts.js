const colors = [
    'red',
    'orange',
    'yellow',
    'green',
    'teal',
    'blue',
    'purple',
    'grey',
];
export const backgroundConfig = [
    {
        name: 'Default Background',
        color: null,
        hotkey: null,
    },
    ...colors.map(color => ({
        name: `${color[0].toUpperCase()}${color.slice(1)} Background`,
        color: `var(--affine-text-highlight-${color})`,
        hotkey: null,
    })),
];
export const foregroundConfig = [
    {
        name: 'Default Color',
        color: null,
        hotkey: null,
    },
    ...colors.map(color => ({
        name: `${color[0].toUpperCase()}${color.slice(1)}`,
        color: `var(--affine-text-highlight-foreground-${color})`,
        hotkey: null,
    })),
];
//# sourceMappingURL=consts.js.map