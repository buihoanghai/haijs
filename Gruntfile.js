
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
            develop: {
                options: {
                    style: 'expanded',
                    sourcemap: 'none',
                    lineNumbers: true,
                    cacheLocation: 'grunt_assets/sass.temp/'
                },
                files: {
                    'grunt_assets/sass.temp/main.css': 'scss/main-import.scss'
                }
            },
			    release: {
        options: {
          style: 'compressed',
          sourcemap: 'none',
          lineNumbers: false,
          cacheLocation: 'grunt_assets/sass.temp/',
    
        },
        files: {
          'grunt_assets/sass.temp/main.css': 'scss/main-import.scss'
        }
      },
        },
        clean: {
            options: {
                'no-write': false
            },
            develop: {
                src: ["dist/develop/*"]
            },
		
			sass_temp: { src: [ '<%= sass.develop.options.cssDir %>' ] },
			index_temp: { src: [ 'grunt_assets/index.temp/' ] },
			  release_full: {
				src : [ 'dist/full/*', '!dist/full/README.md' ]
			},
			release_minified: {
				src : [ 'dist/minified/*', '!dist/minified/README.md' ]
			}
        },
        copy: {
            develop_assets: {
                src: ['**'],
                dest: 'dist/develop/assets/',
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
            develop_index: {
                options: {
                    rename: false,
                    process: function (contents, srcpath) {
                        return grunt.template.process(contents, {
                            data: {
                                version: grunt.config('pkg.version')
                            }
                        });
                    },
                },
                files: [
                  {
                      src: ['index.html'],
                      dest: 'dist/develop/',
                      cwd: 'grunt_assets/index.temp/',
                      expand: true
                  }
                ]
            },
            develop_css: {
                src: ['main.css'],
                dest: 'dist/develop/assets/',
                cwd: 'grunt_assets/sass.temp/',
                expand: true,
                rename: function (dest, src) {
                    var ver = grunt.config('pkg.version');
                    return dest + "st." + ver + ".css";
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
            develop_appjs: {
                src: ['<%= app_files.js %>'],
                dest: 'dist/develop/assets/js/',
                expand: true,
                rename: function (dest, src) {
                    var name = src.substring(0, src.lastIndexOf("."));
                    var type = src.substring(src.lastIndexOf(".") + 1);
                    var ver = grunt.config('pkg.version');
                    var cwd = "source/";

                    // Remove cwd from name
                    var _check = name.substring(0, cwd.length);
                    if (_check == cwd) {
                        name = name.substring(cwd.length);
                    }

                    if (name && type) {
                        src = [name, ver, type].join(".");
                    }

                    return dest + src;
                }
            },
            develop_vendorjs: {
                src: ['<%= vendor_files.js_header %>'],
                dest: 'dist/develop/assets/js/',
                expand: true,
                rename: function (dest, src) {
                    var name = src.substring(0, src.lastIndexOf("."));
                    var type = src.substring(src.lastIndexOf(".") + 1);
                    var ver = grunt.config('pkg.version');
                    var cwd = "source/";

                    // Remove cwd from name
                    var _check = name.substring(0, cwd.length);
                    if (_check == cwd) {
                        name = name.substring(cwd.length);
                    }

                    if (name && type) {
                        src = [name, ver, type].join(".");
                    }

                    return dest + src;
                }
            },
            develop_html2js: {
                src: ['<%= html2js.app.dest %>'],
                dest: 'dist/develop/assets/js/app/',
                expand: true,
                flatten: true,
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
			  release_full: {
        src: [ '**', '!README.md' ],
        dest: 'dist/full/',
        cwd: 'dist/develop/',
        expand: true
      },
      release_assets: {
        src: [ '**' ],
        dest: 'dist/minified/assets/',
        cwd: 'source/assets/',
        expand: true,
        rename: function ( dest, src ) {

          var name = src.substring( 0, src.lastIndexOf(".") );
          var type = src.substring( src.lastIndexOf(".") + 1 );
          var ver  = grunt.config('pkg.version');

          if (name && type) {
            src = [name, ver, type].join(".");
          }

          return dest + src;
        }
      },
      release_index: {
        options: {
          rename: false,
          process: function (contents, srcpath) {
            return grunt.template.process( contents, {
              data: {
                version: grunt.config('pkg.version')
              }
            });
          },
        },
        files: [
          {
            src: [ 'index.html' ],
            dest: 'dist/minified/',
            cwd: 'grunt_assets/index.temp/',
            expand: true
          }
        ]
      },
      release_css: {
        src: [ 'main.css' ],
        dest: 'dist/minified/assets/',
        cwd: 'grunt_assets/sass.temp/',
        expand: true,
        rename: function ( dest, src ) {
          var ver  = grunt.config('pkg.version');
          return dest + "st." + ver + ".css";
        },
        options: {
          process: function (contents, srcpath) {
            return grunt.template.process( contents, {
              data: {
                version: grunt.config('pkg.version')
              }
            });
          }
        }
      },
        },
        html2js: {
            options: {
                base: 'source/',
                process: function (contents, srcpath) {
                    return grunt.template.process(contents, {
                        data: {
                            version: grunt.config('pkg.version')
                        }
                    });
                },
                htmlmin: {
                    collapseBooleanAttributes: true,
                    collapseWhitespace: true,
                    removeComments: true,
                    removeEmptyAttributes: true
                }
            },

            app: {
                src: ['<%= app_files.atpl %>'],
                dest: 'grunt_assets/html2js.temp/app/templates-app.js'
            }
         
        },
  concat: {
      options: {
    
        stripBanners: true,
      },
      header: {
        src: [ '<%= vendor_files.js_header %>' ],
        dest: 'dist/minified/assets/js/st.header.<%= pkg.version %>.js'
      },
   
    },
	 uglify: {
      header: {
        options: {
       
        },
        files: {
          '<%= concat.header.dest %>': '<%= concat.header.dest %>'
        }
      },
     
    },
		main_sass:{
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
        index_scripts: {
          
          
        },
        includereplace: {
        
			mainscss:{
			  options: {
                    includesDir: '<%= main_sass.unit.result_dir %>'
                },
                files: {
                    'source/scss/main-import.scss': ['source/scss/main.scss']
                }
			}
        },
        jshint: {
            options: {
                jshintrc: true,
                force: true
            },

            app: ['<%= app_files.js %>'],
            unit: ['<%= app_files.jsunit %>']
        },

		karmaconfig: {
		  unit: {
			source: 'grunt_assets/karma-unit.tpl.js',
			target_dir: 'grunt_assets/karma.temp/',
			target_name: 'karma-unit.js',
			base: '/',
			cdn: [
		
			],
			src: [

			  'grunt_assets/html2js.temp/**/templates-*.js',
			  '<%= test_files.js %>',
			  '<%= app_files.js %>',
			  '<%= app_files.jsunit %>'
			]
		  }
    },
		karma_run: {
		  options: {
			configFile: '<%= karmaconfig.unit.target_dir %><%= karmaconfig.unit.target_name %>',
			 runnerPort: 9999,
					browsers: ['Chrome']
		  },
		  unit: {
			background: true,
			port: 9877
		  },
		  continuous: {
			background: false,
			singleRun: false,
			port: 9877
		  },
		  dev: {
					reporters: 'dots'
				}
    },
    watch: {
      options: {
        spawn: false
      },

      app_js: {
        files: [ '<%= app_files.js %>' ],
        tasks: [ 'index_develop',
                 'copy:develop_appjs',
			//	 'karma:unit:run' 
				 ]
      },

      app_unit: {
        files: [ '<%= app_files.jsunit %>' ],
        tasks: [ /*, 'karma:unit:run'*/ ],
        options: {
          spawn: false
        }
      },

      assets: {
        files: [ 'source/assets/**/*' ],
        tasks: [ 'copy:develop_assets' ], 
      },

  
      tpls: {
        files: [ '<%= app_files.atpl %>' ],
        tasks: [ 'html2js', 'copy:develop_html2js' ],      
      },

      scss: {
        files: [ 'source/**/*.scss', 'source/**/*.sass' ],
        tasks: [ 'sass_develop' ],    
      },

        grunt_config: {
        files: [ 'grunt.config.js' ],
        tasks: [ 'develop_core' ],
      }
    }



    };
	
	 grunt.renameTask( 'karma', 'karma_run' );
	 
    grunt.registerTask( 'karma', [ 'karmaconfig', 'karma_run:continuous', 'karma_run:unit'] );
    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));

    //Test tasks
	//develop
	 grunt.registerTask( 'index_develop', [
    'copy:develop_index',
   'clean:index_temp'
  ]);
   grunt.registerTask( 'sass_develop', [
   'scss_import', 'sass:develop', 'copy:develop_css'
  ]);
   grunt.registerTask( 'develop_core', [
    'clean:develop', 'html2js', 'copy:develop_html2js',
    'copy:develop_assets', 'sass_develop', 'copy:develop_appjs',
    'copy:develop_vendorjs', 'index_develop'
  ]);
    grunt.registerTask('develop', [
       'develop_core',
		 'watch'
    ]);
	
	//release
	 grunt.registerTask( 'index_release', [
  
 'copy:release_index',
   'clean:index_temp'
  ]);
   grunt.registerTask( 'sass_release', [
   'scss_import', 'sass:release', 'copy:release_css'//, 'clean:sass_temp'
  ]);
   grunt.registerTask( 'release_full', [
    'clean:release_full', 'develop_core', 'copy:release_full'
  ]);
   grunt.registerTask( 'scss_import', [
    'main_sass', 'includereplace:mainscss'
  ]);

  grunt.registerTask( 'release_minified', [
    'clean:release_minified', 'develop_core', 'sass_release',
   
    'index_release', 'copy:release_assets'
  ]);

  grunt.registerTask( 'release', [
    'clean:release_full', 'clean:release_minified', 'develop_core',
    'copy:release_full', 'sass_release', 
    'uglify:header', 'index_release', 'copy:release_assets'
  ]);
    // Short-hand tasks




    grunt.registerMultiTask('index_scripts', 'Process scripts for index.html', function () {

        var ver = grunt.config('pkg.version');
        var base = this.data.base;

        // Add version number to filenames
        var scripts = this.filesSrc.map(function (file) {
            // Remove base from file
            if (base) {
                var _check = file.substring(0, base.length);
                if (_check == base) {
                    file = file.substring(base.length);
                }
            }

            var name = file.substring(0, file.lastIndexOf("."));
            var type = file.substring(file.lastIndexOf(".") + 1);

            if (name.substring(name.length - ver.toString().length) == ver) {
                return [name, type].join(".");
            }
            else {
                return [name, ver, type].join(".");
            }
        });

        var cdn = this.data.cdn[0];

        var file = this.data.file;
        var source = this.data.dir + this.data.file;
        var target = this.data.result_dir + file;

        grunt.file.copy(source, target, {
            process: function (contents, path) {
                grunt.log.writeln("Adding " + scripts.length.toString().cyan + " scripts to " + file);
                grunt.log.writeln("Adding " + cdn.length.toString().cyan + " cdn-scripts to " + file);
                return grunt.template.process(contents, { data: { scripts: scripts, cdn: cdn } });
            }
        });
    });
	
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
					if(file.indexOf('app/')!=-1){
					appfolder.push(file);
					}else
					{
					file=file.replace('scss/','');
				
					scssfolder.push(file);
					}
				  return file;
		});
		
        var file = this.data.file;
        var source = this.data.dir + this.data.file;
        var target = this.data.result_dir + 'main-import.scss';
	
        grunt.file.copy(source, target, {
            process: function (contents, path) {
                
                return grunt.template.process(contents, { data: { appfolder: appfolder,
				scssfolder: scssfolder} });
            }
        });
    });  
	 grunt.registerMultiTask( 'karmaconfig', 'Process karma config templates', function () {
		var base = this.data.base;
		var scripts = this.filesSrc.map(function (file) {
		  // Remove base from file
		  var _check = file.substring(0, base.length);
		  if (_check == base) {
			file = file.substring(base.length);
		  }
		  return file;
		});

		var source  = this.data.source;
		var name    = this.data.target_name;
		var target  = this.data.target_dir + '/' + name;

		var cdn = this.data.cdn[0].concat(this.data.cdn[1]);

		grunt.file.copy( source, target, {
		  process: function ( contents, path ) {
			grunt.log.writeln( "Adding " + scripts.length.toString().cyan + " scripts to " + name );
			grunt.log.writeln( "Adding " + cdn.length.toString().cyan + " cdn-scripts to " + name );
			return grunt.template.process( contents, {
			  data: {
				scripts: scripts,
				cdn: cdn
			  }
			});
		  }
		});
	  });


};