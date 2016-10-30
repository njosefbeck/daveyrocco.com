import jQuery from 'jquery';
import '../libs/jquery.pep.js';
import '../libs/jquery.infinitedrag.js';

jQuery(document).ready(() => {
	'use strict';

	var centeredTile = {};
	//var tileWidth = document.documentElement.clientWidth - 20;
	let tileWidth = 640;
	//var tileHeight = document.documentElement.clientHeight;
	let tileHeight = 480;
	let count = 1;
	let numberOfImages = 55;
	const wall = jQuery.infinitedrag('#wall', {}, {
		width: tileWidth,
		height: tileHeight,
		//range_col: [0,10],
		//range_row: [0, 10],
		oncreate: function($element, col, row) {
			if(count > numberOfImages) {
				count = 1;
			}

			if (count === 10) {
				centeredTile.element = $element;
				centeredTile.col = col;
				centeredTile.row = row;
			}

			$element.css('background-image', 'url("images/' + count + '.jpg")');
			count++;
		}
	});

	wall.center(centeredTile.col, centeredTile.row);

	jQuery('.home').on('click', centerTiles);

	function centerTiles() {
		wall.center(centeredTile.col, centeredTile.row);
	}
});