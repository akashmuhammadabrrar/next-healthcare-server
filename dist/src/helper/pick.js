const pick = (obj, keys) => {
    console.log("Pick received obj:", obj);
    console.log("Pick received keys:", keys);
    const finalObject = {};
    for (const key of keys) {
        if (obj && Object.hasOwnProperty.call(obj, key)) {
            finalObject[key] = obj[key];
        }
    }
    console.log("Pick output:", finalObject);
    return finalObject;
};
export default pick;
