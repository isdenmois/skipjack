'use strict';
/**
 * Provides conversion with UintArray
 */

module.exports = {
    /**
     * Convert Uint16Array to string.
     * @param array Uint16Array.
     * @returns {string}
     */
    toString: function (array) {
        return String.fromCharCode.apply(null, array);
    },

    /**
     * Convert string to Uint16Array.
     * @param string
     * @returns {Uint16Array}
     */
    toArray: function (string) {
        var uint = new Uint16Array(string.length);
        for (var i = 0, j = string.length; i < j; ++i) {
            uint[i] = string.charCodeAt(i);
        }
        return uint;
    }
};
