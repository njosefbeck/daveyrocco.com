import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';

const dirs = {
	app: 'app',
	dist: 'dist'
};

const sassPaths = {
	src: `${dirs.app}/scss/style.scss`
};

const jsPaths = {
	allFiles: `${dirs.app}/js/**/*.js` 
}

gulp.task('styles', () => {
	return gulp.src(sassPaths.src)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(dirs.app));
});

gulp.task('js', () => {
	return gulp.src(jsPaths.allFiles)
		.pipe(babel({ presets: ['es2015'] }))
		.pipe(gulp.dest(dirs.app));
});