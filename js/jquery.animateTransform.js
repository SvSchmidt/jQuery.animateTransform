/******************************************
 * @PluginName      $.animate CSS3 Transform Hook
 *
 *
 * @author          Sven Schmidt
 * @Date            2014/04/26
 * @copyright       Copyright (c) 2014 Sven Schmidt
 * @license         Feel free to use!
 * @link            http://portfolio.lifesetter.de
 * @version         1.0.0 beta 1
 * @description     Use this plugin to animate objTransform3 transform-values (translate, translate3d, rotate, skew, scale)
 * @Usage           $(elem).animate({transform { rotate:...; },duration,callback);
 ******************************************/

(function($) {
	$.fx.step["transform"] = function(fx) {

		if(!fx.myInit) {
			fx.startTime = $.now();
			vendorPrefix = function(str) { return str.charAt(0).toUpperCase() + str.slice(1); }((Array.prototype.slice.call(window.getComputedStyle(document.documentElement,"")).join("").match(/-(moz|webkit|ms)-/) || (styles.OLink === "" && ["","o"]))[1]),
			$elem = $(fx.elem),x=0,y=0,z=0,rotate=0,skewX=0,skewY=0,scale=0,propNum=0,now = fx.startTime,
			objTransform = $.extend({},("    " + ($elem[0].style.WebkitTransform || $elem[0].style.MozTransform || $elem[0].style.OTransform || $elem[0].style.MSTransform || $elem[0].style.Transform || " ").replace(new RegExp("\\, ","g"),",")).split(" "),"rotate(0deg) scale(1) translate(0px,0px) skew(0deg,0deg)".replace(new RegExp("\\, ","g"),",").split(" "));	
		
			for(v in objTransform) if(objTransform[v]) objTransform[objTransform[v].match(/([a-zA-Z]{0,10})/)[0].replace("3d","")] = objTransform[v].match(/[^()\s]+(?=,|\))/g)[0].replace(new RegExp("deg","g"),"").replace(new RegExp("px","g"),"").split(",") || [0,0,0];
			
			fx.start = {
				scale:+objTransform.scale[0],
				rotate:+objTransform.rotate[0],
				skewX:+objTransform.skew[0],
				skewY:+objTransform.skew[1],
				x:+objTransform.translate[0],
				y:+objTransform.translate[1],
				z:+objTransform.translate[2]
			};
			
			fx.myInit = true;
		}
		
		now = $.now() - fx.startTime;
		divisor = (now / fx.options.duration).toFixed(2);
		rotateLine = "rotate(" + +(fx.start.rotate + ((fx.end.rotate - fx.start.rotate) * divisor)) + "deg)";
		scaleLine = "scale(" + +(fx.start.scale + ((fx.end.scale - fx.start.scale) * divisor)) + ")";
		
	/*	(translateLine = "translate" + (fx.end.z > 0 ? "3d" : "") + "(" + (
		(propNum < 4 && (translateLine = "translate" + (objSettings.z > 0 ? "3d" : "") + "(" + (x) + "px," + (y) + "px" + (objSettings.z > 0 ? "," + (z) + "px)" : ")")));
		(propNum == 4 && (rotate = fx.now) && ((objTransform.rotate[0] <= objSettings.rotate && rotate > objTransform.rotate[0]) || (objTransform.rotate[0] > objSettings.rotate && rotate <= objTransform.rotate[0])) && (rotateLine = "rotate(" + rotate + "deg)"));		 
		(propNum == 5 && (skewX = fx.now)) || (propNum == 6 && (skewY = fx.now));
		(propNum == (5 || 6) && (skewLine = "skew(" + skewX + "deg," + skewY + "deg)"));
		(propNum == 7 && (scale = fx.now) && ((objTransform.scale[0] <= objSettings.scale && scale > objTransform.scale[0]) || (objTransform.scale[0] > objSettings.scale && scale <= objTransform.scale[0])) && (scaleLine = "scale(" + scale + ")"));
*/
		$("#eins").css(vendorPrefix + "Transform",
			(scaleLine || "scale(" + fx.start.scale + ")") + (rotateLine || "rotate(" + fx.start.scale + ")deg"));
	}
})(jQuery);