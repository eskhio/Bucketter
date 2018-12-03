/**
 * @description Creates an util toolbet with several useful functions
 * @date 2018-12-03
 * @class parser
 */
class utils {
    /**
     * @description Erase dupes key from obj.
     * @date 2018-12-03
     * @param {string} key - The key to erase dupes by
     * @param {string} obj - The object to erase dupes from
     * @returns {string} The object free from dupes.
     */
    static eraseDupesByKey(key, obj) {
        return obj.filter((objToClean, index) => {
            return obj.map(objToClean => objToClean[key]).indexOf(objToClean[key]) === index;
        });
    }
}

module.exports = utils;