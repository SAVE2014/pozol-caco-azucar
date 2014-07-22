/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {

    module: 'app',

    build: 'build',
    release: 'release',
    manage: '../../manage',
    assets: '../../manage/assets',


	app_files: {

		src: [ 'src/**/*.js', '!src/**/*.spec.js' ],

        atpl: [ 'src/**/*.tpl.html' ],

        html: 'app.html',
        sass: 'app.sass',

		dev_sass: [
            '<%= module %>.sass',
			'src/**/*.sass',
            '<%= assets %>/sass/**/*.sass'
        ]

	},

	vendor_files: {
        js: [
			'<%= manage %>/vendor/jquery/dist/jquery.js',
			'<%= manage %>/vendor/jqueryui/ui/jquery-ui.js',
			'<%= manage %>/vendor/moment/moment.js',
			'<%= manage %>/vendor/angular/angular.js',
            '<%= manage %>/vendor/select2/select2.js',
			'<%= manage %>/vendor/lodash/dist/lodash.js',
			'<%= manage %>/vendor/highcharts/highcharts.src.js',
            '<%= manage %>/vendor/bootstrap/dist/js/bootstrap.js',
            '<%= manage %>/vendor/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js',
			'<%= manage %>/vendor/restangular/dist/restangular.js',
			'<%= manage %>/vendor/angular-moment/angular-moment.js',
			'<%= manage %>/vendor/moment-range/lib/moment-range.js',
            '<%= manage %>/vendor/angular-ui-select/dist/select.js',
            '<%= manage %>/vendor/angular-animate/angular-animate.js',
            '<%= manage %>/vendor/angular-sanitize/angular-sanitize.js',
            '<%= manage %>/vendor/angular-filters/dist/angular-filters.js',
            '<%= manage %>/vendor/angular-ui-router/release/angular-ui-router.js',
            '<%= manage %>/vendor/angular-resource/angular-resource.js',
            '<%= manage %>/vendor/angular-route/angular-route.js',
            '<%= manage %>/vendor/angular-rangeslider/angular.rangeSlider.js'
        ],

		css: [
            'vendor/bootstrap/dist/css/bootstrap.css',
            'vendor/bootstrap/dist/css/bootstrap.css.map',
            'vendor/seiyria-bootstrap-slider/dist/css/bootstrap-slider.css',
            'vendor/angular-motion/dist/angular-motion.css',
            'vendor/selectize/dist/css/selectize.default.css',
            'vendor/angular-rangeslider/angular.rangeSlider.css'
        ],

        images: [
            'vendor/select2/select2.png',
            'vendor/select2/select2x2.png',
            'vendor/select2/select2-spinner.gif'
        ]

	}

};