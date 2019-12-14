//Подключаем галп
const gulp = require('gulp');
//Объединение файлов
const concat = require('gulp-concat');
//Добавление префиксов
const autoprefixer = require('gulp-autoprefixer');
//Оптимизация стилей
const cleanCSS = require('gulp-clean-css');
//Оптимизация скриптов
const uglify = require('gulp-uglify');
//Удаление файлов
const del = require('del');
//Синхронизация с браузером
const browserSync = require('browser-sync').create();
//Для препроцессоров стилей
const sourcemaps = require('gulp-sourcemaps');
//imagemin
const imagemin = require('gulp-imagemin');
//Sass препроцессор
const sass = require('gulp-sass');
//linter
const gulpStylelint = require('gulp-stylelint');
//Порядок подключения файлов со стилями

//Пути
const src = {
   script: {
      input: './src/js/**/*.js',
      output: {
         build: './build/js',
         we: './js'
      },
   
      output_name: 'script.js'
   },

   style: {
      input: {
         basis: './src/scss/style.scss',
         all: './src/scss/**/*.scss',
         normalize: '!./src/scss/normalize/*.scss'
      },

      ignore: {
         file_1: '!./src/scss/slider/slick-theme.scss',
         file_2: '!./src/scss/slider/slick.scss'
      },

      output: {
         build: './build/css',
         we: './css'
      },

      output_name: 'style.css',

      s_maps: './'
   },

   html: {
      input: {
         basis:'./index.html',
         all: './src/pages/**/*'
      },
      output: {
         build: './build',
         build_pages: './build/pages',
         we: './pages'
      }
   },

   fonts: {
      input: './src/fonts/**/*',
      output: {
         build: './build/fonts',
         we: './fonts'
      },
   },

   img: {
      input: './src/img/**',
      output: {
         build: './build/img',
         we: './img'
      },
   },

   del: {
      del_build: './build/*'
   }
}

//Таска для обработки стилей
gulp.task('styles', () => {
   //Шаблон для поиска файлов CSS
   //Всей файлы по шаблону './src/css/**/*.css'
   return gulp.src([src.style.input.all, src.style.input.basis, src.style.input.normalize, src.style.ignore.file_1, src.style.ignore.file_2])
      .pipe(sourcemaps.init())
      .pipe(gulpStylelint({
         reporters: [{
            formatter: 'string',
            console: true
         }]
      }))
      //отлов ошибок scss
      .on('error', function (err) {
         console.log(err);
         this.emit('end');
      })
      .pipe(sass())
      //отлов ошибок scss
      .on('error', function (err) {
         console.log(err);
         this.emit('end');
      })
      //Объединение файлов в один
      .pipe(concat(src.style.output_name))
      //Добавить префиксы
      .pipe(autoprefixer({
         overrideBrowserslist: ['last 2 versions'],
         cascade: false
      }))
      //Сжатие CSS
      .pipe(cleanCSS({
         level: 2
      }))
      //отлов ошибок scss
      .on('error', function (err) {
         console.log(err);
         this.emit('end');
      })
      .pipe(sourcemaps.write(src.style.s_maps))
      //Выходная папка для стилей
      .pipe(gulp.dest(src.style.output.we))
      .pipe(gulp.dest(src.style.output.build))
      .pipe(browserSync.stream());
});


//Копирование html
gulp.task('html_basis', () => {
   return gulp.src(src.html.input.basis)
      .pipe(gulp.dest(src.html.output.we))
      .pipe(gulp.dest(src.html.output.build))
      .pipe(browserSync.stream());
});

gulp.task('html_all', () => {
   return gulp.src(src.html.input.all)
      .pipe(gulp.dest(src.html.output.we))
      .pipe(gulp.dest(src.html.output.build_pages))
      .pipe(browserSync.stream());
});

//Таска для копирования шрифтов
gulp.task('fonts', () => {
   return gulp.src(src.fonts.input)
      .pipe(gulp.dest(src.fonts.output.we))
      .pipe(gulp.dest(src.fonts.output.build))
      .pipe(browserSync.stream());
});
//Таска для обработки скриптов
gulp.task('scripts', () => {
   //Шаблон для поиска файлов JS
   //Всей файлы по шаблону './src/js/**/*.js'
   return gulp.src(src.script.input)
      //Объединение файлов в один
      .pipe(concat('script.js'))
      //Сжатие JS
      .pipe(uglify({
         toplevel: true
      }))
      .on('error', function (err) {
         console.log(err);
         this.emit('end');
      })
      //Выходная папка для скриптов
      .pipe(gulp.dest(src.script.output.we))
      .pipe(gulp.dest(src.script.output.build))
      .pipe(browserSync.stream());
});

//Таска для очистки папки build
gulp.task('del', () => {
   return del([src.del.del_build, src.style.output.we, src.script.output.we, src.fonts.output.we, src.img.output.we, src.html.output.we]);
});

//Таска для сжатия картинок
gulp.task('img-compress', () => {
   return gulp.src(src.img.input)
      .pipe(imagemin({
         progressive: true
      }))
      .on('error', function (err) {
         console.log(err);
         this.emit('end');
      })
      .pipe(gulp.dest(src.img.output.we))
      .pipe(gulp.dest(src.img.output.build))
});

//Таска для отслеживания изменений в файлах
gulp.task('watch', () => {
   browserSync.init({
      server: {
         baseDir: "./"
      }
   });
   //Следить за Шрифтами
   gulp.watch(src.fonts.input, gulp.series('fonts'))
   //Следишь за HTML
   gulp.watch([src.html.input.basis, src.html.input.all], gulp.series('html_basis', 'html_all'))
   //Следить за картинками
   gulp.watch(src.img.input, gulp.series('img-compress'))
   //Следить за файлами со стилями с нужным расширением
   gulp.watch(src.style.input.all, gulp.series('styles'))
   //Следить за JS файлами
   gulp.watch(src.script.input, gulp.series('scripts'))
   //При изменении HTML запустить синхронизацию
   gulp.watch(src.html.input.basis).on('change', browserSync.reload);
});

//Таска по умолчанию, Запускает del, styles, scripts и watch
gulp.task('default', gulp.series('del', gulp.parallel('html_all', 'html_basis', 'styles', 'fonts', 'scripts', 'img-compress'), 'watch'));