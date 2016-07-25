
module.exports = function (grunt) {

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-include-replace');
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-force');
  grunt.loadNpmTasks('grunt-touch');
  grunt.loadNpmTasks('grunt-jscs');

  var userConfig = require('./grunt.config.js');

  var taskConfig = {
    pkg: grunt.file.readJSON("package.json"),
    sass: {
      full: {
        options: {
          style: 'expanded',
          sourcemap: 'none',
          lineNumbers: true,
          cacheLocation: 'grunt_assets/sass.temp/'
        },
        files: {
          'grunt_assets/sass.temp/main.css': 'source/scss/main-import.scss'
        }
      },
      min: {
        options: {
          style: 'compressed',
          sourcemap: 'none',
          lineNumbers: false,
          cacheLocation: 'grunt_assets/sass.temp/',

        },
        files: {
          'grunt_assets/sass.temp/main.css': 'source/scss/main-import.scss'
        }
      },
    },
    clean: {
      options: {
        'no-write': false
      },
      dist: {
        src: ["dist/*"]
      },

      sass_temp: { src: ['<%= sass.full.options.cacheLocation %>'] }

    },
    copy: {
      assets: {
        src: ['**'],
        dest: 'dist/assets/',
        cwd: 'source/assets/',
        expand: true,
        rename: function (dest, src) {

          var name = src.substring(0, src.lastIndexOf("."));
          var type = src.substring(src.lastIndexOf(".") + 1);
          var ver = grunt.config('pkg.version');

          if (name && type) {
            src = [name, ver, type].join(".");
          }

          return dest + src;
        }
      },
      full_css: {
        src: ['main.css'],
        dest: 'dist/',
        cwd: 'grunt_assets/sass.temp/',
        expand: true,
        rename: function (dest, src) {
          var ver = grunt.config('pkg.version');
          return dest + "haijs" + ver + ".css";
        },
        options: {
          process: function (contents, srcpath) {
            return grunt.template.process(contents, {
              data: {
                version: grunt.config('pkg.version')
              }
            });
          }
        }
      },
      min_css: {
        src: ['main.css'],
        dest: 'dist/',
        cwd: 'grunt_assets/sass.temp/',
        expand: true,
        rename: function (dest, src) {
          var ver = grunt.config('pkg.version');
          return dest + "haijs" + ver + "min.css";
        },
        options: {
          process: function (contents, srcpath) {
            return grunt.template.process(contents, {
              data: {
                version: grunt.config('pkg.version')
              }
            });
          }
        }
      }
    },
    concat: {
      options: {

        stripBanners: true,
      },
      header: {
        src: ['<%= app_files.js %>'],
        dest: 'dist/haijs.<%= pkg.version %>.js'
      },

    },
    uglify: {
      header: {
        options: {

        },
        files: {
			
          'dist/haijs.<%= pkg.version %>.min.js':'dist/haijs.<%= pkg.version %>.js'
        }
      }

    },
    main_sass: {
      unit: {
        dir: '',
        result_dir: 'grunt_assets/sass.temp/',
        file: 'grunt_assets/main-import.scss',
        base: '',

        files: [
          {
            src: ['<%= app_files.scss %>']
          },

        ]
      }
    },
    includereplace: {
      mainscss: {
        options: {
          includesDir: '<%= main_sass.unit.result_dir %>'
        },
        files: {
          'source/scss/main-import.scss': ['source/scss/main.scss']
        }
      }
    },
    watch: {
      options: {
        spawn: false
      },

      app_js: {
        files: ['<%= app_files.js %>'],
        tasks: [
		'full_core',
			//	 'karma:unit:run' 
        ]
      },

      app_unit: {
        files: ['<%= app_files.jsunit %>'],
        tasks: [ /*, 'karma:unit:run'*/],
        options: {
          spawn: false
        }
      },

      assets: {
        files: ['source/assets/**/*'],
        tasks: ['copy:assets'],
      },


      scss: {
        files: ['source/**/*.scss', 'source/**/*.sass'],
        tasks: ['sass_full'],
      },

      grunt_config: {
        files: ['grunt.config.js'],
        tasks: ['full_core'],
      }
    }



  };

  grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

  //Test tasks
  //develop
  grunt.registerTask('scss_import', [
  'main_sass', 'includereplace:mainscss'
  ]);
  grunt.registerTask('sass_full', [
  'scss_import', 'sass:full', 'copy:full_css'
  ]);
  grunt.registerTask('sass_min', [
'scss_import', 'sass:min', 'copy:min_css'
  ]);
  grunt.registerTask('full_core', [
    'concat', 
  ]);
  grunt.registerTask('full', [
    'clean:dist', 'clean:sass_temp', 'copy:assets', 'sass_full', 'full_core',
   'watch'
  ]);
  grunt.registerTask('release', [
    'clean:dist', 'clean:sass_temp','copy:assets','sass_full', 'sass_min','full_core', 'uglify'
  ]);


  // Short-hand tasks

  grunt.registerMultiTask('main_sass', 'Process main.scss for sass', function () {

    var ver = grunt.config('pkg.version');
    var base = this.data.base;
    var appfolder = [];
    var scssfolder = [];
    this.filesSrc.map(function (file) {
      // Remove base from file

      var _check = file.substring(0, base.length);

      if (_check == base) {
        file = file.substring(base.length);
      }
      if (file.indexOf('app/') != -1) {
        appfolder.push(file);
      } else {
        file = file.replace('source/scss/', '');

        scssfolder.push(file);
      }
      return file;
    });

    var file = this.data.file;
    var source = this.data.dir + this.data.file;
    var target = this.data.result_dir + 'main-import.scss';

    grunt.file.copy(source, target, {
      process: function (contents, path) {

        return grunt.template.process(contents, {
          data: {
            appfolder: appfolder,
            scssfolder: scssfolder
          }
        });
      }
    });
  });
};