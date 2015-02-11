



var gulp = require('gulp');
var uglifyjs = require('gulp-uglifyjs');
var browserify = require('browserify'); // npm install browserify@3.46.1
var watchify = require('watchify'); // npm install watchify@0.6.4
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');





var browserifyski = function( files, options )
{


    var options = options || {
        min: false
    };

    for( var i in files )
    {
        var file = files[i];
        var minify = file.min || options.min;
        
        ////

        browserifyShare( file.source, file.output_dir, file.output, minify );        
    }


}




function browserifyShare( source, output_dir, output_filename, minify )
{

    var w = browserify({
        cache: {},
        packageCache: {},
        fullPaths: true
    });


    w = watchify( w );
    w.on('update', function()
    {
        bundleShare( w, output_dir, output_filename, minify );
    });

    /////////////////////////////////////////////

    w.add( source );
    bundleShare( w, output_dir, output_filename, minify );

}



function bundleShare( w, output_dir, output_filename, minify ) 
{

    var task = w.bundle()
                .pipe( 
                    source(output_filename) 
                );

    ////

    if( minify )
    {
        task = task.pipe( buffer() )        
                    .pipe( 
                        uglifyjs(output_filename, {
                            outSourceMap: true
                        }) 
                    )
    }


    ////
        

    task.pipe( gulp.dest(output_dir) );


    // LOG
    console.log( 'Compiled ' + output_filename + ' at ' + getDateTime() );
}






function getDateTime() 
{
    var now     = new Date(); 
    var year    = now.getFullYear();
    var month   = now.getMonth()+1; 
    var day     = now.getDate();
    var hour    = now.getHours();
    var minute  = now.getMinutes();
    var second  = now.getSeconds(); 
    if(month.toString().length == 1) {
        var month = '0'+month;
    }
    if(day.toString().length == 1) {
        var day = '0'+day;
    }   
    if(hour.toString().length == 1) {
        var hour = '0'+hour;
    }
    if(minute.toString().length == 1) {
        var minute = '0'+minute;
    }
    if(second.toString().length == 1) {
        var second = '0'+second;
    }   
    var dateTime = year+'/'+month+'/'+day+' '+hour+':'+minute+':'+second;   
 
    return dateTime;
}











browserifyski(

    [{
        source: './assets/app.js',
        output_dir: './assets/js',
        output: 'app.bundle.js',
        min: true
    }],

    {
        min: false
    }
);





