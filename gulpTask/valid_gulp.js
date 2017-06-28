var libsJs = ['Validform_v5.3.2.js'],
    libsCss = ['style.css'],
    filename = 'Validform',
    mainCss = './sass/Validform.scss',
    mainJs = './js/Validform.js';

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