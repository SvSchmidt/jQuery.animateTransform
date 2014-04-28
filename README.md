jQuery.animateTransform ($.animate-Hook)
=======================

Use jQuery.animateTransform.js to animate CSS3 Transform-Values (translate, translate3d, rotate, skew, scale). 
The Plugin is an extension for jQuery's animate-function, hooking into $.fx.step to animate the CSS3 Transform-values.
That means you can simply do something like:

```javascript
$(elem).animate({
  something:somevalue,
  transform: {
    x:100,
    y:-200,
    rotate:90
  }},2000);
```

Visit [my demo page](http://projekte.lifesetter.de/jquery.animateTransform/) for a detailed documentation and an interactive testing-tool.
 
