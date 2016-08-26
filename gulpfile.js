//引入gulp文件
var gulp=require("gulp");
var webServer=require("gulp-webserver");
var uglify=require("gulp-uglify");
var concat=require("gulp-concat");
var webpack=require("gulp-webpack");
var named=require("vinyl-named");
gulp.task("copy",function(){
	gulp.src("./*.html")
		.pipe(gulp.dest("./items"))

})
gulp.task("copyJs",function(){
	gulp.src("./src/scripts/**/*.js")
		.pipe(gulp.dest("./items/prd/scripts"))
})
//css文件

gulp.task("css",function(){
	gulp.src("./src/styles/**/*.css")
		.pipe(gulp.dest("./items/prd/styles"))
})   

gulp.task("webServer",function(){
	gulp.src("./")  //其服务启在当前文件夹下
		.pipe(webServer({
			host:"localhost",//配置信息
			port:80,	//端口
			livereload:true, //文件实时更新
			directoryListing:{
				enable:true, //显示目录
				path:"./"  //默认当前文件夹
			}
		}))
})

//js模块
/*var jsFiles=["./src/scripts/app.js"];
gulp.task("packjs",function(){
	gulp.src(jsFiles)  //
		.pipe(named())
		.pipe(webpack({
			output:{
			//输出配置
				filename:"[name].js"  //固定的
			},
			module:{
			//定义模块	
				loaders:[{   //引入loader是将变量引入模块化编程
					test:/\.js$/, //检测，正则，以JS结尾的
					loader:"imports?define=>false" //固定的格式
				}]
			}
		}))
		.pipe(uglify().on("error",function(e){
			//若压缩错误，提字符。行号，信息等
			console.log("\x07",e.lineNumber,e.message);
			return this.end(); //this.end() 是node.js的语句，在控制台上输出
		}))

		.pipe(gulp.dest("./items/prd/scripts"))
})*/


gulp.task("watch",function(){
	gulp.watch("./*.html",["copy"])
	gulp.watch("./src/styles/**/*.css",["css"])
	gulp.watch("./src/scripts/**/*.js",["copyJs"])
	//gulp.watch("./src/scripts/**/*.js",["packjs"])

})
gulp.task("default",["watch","webServer"]);


