$(document).ready(function(){
	$(".tab li").click(function(){
		var index = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		//注意index在:eq()中是如何使用的
		$(".item:eq("+index+")").addClass('on').siblings().removeClass("on");
	})

})