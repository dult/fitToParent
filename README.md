# fitToParent
A JS Library to make elements scale up and down to their parent, while keeping aspect-ratio


A simple library to make divs fit their parents.

This can be useful when making a dom based game, interactive screen or poster.
Basically anything where element must have a fixed posiion relative to set box.

The child element must have a set (px, em, rem) width and height, and its parent must have position: relative.
Now you can place any child inside that child element with position: absolute an px top and left.
You can also place or hide elements outside this elements with overflow: visible or hidden
The child element will have its transform and scale css properties used.

To use, call fitToParent.set( element, round, cap ). You can use IDs or Classes.
element is a querySelectorAll selector (required).
round can be 'no' (default), 'optimal' and pixel (optional).
		'no' there is not rounding at all, in chromium based browser there may be some blurring.
		'optimal' will round down to a decimal case, this fixes the blurriness in chromium based browsers, while adding a margin.
		'pixel' will round down to the nearest integer, if < 1, it will round to 0.5.
cap can be 'no' (default) or 'yes' (optional).
		'no' there's no limit.
		'yes', scalling will be capped to 1.