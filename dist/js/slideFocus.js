/*! 项目名称：weather 版本：3.0.0 */
!function(a){a.fn.extend({slideFocusPlugin:function(b){var c=a(this);c.defaults={startNum:1,tabNum:!1,arrowBtn:!1,autoPlay:!0,leftArrowBtnClass:"leftBtn",rightArrowBtnClass:"rightBtn",tabClassName:"tabList",conClassName:"conList",conChildrenClassName:"con",selectClass:"cur",funType:"mouseenter",animateTime:1e3,autoPlayTime:3e3,delayTime:200,zIndex:10,animateStyle:["left",""],tabTagName:"i"},c.options=a.extend(c.defaults,b),c.tabTagArr,c.tabTagHtml="",c.tabConArr=c.find("."+c.options.conClassName).children("."+c.options.conChildrenClassName),c.tabAllNum=c.tabConArr.length,c.nextNum=c.options.startNum-1>=c.tabAllNum?c.tabAllNum-1:c.options.startNum-1,c.prevNum=0,c.tempNum=0,c.hasNextPlay=!1,c.delayTimeId,c.autoPlayTimeId,c.animation=!1,c.animateDirection=1;var d=function(){c.animation||(c.animateDirection=1,c.prevNum=c.nextNum,c.nextNum==c.tabAllNum-1?c.nextNum=0:c.nextNum++,i())},e=function(){c.animation||(c.animateDirection=-1,c.prevNum=c.nextNum,0==c.nextNum?c.nextNum=c.tabAllNum-1:c.nextNum--,i())},f=function(){c.animation?c.hasNextPlay=!0:(c.prevNum=c.nextNum,c.nextNum=c.tempNum,c.prevNum!=c.nextNum&&i())},g=function(){clearTimeout(c.autoPlayTimeId),c.autoPlayTimeId=setInterval(d,c.options.autoPlayTime)},h=function(){clearTimeout(c.autoPlayTimeId)},i=function(){Boolean(b.callbackFunBefore)&&b.callbackFunBefore(c.nextNum,c.prevNum),c.animation=!0,c.tabTagArr.eq(c.prevNum).removeClass(c.options.selectClass),c.tabTagArr.eq(c.nextNum).addClass(c.options.selectClass),c.tabConArr.eq(c.nextNum).css({"z-index":c.options.zIndex,display:"block"}),c.tabConArr.eq(c.prevNum).css({"z-index":c.options.zIndex-1}),c.tabConArr.eq(c.nextNum).css(c.options.animateStyle[0],c.animateDirection*c.options.stepNum),"left"==c.options.animateStyle[0]?(c.tabConArr.eq(c.nextNum).animate({left:0},{duration:c.options.animateTime,easing:c.options.animateStyle[1]}),c.tabConArr.eq(c.prevNum).animate({left:-(c.animateDirection*c.options.stepNum)},{duration:c.options.animateTime+1,easing:c.options.animateStyle[1],complete:j})):"top"==c.options.animateStyle[0]?(c.tabConArr.eq(c.nextNum).animate({top:0},{duration:c.options.animateTime,easing:c.options.animateStyle[1]}),c.tabConArr.eq(c.prevNum).animate({top:-(c.animateDirection*c.options.stepNum)},{duration:c.options.animateTime+1,easing:c.options.animateStyle[1],complete:j})):"fade"==c.options.animateStyle[0]&&(c.tabConArr.eq(c.nextNum).css("display","none"),c.tabConArr.eq(c.prevNum).fadeOut(c.options.animateTime),c.tabConArr.eq(c.nextNum).fadeIn(c.options.animateTime,function(){j()}))},j=function(){c.animation=!1,c.tabConArr.eq(c.prevNum).css({"z-index":c.options.zIndex-2,display:"none"}),Boolean(c.options.callbackFun)&&c.options.callbackFun(c.nextNum,c.prevNum),c.hasNextPlay&&c.nextNum!=c.tempNum&&(c.hasNextPlay=!1,c.prevNum=c.nextNum,c.nextNum=c.tempNum,i())},k=function(b){clearTimeout(c.autoPlayTimeId),c.options=a.extend(c.options,b),"left"==c.options.animateStyle[0]?(c.tabConArr.eq(c.prevNum).css({left:-(c.animateDirection*c.options.stepNum),display:"none"}),c.tabConArr.eq(c.nextNum).css({left:"0",display:"block"})):"top"==c.options.animateStyle[0]&&(c.tabConArr.eq(c.prevNum).css({top:-(c.animateDirection*c.options.stepNum),display:"none"}),c.tabConArr.eq(c.nextNum).css({top:"0",display:"block"})),c.options.autoPlay&&g()};if(c.reinit=function(a){k(a)},c.next=function(){d()},c.prev=function(){e()},c.options.tabNum)c.tabTagArr=c.find("."+c.options.tabClassName).children(c.options.tabTagName);else{for(var l=1;l<=c.tabAllNum;l++)c.tabTagHtml+="<i>"+l+"</i>";c.find("."+c.options.tabClassName).html(c.tabTagHtml),c.tabTagArr=c.find("."+c.options.tabClassName).children()}return c.tabTagArr.bind(c.options.funType,function(){c.tempNum=c.tabTagArr.index(a(this)),c.prevNum>c.tempNum?c.animateDirection=-1:c.animateDirection=1,"mouseenter"==c.options.funType?(clearTimeout(c.delayTimeId),c.delayTimeId=setTimeout(f,c.options.delayTime)):f()}),"mouseenter"==c.options.funType&&c.tabTagArr.bind("mouseleave",function(){c.hasNextPlay=!1,clearTimeout(c.delayTimeId)}),c.options.autoPlay&&(g(),c.bind("mouseleave",function(){g()}),c.bind("mouseenter",function(){h()})),c.options.arrowBtn&&(c.find("."+c.options.leftArrowBtnClass).bind("click",function(){e()}),c.find("."+c.options.rightArrowBtnClass).bind("click",function(){d()})),c.tabTagArr.eq(c.nextNum).addClass(c.options.selectClass),c.tabConArr.eq(c.nextNum).css({"z-index":c.options.zIndex,display:"block"}),c}})}(jQuery);