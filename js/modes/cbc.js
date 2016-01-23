var padding = require('../modules/padding');

var CBCMode = function (cipher, iv) {
    this.cipher = cipher;
    this.iv = iv;
    this.blockSize = cipher.blockSize;
    if(this.iv.length < this.blockSize) {
        throw "IV must be at least " + this.blockSize + " bytes long";
    }
};

CBCMode.prototype.encrypt = function (src) {
    var data = padding.pad(src.slice(), this.blockSize);
    var iv = this.iv.slice();
    var length = data.length;

    for(var i = 0; i < length; i += this.blockSize) {
        // Xor against iv stream.
        for(var j = 0; j < this.blockSize; j++) {
            iv[j] ^= data[i + j];
        }
        iv = this.cipher.encryptBlock(iv);

        for (var j = 0; j < this.blockSize; j++) {
          data[i + j] = iv[j];
        }
    }

    return data;
};

CBCMode.prototype.decrypt = function (src) {
    var data = src.slice();
    var iv = this.iv.slice();
    var length = data.length;
    var nextIv;

    for(var i = 0; i < length; i += this.blockSize) {
        nextIv = data.slice(i, i + this.blockSize);

        this.cipher.decrypt(data, i, data, i);
        for (var j = 0; j < this.blockSize; j++) {
          data[i + j] ^= iv[j];
        }

        iv = nextIv;
    }

    return padding.unpad(data);
};

module.exports = CBCMode;
