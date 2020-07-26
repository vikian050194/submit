const applyPattern = (size, pattern) => {
    const max = size - 1;

    return [
        ...pattern,
        ...pattern.map(([x, y]) => [max - x, max - y]),
        ...pattern.map(([x, y]) => [max - x, y]),
        ...pattern.map(([x, y]) => [x, max - y])
    ];
};

module.exports = applyPattern;