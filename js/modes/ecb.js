var padding = require('../modules/padding');

var ECBMode = function (cipher) {
    this.cipher = cipher;
    this.blockSize = cipher.blockSize;
};

ECBMode.prototype.encrypt = function (data) {
    data = padding.pad(data, this.blockSize);

    for(var i = 0; i < data.length; i += this.blockSize) {
        this.cipher.encrypt(data, i, data, i);
    }

    return data;
};

ECBMode.prototype.decrypt = function (data) {
    for(var i = 0; i < data.length; i += this.blockSize) {
        this.cipher.decrypt(data, i, data, i);
    }

    return padding.unpad(data);
};

module.exports = ECBMode;
