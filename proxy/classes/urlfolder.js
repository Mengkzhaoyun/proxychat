const fs = require('fs');
var pConfig = require('../config/config');
var pFolderCache = [];

function findWWW_Path() {
    var sPath = pConfig.WWW_PATH;
    fs.readdir(sPath, function (err, files) {
        pFolderCache = files;
    });
}

findWWW_Path();

var urlfolder = function () {}

urlfolder.getAppName = function (url) {
    var sArrary = url.split('/');
    if (sArrary.length > 2) {
        return sArrary[1].toLowerCase();
    }
    else if (sArrary.length == 2) {
        var appName = sArrary[1];
        if (appName.indexOf('.') == 0) {
            return appName;
        }
        else {
            return "";
        }
    }
    else {
        return "";
    }
    return sArrary[0].toLowerCase();
}

urlfolder.isLocalPath = function (name) {
    for (var i = 0; i != pFolderCache.length; i++) {
        if (pFolderCache[i].toLowerCase() == name) {
            return true;
        }
    }
    return false;
}

module.exports = urlfolder;