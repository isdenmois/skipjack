
/**
 * UintArray padding.
 */
module.exports = {
    pad: function (data, blockSize) {
        var pad = blockSize - data.length % blockSize;
        if (pad == blockSize) {
            return data;
        }

        var padded = new Uint8Array(data.length + pad);
        for (var i = 0; i < data.length; i++) {
            padded[i] = data[i];
        }

        return padded;
    },
    unpad: function (data) {
        var unpad = data.length - 1;

        for (; unpad >= 0 && data[unpad] == 0; unpad--);

        if (++unpad == data.length) {
            return data;
        }

        return data.slice(0, unpad);
    }
};
