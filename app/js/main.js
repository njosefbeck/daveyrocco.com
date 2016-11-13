import jQuery from 'jquery';
import '../libs/jquery.pep.js';
import '../libs/jquery.infinitedrag.js';

jQuery(document).ready(() => {
	'use strict';

	const centeredTile = {};
	const documentWidth = document.documentElement.clientWidth;
	const documentHeight = document.documentElement.clientHeight;
	const homeInfo = `<div class="content-container">
		<div class="content">
		<h1>davey rocco</h1>
		<p class="get-info">get info</p>
		</div>
		</div>`;

	const moreInfo = `<div class="info">
		<div class="close-info">X</div>
		<h2>Information</h2>
		<p>Fusce dapibus, tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Cras mattis consectetur purus sit amet fermentum. Donec id elit non mi porta gravida at eget metus.</p>
		<p>Curabitur blandit tempus porttitor. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Aenean eu leo quam. Pellentesque ornare sem lacinia quam venenatis vestibulum. Nulla vitae elit libero, <a href="#">a pharetra augue. Fusce dapibus,</a> tellus ac cursus commodo, tortor mauris condimentum nibh, ut fermentum massa justo sit amet risus. Maecenas sed diam eget risus varius blandit sit amet non magna. Donec sed odio dui.</p>
		</div>`;

	let tileWidth = 750;
	let tileHeight = 495;
	const originalRatio = tileHeight / tileWidth;
	let count = 1;
	let numberOfImages = 168;

	if (documentWidth <= tileWidth) {
		tileWidth = documentWidth - 10;
		tileHeight = ( originalRatio ) * tileWidth;
	}
	
	const wall = jQuery.infinitedrag('#wall', { elementsWithInteraction: '.info, .get-info'}, {
		width: tileWidth,
		height: tileHeight,
		cleaning_enabled: false,
		oncreate: ($element, col, row) => {
			if(count > numberOfImages) {
				count = 1;
			}

			if (count === 1) {
				centeredTile.element = $element;
				centeredTile.col = col;
				centeredTile.row = row;
			}

			$element.css('background-image', `url("images/${count}.jpg")`);
			count++;
		}
	});

	centeredTile.element.append(homeInfo);
	centeredTile.element.append(moreInfo);

	wall.center(centeredTile.col, centeredTile.row);

	jQuery('.get-info').on('click', showInfo);
	jQuery('.close-info').on('click', hideInfo);
	jQuery('.home').on('click', centerTiles);

	function showInfo() {
		jQuery('.info').addClass('show');
	}

	function hideInfo() {
		jQuery('.info').removeClass('show');
	}

	function centerTiles() {
		centeredTile.element.append(homeInfo);
		centeredTile.element.append(moreInfo);
		jQuery('.get-info').on('click', showInfo);
		jQuery('.close-info').on('click', hideInfo);
		wall.center(centeredTile.col, centeredTile.row);
	}
});