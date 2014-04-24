jQuery.animateTransform
=======================

Use jQuery.animateTransform.js to animate CSS3 Transform-Values (translate, translate3d, rotate, skew, scale). 
The Plugin offers different settings (for the appropiate values, the duration) and also the possibility to add a callback.

For a more liquid respectively more beautiful experience it does not animate from the beginning each time but starts at
the given values. That means:
If your element is translated (100px,200px) and rotated (90deg) and you wish to rotate it further 90deg,
the Plugin won't animate from 0deg to 180deg but from 90deg to 180deg while keeping the translate-values.

Of course the plugin supports jQuery-characteristic function-chaining ($(elem).animateTransform(settings).css()...).

Visit http://projekte.lifesetter.de/jquery.animateTransform/ for a documentation and an interactive testing-tool.
