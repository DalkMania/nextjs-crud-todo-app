export const makeSerializable = (object) => {
    return JSON.parse(JSON.stringify(object));
};
