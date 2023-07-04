/*
 * A simple library to make divs fit their parents.
 * 
 * This can be useful when making a dom based game, interactive screen or poster.
 * Basically anything where element must have a fixed posiion relative to set box.
 * 
 * The child element must have a set (px, em, rem) width and height, and its parent must have position: relative.
 * Now you can place any child inside that child element with position: absolute an px top and left.
 * You can also place or hide elements outside this elements with overflow: visible or hidden
 * The child element will have its transform and scale css properties used.
 * 
 * To use, call fitToParent.set( element, round, cap ). You can use IDs or Classes.
 * element is a querySelectorAll selector (required).
 * round can be 'no' (default), 'optimal' and pixel (optional).
 * 		'no' there is not rounding at all, in chromium based browser there may be some blurring.
 * 		'optimal' will round down to a decimal case, this fixes the blurriness in chromium based browsers, while adding a margin.
 * 		'pixel' will round down to the nearest integer, if < 1, it will round to 0.5.
 * cap can be 'no' (default) or 'yes' (optional).
 * 		'no' there's no limit.
 * 		'yes', scalling will be capped to 1.
 * 
 * 
 * 
 */
  
  
const fitToParent = {
	fit( child ) {
		let c = {
			w: parseInt( child.offsetWidth ),
			h: parseInt( child.offsetHeight )
		}

		let parent = child.parentElement;
		let p = {
			w: parseInt( parent.offsetWidth ),
			h: parseInt( parent.offsetHeight )
		}

		let round = child.getAttribute( 'data-fit-to-parent-round' );
		let cap = child.getAttribute( 'data-fit-to-parent-capped' );

		let ratioX = p.w / c.w;
		let ratioY = p.h / c.h;

		let ratio = ratioX;

		if ( ratioX > ratioY ) {
			ratio = ratioY;
		}

		if ( cap === 'yes' && ratio > 1 ) {
			ratio = 1;
		}

		if ( round === 'optimal' ) {
			ratio = Math.floor( ratio * 10 ) / 10;
		} else if ( round === 'pixel' ) {
			ratio = Math.floor( ratio );
			if ( ratio < 1 ) {
				ratio = 0.5;
			}
		}

		child.setAttribute( 'data-fit-to-parent-ratio', ratio );

		child.style[ 'scale' ] = ratio;
	},
	check() {
		let elements = document.querySelectorAll( '.fitToParent' );
		for ( let e = 0; e < elements.length; e++ ) {
			fitToParent.fit( elements[e] );
		}
	},
	set( element, rounding = 'no', capped = 'no' ) {
		let selected = document.querySelectorAll( element );
		for ( let s = 0; s < selected.length; s++ ) {
			selected[s].classList.add( 'fitToParent' );
			selected[s].setAttribute( 'data-fit-to-parent-round', rounding );
			selected[s].setAttribute( 'data-fit-to-parent-capped', capped );
		}
		fitToParent.check();
		window.addEventListener( 'resize', fitToParent.check );
		window.addEventListener( 'fullscreenchange', fitToParent.check );
	}
}