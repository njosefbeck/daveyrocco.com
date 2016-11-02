import jQuery from 'jquery';
import '../libs/jquery.pep.js';
import '../libs/jquery.infinitedrag.js';

jQuery(document).ready(() => {
	'use strict';

	var centeredTile = {};
	var documentWidth = document.documentElement.clientWidth;
	var documentHeight = document.documentElement.clientHeight;

	let tileWidth = 750;
	let tileHeight = 495;

	if (documentWidth <= 750) {
		tileWidth = documentWidth - 10;
		tileHeight = ( 495 / 750 ) * tileWidth;
	}
	
	let count = 1;
	let numberOfImages = 55;
	const wall = jQuery.infinitedrag('#wall', { elementsWithInteraction: '.info, .get-info'}, {
		width: tileWidth,
		height: tileHeight,
		oncreate: function($element, col, row) {
			if(count > numberOfImages) {
				count = 1;
			}

			if (count === 1) {
				centeredTile.element = $element;
				centeredTile.col = col;
				centeredTile.row = row;
			}

			$element.css('background-image', 'url("images/' + count + '.jpg")');
			count++;
		}
	});

	centeredTile.element.append('<div class="content-container"><div class="content"><h1>davey rocco</h1><p class="get-info">get info</p></div></div>');
	centeredTile.element.append('<div class="info"><div class="close-info">X</div><h2>Information</h2><p>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cras mattis consectetur purus sit amet fermentum. Donec id elit non mi porta gravida at eget metus.</p><p>Curabitur blandit tempus porttitor. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, <a href="#">a pharetra augue. Fusce dapibus,</a> tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Donec sed odio dui.</p><p>Curabitur blandit tempus porttitor. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, a pharetra augue. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Donec sed odio dui.</p><p>Curabitur blandit tempus porttitor. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, a pharetra augue. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Donec sed odio dui.</p><p>Curabitur blandit tempus porttitor. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, a pharetra augue. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Donec sed odio dui.</p><p>Curabitur blandit tempus porttitor. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, a pharetra augue. Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Donec sed odio dui.</p></div>');

	wall.center(centeredTile.col, centeredTile.row);

	jQuery('.get-info').on('click', showInfo);
	jQuery('.close-info').on('click', hideInfo);
	jQuery('.home').on('click', centerTiles);

	function showInfo() {
		jQuery('.info').addClass('show');
	}

	function hideInfo(e) {
		jQuery('.info').removeClass('show');
	}

	function centerTiles() {
		wall.center(centeredTile.col, centeredTile.row);
	}
});