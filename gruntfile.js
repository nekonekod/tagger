module.exports = function(grunt){
	
  grunt.initConfig({
    watch:{
      jade:{
        files:['views/**'],
        options:{
          livereload:true
        }
      },
      js:{
        files:['public/js/**','models/**/*.js'],
        //tasks:['jshint'],
        options:{
          livereload:true
        }
      }
    },
    nodemon:{
      dev:{
        options:{
          file:'app.js',
          args:[],
          ignordedFiles:['README.md','node_modules/**','public/libs/**','.DS_Store'],
          watchedExtensions:['js'],
          watchFolders:['./'],
          debug:true,
          delayTime:1,
          env:{
            PORT:3002
          },
          cwd: __dirname
        }
      }
    },
    concurrent:{
      tasks:['nodemon','watch'],
      options:{
        logConcurrentOutput:true
      }
    }
  })

  grunt.loadNpmTasks('grunt-contrib-watch')
	grunt.loadNpmTasks('grunt-nodemon')
	grunt.loadNpmTasks('grunt-concurrent')

	grunt.option('force',true)
	grunt.registerTask('default',['concurrent'])

}