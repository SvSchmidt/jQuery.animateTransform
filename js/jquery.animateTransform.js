/******************************************
 * @PluginName      $.animate CSS3 Transform Hook
 *
 *
 * @author          Sven Schmidt
 * @Date            2014/04/28
 * @copyright       Copyright (c) 2014 Sven Schmidt
 * @license         Feel free to use!
 * @link            http://portfolio.lifesetter.de
 * @version         2.1.0 
 * @description     Use this plugin to animate CSS3 Transform values (translate, translate3d, rotate, skew, scale)
 * @Usage           $(elem).animate({
 *                      something:somevalue,
 *                      transform: { 
 *                           transform-Values 
 *                      }
 *                  },duration,callback);
 ******************************************/

(function($) {
	$.fx.step["transform"] = function(fx) {
		$elem = $(fx.elem);
		
		if(!fx.css3TransformInit) {
			fx.startTime = $.now();
			vendorPrefix = function(str) { return str.charAt(0).toUpperCase() + str.slice(1); }((Array.prototype.slice.call(window.getComputedStyle(document.documentElement,"")).join("").match(/-(moz|webkit|ms)-/) || (styles.OLink === "" && ["","o"]))[1]),
			objTransform = $.extend({},("    " + ($elem[0].style.WebkitTransform || $elem[0].style.MozTransform || $elem[0].style.OTransform || $elem[0].style.MSTransform || $elem[0].style.Transform || " ").replace(new RegExp("\\, ","g"),",")).split(" "),"rotate(0deg) scale(1) translate(0px,0px) skew(0deg,0deg)".replace(new RegExp("\\, ","g"),",").split(" "));	
		
			for(v in objTransform) if(objTransform[v]) objTransform[objTransform[v].match(/([a-zA-Z]{0,10})/)[0].replace("3d","")] = objTransform[v].match(/[^()\s]+(?=,|\))/g)[0].replace(new RegExp("deg","g"),"").replace(new RegExp("px","g"),"").split(",") || [0,0,0];
			
			fx.start = {
				scale:+objTransform.scale[0],
				rotate:+objTransform.rotate[0],
				skewX:+objTransform.skew[0],
				skewY:+objTransform.skew[1],
				x:+objTransform.translate[0],
				y:+objTransform.translate[1],
				z:+objTransform.translate[2] || 0
			};

			fx.css3TransformInit = true;
		}
		
		divisor = ((Math.round(($.now() - fx.startTime) / 100) * 100) / fx.options.duration).toFixed(3);
		fx.now = {
			"rotate":(+(fx.start.rotate + ((fx.end.rotate - fx.start.rotate) * divisor))),
			"scale":(+(fx.start.scale + ((fx.end.scale - fx.start.scale) * divisor))),
			"translate": {
				"bIs3d":(Math.abs(fx.end.z) != Math.abs(fx.start.z)),
				"x":(fx.end.x ? (+(fx.start.x + ((fx.end.x - fx.start.x) * divisor))) : fx.start.x),
				"y":(fx.end.y ? (+(fx.start.y + ((fx.end.y - fx.start.y) * divisor))) : fx.start.y),
				"z":(fx.end.z ? (+(fx.start.z + ((fx.end.z - fx.start.z) * divisor))) : fx.end.z)
			},
			"skew": {
				"x":(fx.end.skewX ? +(fx.start.skewX + ((fx.end.skewX - fx.start.skewX) * divisor)) : fx.start.skewX),
				"y":(fx.end.skewY ? +(fx.start.skewY + ((fx.end.skewY - fx.start.skewY) * divisor)) : fx.start.skewY)
			}
		
		}

		$elem.css(vendorPrefix + "Transform",
			("translate" + (fx.now.translate.bIs3d ? "3d" : "") + "(" + fx.now.translate.x + "px," + fx.now.translate.y + "px" + (fx.now.translate.bIs3d ? ("," + fx.now.translate.z + "px") : "") + ")") +
			("rotate(" + (fx.now.rotate) + "deg)") +
			("scale(" + (fx.now.scale) + ")") +
			("skew(" + (fx.now.skew.x) + "deg," + (fx.now.skew.y) + "deg)")
		)
	
	}
})(jQuery);