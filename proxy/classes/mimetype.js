var default_mimetypes = require("../config/mimetype");

var mimetype = {};
mimetype.get = function (appName, extName) {
    var sResult = default_mimetypes.default;
    if (default_mimetypes[extName]) {
        sResult = default_mimetypes[extName];
    }
    //去数据库或缓存中查找是否有自定义的mimetype
    if (appName != "") {

    }
    return sResult;
}

module.exports = mimetype;