export const createBlockMeta = (options) => {
    const meta = {
        ...options,
        properties: [],
    };
    return {
        ...meta,
        addProperty: (property) => {
            meta.properties.push(property);
        },
    };
};
//# sourceMappingURL=base.js.map