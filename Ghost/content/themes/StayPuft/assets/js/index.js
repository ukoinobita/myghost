/**
 * Main JS file for Casper behaviours
 */

/* globals jQuery, document */
(function ($, sr, undefined) {
    "use strict";

    var $document = $(document),

        // debouncing function from John Hann
        // http://unscriptable.com/index.php/2009/03/20/debouncing-javascript-methods/
        debounce = function (func, threshold, execAsap) {
            var timeout;

            return function debounced () {
                var obj = this, args = arguments;
                function delayed () {
                    if (!execAsap) {
                        func.apply(obj, args);
                    }
                    timeout = null;
                }

                if (timeout) {
                    clearTimeout(timeout);
                } else if (execAsap) {
                    func.apply(obj, args);
                }

                timeout = setTimeout(delayed, threshold || 100);
            };
        };

    $document.ready(function () {

        var $postContent = $(".post-content");
        $postContent.fitVids();

        function updateImageWidth() {
            var $this = $(this),
                contentWidth = $postContent.outerWidth(), // Width of the content
                imageWidth = this.naturalWidth; // Original image resolution

            if (imageWidth >= contentWidth) {
                $this.addClass('full-img');
            } else {
                $this.removeClass('full-img');
            }
        }

        var $img = $("img").on('load', updateImageWidth);
        function casperFullImg() {
            $img.each(updateImageWidth);
        }

        casperFullImg();
        $(window).smartresize(casperFullImg);

        $(".scroll-down").arctic_scroll();

    });

    // smartresize
    jQuery.fn[sr] = function(fn) { return fn ? this.bind('resize', debounce(fn)) : this.trigger(sr); };

    // Arctic Scroll by Paul Adam Davis
    // https://github.com/PaulAdamDavis/Arctic-Scroll
    $.fn.arctic_scroll = function (options) {

        var defaults = {
            elem: $(this),
            speed: 500
        },

        allOptions = $.extend(defaults, options);

        allOptions.elem.click(function (event) {
            event.preventDefault();
            var $this = $(this),
                $htmlBody = $('html, body'),
                offset = ($this.attr('data-offset')) ? $this.attr('data-offset') : false,
                position = ($this.attr('data-position')) ? $this.attr('data-position') : false,
                toMove;

            if (offset) {
                toMove = parseInt(offset);
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top + toMove) }, allOptions.speed);
            } else if (position) {
                toMove = parseInt(position);
                $htmlBody.stop(true, false).animate({scrollTop: toMove }, allOptions.speed);
            } else {
                $htmlBody.stop(true, false).animate({scrollTop: ($(this.hash).offset().top) }, allOptions.speed);
            }
        });

    };
})(jQuery, 'smartresize');


        hljs.tabReplace = '    ';// TAB键显示 4个空格
        hljs.initHighlightingOnLoad();
    
    
        MathJax.Hub.Config({  
            tex2jax: {inlineMath: [['$','$'], ['\\(','\\)']]}
     });
  /*
        $("#search-field").ghostHunter({
            rss : "{{@blog.url}}/rss/",
            results : "#results",
            onKeyUp : true,
            zeroResultsInfo : false
     
       });
       */
        //在文章中查找title并填充到div anchor-content中
        $(document).ready(function(){
            $(".post-content").find("h2,h3,h4,h5,h6").each(function(i,item){
                var tag = $(item).get(0).localName;
                $(item).attr("id","wow"+i);
                $("#anchor-content").append('<li><a class="new'+tag+' anchor-link" onclick="return false;" href="#" link="#wow'+i+'"> <i class="fa fa-caret-right"/>\&nbsp\;'+$(this).text()+'</a></li>');
            });

            if($("#anchor-content").html()==""){
                $(".blog-anchor").toggle();
            }
            $(".anchor-link").click(function(){
                $("html,body").animate({scrollTop: $($(this).attr("link")).offset().top}, 1000);
            });

            //首先将#back-to-top隐藏    
            
            $("#back-to-top").hide();    
            //当滚动条的位置处于距顶部100像素以下时，跳转链接出现，否则消失   
            $(function() { 
                $(window).scroll(function(){ 
                    if($(window).scrollTop()>100){
                        $("#back-to-top").fadeIn(1500); 
                    } 
                    else{ 
                        $("#back-to-top").fadeOut(1500);
                    } 
                });    
                //当点击跳转链接后，回到页面顶部位置    
                $("#back-to-top").click(function(){ 
                    $('body,html').animate({scrollTop:0},1000); 
                    return false; 
                });
            });
             
            $(".tag-cloud").children(".tag-item").each(function(i,item){
                var size = $($(item).find(".post-count").get(0)).html()/2;
                if(size > 5) size = 5;
                size = 10 + 8*size; 
            
                var rand = parseInt(Math.random() * 9); 
                $(item).css("font-size",size);
                $(item).addClass("tags"+rand);
            });
            
        });

