module.exports = function(grunt) {
  var installedApps = [
    'begin.js',
    'widgets/*.js',
    'end.js'
  ];

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
        src: installedApps,
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
        files: installedApps,
        tasks: [],
        options: {
          spawn: false,
        },
      },
    }
  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', [
    'concat', 'watch'
  ]);

  grunt.registerTask('build_version', [
    'concat', 'uglify'
  ]);
};
