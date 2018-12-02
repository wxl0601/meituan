/*
 * @Author: 王鑫磊 
 * @Date: 2018-12-01 10:46:43 
 * @Last Modified by: mikey.zhaopeng
 * @Last Modified time: 2018-12-01 11:35:38
 */


var gulp = require('gulp');

var sass = require('gulp-sass');

var server = require('gulp-webserver');
var path = require('path');
var fs = require('fs');
var url = require('url');
var data = require('./src/json/index.json')


gulp.task('server',function(){
    return gulp.src('src')
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
                res.end(fs.readFileSync(path.join(__dirname,'src',pathname)))
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

gulp.task('dev',gulp.parallel('devScss','server','watch'))