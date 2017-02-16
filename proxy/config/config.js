module.exports = {
    //静态项目目录，其中放static和www目录，默认为".",代表项目路径
    WWW_PATH: process.env.WWW_PATH || "C:/Temps/www",
    //缓存时间1个月
    CACHE_CONTROL: process.env.CACHE_CONTROL || 2592000
}