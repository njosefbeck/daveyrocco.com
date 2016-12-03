import jQuery from 'jquery';
import '../libs/jquery.pep.js';
import '../libs/jquery.infinitedrag.js';

jQuery(document).ready(() => {
	'use strict';

	const centeredTile = {};
	const documentWidth = document.documentElement.clientWidth;
	const documentHeight = document.documentElement.clientHeight;
	const homeInfo = `<div class="content-container"></div>`;

	const moreInfo = `<div class="info">
		<div class="close-info">X</div>
		<p>This website is an ongoing collection of Davey Rocco’s latest work. All photographs are scans of black and white film negatives. He prints 8x10 silver gelatins using traditional methods.</p>
		<p>Davey Rocco is a cinematographer and photographer based in St. Louis, MO. He has worked on professional and commercial projects in Hollywood and has travelled the country running camera on commercials and personal projects. He has earned an MFA in Studio Art with an emphasis on Photography from Fontbonne University.</p>
		<p>He has since completed two feature films, one documentary, and one narrative. The Gray Seasons has shown in over a dozen film festivals and has gained national distribution through Amazon Prime and other platforms. Davey Rocco teaches film production at Webster University. He continues to strengthen and develop his visual storytelling language by working on video and photographic projects, both personal and commercial.</p>
		<nav>
		<ul>
			<li><a href="https://www.instagram.com/regardingphotography/" target="_blank">Instagram</a></li>
			<li><a href="http://graypicture.com/" target="_blank">Gray Picture</a></li>
			<li><a href="#" class="cv-press-link">cv/press</a></li> 
		</ul>
		</nav>
		</div>`;

	const CVPressInfo = `<div class="cv-press-info">
		<div class="close-cv-press-info">X</div>
		<h2>Exhibitions</h2>
		<ul class="exhibition-list">
			<li>
				<p class="year">2015</p>
				<ul>
					<li>
						<p class="exhibition-title">HEARTSTAR</p>
						<p class="exhibition-description">“Refocuses everyday living and makes you look. A collection of silver gelatin prints explores his relationship with his fiancee in a rhythmic exposure of light, texture, and composition.”</p>
						<p>Pearl Gallery, St. Louis, MO</p>
					</li>
					<li>
						<p class="exhibition-title">Untitled #1</p>
						<p class="exhibition-description">"Untitled # 1" is a group show of 5 artists including Giada Otten, Erica Popp, Ray Hummel, Albert Yowshien Kuo, and David Rocco. The show's primary emphasis is in photography and painting running for one week only.</p>
						<p>Fontbonne University, St. Louis, MO</p>
					</li>
				</ul>
			</li>
			<li>
				<p class="year">2014</p>
				<ul>
					<li>
						<p class="exhibition-title">Sheldon Art Galleries</p>
						<p>St. Louis @ 250, St. Louis, MO</p>
					</li>
					<li>
						<p class="exhibition-title">2nd Place photograph</p>
						<p>(Professional: Neighborhoods & Events)</p>
					</li>
					<li>
						<p class="exhibition-title">MFA Thesis Show</p>
						<p>Fontbonne University, St. Louis, MO</p>
					</li>
					<li>
						<p class="exhibition-title">Artists in Residence Exhibition</p>
						<p class="exhibition-description">Video installation documenting Ed Carroll & Vita Geluniene's The Economy of Gift & Community Culture: Making Effective Intersections.</p>
						<p>Craft Alliance, St. Louis, MO</p>
					</li>
					<li>
						<p class="exhibition-title">Featured Work "Black & White Photography by Davey Rocco</p>
						<p>shootingfilm.net</p>
					</li>
				</ul>
			</li>
			<li>
				<p class="year">2013</p>
				<ul>
					<li>
						<p class="exhibition-title">B & W: Mastering the Art of Photography</p>
						<p>Black Box Gallery, Portland, OR</p>
					</li>
					<li>
						<p class="exhibition-title">Art Saint Louis XXIX, The Exhibition</p>
						<p>Art St. Louis</p>
					</li>
					<li>
						<p class="exhibition-title">Camera Work: Contemporary Portraiture</p>
						<p>Black Box Gallery, Portland, OR</p>
					</li>
					<li>
						<p class="exhibition-title">RAW: Elevation</p>
						<p>2720 Cherokee St., St. Louis</p>
					</li>
					<li>
						<p class="exhibition-title">RAW: Marvel</p>
						<p>The Coliseum, St. Louis</p>
					</li>
				</ul>
			</li>
			<li>
				<p class="year">2012</p>
				<ul>
					<li>
						<p class="exhibition-title">Photography Contest</p>
						<p>Rochester Art House, Los Angeles, CA</p>
					</li>
					<li>
						<p class="exhibition-title">KHVT Art Show & Auction</p>
						<p>St. Louis</p>
					</li>
				</ul>
			</li>
			<li>
				<p class="year">2011</p>
				<ul>
					<li>
						<p class="exhibition-title">Abstract Art Showcase</p>
						<p>Rochester Art House, Los Angeles, CA</p>
					</li>
					<li>
						<p class="exhibition-title">Very Venice Art & Design</p>
						<p>Venice Beach, CA</p>
					</li>
				</ul>
			</li>
		</ul>
		<h2>Press</h2>
		<ul class="press-list">
			<li>
				<h4><a href="https://youtu.be/c_3tEzit-5M">Davey Rocco The Language of Photography</a></h4>
				<p>St. Louisan</p>
			</li>
			<li>
				<h4><a href="http://www.alivemag.com/magazines/sub_magazines_main.cfm?iID=86">20 Young Artists To Know</a></h4>
				<p>Alive Magazine</p>
				<p>page 42</p>
			</li>
			<li>
				<h4><a href="http://www.shootingfilm.net/2014/06/blackandwhitephotographybydavid.html">shootingfilm.net</a></h4>
			</li>
			<li>
				<h4><a href="http://kdhx.org/arts/visualandperformingarts/classof2014fivestlouisartgraduatestowatch">Class of 2014 Five St. Louis Artists to Watch</a></h4>
				<p>KDHX</p>
			</li>
			<li>
				<h4><a href="https://www.missouriartscouncil.org/graphics/assets/documents/854bbc337385.pdf">Missouri Arts Council “A Passion for Photos in Black and White”</a></h4>
			</li>
		</ul>
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
	
	const wall = jQuery.infinitedrag('#wall', { elementsWithInteraction: '.info, .content-container, .cv-press-info'}, {
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
	centeredTile.element.append(CVPressInfo);

	wall.center(centeredTile.col, centeredTile.row);

	jQuery('.content-container').on('click', openInfo);
	jQuery('.close-info').on('click', closeInfo);
	jQuery('.close-cv-press-info').on('click', hideCVPressInfo);
	jQuery('.home').on('click', centerTiles);
	jQuery('.cv-press-link').on('click', showCVPress);

	function openInfo() {
		jQuery('.info').addClass('show');
	}

	function closeInfo() {
		jQuery('.info').removeClass('show');
	}

	function showCVPress(e) {
		e.preventDefault();
		jQuery('.cv-press-info').addClass('show');
	}

	function hideCVPressInfo() {
		jQuery('.cv-press-info').removeClass('show');
	}

	function centerTiles() {
		wall.center(centeredTile.col, centeredTile.row);
	}
});