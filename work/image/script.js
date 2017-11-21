$(document).ready(function(){

	var i = 0;
	//克隆第一张图片放在最后一张图片后面
	clone = $(".image li").first().clone();
	$(".image").append(clone);

	size = $(".image li").size();
	$(".num").first().addClass('on');

	$(".num").hover(function(){
		var index = $(this).index();
		//.stop保证动画的流畅性
		$(".image").stop().animate({left:-600*index});
		$(this).addClass('on').siblings().removeClass("on");
		// 使得轮播和当前图片衔接
		i = index;
	})
	
	//自动轮播
	var t = setInterval(moveR,2000)
	// 鼠标进入时，自动轮播停止
	$(".container").hover(
		function(){
			clearInterval(t);
		},
		function(){
			t = setInterval(moveR,2000)
		})

	$(".gt").click(function(){

		moveR();
	});
	function moveR(){
		i++;
			//当到达最后一张图片时，用css的方法使得.image在后台快速的移动回原位置
			if(i == size){
				$(".image").css({left:0});
				i = 1;
			}
			$(".image").stop().animate({left:-600*i});
			//为了解决最后一张克隆图片圆点的问题
			if (i == size-1) {
				$(".num").eq(0).addClass('on').siblings().removeClass("on");
			}
			else{
				$(".num").eq(i).addClass('on').siblings().removeClass("on");
			}
		}

		$(".lt").click(function(){
			moveL();

		})
		function moveL(){
			i--;
			if(i == -1){
				$(".image").css({left:-600*(size-1)});
				i = size-2;
			}
			$(".image").stop().animate({left:-600*i})
			$(".num").eq(i).addClass("on").siblings().removeClass("on");
		}
	});



//注释掉冗余的代码
// 	$(".gt").click(function(){
// 		i++;
// 		//当到达最后一张图片时，用css的方法使得.image在后台快速的移动回原位置
// 		if(i == size){
// 			$(".image").css({left:0});
// 			i = 1;
// 		}
// 		$(".image").stop().animate({left:-600*i});
// 		//为了解决最后一张克隆图片圆点的问题
// 		if (i == size-1) {
// 			$(".num").eq(0).addClass('on').siblings().removeClass("on");
// 		}
// 		else{
// 			$(".num").eq(i).addClass('on').siblings().removeClass("on");
// 		}

// 	});

// 	$(".lt").click(function(){
// 		i--;
// 		if(i == -1){
// 			$(".image").css({left:-600*(size-1)});
// 			i = size-2;
// 		}
// 		$(".image").stop().animate({left:-600*i})
// 		$(".num").eq(i).addClass("on").siblings().removeClass("on");
// 	})
// });