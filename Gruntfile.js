var fs = require('fs');
var path = require('path');

var gruntConfig = function (grunt) {
    grunt.registerTask('chmod', 'chmod a file', function(goal) {
        var mode = grunt.config(this.name + '.mode');
        var files = grunt.config(this.name + '.files');

        files.forEach(function(file) {
            fs.chmodSync(file, mode);
        })
    });

    grunt.initConfig({
        bower: {
            dev: {
                dest: 'vendor',
                js_dest: 'vendor/js',
                css_dest: 'vendor/css',
                options: {
                    packageSpecific: {
                        jquery: {
                            keepExpandedHierarchy: false,
                            files: ['dist/jquery.min.js']
                        },
                        angular: {
                            files: [
                            'angular.min.js'
                            ]
                        },
                        'angular-route': {
                            files: [
                            'angular-route.min.js'
                            ]
                        },
                        'angular-resource': {
                            files: [
                            'angular-resource.min.js'
                            ]
                        },
                        bootstrap: {
                            dest: 'vendor/fonts',
                            keepExpandedHierarchy: false,
                            files: [
                            'dist/js/bootstrap.min.js',
                            'dist/css/bootstrap.min.css',
                            'dist/fonts/glyphicons-halflings-regular.eot',
                            'dist/fonts/glyphicons-halflings-regular.svg',
                            'dist/fonts/glyphicons-halflings-regular.ttf',
                            'dist/fonts/glyphicons-halflings-regular.woff'
                            ]
                        },
                        'node-webkit-linux': {
                            dest: 'vendor/node-webkit/linux',
                            files: [
                            'nw',
                            'nwsnapshot',
                            'nw.pak',
                            'libffmpegsumo.so',
                            'icudtl.dat'
                            ]
                        },
                        'node-webkit-win': {
                            dest: 'vendor/node-webkit/win',
                            files: [
                            'nw.exe',
                            'nwsnapshot.exe',
                            'nw.pak',
                            'ffmpegsumo.dll',
                            'icudt.dll',
                            'libEGL.dll',
                            'libGLESv2.dll',
                            'icudtl.dat'
                            ]
                        }
                    }
                }
            }
        },
        chmod: {
            mode: '755',
            files: [
            './vendor/node-webkit/linux/nw',
            './vendor/node-webkit/win/nw.exe'
            ]
        }
    });

    grunt.loadNpmTasks('grunt-bower');
    grunt.registerTask('init', ['bower', 'chmod'])
    grunt.registerTask('default', ['init']);
};

module.exports = gruntConfig;
