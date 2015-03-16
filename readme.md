#Instructions

Open the terminal at the root of the project and type `npm install`, this will take care of all the dependencies. Once done, type `grunt`

*Warning*

This is a php project so in the `gruntfile.js` I'm proxying my htdocs xampp folder. Be sure to edit that if your project is somewhere else 

```
		browserSync : {
			dev : {
				bsFiles : {
					src : ['css/*.css', 'images/*.*', 'js/build/production.min.js', '*.php', 'includes/*.php']
				},
				options : {
					proxy: "localhost/grunt-boilerplate", // <-- this here					
					watchTask : true 
				}
			}
		}

```

#Gems

The gems used in this project are Sass and Compass. If you don't have already installed them, type each of these commands in the terminal (anywhere):

`gem install sass` 

`gem install compass`