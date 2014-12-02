module.exports = function () {
    return {
        isEmpty: function (obj) {
            return obj && Object.keys(obj).length === 0;
        }
    }
}
