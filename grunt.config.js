
module.exports = {

  app_files: {
    js: [
      'source/**/**/*.js'
    ],
    jsunit: [ 'source/**/*.spec.js' ],

    tpl: [ 'source/**/**/*.tpl.html' ], 
	scss:[
		'source/app/**/*.scss',
		'source/scss/**/*.scss',
		'!source/scss/**/main.scss',
		'!source/scss/**/main-import.scss',
	],
  }
};
