var wWidth = $(window).width();
var hHeight = $(window).height();
var isMove=false;
var moveIndex=0;
var pageInfoIndex=0;
var showIndex=0;

var PageMusic;
var 音乐开关;
var isOpenInfo=false;
$(function(){
	if(wWidth==0){wWidth=$(document).width();}
	if(hHeight==0){hHeight=$(document).height();}
})
$(document).ready(function(e) {
	_initTopNav();
    _initPage();
	_initIndexPage();
	setTimeout(function(){_initScroll();
	$(document).scrollTop(0);},100);
	
  var audios = document.getElementsByTagName('audio');
  PageMusic= audiojs.create(audios[0]);
  音乐开关 = true;
  PageMusic.load("http://28que.com/video/sound1.mp3");
  //MusicPause();
});
function MusicPause(){
	PageMusic.playPause();
}
function _initPlay(){
	if(音乐开关){
		$("#bottomBgImg").attr("src","img/in_34.jpg");
		音乐开关=false;
	}else{
		$("#bottomBgImg").attr("src","img/in_34_h.jpg");
		音乐开关=true;
	}
	MusicPause();
}
function _initPage() {
	$("body").width(wWidth);
	$(".pageDom li.page").width(wWidth);
    $(".pageDom li.page").height(hHeight);
	$(".pageDom li.page .infoContentDom").height(hHeight);
    $(".pageDom li.page img.bg").height(hHeight);
	$(".page4LiInfoDom").height(hHeight);
	$(".page4LiInfoDom .page4LiInfoContent div.pageInfo").css({"width":wWidth,"height":hHeight});
	$(".pageDom li.page").each(function(index, element) {
		var t=$(this);
		t.find(".info").css({"width":wWidth,"height":hHeight-135});
		t.find(".left").css({"text-align":"left"});
		t.find(".right").css({"text-align":"right"});
		t.find(".indexOper ul li").each(function(index, element) {
            $(this).hover(function(){
					$(this).find(".zz").stop().animate({opacity:1},"fast");
				},function(){
					$(this).find(".zz").stop().animate({opacity:0},"fast");
				});
        });
		_initMoveData(t.find(".infoContentDom"));
		t.find(".infoContentDom .leftPageOper").click(function(e) {
            _initJian(t.find(".infoContentDom"));
        });
		t.find(".infoContentDom .rightPageOper").click(function(e) {
            _initAdd(t.find(".infoContentDom"));
        });
		t.find(".contentDom .indexOper li").each(function(index, element) {
            var tt=$(this);
			tt.find(".zz").click(function(e) {
				showIndex=t.index();
                _initShowInfo(t.index(),tt.index());
            });
        });
		t.find(".contentDom .jin").click(function(e) {
				showIndex=t.index();
                _initShowInfo(t.index());
        });
    });
    _initBg();
	_initPage2Oper();
	
	$(".pageLeft").click(function(e) {
        _pageInfoJian();
    });
	$(".pageRight").click(function(e) {
        _pageInfoAdd();
    });
	
	$(".page4Info ul li").each(function(index, element) {
        var t=$(this);
		t.click(function(e) {
            _initpageInfoUl();
        });
    });
	$(".page5Info .page5Oper").each(function(index, element) {
        var t=$(this);
		t.click(function(e) {
            _initpageInfoUl();
        });
    });
	
	_initPage6Oper();
	_initPage7Oper();
	_initPage8Oper();
}
function _initBg(){
	  $.get($(".pageDom li.page img.bg").attr("src"),
	  function() {
		  var imgWidth = $(".pageDom li.page img.bg").width();
		  if (imgWidth > wWidth) {
			  $(".pageDom li.page img.bg").css("margin-left", -(imgWidth - wWidth) / 2);
		  } else {
			 $(".pageDom li.page img.bg").width(wWidth);
			 $(".pageDom li.page img.bg").css("margin-top", -($(".pageDom li.page img.bg").height() - hHeight) / 2);
	  	  }
	  })
}
function _initScroll(){
	var $body=(window.opera)? (document.compatMode=="CSS1Compat"? $('html') : $('body')) : $('html,body');
	$(document).on('mousewheel', function(event, delta) {
		if(!isOpenInfo){
		if(!isMove){
		isMove=true;
		$(".headerInfo ul li").eq(moveIndex).find("a").removeClass("navFocus");
		if(delta<0){
			moveIndex++;
		}else{
			moveIndex--;
		}
		if(moveIndex<0){moveIndex=0}else if(moveIndex>$(".pageDom li.page").length+1){moveIndex=$(".pageDom li.page").length+1}
		$(".headerInfo ul li").eq(moveIndex).find("a").addClass("navFocus");
		$(".pageDom li.page").eq(showIndex).find(".infoContentDom").fadeOut("fast","",function(){isOpenInfo=false;$(".rightOperDom").fadeIn("fast")});
		$body.animate({scrollTop: hHeight*moveIndex},"slow","",function(){isMove=false});
		}
		}
	});
}
function _initTopNav(){
	var $body=(window.opera)? (document.compatMode=="CSS1Compat"? $('html') : $('body')) : $('html,body');
	$(".headerInfo ul li").each(function(index, element) {
		var t=$(this);
        t.find("a").click(function(e) {
			$(".headerInfo ul li").eq(moveIndex).find("a").removeClass("navFocus");
			$(this).addClass("navFocus");
			$(".pageDom li.page").eq(showIndex).find(".infoContentDom").fadeOut("fast","",function(){isOpenInfo=false;$(".rightOperDom").fadeIn("fast")});
            $body.stop().animate({scrollTop: hHeight*t.index()},"slow");
			moveIndex=t.index();
        });
    });
}
function _initIndexPage(){
	var tIndex=0;
	var lastIndex=0;
	var ggTime;
	function _init(){
		$(".indexPageContent li").each(function(index, element) {
        $(".pageBox").append("<div></div>");
    });
	$(".pageBox div").each(function(index, element) {
        $(this).click(function(e) {
			clearInterval(ggTime);
			tIndex=$(this).index();
			_move();
			ggTime=setInterval(_add,4000);
        });
	
    });
	$(".pageBox div:first").css("background","#000");
	ggTime=setInterval(_add,4000);
	}
	
function _add(){
	tIndex++;
	if(tIndex>$(".indexPageContent li").length-1){
		tIndex=0;
	}
	_move();
}
function _move(){
	$(".pageBox").each(function(index, element) {
        $(this).find("div").css("background","#C4C4C4");
    });
	$(".pageBox div:eq("+tIndex+")").css("background","#000");
	$(".indexPageContent li:eq("+tIndex+")").show();
	$(".indexPageContent li:eq("+tIndex+")").animate({"opacity":"1"},600,"",function(){
	$(".indexPageContent li:eq("+lastIndex+")").hide();lastIndex=tIndex;});
	$(".indexPageContent li:eq("+lastIndex+")").animate({"opacity":"0"},1500);
}
_init();
}
function _initpage1Oper(data){
	if(data==0){
		$(".page1Oper:eq(0) div:eq(1)").removeClass("focus");
		$(".page1Oper:eq(0) div:eq(0)").addClass("focus");
		$("#page1OperInfoImg").attr("src","img/info/info1/in1/in02.png");
	}else if(data==1){
		$(".page1Oper:eq(0) div:eq(0)").removeClass("focus");
		$(".page1Oper:eq(0) div:eq(1)").addClass("focus");
		$("#page1OperInfoImg").attr("src","img/info/info1/in1/in02_01.png");
	}
}
function _initpage3_1Oper(data){
	if(data==0){
		$(".page1Oper:eq(1) div:eq(1)").removeClass("focus");
		$(".page1Oper:eq(1) div:eq(0)").addClass("focus");
		$("#page3InfoOperImg").attr("src",$("#page3InfoOperImg").attr("src").replace("-1.png","-2.png"));
	}else if(data==1){
		$(".page1Oper:eq(1) div:eq(0)").removeClass("focus");
		$(".page1Oper:eq(1) div:eq(1)").addClass("focus");
		$("#page3InfoOperImg").attr("src",$("#page3InfoOperImg").attr("src").replace("-2.png","-1.png"));
	}
}
function _initPage3Oper(data){
	if(data==0){
		$(".page3InfoOper img").eq(0).attr("src","img/info/info2/bg_07.jpg");
		$(".page3InfoOper img").eq(1).attr("src","img/info/info2/bg_04.jpg");
		$("#page3InfoOperImg").attr("src","img/info/info2/bg_07-2.png");
	}else if(data==1){
		$(".page3InfoOper img").eq(0).attr("src","img/info/info2/bg_06.jpg");
		$(".page3InfoOper img").eq(1).attr("src","img/info/info2/bg_05.jpg");
		$("#page3InfoOperImg").attr("src","img/info/info2/bg_05-2.png");
	}
	
	$(".page1Oper:eq(1) div:eq(1)").removeClass("focus");
	$(".page1Oper:eq(1) div:eq(0)").addClass("focus");
}
function _initPage2Oper(){
	$(".page2Oper img").each(function(index, element) {
        var t=$(this);
		t.click(function(e) {
			$(".page2Oper img").each(function(index, element) {
                	$(this).attr("src",$(this).attr("src").replace("_h.png",".png"));
					$(".page2InfoDom > div:eq("+$(this).index()+")").hide();
            });
			t.attr("src",t.attr("src").replace(".png","_h.png"));
            $(".page2InfoDom > div:eq("+t.index()+")").fadeIn("fast");
        });
    });
	$(".page2_1InfoOper div").each(function(index, element) {
        var t=$(this);
		t.click(function(e) {
			$(".page2_1InfoOper div").each(function(index, element) {
                $(this).css("background-position","0px 0px")
            });
            t.css("background-position","0px -19px");
			$("#page2_1Info").attr("src","img/info/info1/in2/in_0"+(t.index()+1)+".png");
        });
    });
}
function _initPage6Oper(){
	$(".page6Oper > div").each(function(index, element) {
        var t=$(this);
		t.click(function(e) {
			var img=$(this).find("img");
			$(".page6Oper > div").each(function(index, element) {
				if($(this).find("img").attr("src").indexOf("_h.png")!=-1){
                $(this).find("img").attr("src",$(this).find("img").attr("src").replace("_h.png",".png"));
				}
				$(".page6InfoContent > div").eq($(this).index()).hide();
				$(this).find("div").css("color","#c7c7c7");
            });
			$(".page6InfoContent > div").eq(t.index()).fadeIn("fast");
			t.find("div").css("color","#464646");
			img.attr("src",img.attr("src").replace(".png","_h.png"));
        });
    });
	$(".page6InfoOper").each(function(index, element) {
        var t=$(this);
		t.click(function(e) {
			var con=$(this).find(".page6contenthide").attr("data-src");
			var title=$(this).find(".page6InfoOperInfoTitlehide").attr("data-src");
			if(con&&title){
			$(".page6content img").attr("src",con);
			$(".page6InfoOperInfoTitle > img").attr("src",title);
            $(".page6InfoOperInfo").fadeIn("fast");
			}
        });
    });
	$(".page6InfoClose").click(function(e) {
        $(".page6InfoOperInfo").fadeOut("fast");
    });
}
function _initPage7Oper(){
	$(".page7InfoContent ul li").each(function(index, element) {
        var t=$(this);
		t.hover(function(){
			$(this).css({"border":"5px solid #B71018"});
		},function(){
			$(this).css({"border":"5px solid #D1D1D1"});
		})
    });
	$(".page7InfoContent ul").each(function(index, element) {
        $(this).width($(".page7InfoContent").width()*Math.ceil($(this).find("li").length/3));
    });
	$(".page7PreOper").click(function(e) {
		if($(this).attr("src").indexOf("_h.jpg")==-1){
		$(this).attr("src",$(this).attr("src").replace(".jpg","_h.jpg"));
		}
		if($(".page7NextOper").attr("src").indexOf("_h.jpg")!=-1){
		$(".page7NextOper").attr("src",$(".page7NextOper").attr("src").replace("_h.jpg",".jpg"));
		}
        $(".page7InfoContent ul").eq(1).hide();
		$(".page7InfoContent ul").eq(0).fadeIn("fast");
		$(".page7InfoBTitle").attr("src",$(".page7InfoBTitle").attr("src").replace("hxBxTitle","hxBTitle"));
		$(".page7Next").fadeOut("fast");
    });
	$(".page7NextOper").click(function(e) {
		if($(this).attr("src").indexOf("_h.jpg")==-1){
		$(this).attr("src",$(this).attr("src").replace(".jpg","_h.jpg"));
		}
		if($(".page7PreOper").attr("src").indexOf("_h.jpg")!=-1){
		$(".page7PreOper").attr("src",$(".page7PreOper").attr("src").replace("_h.jpg",".jpg"));
		}
        $(".page7InfoContent ul").eq(0).hide();
		$(".page7InfoContent ul").eq(1).fadeIn("fast");
		$(".page7InfoBTitle").attr("src",$(".page7InfoBTitle").attr("src").replace("hxBTitle","hxBxTitle"));
		$(".page7Next").fadeIn("fast");
		if($(".page7InfoContent ul").css("left").replace("px","")>0){
			$(".page7Next").attr("src","img/info/info5/pre.jpg");
		}else{
			$(".page7Next").attr("src","img/info/info5/next.jpg");
		}
    });
	$(".page7Next").click(function(e) {
        if($(this).attr("src").indexOf("next")!=-1){
			$(".page7InfoContent ul:eq(1)").stop().animate({"left":-$(".page7InfoContent").width()},"fast");
			$(".page7Next").attr("src","img/info/info5/pre.jpg");
		}else{
			$(".page7InfoContent ul:eq(1)").stop().animate({"left":-0},"fast");
			$(".page7Next").attr("src","img/info/info5/next.jpg");
		}
    });
}
function _initPage8Oper(){
	var ttindex=0;
	$(".page8InfoContent ul").width(($(".page8InfoContent ul li").length*($(".page8InfoContent ul li").width()+2))-2);
	$(".page8InfoContent ul li").each(function(index, element) {
        var t=$(this);
		t.click(function(e) {
            $(".page8InfoContentDom img").attr("src",$(this).find("img").attr("src").replace(".jpg","_h.jpg"));
        });
    });
	$(".page8LeftOper").click(function(e) {
        _tjian();
    });
	$(".page8RightOper").click(function(e) {
        _tadd();
    });
	function _tadd(){
		ttindex++;
		if(ttindex>Math.ceil($(".page8InfoContent ul").width()/$(".page8InfoContent").width())-1){
			ttindex=0;
		}
		_tmove();
	}
	function _tjian(){
		ttindex--;
		if(ttindex<0){
			ttindex=Math.ceil($(".page8InfoContent ul").width()/$(".page8InfoContent").width())-1;
		}
		_tmove();
	}
	function _tmove(){
		$(".page8InfoContent ul").stop().animate({"left":-$(".page8InfoContent").width()*ttindex},"fast");
	}
}
function _initAdd(data){
	var tmIndex=Math.abs(parseInt(data.find("ul.infoPage").css("left").replace("px","")/data.width()));
	tmIndex++;
	if(tmIndex>data.find("ul.infoPage li.infoInfoDom").length-1){
		tmIndex=0;
	}
	_initMove(data,tmIndex);
}

