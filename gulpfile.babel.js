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
import imagemin from 'gulp-imagemin';
import {create as bsCreate} from 'browser-sync';
import cache from 'gulp-cache';
const browserSync = bsCreate();

const dirs = {
	app: 'app',
	dist: 'dist'
};

const sassPaths = {
	src: `${dirs.app}/scss/style.scss`,
	allFiles: `${dirs.app}/scss/**/*`
};

const imagePaths = {
	src: `${dirs.app}/images`
}

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
		.pipe(gulp.dest(dirs.app))
		.pipe(browserSync.stream());
}

gulp.task('browser-sync', () => {
	browserSync.init({
		server: {
			baseDir: "./app"
		}
	})

	gulp.watch(sassPaths.allFiles, ['styles']);
	gulp.watch(jsPaths.allFiles, ['bundle']);
	gulp.watch(dirs.app + '/*.html').on('change', browserSync.reload);
});

gulp.task('styles', () => {
	return gulp.src(sassPaths.src)
		.pipe(sourcemaps.init())
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(sourcemaps.write('.'))
		.pipe(gulp.dest(dirs.app))
		.pipe(browserSync.stream());
});

gulp.task('images', () => {
	gulp.src('app/images/*')
		.pipe(cache(imagemin()))
		.pipe(gulp.dest('dist/images'));
});

gulp.task('fonts', () => {
	gulp.src('app/fonts/*')
		.pipe(gulp.dest('dist/fonts'));
});

gulp.task('bundle', () => {
	var bundler = browserify(jsPaths.src).transform(babelify, { presets: ['es2015'] });
	bundle(bundler);
});

gulp.task('build', ['styles', 'images', 'bundle', 'fonts'],  () => {
	gulp.src([`${dirs.app}/*.html`, `${dirs.app}/style.css`, `${dirs.app}/bundle.js`])
		.pipe(gulp.dest(dirs.dist));
});

gulp.task('deploy', () => {
	return gulp.src(dirs.dist + '/**/*')
		.pipe(ghPages());
});
