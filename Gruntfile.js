/**
 * @file Gruntfile
 * @copyright 2014 Cyan, Inc. All rights reserved.
 */

'use strict';
function notCli(task) {
    return task !== 'grunt-cli';
}
module.exports = function (grunt) {
    require('matchdep').filterDev('grunt-*').filter(notCli).forEach(grunt.loadNpmTasks);
    grunt.initConfig({
        jade: {


            'js': {
                options: {
                    pretty: true,
                    namespace: false,
                    client: true,
                    amd: true,
                },
                files: [{
                    expand: true,
                    cwd: 'src',
                    src: ['**/*.jade'],
                    dest: 'src',
                    ext: '.tmpl.js'
                }]
            },
            compile: {
                files: {
                    'demo/index.html': ['demo/index.jade']

                },
                options: {
                    data: {
                        test: true,
                        year: '<%= grunt.template.today("yyyy") %>'
                    }
                }
            }
        },
        less: {
            dev: {
                files: [
                    {
                        expand: true,
                        cwd: 'src/css',
                        src: ['**/*.less'],
                        dest: 'src/css',
                        ext: '.css'
                    }
                ]
            }
        },
            karma: {
            unit: {
                configFile: 'karma/karma.config.js'
            }
        }
    });


    grunt.registerTask('build', ['jade', 'less:dev']);
    // can work
   // grunt.registerTask('test', ['karma:unit', 'lint']);

};