function _initJian(data){
	var tmIndex=Math.abs(parseInt(data.find("ul.infoPage").css("left").replace("px","")/data.width()));
	tmIndex--;
	if(tmIndex<0){
		tmIndex=data.find("ul.infoPage li.infoInfoDom").length-1;
	}
	_initMove(data,tmIndex);
}
function _initMove(data,tmIndex){
	data.find("ul.infoPage").stop().animate({left:-data.width()*tmIndex},"fase");
}
function _initMoveData(data){
	data.find("ul.infoPage").width(data.find("ul.infoPage li.infoInfoDom").length*data.width());
	data.find("ul.infoPage li.infoInfoDom").width(data.width());
}

function _initpageInfoUl(data){
	$('.page4LiInfoDom').fadeIn('fast');
	pageInfoIndex=0;
	$(".pageInfoUl ul").width($(".pageInfoUl").width()*$(".pageInfoUl ul li").length);
	$(".pageInfoUl ul li").width($(".pageInfoUl").width());
	$(".pageCount").html("1/"+$(".pageInfoUl ul li").length);
}
function _pageInfoAdd(){
	pageInfoIndex++;
	if(pageInfoIndex>$(".pageInfoUl ul li").length-1){
		pageInfoIndex=0;
	}
	_pageMove();
}
function _pageInfoJian(){
	pageInfoIndex--;
	if(pageInfoIndex<0){
		pageInfoIndex=$(".pageInfoUl ul li").length-1;
	}
	_pageMove();
}
function _pageMove(){
	$(".pageCount").html(""+(parseInt(pageInfoIndex)+1)+"/"+$(".pageInfoUl ul li").length);
	$(".pageInfoUl ul").stop().animate({"left":-$(".pageInfoUl").width()*pageInfoIndex},"fast");
}
function _closePageInfo(){
	$('.page4LiInfoDom').fadeOut('fast');
}
function _initShowInfo(tInde,leftIndex){
	isOpenInfo=true;
	$(".rightOperDom").fadeOut("fast");
	
	if(typeof(leftIndex)!="undefined"){
	$(".pageDom li.page").eq(tInde).find(".infoContentDom ul.infoPage").css("left",-$(".pageDom li.page").eq(tInde).find(".infoContentDom").width()*leftIndex);
	}
	$(".pageDom li.page").eq(tInde).find(".infoContentDom").fadeIn("slow");
	$(".pageDom li.page").eq(tInde).find(".infoContentDom .back").each(function(index, element) {
        $(this).click(function(e) {
            $(".pageDom li.page").eq(tInde).find(".infoContentDom").fadeOut("fast","",function(){isOpenInfo=false;$(".rightOperDom").fadeIn("fast");});
        });
    });
}
function _initpageInfoUlnew(data){
	$("#page4LiInfoDom_"+data).fadeIn("fast");
}