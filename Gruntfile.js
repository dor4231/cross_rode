module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        responsive_images: {
            options: {
                sizes: [{
                    width: 101,
                    height: 171,
                    rename: false
                }]
            },
            files: {
                expand: true,
                src: ['**.{jpg,gif,png}'],
                cwd: 'images/src',
                dest: 'images/'
            }
        }
    });

    // Load the plugin that provides the "uglify" task.
    grunt.loadNpmTasks('grunt-responsive-images');

    // Default task(s).
    grunt.registerTask('default', ['responsive_images']);

};