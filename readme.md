#Grunt Boilerplate for Web Designers and Front End Developers

Read all about this boilerplate [in this blog post](http://valeriopierbattista.com/blog/grunt-boilerplate-for-front-end-developers-and-webdesigners).

##Instructions

Open the terminal in the root of the project and type `npm install`, this will take care of all the dependencies.
Also run ```npm install grunt-postcss pixrem autoprefixer-core cssnano``` to install the postcss plugins.
Once done, type `grunt`, a browser window will open with your website running and will watch for changes and live reload accordingly.

**Warning**

This is a php project so in the `gruntfile.js` I'm proxying my htdocs xampp folder.
Be sure to edit that if your project is somewhere else 

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
Also consider changing the url line in the penthouse task

```
url : 'http://localhost/grunt-boilerplate',
```

#Gems

The gems used in this project are Sass and Compass. If you don't have already installed them, type each of these commands in the terminal (anywhere):

`gem install sass` 

`gem install compass`

##Deploying via FTP

Edit the `.ftppass` file with real data and edit the data in the `gruntfile.js` ftpush task. Once done deploy via ftp typing `grunt ftpush`