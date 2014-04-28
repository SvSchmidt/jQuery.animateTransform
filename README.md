# jQuery.animateTransform ($.animate-Hook)

## Problem

You cannot simply do something like

```javascript
$("img").animate({
    "WebkitTransform":"rotate(90deg)",
    "MozTransform":"rotate(90deg)",
    "Transform":"rotate(90deg)"
},1000);
```
At the moment, jQuery is not able to animate CSS3 Transform Values like rotate, translate, scale.

### Solution
Use jQuery.animateTransform.js to animate CSS3 Transform-Values (translate, translate3d, rotate, skew, scale). 
The Plugin is an extension for jQuery's animate-function, hooking into $.fx.step to animate the CSS3 Transform-values. That means there's no need for using an own function with an own syntax. Just animate them the way you learned it.

### Example

```javascript
$("img").animate({
    "Something":somevalue,
    "transform": {
        rotate:90,
        scale:1.5,
        et cetera
    }
},1000);
```

### Demo
Visit [my demo page](http://projekte.lifesetter.de/jquery.animateTransform/) for a detailed documentation and an interactive testing-tool.
 
