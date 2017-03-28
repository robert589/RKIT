var gulp = require("gulp");
var ts = require("gulp-typescript");
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var less = require('gulp-less');
var path = require('path');

var argv = require('yargs').argv;
console.log(argv);
if(argv.path !== "rkit") {
    var lessFolder = './../' + argv.path +'/web/css/less/*.less';
    var compileFolder = './../' + argv.path + '/web/css/compile';
    var buildFolder = './../' + argv.path + '/web/css/build';
    var compileFiles = compileFolder + "/**/*.css";
} else {
    var lessFolder = './../' + argv.path +'/css/less/*.less';
    var compileFolder = './../' + argv.path + '/css/compile';
    var buildFolder = './../' + argv.path + '/css/build';
    var compileFiles = compileFolder + "/**/*.css";
}
gulp.task("js", function () {
    var tsProject = ts.createProject("../" + argv.path + "/web/js/tsconfig.json");
    var tsResult = tsProject.src('./../' + argv.path + '/web/js')  
                   .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('./../' + argv.path + '/web/js'));
});

gulp.task('less', function () {
  return gulp.src(lessFolder)
    .pipe(less())
    .pipe(gulp.dest(compileFolder));
});
    
gulp.task('minify', ['less'], function(){
   return gulp.src(compileFiles)
        .pipe(minifyCSS())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9'))
        .pipe(concat('build.min.css'))
        .pipe(gulp.dest(buildFolder));
});

gulp.task('css', ['less', 'minify']);

gulp.task('watch', function() {
    gulp.watch(['./../frontend/web/css/**/*.less'], ['css']);
    gulp.watch(['./../frontend/web/js/**/*.ts', ['ts']]);
});
