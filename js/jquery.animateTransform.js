/******************************************
 * @PluginName      animateTransform
 *
 *
 * @author          Sven Schmidt
 * @Date            2014/04/21
 * @copyright       Copyright (c) 2014 Sven Schmidt
 * @license         Feel free to use!
 * @link            http://portfolio.lifesetter.de
 * @version         1.1.0
 * @description     Use this plugin to animate objTransform3 transform-values (translate, translate3d, rotate, skew, scale)
 * @Usage           $(elem).animateTransform({x:...,y:...,z:...,skewX:...,skewY:...,rotate:...,scale:...duration:...,callback:function() {}});
 ******************************************/

(function($) {
	$.fn.animateTransform = function(settings) {
		var objSettings = $.extend({},$.fn.animateTransform.defaultSettings,settings || {}),
		    vendorPrefix = function(str) { return str.charAt(0).toUpperCase() + str.slice(1); }((Array.prototype.slice.call(window.getComputedStyle(document.documentElement,"")).join("").match(/-(moz|webkit|ms)-/) || (styles.OLink === "" && ["","o"]))[1]);

		return this.each(function() {
			var $elem = $(this),objSettings = $.extend({},$.fn.animateTransform.defaultSettings,settings || {}),
			    x=0,y=0,z=0,rotate=0,skewX=0,skewY=0,scale=0,translateLine,rotateLine,skewLine,scaleLine,propNum = 0,
			    objTransform = $.extend({},("    " + ($elem[0].style.WebkitTransform || $elem[0].style.MozTransform || $elem[0].style.OTransform || $elem[0].style.MSTransform || $elem[0].style.Transform || " ").replace(new RegExp("\\, ","g"),",")).split(" "),"rotate(0deg) scale(1) translate(0px,0px) skew(0deg,0deg)".replace(new RegExp("\\, ","g"),",").split(" "));	

			for(v in objTransform) if(objTransform[v]) objTransform[objTransform[v].match(/([a-zA-Z]{0,10})/)[0].replace("3d","")] = objTransform[v].match(/[^()\s]+(?=,|\))/g)[0].replace(new RegExp("deg","g"),"").replace(new RegExp("px","g"),"").split(",") || [0,0,0];

			$($elem).animate({
				"fake7":objTransform.scale[0],
				"fake4":objTransform.rotate[0]
			},0);

			$($elem).animate({
				"fake1":objSettings.x,
				"fake2":objSettings.y,
				"fake3":objSettings.z,
				"fake4":objSettings.rotate,
				"fake5":objSettings.skewX,
				"fake6":objSettings.skewY,
				"fake7":objSettings.scale
			},{step:function(now,fx) {

				propNum = fx.prop.replace("fake","");

				(propNum == 1 && (x = fx.now)) || (propNum == 2 && (y = fx.now)) || (propNum == 3 && (z = fx.now));
				(propNum < 4 && (translateLine = "translate" + (objSettings.z > 0 ? "3d" : "") + "(" + (x) + "px," + (y) + "px" + (objSettings.z > 0 ? "," + (z) + "px)" : ")")));
				(propNum == 4 && (rotate = fx.now) && ((objTransform.rotate[0] <= objSettings.rotate && rotate > objTransform.rotate[0]) || (objTransform.rotate[0] > objSettings.rotate && rotate <= objTransform.rotate[0])) && (rotateLine = "rotate(" + rotate + "deg)"));		 
				(propNum == 5 && (skewX = fx.now)) || (propNum == 6 && (skewY = fx.now));
				(propNum == (5 || 6) && (skewLine = "skew(" + skewX + "deg," + skewY + "deg)"));
				(propNum == 7 && (scale = fx.now) && ((objTransform.scale[0] <= objSettings.scale && scale > objTransform.scale[0]) || (objTransform.scale[0] > objSettings.scale && scale <= objTransform.scale[0])) && (scaleLine = "scale(" + scale + ")"));

				$elem.css(vendorPrefix + "Transform",
					(translateLine || "") +  (rotateLine || "rotate(" + objTransform.rotate[0] + "deg)") + (skewLine || "") + (scaleLine || "scale(" + objTransform.scale[0] + ")"));
			},duration:parseInt(objSettings.duration),complete:function() {
					($.isFunction(objSettings.callback) && objSettings.callback.call(this));
				}
			});
		});
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