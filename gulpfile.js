/*
 * @Author: 王鑫磊 
 * @Date: 2018-12-01 10:46:43 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-02 20:44:30
 */


var gulp = require('gulp');

var sass = require('gulp-sass');

var server = require('gulp-webserver');

var uglify = require('gulp-uglify');

var babel = require('gulp-babel');
var path = require('path');
var fs = require('fs');
var url = require('url');
var data = require('./src/json/index.json')


gulp.task('server',function(){
    return gulp.src('build')
    .pipe(server({
        port:8888,
        open:true,
        middleware:function(req,res,next){


            var pathname = url.parse(req.url).pathname;
            if(pathname === '/favicon.ico'){
                res.end('')
                return; 
            }

            if(pathname === '/getData'){
                res.end(JSON.stringify({code:1,list:data[0]}))
            }else{
                pathname = pathname === '/' ? "index.html" : pathname;
                res.end(fs.readFileSync(path.join(__dirname,'build',pathname)))
            }
           
        }
    }))
})


gulp.task('devScss',function(){
    return gulp.src('./src/scss/index.scss')
    .pipe(sass())
    .pipe(gulp.dest('./src/css'))
})

gulp.task('watch',function(){
    return gulp.watch('./src/scss/index.scss',gulp.series('devScss'))
})

gulp.task('dev',gulp.parallel('devScss','server','watch'));


gulp.task('bCss',function(){
    return gulp.src('./src/css/*.css')
    .pipe(gulp.dest('./build/css'))
})

gulp.task('bUglify',function(){
    return gulp.src(['./src/js/*.js','!./src/js/lib/*.js'])
    .pipe(babel({
        presets:['@babel/env']
    }))
    .pipe(uglify())
    .pipe(gulp.dest('./build/js'))
})

gulp.task('bJs',function(){
    return gulp.src('./src/js/lib/*.js')
    .pipe(gulp.dest('./build/js/lib'))
})


gulp.task('bHtml',function(){
    return gulp.src('./src/*.html')
    .pipe(gulp.dest('./build'))
})

gulp.task('bFonts',function(){
    return gulp.src('./src/fonts/*')
    .pipe(gulp.dest('./build/fonts'))
})

gulp.task('bJson',function(){
    return gulp.src('./src/fonts/*')
    .pipe(gulp.dest('./build/fonts'))
})

gulp.task('bImage',function(){
    return gulp.src('./src/images/*')
    .pipe(gulp.dest('./build/images'))
})

gulp.task('build',gulp.parallel('bCss','bImage','bJson','bFonts','bJs','bUglify','bHtml'))