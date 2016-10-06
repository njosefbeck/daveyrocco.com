import jQuery from 'jquery';
import '../libs/jquery.pep.js';
import '../libs/jquery.infinitedrag.js';

jQuery(document).ready(() => {
	'use strict';
	var tileWidth = document.documentElement.clientWidth - 20;
	var tileHeight = document.documentElement.clientHeight;
	var count = 1;
	var numberOfImages = 55;
	var wall = jQuery.infinitedrag('#wall', {}, {
		width: tileWidth,
		height: tileHeight,
		range_col: [0,10],
		range_row: [0, 10],
		oncreate: function($element, col, row) {
			if(count > numberOfImages) {
				count = 1;
			}

			$element.css('background-image', 'url("images/' + count + '.jpg")');
			count++;
		}
	});

	wall.center(4, 5);
});