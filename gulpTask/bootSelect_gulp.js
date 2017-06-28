var libsJs = ['bootstrap.js','bootstrap-select.js'],
    libsCss = ['bootstrap.css','bootstrap-select.css'],
    filename = 'bootSelect',
    mainCss = './sass/bootSelect.scss',
    mainJs = './js/bootSelect.js';

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