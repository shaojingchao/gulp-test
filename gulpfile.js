var gulp = require('gulp');

//压缩js代码
var uglify = require('gulp-uglify');

//合并js文件
var concat = require('gulp-concat');
var cssmin = require('gulp-minify-css');
var less = require('gulp-less');
var cssver = require('gulp-make-css-url-version');
var del = require('del');

var paths = {
    scripts: ['src/*.js'],
    css: ["src/*.less","src/*.css"]
};


gulp.task("clean",function(){
    return del(["bulid"]);
});

gulp.task("less",["clean"],function(){
    gulp.src("src/**/*.less")
    .pipe(less())
    .pipe(cssmin())
    .pipe(cssver({
        useDate:true,
        assetsDir: __dirname + '/public'
    }))
    .pipe(concat("all.min.css"))
    .pipe(gulp.dest('build'));
});

gulp.task('concat',["clean"], function() {
    gulp.src(paths.scripts)
        .pipe(uglify())
        .pipe(concat('all.min.js'))
        .pipe(gulp.dest('build'));
});

gulp.watch('src/**/*', function(event) {
    console.log(event);
  console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
});

gulp.task("default",["concat","less"],function(){
    console.log("完成");
});