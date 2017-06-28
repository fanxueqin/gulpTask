var wrench = require('wrench'),
    gulp = require('gulp'),
    replace = require('gulp-replace'),
    uglify = require('gulp-uglify'),
    sass = require('gulp-sass'),
    csso = require('gulp-csso'), 
    concat = require('gulp-concat') ;

var resDir = '../edgeServer/src/main/webapp/';
var minimist = require('minimist');
var knownOptions = {
  string: 'file',
  default: ''
};
var options = minimist(process.argv.slice(2), knownOptions);
if ( options.file ){
    var configs = [require('./gulpTask/'+options.file+'_gulp.js')];
}
else{
    var configs = wrench.readdirSyncRecursive('./gulpTask').filter(function(file) {
    return (/^\w+_gulp\.js$/g).test(file);
    }).map(function(file) {
    return require('./gulpTask/' + file);
    });
}
gulp.task('common', commonTask);
gulp.task('config', function(){
  configs.map(function(v){
    configTask(v);
  });
});

gulp.task('default', ['common', 'config']);

// 给 .js .css 文件加时间戳
var timestamp = Date.now();
gulp.task('version', function(){
  configs.map(function(v){
     version(v);
  });
});

function version(v){  
  gulp.src(resDir+v.fileDir+v.filename+'.vm')
      .pipe(replace(/\/((\w|-|\.)+)\.js(\?v=\w+)?/g, '/$1.js?v='+timestamp))
      .pipe(replace(/\/((\w|-|\.)+)\.css(\?v=\w+)?/g, '/$1.css?v='+timestamp))
      .pipe(gulp.dest(resDir+v.fileDir));
}

function commonTask(){
  var commonCss = resDir+'common/*.css',
      commonJs = resDir+'common/*.js'  ;
  gulp.task('jsCommon', function(){
      return gulp.src(commonJs)
              .pipe(uglify())
              .pipe(gulp.dest(resDir+'dist/common'));
  });

  gulp.task('cssCommon', function(){
      return gulp.src(commonCss)
          .pipe(csso())
          .pipe(gulp.dest(resDir+'dist/common'));
  });

  gulp.watch(commonJs, ['jsCommon']);
  gulp.watch(commonCss, ['cssCommon']);
  gulp.start(['jsCommon', 'cssCommon']);
}


function configTask(config){
  var libsJs = config.libsJs,
      libsCss = config.libsCss,
      filename = config.filename,
      mainCss = resDir+config.mainCss,
      mainJs = resDir+config.mainJs ;
  libsJs = libsJs.map(function(v){
      return (v = resDir + v);
  });
  libsCss = libsCss.map(function(v){
      return (v = resDir + v);
  });
  gulp.task('jsLibs:'+filename, function(){
      return gulp.src(libsJs)
          .pipe(uglify())
          .pipe(concat('libs.min.js'))
          .pipe(gulp.dest(resDir+'dist/'+filename));
  });

  gulp.task('jsMain:'+filename, function(){
      return gulp.src(mainJs)
              .pipe(uglify())
              .pipe(gulp.dest(resDir+'dist/'+filename));
  });

  gulp.task('jsInit:'+filename, ['jsMain:'+filename, 'jsLibs:'+filename]);
  gulp.task('jsWatch:'+filename, function(){
      gulp.watch(libsJs, ['jsLibs:'+filename]);
      gulp.watch(mainJs, ['jsMain:'+filename]);
  });

  gulp.task('cssLibs:'+filename, function(){
      return gulp.src(libsCss)
          .pipe(csso())
          .pipe(concat('libs.min.css'))
          .pipe(gulp.dest(resDir+'dist/'+filename));
  });

  gulp.task('cssMain:'+filename, function(){
      return gulp.src(mainCss)
          .pipe(sass())
          .pipe(csso())
          .pipe(gulp.dest(resDir+'dist/'+filename));
  });
  gulp.task('cssInit:'+filename, ['cssLibs:'+filename, 'cssMain:'+filename]);
  gulp.task('cssWatch:'+filename, function(){
      gulp.watch(libsCss, ['cssLibs:'+filename]);
      gulp.watch(mainCss, ['cssMain:'+filename]);
  });

  gulp.task('init:'+filename, ['jsInit:'+filename, 'cssInit:'+filename]);
  gulp.task('watch:'+filename, ['jsWatch:'+filename, 'cssWatch:'+filename]);
  gulp.start(['init:'+filename, 'watch:'+filename]);
}