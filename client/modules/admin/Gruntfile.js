module.exports = function (grunt) {

	var cwd = process.cwd();
	process.chdir('../../');

	/**
	 * Load required Grunt tasks. These are installed based on the versions listed
	 * in `package.json` when you do `npm install` in this directory.
	 */
	grunt.loadNpmTasks('grunt-contrib-clean');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-jshint');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-ngmin');
	grunt.loadNpmTasks('grunt-html2js');
	grunt.loadNpmTasks('grunt-text-replace');
	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-compass');

	grunt.loadNpmTasks('grunt-contrib-jasmine');

	process.chdir(cwd);

	/**
	 * Load in our build configuration file.
	 */
	var userConfig = require('./build.config.js');

	var taskConfig = require('../../manage/task.config.js');

	/**
	 * We read in our `package.json` file so we can access the package name and
	 * version. It's already there, so we don't repeat ourselves here.
	 */
	taskConfig.pkg = grunt.file.readJSON('../../package.json');

	grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));


	grunt.renameTask('watch', 'delta');
	grunt.registerTask('watch', [ 'build', 'delta' ]);


	grunt.registerTask('default', [ 'build', 'release' ]);


	grunt.registerTask('prep', [
		'clean:build', 'html2js', 'jshint'
	]);

	grunt.registerTask('copy_build_js', [
		'copy:src_js', 'copy:vendor_js', 'copy:assets_js'
	]);

	grunt.registerTask('copy_build_assets', [
		'copy:vendor_css', 'copy:vendor_images', 'copy:assets'
	]);

	grunt.registerTask('quick_build', [
		'clean:build', 'html2js', 'copy_build_js', 'copy_build_assets', 'compass:dev', 'replace', 'index:build'
	]);

	grunt.registerTask('continuous', ['quick_build', 'release']);


	grunt.registerTask('build', [
		'prep',
		'copy_build_js',
		'copy_build_assets',
		'compass:dev',
		'replace',
		'index:build'
	]);


	grunt.registerTask('release', [
		'copy:release',
		'ngmin',
		'concat',
		'clean:ngmin',
		'uglify',
		'cssmin',
		'index:release'
	]);


	/**
	 * A utility function to get all app JavaScript sources.
	 */
	function filterForJS (files) {
		return files.filter(function (file) {
			return file.match(/\.js$/);
		});
	}

	/**
	 * A utility function to get all app CSS sources.
	 */
	function filterForCSS (files) {
		return files.filter(function (file) {
			return file.match(/\.css$/);
		});
	}

	/**
	 * The index.html template includes the stylesheet and javascript sources
	 * based on dynamic names calculated in this Gruntfile. This task assembles
	 * the list into variables for the template to use and then runs the
	 * compilation.
	 */
	grunt.registerMultiTask('index', 'Process index.html template', function () {
		var self = this;
		var jsFiles = filterForJS(this.filesSrc).map(function (file) {
			if (file.indexOf('../../manage') != -1) {
				return '/client/modules/' + self.data.module + '/' + self.data.dir + file.split('manage')[1];
			}
			return '/client/modules/' + self.data.module + '/' + file;
		});

		var cssFiles = filterForCSS(this.filesSrc).map(function (file) {
			return '/client/modules/' + self.data.module + '/' + file;
		});

		grunt.file.copy('admin.html', this.data.dir + '/admin.html', {
			process: function (contents, path) {
				return grunt.template.process(contents, {
					data: {
						scripts: jsFiles,
						styles: cssFiles,
						version: grunt.config('pkg.version')
					}
				});
			}
		});
	});
};
