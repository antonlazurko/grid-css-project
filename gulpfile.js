const gulp        = require('gulp');
const browserSync = require('browser-sync');
const minifyCSS = require('gulp-clean-css');
const sass        = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const imagemin = require('gulp-imagemin');
const htmlmin = require('gulp-htmlmin');

gulp.task('server', function() {

    browserSync({
        server: {
            baseDir: "dist"
        }
    });

    gulp.watch("src/*.html").on('change', browserSync.reload);
});

gulp.task('styles', function() {
    return gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});

gulp.task('watch', function() {
    gulp.watch("src/sass/**/*.+(scss|sass|css)", gulp.parallel('styles'));
    gulp.watch("src/*.html").on('change', gulp.parallel('html'));
});

gulp.task('html', function () {
    return gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
});

gulp.task('scripts', function () {
    return gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"));
});

gulp.task('fonts', function () {
    return gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"));
});

gulp.task('icons', function () {
    return gulp.src("src/icons/**/*")
        .pipe(gulp.dest("dist/icons"));
});


gulp.task('images', function () {
    return gulp.src("src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"));
});
gulp.task('build', function () {
    gulp.src("src/sass/**/*.+(scss|sass)")
        .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
        .pipe(rename({suffix: '.min', prefix: ''}))
        .pipe(autoprefixer())
        .pipe(cleanCSS({compatibility: 'ie8'}))
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
    // Copy HTML files to the production directory
    gulp.src("src/*.html")
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest("dist/"));
    gulp.src("src/js/**/*.js")
        .pipe(gulp.dest("dist/js"));

    // Minify CSS files and copy them to the production directory
    gulp.src('src/css/*.css')
        .pipe(minifyCSS())
        .pipe(gulp.dest('dist/css'));
    gulp.src("src/fonts/**/*")
        .pipe(gulp.dest("dist/fonts"));
    gulp.src("src/icons/**/*")
        .pipe(gulp.dest("dist/icons"));
    gulp.src("src/img/**/*")
        .pipe(imagemin())
        .pipe(gulp.dest("dist/img"));

    return Promise.resolve();
  });

gulp.task('default', gulp.parallel('watch', 'server', 'styles', 'scripts', 'fonts', 'icons', 'html', 'images'));