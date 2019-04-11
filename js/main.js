(function( $ ) {
   $(document).ready(() => {
			'use strict';

			const centeredTile = {};
			const documentWidth = document.documentElement.clientWidth;
			const documentHeight = document.documentElement.clientHeight;

			let tileWidth = 750;
			let tileHeight = 495;
			const originalRatio = tileHeight / tileWidth;
			let count = 1;
			const numberOfImages = 426;

			const wall = $.infinitedrag('#wall', {}, {
				width: documentWidth <= tileWidth ? documentWidth - 10 : tileWidth,
				height: documentWidth <= tileWidth ? originalRatio * tileWidth : tileHeight,
				cleaning_enabled: false,
				oncreate: ($element, col, row) => {
					if(count > numberOfImages) {
						count = 2;
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

			wall.center(centeredTile.col, centeredTile.row);
		});
})( jQuery );