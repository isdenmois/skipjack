
var OFBMode = function (cipher, iv) {
    this.cipher = cipher;
    this.iv = iv;
    this.blockSize = cipher.blockSize;
    if(this.iv.length < this.blockSize) {
        throw "IV must be at least " + this.blockSize + " bytes long";
    }
};

OFBMode.prototype.encrypt = function (src) {
    var data = src.slice();
    var iv = this.iv.slice();
    var length = data.length;
    for(var i = 0; i < length; i += this.blockSize) {
        iv = this.cipher.encryptBlock(iv);
        var chunk = (i * this.blockSize < length) ? this.blockSize : length - i;

        for(var j = 0; j < chunk; j++) {
            data[i+j] ^= iv[j];
        }
    }

    return data;
};

OFBMode.prototype.decrypt = function (src) {
    var data = src.slice();
    var iv = this.iv.slice();
    var length = data.length;
    for(var i = 0; i < length; i += this.blockSize) {
        iv = this.cipher.encryptBlock(iv);
        var chunk = (i * this.blockSize < length) ? this.blockSize : length - i;

        for(var j = 0; j < chunk; j++) {
            data[i+j] ^= iv[j];
        }
    }

    return data;
};

module.exports = OFBMode;
