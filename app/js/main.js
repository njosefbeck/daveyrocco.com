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
		<p>This website is an ongoing collection of Davey Rocco’s latest work. All photographs are scans of black and white film negatives. He prints 8x10 silver gelatins using traditional methods.</p>
		<p>Davey Rocco is a cinematographer and photographer based in St. Louis, MO. He has worked on professional and commercial projects in Hollywood and has travelled the country running camera on commercials and personal projects. He has earned an MFA in Studio Art with an emphasis on Photography from Fontbonne University.</p>
		<p>He has since completed two feature films, one documentary, and one narrative. The Gray Seasons has shown in over a dozen film festivals and has gained national distribution through Amazon Prime and other platforms. Davey Rocco teaches film production at Webster University. He continues to strengthen and develop his visual storytelling language by working on video and photographic projects, both personal and commercial.</p>
		<nav>
		<ul>
			<li><a href="https://www.instagram.com/regardingphotography/" target="_blank">Instagram</a></li>
			<li><a href="http://graypicture.com/" target="_blank">Gray Picture</a></li>
			<li><a href="#">cv/press</a></li> 
		</ul>
		</nav>
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