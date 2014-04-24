/******************************************
 * @PluginName      animateTransform
 *
 *
 * @author          Sven Schmidt
 * @Date            2014/04/21
 * @copyright       Copyright (c) 2014 Sven Schmidt
 * @license         Feel free to use!
 * @link            http://portfolio.lifesetter.de
 * @version         1.0
 * @description     Use this plugin to animate objTransform3 transform-values (translate, translate3d, rotate, skew, scale)
 * @Usage           $(elem).animateTransform({x:...,y:...,z:...,skewX:...,skewY:...,rotate:...,scale:...duration:...,callback:function() {}});
 ******************************************/

(function($) {
	$.fn.animateTransform = function(settings) {
		var $elem = $(this),_settings = $.extend({},$.fn.animateTransform.defaultSettings,settings || {}),
			x=0,y=0,z=0,rotate=0,skewX=0,skewY=0,scale=0,translateLine,rotateLine,skewLine,scaleLine,propNum = 0,
			objTransform = $.extend({},("    " + ($elem[0].style.WebkitTransform || $elem[0].style.MozTransform || $elem[0].style.OTransform || $elem[0].style.MSTransform || $elem[0].style.Transform || " ").replace(new RegExp("\\, ","g"),",")).split(" "),"rotate(0deg) scale(1) translate(0px,0px) skew(0deg,0deg)".replace(new RegExp("\\, ","g"),",").split(" ")),
			vendorPrefix = (Array.prototype.slice.call(window.getComputedStyle(document.documentElement,"")).join("").match(/-(moz|webkit|ms)-/) || (styles.OLink === "" && ["","o"]))[0];

		for(v in objTransform) if(objTransform[v]) objTransform[objTransform[v].match(/([a-zA-Z]{0,10})/)[0].replace("3d","")] = objTransform[v].match(/[^()\s]+(?=,|\))/g)[0].replace(new RegExp("deg","g"),"").replace(new RegExp("px","g"),"").split(",") || [0,0,0];
		console.log(objTransform.rotate);

		$($elem).animate({
			"fake7":objTransform.scale[0],
			"fake4":objTransform.rotate[0]
		},0,function() { console.log("complete"); });
		
		$($elem).animate({
			"fake1":_settings.x,
			"fake2":_settings.y,
			"fake3":_settings.z,
			"fake4":_settings.rotate,
			"fake5":_settings.skewX,
			"fake6":_settings.skewY,
			"fake7":_settings.scale
		},{step:function(now,fx) {
		
			propNum = fx.prop.replace("fake","");
			
			(propNum == 1 && (x = fx.now)) || (propNum == 2 && (y = fx.now)) || (propNum == 3 && (z = fx.now));
			(propNum < 4 && (translateLine = "translate" + (_settings.z > 0 ? "3d" : "") + "(" + (x) + "px," + (y) + "px" + (_settings.z > 0 ? "," + (z) + "px)" : ")")));
			(propNum == 4 && (rotate = fx.now) && ((objTransform.rotate[0] <= _settings.rotate && rotate > objTransform.rotate[0]) || (objTransform.rotate[0] > _settings.rotate && rotate <= objTransform.rotate[0])) && (rotateLine = "rotate(" + rotate + "deg)"));		 
			(propNum == 5 && (skewX = fx.now)) || (propNum == 6 && (skewY = fx.now));
			(propNum == (5 || 6) && (skewLine = "skew(" + skewX + "deg," + skewY + "deg)"));
			(propNum == 7 && (scale = fx.now) && ((objTransform.scale[0] <= _settings.scale && scale > objTransform.scale[0]) || (objTransform.scale[0] > _settings.scale && scale <= objTransform.scale[0])) && (scaleLine = "scale(" + scale + ")"));

			$elem.css(vendorPrefix + "transform",
				(translateLine || "") +  (rotateLine || "rotate(" + objTransform.rotate[0] + "deg)") + (skewLine || "") + (scaleLine || "scale(" + objTransform.scale[0] + ")"));
		},duration:parseInt(_settings.duration),complete:function(){_settings.callback.call(this);}});

		return $elem;
	}
	
	$.fn.animateTransform.defaultSettings = {
		x:0,
		y:0,
		z:0,
		skewX:0,
		skewY:0,
		scale:1,
		rotate:0,
		duration:10000,
		callback:function() {}
	};
})(jQuery);