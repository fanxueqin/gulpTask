var libsJs = ['select2.min.js'],
    libsCss = ['select2.min.css'],
    filename = 'appKeyApply',
    mainCss = './sass/appKey.scss',
    mainJs = './js/appKeyApply.js';

libsJs = libsJs.map(function(v){
    return (v = './static/**/'+v);
});
libsCss = libsCss.map(function(v){
    return (v = './static/**/'+v);
});


module.exports = {
    libsJs: libsJs,
    libsCss:libsCss,
    filename: filename,
    fileDir: '../WEB-INF/vm/',
    mainCss: mainCss,
    mainJs: mainJs,
}