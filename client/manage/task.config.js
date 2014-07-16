

var rename = function(dest, src) {
	return dest + src.split('manage')[1];
};

/**
 * These should be the grunt tasks common to all of your javascript modules. By modules i mean separate apps that
 * all live under the same domain. eg. moki.com = app module, admin.moki.com = admin module.
 */
module.exports = {

	/**
	 * The banner is the comment that is placed at the top of our compiled
	 * source files. It is first processed as a Grunt template, where the `<%=`
	 * pairs are evaluated based on this very configuration object.
	 */
	meta: {
		banner: '/**\n' +
			' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
			' * <%= pkg.homepage %>\n' +
			' *\n' +
			' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
			' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
			' */\n'
	},


	/**
	 * The directories to delete when `grunt clean` is executed.
	 */
	clean: {
		build: ['<%= build %>', '<%= release %>'],
		ngmin: ['<%= build %>/ngmin']
	},

	/**
	 * HTML2JS is a Grunt plugin that takes all of your template files and
	 * places them into JavaScript files as strings that are added to
	 * AngularJS's template cache. This means that the templates too become
	 * part of the initial payload as one JavaScript file.
	 */
	html2js: {
		/**
		 * These are the templates from `modules/{ mod name }/src`.
		 */
		app: {
			options: {
				base: 'src'
			},
			src: [ '<%= app_files.atpl %>' ],
			dest: '<%= build %>/partials/templates-app.js'
		}
	},


	copy: {

		// all js files to copy for build dir
		src_js: {
			files: [
				{
					cwd: '.',
					src: [ '<%= app_files.src %>' ],
					dest: '<%= build %>',
					expand: true
				}
			]
		},

		vendor_js: {
			files: [
				{
					cwd: '.',
					src: [ '<%= vendor_files.js %>' ],
					dest: '<%= build %>',
					expand: true,
					rename: rename
				}
			]
		},

		assets_js: {
			files: [
				{
					cwd: '<%= assets %>',
					src: [ '**/*.js' ],
					dest: '<%= build %>/assets',
					expand: true
				}
			]
		},


		// all css
		vendor_css: {
			files: [
				{
					cwd: '<%= manage %>/',
					src: ['<%= vendor_files.css %>'],
					dest: '<%= build %>/assets/lib/css',
					expand: true,
					flatten: true
				}
			]
		},


		vendor_images: {
			files: [
				{
					cwd: '<%= manage %>/',
					src: ['<%= vendor_files.images %>'],
					dest: '<%= build %>/assets/lib/img',
					expand: true,
					flatten: true
				}
			]
		},

		assets: {
			files: [
				{
					cwd: '<%= assets %>',
					src: ['**', '!sass/**'],
					dest: '<%= build %>/assets',
					expand: true
				}
			]
		},

		release: {
			files: [
				{
					cwd: '<%= build %>/assets',
					src: ['**', '!lib/css/**/*.css', '!dev-vendor/**/*.js'],
					dest: '<%= release %>/assets',
					expand: true
				}
			]
		}


	},


	/**
	 * Replaces image paths in CSS to match ../img. Select2 is the only css file this is needed for so far.
	 * Others can be added.
	 */
	replace: {
		build: {
			src: ['<%= build %>/assets/lib/css/select2.css'],
			overwrite: true,
			replacements: [
				{
					from: /url\('(?!\.)/g,
					to: 'url(\'../img/'
				},
				{
					from: /url\((?!\')/g,
					to: 'url(\'../img/'
				},
				{
					from: /..\/images\//g,
					to: '../img/'
				},
				{
					from: /(png|gif|jpg)(?=\))/g,
					to: '$1\''
				}
			]
		}
	},


	jshint: {
		src: '<%= app_files.src %>',
		build: [
			'Gruntfile.js',
			'build.config.js',
			'<%= manage %>/task.config.js'
		],
		options: {
			immed: true,
			newcap: false,
			noarg: true,
			sub: true,
			boss: true,
			eqnull: true
		}
	},

	index: {

		build: {
			dir: '<%= build %>',
			module: '<%= module %>',
			src: [
				'<%= vendor_files.js %>',
				'<%= build %>/assets/**/*.js',
				'<%= build %>/src/**/*.js',
				'<%= build %>/partials/**/*.js',
				'<%= build %>/assets/**/*.css',
				'<%= build %>/<%= module %>.css'
			]
		},

		release: {
			dir: '<%= release %>',
			module: '<%= module %>',
			src: [
				'<%= concat.src.min %>',
				'<%= release %>/assets/lib/css/<%= module %>-<%= pkg.name %>-vendor.min.css',
				'<%= release %>/<%= module %>-<%= pkg.name %>.min.css'
			]
		}
	},

	ngmin: {
		src: {
			cwd: '<%= build %>',
			src: '<%= app_files.src %>',
			dest: '<%= build %>/ngmin',
			expand: true
		}
	},


	concat: {

		src: {
			options: {
				banner: '<%= meta.banner %>'
			},
			src: [
				'<%= vendor_files.js %>',
				'<%= manage %>/module.prefix',
				'<%= build %>/assets/**/*.js',
				'<%= build %>/ngmin/**/*.js',
				'<%= html2js.app.dest %>',
				'<%= manage %>/module.suffix'
			],
			dest: '<%= release %>/<%= module %>-<%= pkg.name %>.js',
			min: '<%= release %>/<%= module %>-<%= pkg.name %>.min.js'
		}
	},


	uglify: {
		compile: {
			options: {
				banner: '<%= meta.banner %>'
			},
			files: {
				'<%= concat.src.min %>': '<%= concat.src.dest %>'
			}
		}
	},

	compass: {
		dev: {
			options: {
				app: 'stand_alone',
				sassDir: '',
				cssDir: '<%= build %>',
				raw: "preferred_syntax = :sass\n"
			}
		}
	},

	/**
	 * Minify the compiled css for release.
	 */
	cssmin: {
		vendor_css: {
			options: {
				banner: '/**vendor - */ <%= meta.banner %>'
			},
			files: {
				'<%= release %>/assets/lib/css/<%= module %>-<%= pkg.name %>-vendor.min.css': ['<%= build %>/assets/lib/css/**/*.css']
			}
		},
		main: {
			banner: '<%= meta.banner %>',
			files: {
				'<%= release %>/<%= module %>-<%= pkg.name %>.min.css': '<%= build %>/<%= module %>.css'
			}
		}
	},


	/**
	 * This is are watch task. Sets up live-reload for all files we care about and runs correct tasks
	 * on file changes. Runs all tests before build tasks. Will rebuild index when changed.
	 */
	delta: {
		/**
		 * By default, we want the Live Reload to work for all tasks; this is
		 * overridden in some tasks (like this file) where browser resources are
		 * unaffected. It runs by default on port 35729, which your browser
		 * plugin should auto-detect.
		 */
		options: {
			livereload: true,
			logConcurrentOutput: true
		},

		js_src: {
			files: '<%= app_files.src %>',
			tasks: [ 'jshint:src', 'copy:src_js' ]
		},

		build_files: {
			files: ['<%= jshint.build %>'],
			tasks: [ 'jshint:build', 'quick_build' ]
		},


		html: {
			files: [ '<%= app_files.html %>' ],
			tasks: [ 'index:build' ]
		},


		app_tpl: {
			files: '<%= app_files.atpl %>',
			tasks: 'html2js:app'
		},

		sass: {
			files: '<%= app_files.dev_sass %>',
			tasks: 'compass:dev'
		},


		assets: {
			files: ['!<%= assets %>/sass/**/*', '<%= assets %>/**/*'],
			tasks: [ 'copy_build_assets', 'index:build' ]
		}

	}


};