// This shows a full config file!
module.exports = function(grunt) {

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),

		watch : {

			images : {
				files : ['images/src/*.{png,jpg,gif}'],
				tasks : ['newer:imagemin']
			}, // watch images added to src

			deleting : {
				files : ['images/src/*.{png,jpg,gif}'],
				tasks : ['delete_sync']
			}, // end of delete sync

			scripts : {
				files : ['js/libs/*.js', 'js/custom/*.js'],
				tasks : ['concat', 'uglify'],
				options : {
					spawn : false,
				}
			}, //end of watch scripts

			css : {
				files : ['sass/**/*.scss'],
				tasks : ['sass', 'autoprefixer'],
				options : {
					spawn : false,
				}
			}, //end of sass watch
		}, //end of watch

		/* ====================================================================================================================================================
		 * ====================================================================================================================================================

		 Tasks

		 ====================================================================================================================================================
		 ====================================================================================================================================================
		 */

		delete_sync : {
			dist : {
				cwd : 'images/dist',
				src : ['**'],
				syncWith : 'images/src'
			}
		}, // end of delete sync

		imagemin : {
			dynamic : {
				files : [{
					expand : true, // Enable dynamic expansion
					cwd : 'images/src/', // source images (not compressed)
					src : ['**/*.{png,jpg,gif}'], // Actual patterns to match
					dest : 'images/dist/' // Destination of compressed files
				}]
			}
		}, //end imagemin

		concat : {
			dist : {
				src : ['js/libs/*.js', 'js/custom/*.js'],
				dest : 'js/build/production.js'
			}
		}, //end concat

		uglify : {
			dist : {
				src : 'js/build/production.js',
				dest : 'js/build/production.min.js'
			}
		}, //end uglify

		sass : {
			dist : {
				options : {
					style : 'compressed', //no need for config.rb
					compass : 'true'
				},
				files : {
					'css/main.css' : 'sass/main.scss'
				}
			}
		}, //end of sass

		autoprefixer : {

			options : {

				browsers : ['> 5%', 'last 2 version', 'ie 8', 'ie 9']
			},

			dist : {
				files : {
					'css/main.css' : 'css/main.css'
				}

			}
		}, //end of autoprefixer

		browserSync : {
			dev : {
				bsFiles : {
					src : ['css/*.css', 'images/*.*', 'js/build/production.min.js', '*.php', 'includes/*.php']
				},
				options : {
					proxy: "localhost/grunt-boilerplate",					
					watchTask : true // < VERY important
				}
			}
		}
	});

	// load npm tasks
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-concat');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-imagemin');
	grunt.loadNpmTasks('grunt-newer');
	grunt.loadNpmTasks('grunt-delete-sync');

	// define default task
	grunt.registerTask('default', ["browserSync", "watch"]);
};
