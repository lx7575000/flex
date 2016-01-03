const gulp = require('gulp');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const wrap = require('gulp-wrap');

function handleError(err){
	console.log(err.toString());
	this.emit('end');
}

gulp.task('sass', () => {
	gulp.src('./styles/main.scss')
		.pipe(sass()).on('error', handleError)
		.pipe(prefix())
		.pipe(gulp.dest('../styles'));
});

// gulp.task('cp', ()=>{
// 	gulp.src('index.html')
// 		.pipe(gulp.dest('../'));
// });

gulp.task('build', () => {
	gulp.src('pages/*.html')
		.pipe(wrap({src: "layout/default.html"}))
		.pipe(gulp.dest('../'));	
});

gulp.task('watch', () => {
	gulp.watch(['**/*.html'], ['build']);
	gulp.watch(['styles/*.scss'], ['sass']);
})

gulp.task('default', ['sass', 'build', 'watch']);