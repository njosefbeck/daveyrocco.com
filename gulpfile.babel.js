import gulp from 'gulp';
import sass from 'gulp-sass';
import autoprefixer from 'gulp-autoprefixer';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';
import babelify from 'babelify';
import browserify from 'browserify';
import buffer from 'vinyl-buffer';
import rename from 'gulp-rename';
import source from 'vinyl-source-stream';
import watchify from 'watchify';
import ghPages from 'gulp-gh-pages';

const dirs = {
	app: 'app',
	dist: 'dist'
};

const sassPaths = {
	src: `${dirs.app}/scss/style.scss`
};

const jsPaths = {
	allFiles: `${dirs.app}/js/**/*.js`,
	src: `${dirs.app}/js/main.js`,
	outputFile: 'bundle.js'
}

function bundle (bundler) {
	bundler
		.bundle()
		.pipe(source(jsPaths.src))
		.pipe(buffer())
		.pipe(rename(jsPaths.outputFile))
		.pipe(sourcemaps.init({ loadMaps: true }))
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(dirs.app));
}

gulp.task('styles', () => {
	return gulp.src(sassPaths.src)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(dirs.app));
});

gulp.task('bundle', () => {
	var bundler = browserify(jsPaths.src).transform(babelify, { presets: ['es2015'] });
	bundle(bundler);
});

gulp.task('deploy', () => {
	return gulp.src(dirs.dist + '/**/*')
		.pipe(ghPages());
});
