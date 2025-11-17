export function areSetsEqual(setA, setB) {
    if (setA.size !== setB.size)
        return false;
    for (const a of setA)
        if (!setB.has(a))
            return false;
    return true;
}
//# sourceMappingURL=misc.js.map