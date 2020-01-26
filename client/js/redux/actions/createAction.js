export const createAction = (type) => {
    return (value) => {
        return {
            type: type,
            value: value
        };
    };
};