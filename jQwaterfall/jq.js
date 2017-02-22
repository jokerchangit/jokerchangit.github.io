/**
 * Created by Administrator on 2016/12/2 0002.
 */

$(window).on('load',function(){
    waterfall();
    var dataIn={'data':[{'src':'0.jpg'},{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'}]}
    $(window).on('scroll',function () {
        if(checkscroll()){
           $.each(dataIn.data,function(key,value) {
               var oBox=$('<div>').addClass('box').appendTo($('#main'));
               var oPic=$('<div>').addClass('pic').appendTo($(oBox));
               var oImg=$('<img>').attr('src','img/'+$(value).attr('src'));
               oImg.appendTo(oPic);
           })
            waterfall();
        }
    })
})
function waterfall() {
    var $boxs=$('#main>.box');
    var w=$boxs.eq(0).outerWidth();
    var cols=Math.floor($(window).width()/w);
    $('#main').css({'margin':'0 auto','width':w*cols});
    var liHs=[];
    $boxs.each(function (index) {  //避免窗口变化图片重叠问题
        if(index<cols){
            $boxs[index].style.position="";
        }
    })
    $boxs.each(function (index,value) {
        var liH=$boxs.eq(index).outerHeight();
        if(index<cols){
            liHs[index]=liH;
        }else{
            var minH=Math.min.apply(null,liHs);
            var minHIndex=$.inArray(minH,liHs);//通过值判断索引位置  ，JQ的封装好的
            $(value).css({
                'position':'absolute',
                'top':minH+'px',
                'left':minHIndex*w+'px',
            })
            liHs[minHIndex]+=liH
        }
    })
}
function checkscroll() {
    var $lastbox=$('#main>.box').last();
    var lastH=$lastbox.offset().top+Math.floor($lastbox.outerHeight()/2);
    var scrollTop=$(window).scrollTop();
    var bodyH=$(window).height();
    return (lastH<scrollTop+bodyH)?true:false;
}
