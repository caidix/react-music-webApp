const proxy = require('http-proxy-middleware');
const Base64 = require('js-base64')
module.exports = function (app) {
    app.use(proxy("/soso", {
        "target": "https://c.y.qq.com/",
        "changeOrigin": true
    }));
    app.use(proxy('/music', {
        "target": "http://ustbhuangyi.com/",
        "changeOrigin": true
    }))
};

function MusicJsonCallback_lrc(data) {
    let lyric = Base64.Base64.decode(data.lyric)
    return lyric
}