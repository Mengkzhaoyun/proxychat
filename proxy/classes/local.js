const fs = require('fs');
const path = require('path');
const zlib = require("zlib");
const etag = require('etag');
const pConfig = require('../config/config');
const pMimeType = require('./mimetype');
const pUrlFolder = require('./urlfolder');

var local = {}

local.web = function (req, res) {
    var appName = pUrlFolder.getAppName(req.url);
    var fileName = pConfig.WWW_PATH + req.url.replace(/\?.*/ig, '');
    var extName = path.extname(fileName);

    if (fs.existsSync(fileName)) { //如果文件存在
        res.setHeader("Content-Type", pMimeType.get(appName, extName));
        fs.stat(fileName, function (err, stat) {
            var ifNoneMatch = "If-None-Match".toLowerCase();
            if (req.headers[ifNoneMatch]) {
                //缓存文件未修改，返回304
                res.writeHead(304, { "connection": "close" });
                res.end();
            }
            else {
                //创建读取文件流
                var fileStream = fs.createReadStream(fileName, { flags: "r", encoding: null });
                fileStream.on('end', function () { fileStream = null; })
                //创建读取文件流出错，代理访问实际项目
                fileStream.on('error', function () { res.writeHead(404); res.end(); });

                if (appName == "static" || appName == "")
                    res.setHeader("Cache-Control", "max-age=" + pConfig.CACHE_CONTROL);
                res.setHeader('ETag', 'SPACESHIP')

                var matched = (/css|js|html/ig).test(extName.slice(1));  //图片一类的文件，不需要进行gzip压缩，排除在外
                var acceptEncoding = req.headers['accept-encoding'] || "";
                if (matched && acceptEncoding.match(/\bgzip\b/)) {
                    res.writeHead(200, "Ok", { 'Content-Encoding': 'gzip' });
                    fileStream.pipe(zlib.createGzip()).pipe(res);
                } else if (matched && acceptEncoding.match(/\bdeflate\b/)) {
                    res.writeHead(200, "Ok", { 'Content-Encoding': 'deflate' });
                    fileStream.pipe(zlib.createDeflate()).pipe(res);
                } else {
                    res.writeHead(200, "Ok");
                    fileStream.pipe(res);
                }
            }
        });
    }
    else {
        //缓存文件未修改，返回304
        res.writeHead(304, { "connection": "close" });
        res.end();
    }
}

module.exports = local;