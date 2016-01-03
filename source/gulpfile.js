const gulp = require('gulp');
const sass = require('gulp-sass');
const prefix = require('gulp-autoprefixer');
const wrap = require('gulp-wrap');
const browserSync = require('browser-sync');

function handleError(err){
	console.log(err.toString());
	this.emit('end');
}

gulp.task('sass', () => {
	gulp.src('./styles/main.scss')
		.pipe(sass()).on('error', handleError)
		.pipe(prefix())
		.pipe(gulp.dest('../styles'))
		.pipe(browserSync.reload({stream: true}));
});

gulp.task('browser-sync', ['sass', 'build', 'cp'], () => {
	browserSync({
		server: {
			baseDir: '..'
		}
	});
});

gulp.task('cp', ()=>{
	return gulp.src('js/main.js')
          .pipe(gulp.dest('../js'));
});

gulp.task('build', () => {
	gulp.src('pages/*.html')
		.pipe(wrap({src: "layout/default.html"}))
		.pipe(gulp.dest('../'));	
});

gulp.task('rebuild', ['build'], () =>{
	browserSync.reload();
});

gulp.task('watch', () => {
	gulp.watch(['**/*.html'], ['rebuild']);
	gulp.watch(['styles/*.scss'], ['sass']);
	gulp.watch(['js/main.js'], ['cp']);
})

gulp.task('default', ['browser-sync', 'watch']);