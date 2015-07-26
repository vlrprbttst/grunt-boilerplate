module.exports = function(grunt) {

	grunt.initConfig({
		pkg : grunt.file.readJSON('package.json'),

		watch : {

			images : {
				files : ['images/src/**/*.{png,jpg,gif}'],
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
				tasks : ['sass', 'autoprefixer', 'penthouse'],
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

		penthouse : {
			extract : {
				outfile : 'css/critical.css.php',
				css : 'css/main.css',
				url : 'http://localhost/grunt-boilerplate',
				width : 1200,
				height : 500
			},
		}, //end of penthouse

		browserSync : {
			dev : {
				bsFiles : {
					src : ['css/*.css', 'images/*.*', 'js/build/production.min.js', '*.php', 'includes/*.php']
				},
				options : {
					proxy : "localhost/grunt-boilerplate",
					watchTask : true // < VERY important
				}
			}
		},

		ftpush : {
			build : {
				auth : {
					host : 'ftp.yourwebsite.com',
					port : 21,
					authKey : 'key1' //ftp login is in the .ftppass file
				},
				src : './', //root
				dest : '/www', //destination folder
				exclusions : ['.sass-cache', '.git', 'images/src','node_modules','.gitignore','.ftppass','gruntfile.js','README.md','package.json'], //remember adding '.ftppass' to the exclusions in .gitignore if you are publishing the repo to github
				// keep : ['blog','cv','projects'], // SUPER IMPORTANT! check what resources should STAY on the server, for example your wordpress installation or other subfolders you use for other projects. else they'll get wiped out
				simple : false,
				useList : false
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
	grunt.loadNpmTasks('grunt-penthouse');
	grunt.loadNpmTasks('grunt-ftpush');

	// define default task
	grunt.registerTask('default', ["browserSync", "watch"]);
};
