var libsJs = ['template.js','jquery.bootpag.min.js','FileSaver.js'],
    libsCss = [],
    filename = 'search',
    mainCss = './sass/search.scss',
    mainJs = './js/search.js';

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