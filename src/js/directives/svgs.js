export default {
    radial:
        `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" focusable="false" class="ripple-obj">
                <!-- Because of Firefox. -->
                <defs>
                    <radialGradient id="gradient" >
                        <stop offset="0" stop-color="white" />
                        <stop offset="0.25" stop-color="transparent" />
                        <stop offset="0.35" stop-color="white" />
                        <stop offset="0.50" stop-color="transparent" />
                        <stop offset="0.60" stop-color="white" />
                        <stop offset="0.85" stop-color="transparent" />
                        <stop offset="1" stop-color="white" />
                    </radialGradient>
                </defs>
				<circle id="ripple-shape" fill="url(#gradient)" cx="1" cy="1" r="1" opacity=".2" />
		    </svg>`,

    circle:
        `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" focusable="false" class="ripple-obj">
                <circle id="ripple-shape" cx="1" cy="1" r="1" />
             </svg>`,
    square:
        `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" focusable="false" class="ripple-obj">
		    <rect id="ripple-shape" width="5" height="5"/>
	     </svg>`,

    "gradient-square":
        `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" focusable="false" class="ripple-obj">
                <defs>
                    <linearGradient id="gradient" gradientTransform="rotate(0)">
                        <stop offset="0" stop-color="white" />
                        <stop offset="0.15" stop-color="transparent" />
                        <stop offset="0.2" stop-color="white" />
                        <stop offset="0.25" stop-color="transparent" />
                        <stop offset="0.3" stop-color="white" />
                        <stop offset="0.35" stop-color="transparent" />
                        <stop offset="0.4" stop-color="white" />
                        <stop offset="0.45" stop-color="transparent" />
                        <stop offset="0.5" stop-color="white" />
                        <stop o ffset="0.6" stop-color="transparent" />
                        <stop offset="0.65" stop-color="white" />
                        <stop offset="0.7" stop-color="transparent" />
                        <stop offset="0.75" stop-color="white" />
                        <stop offset="0.8" stop-color="transparent" />
                        <stop offset="0.85" stop-color="white" />
                        <stop offset="0.9" stop-color="transparent" />
                        <stop offset="0.95" stop-color="white" />
                        <stop offset="1" stop-color="transparent" />
                    </linearGradient>
                </defs>             
                <rect width="5" height="5" fill="url(#gradient)"  id="ripple-shape"/>
		</svg>`,

    "polygon":
        `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" focusable="false" class="ripple-obj">
				<g id="ripple-shape">
					<polygon points="5.6,77.4 0,29 39.1,0 83.8,19.3 89.4,67.7 50.3,96.7" />
					<polygon fill="rgba(255,255,255,0.35)" transform="scale(0.5), translate(50, 50)" points="5.6,77.4 0,29 39.1,0 83.8,19.3 89.4,67.7 50.3,96.7" />
					<polygon fill="rgba(255,255,255,0.25)" transform="scale(0.25), translate(145, 145)" points="5.6,77.4 0,29 39.1,0 83.8,19.3 89.4,67.7 50.3,96.7" />
				</g>
		</svg>`,

    "double-square":
        `<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" focusable="false" class="ripple-obj">
				<g id="ripple-shape">
					<rect width="5" height="5"/>
					<polygon fill="rgba(255,255,255,0.35)" transform="scale(0.5), translate(50, 50)" width="5" height="5" />
					<polygon fill="rgba(255,255,255,0.25)" transform="scale(0.25), translate(145, 145)" width="5" height="5"/>
				</g>
		</svg>`

}






