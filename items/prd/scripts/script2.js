var myApp=angular.module("myApp",[]);

var myControllerFn=function($scope,$interval,$http){
	//图片显示
	$scope.num=0;
	var timer=$interval(function(){
		if($scope.num==0){
			$scope.num=1;
		}else{
			$scope.num=0;
		}
	},2000)

	//箭头
	$scope.getClass="jiantou";	
	$scope.btnJiantou=function(){	
		if($("#btn").hasClass("jiantou")){
			$scope.getClass="jiantou-two";		
			$("#content").animate({"width":0});
			$("#product-page").animate({"opacity":1});
			$("#btn").animate({"left":165+"px"},500);					
		}else{	
			$("#content").animate({"width":"1000px"});
			$("#product-page").animate({"opacity":0});
			$("#btn").animate({"left":966+"px"},600);
			$scope.getClass="jiantou";

		}

	}
	$scope.samllFang=function(index){//
			
		$("#pageNo").find("span").eq(index).addClass("curp").siblings().removeClass("curp");
		$("#scroll").animate({"top":-index*600+'px',"transition":"1s"});

	}
	$scope.chengeA=function(index){
		$(".product-type").eq(index).addClass("cur-type").siblings().removeClass("cur-type");
		$("#scroll").css({"top":0,"transition":"none"});
	}
	$scope.chengeRightA=function(index){
		$scope.getClass="jiantou-two";		
		$("#content").animate({"width":0});
		$("#product-page").animate({"opacity":1});
		$("#btn").animate({"left":165+"px"},500);
		$("#scroll").css({"top":0,"transition":"none"});		
	}
	//右边小盒子
	$http.get("/data.json")
		.then(function(response){
			//console.log(response.data[0].products);
			$scope.name=response.data;
			
			//console.log(response.data[1].products[0]);
			
			for(var i=0;i<response.data.length;i++){
				$scope.arr=[];
				var temp=response.data[i].template_type,
					pro=response.data[i].products,
					len=response.data[i].products.length,				
				    arrPage=Math.ceil(len/temp);
				    //console.log(arrPage);
				for(var j=0;j<arrPage;j++){

					$scope.arr[j]=[];
					
					for(var k=j*temp;k<=(j+1)*temp-1;k++){

						//$scope.arr[j].push($scope.name[i].products[n+7*j]);
						$scope.arr[j].push(response.data[i].products[k]);
						//$scope.arr[n]=$scope.pro.slice(n*temp,pro*(n+1));
						
					}	
						

				}
					//console.log($scope.arr);
				for(var n =0;n<$scope.arr.length;n++){
					for(var m = 0;m<$scope.arr[n].length;m++){
						if(!$scope.arr[n][m]){
							$scope.arr[n][m]={
								summary:"请您期待"
							}
						}
					}
				}

				
	    	
	    	$scope.name[i].products=$scope.arr;
	    	console.log($scope.name[i].products);
			}

					

		},function(response){
			alert("请求失败")
		})


}
myApp.controller("myController",myControllerFn);
