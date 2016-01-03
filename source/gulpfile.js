const gulp = require('gulp');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');




gulp.task('sass', () => {
	gulp.src('./styles/main.scss')
		.pipe(sass())
		.pipe(prefix())
		.pipe(gulp.dest('../styles'));
});

gulp.task('cp', ()=>{
	gulp.src('index.html')
		.pipe(gulp.dest('../'));
});

gulp.task('watch', () => {
	gulp.watch(['*.html'], ['cp']);
	gulp.watch(['styles/*.scss'], ['sass']);
})

gulp.task('default', ['sass', 'cp', 'watch']);