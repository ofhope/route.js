module.exports = function(grunt) {
    //Configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json') ,

        // watch
        watch: {
            js: {
                files: ['src/*.js'],
                tasks: ['concat', 'uglify']
            }
        },

        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['src/*.js'],
                dest: 'dist/Route.js',
            }
        },

        uglify: {
            options: {
                mangle: true
            },
            target: {
                files: {
                    'dist/Route.min.js': 'dist/Route.js'
                }
            }
        }

    });

    //Dependencies.
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    //Tasks.
    grunt.registerTask('default', ['watch']);

};