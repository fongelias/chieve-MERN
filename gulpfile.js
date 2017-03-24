//DEPENDENCIES=============================================================
//gulpfile.js
//Require Gulp
var gulp = require('gulp');
//Require AddOns
var gulpIf = require('gulp-if');
var runSequence = require('run-sequence');
//CSS/JS concat and minification
var useref = require('gulp-useref');
var uglify = require('gulp-uglify');
var cssnano = require('gulp-cssnano');
//Delete files
var del = require('del');
//Browserify/Watchify package
//var source = require('vinyl-source-stream');
//var browserify = require('browserify');
//var watchify = require('watchify');
//var reactify = require('reactify');
//var streamify = require('gulp-streamify');

//Paths
var path = {
	compilerSrc: 'dev/',
	compilerDest: 'public/',
	ejsDest: 'app/views/ejs/'
	//react_entry_path_dev: 'dev-public/js/app',
	//react_entry_path_dist: 'public/js/app',
	//react_entries: []
};


//Gulp Methods==================================================================
//Default Method
gulp.task('default', ['build']);


//ejs compiler
gulp.task('build', function() {
	console.log("Running gulpfile.build()");
	runSequence('compileView', 'moveEJS', 'delEJS', 'moveStaticAssets');
});


//minifies/concatinates css/js
gulp.task('compileView', function() {
	console.log("Running gulpfile.compileView()");
	return gulp.src(path.compilerSrc + '**/*.ejs')
		.pipe(useref())
		//Minifies if Javascript
		.pipe(gulpIf('*.js', uglify()))
		//Minifies if CSS
		.pipe(gulpIf('*.css', cssnano()))
		.pipe(gulp.dest(path.compilerDest));
});


//Moves ejs folder
gulp.task('moveEJS', function() {
	console.log("Running gulpfile.moveEJS()");
	return gulp.src(path.compilerDest + "ejs/**/*")
		.pipe(gulp.dest(path.ejsDest));
});


//Deletes EJS from public folder
gulp.task('delEJS', function() {
	console.log("Running gulpfile.delEJS()");
	console.log(del.sync(['public/ejs/**']));
});

gulp.task('moveStaticAssets', function() {
	console.log("Running gulpfile.moveStaticAssets()");
	runSequence('moveJSLib', 'moveFonts', 'moveImages');
})

	//Tasks for moving static assets-------------------------
	//Moves js library folder
	gulp.task('moveJSLib', function() {
		console.log("Running gulpfile.moveJSLib()");
		return gulp.src(path.compilerSrc + "js/lib/**/*")
			.pipe(gulp.dest(path.compilerDest + "js/lib/"));
	});


	//Moves fonts folder
	gulp.task('moveFonts', function() {
		console.log("Running gulpfile.moveFonts()");
		return gulp.src(path.compilerSrc + "fonts/**/*")
			.pipe(gulp.dest(path.compilerDest + "fonts/"));
	})

	//Moves fonts folder
	gulp.task('moveImages', function() {
		console.log("Running gulpfile.moveImages()");
		return gulp.src(path.compilerSrc + "img/**/*")
			.pipe(gulp.dest(path.compilerDest + "img/"));
	})



//Helper Methods==================================================================









