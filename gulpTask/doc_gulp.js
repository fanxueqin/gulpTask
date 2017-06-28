var libsJs = ['jquery-1.12.0.min.js','sweetalert.min.js'],
    libsCss = ['sweetalert.css'],
    filename = 'docDownload',
    mainCss = './sass/docDownload.scss',
    mainJs = './js/docDownload.js';

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