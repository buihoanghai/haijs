
module.exports = {

  app_files: {
    js: [
      'source/*/*.js'
    ],
    jsunit: [ 'source/**/*.spec.js' ],

    atpl: [ 'source/**/*.tpl.html' ],
	scss:[
		'source/app/**/*.scss',
		'source/scss/**/*.scss',
		'!source/scss/**/main.scss',
		'!source/scss/**/main-import.scss',
	],
  },

 

  vendor_files: {
    js_header: [
    
    ],
    cdn_header: [],

    js_footer: [
    
    ],
    cdn_footer: [
    ],

    assets: [
    ]
  },

};
