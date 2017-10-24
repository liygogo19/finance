(function (factory) {
    if (typeof define === 'function' && define.amd ) {
        define(['jquery'], function(jquery){
            // 返回构造函数
            factory(jquery); // 初始化插件
        });
    }else if(typeof define === 'function' && define.cmd){
        define(['jquery'], function(require,exports,moudles){
            factory(
                require('jquery')); // 初始化插件
        })
    }else{
        factory(jQuery);
    }
})(function($){
    $.showTooltip=function(text){
        var instance= false;
        if(true){
            var $container=$('<div class="field-tooltipWrap"><div class="field-tooltipInner"><div class="field-tooltip fieldTipBounceIn"><div class="zvalid-resultformat">'+text+'</div></div></div></div>');
            $container.appendTo($("body"));
            instance=true;
            var timer = setTimeout(function(){
                $container.remove();
                instance=false;
                clearTimeout(timer);
            },1500)
        }
    };
})