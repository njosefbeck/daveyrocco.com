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

	centeredTile.element.append('<div class="content-container">davey rocco</div>')
	centeredTile.element.append('<div class="info">Information<div class="close-info">X</div></div>');

	wall.center(centeredTile.col, centeredTile.row);

	jQuery('.content-container').on('click', showInfo);
	jQuery('.close-info').on('click', hideInfo);
	jQuery('.home').on('click', centerTiles);

	function showInfo() {
		jQuery('.info').addClass('show');
	}

	function hideInfo() {
		jQuery('.info').removeClass('show');
	}

	function centerTiles() {
		wall.center(centeredTile.col, centeredTile.row);
	}
});