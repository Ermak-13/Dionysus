module.exports = function(grunt) {
var installedJS = [
            'assets/libs/jquery-2.0.3.min.js',
            'assets/libs/underscore-min.js',
            'assets/libs/underscore.string.min.js',
            'assets/libs/backbone-min.js',
            'assets/libs/jquery.gridster.min.js',
            'assets/libs/mustache.js',
            'assets/libs/jquery.jcarousel.min.js',
            'assets/libs/moment.js',

            'assets/before_init.js',
            'assets/widget.js',

            'assets/widgets/apps/*.js',
            'assets/widgets/bookmarks/*.js',
            'assets/widgets/calendar/*.js',
            'assets/widgets/carousel/*.js',
            'assets/widgets/clock/*.js',
            'assets/widgets/downloads/*.js',
            'assets/widgets/history/*.js',
            'assets/widgets/weather/*.js',

            'assets/after_rendering.js'
        ],

		installedCSS = [
			'assets/libs/jquery.gridster.min.css',

			'assets/page.css',
			'assets/widgets/**/*.css',
		],

		files = installedJS.concat(installedCSS);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    banner: '/*\n' +
            '<%= pkg.name %> - v<%= pkg.version %>\n' +
            '<%= pkg.repository.url %>\n' +
            '*/\n\n',

    concat: {
      options: {
        banner: '<%= banner %>'
      },

      dist: {
        src: installedJS,
        dest: '<%= pkg.name %>.js'
      }
    },

    uglify: {
      options: {
        banner: '<%= banner %>'
      },
      dist: {
        src: '<%= concat.dist.dest %>',
        dest: '<%= pkg.name %>.min.js'
      }
    },

    watch: {
      scripts: {
        files: files,
        tasks: [
            'concat',
            'concat_css'
        ],
        options: {
          spawn: false,
        },
      },
    },

		concat_css: {
			all: {
				src: installedCSS,
				dest: '<%= pkg.name %>.css'
			}
		}
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-concat-css');

  grunt.registerTask('default', [
    'concat', 'concat_css', 'watch'
  ]);

  grunt.registerTask('build_version', [
    'concat', 'uglify'
  ]);
};
