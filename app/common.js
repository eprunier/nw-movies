module.exports = function () {
    return {
        existy: existy,
        truthy: truthy,
        isEmpty: isEmpty
    }
}

function existy (obj) {
    return obj !== undefined && obj !== null;
}

function truthy(obj) {
    return existy(obj) && obj !== false;
}

function isEmpty (obj) {
    return !existy(obj) || Object.keys(obj).length === 0;
}
