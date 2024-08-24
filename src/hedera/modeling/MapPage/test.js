

import * as THREE from "three";
import {GUI} from 'three/addons/libs/lil-gui.module.min.js';
import {OBJLoader} from "three/addons/loaders/OBJLoader.js";
import {Lensflare,LensflareElement} from "three/addons/objects/Lensflare.js";

/* = Discussion ==============================================================*/
// Show Orbit for Planets
// Note: Different Reference Systems for Objects and Orbits

/* = Inputs ==================================================================*/

let	mermax = 87.97;								// [DATA] Number of earth days to orbit Sun + 1
let	merday = 0;									// Starting day (0 = North)
let	venmax = 224.7;								// [DATA] Number of earth days to orbit Sun
let	venday = 0;									// Starting day (0 = North)
let	earmax = 365.25;								// [DATA] Number of earth days to orbit Sun
let	earday = 0;									// Starting day (0 = North)
let	marmax = 686.98;							// [DATA] Number of earth days to orbit Sun
let	marday = 0;									// Starting day (0 = North)
let	addday = .5;

/* = Constants ===============================================================*/
// Math Predefined
let	PieVal = Math.PI;							// PI
let	DegRad = PieVal / 180;						// Convert Degrees to Radians
let	RadDeg = 180 / PieVal;						// Convert Radians to Degrees
// Mercury
let	meraxx = 7.006;								// Angle of orbit inclination (deg)
let	merasc = 228.34;								// Ascending Node (deg)
let	meraxy = Mod360(merasc+180);				// Venus orbit ymax (deg)
	meraxy = 0;
let	mersun = 35.9;								// Venus max distance from Sun
// Venus
let	venaxx = 3.395;								// Angle of orbit inclination (deg)
let	venasc = 76.67;								// Ascending Node (deg)
let	venaxy = Mod360(venasc+180);				// Venus orbit ymax (deg)
	venaxy = 0;
let	vensun = 67.7;								// Venus max distance from Sun
// Earth
let	earaxy = 0;
let	earsun = 94.5;								// Venus max distance from Sun
// Mars
let	maraxx = 1.85;								// [DATA] Angle of orbit inclination (deg)								
let	marasc = 49.71;								// [DATA] Ascending Node
let	maraxy = Mod360(marasc+180);				// Direction of max ymax (deg)
	maraxy = 0;
let	marsun = 154.9;								// Max Distance from Sun (km/5000)

/* = Variables ===============================================================*/
// Offsets
let	plndeg = 0;									// Rotation
let	plndst = 1;									// Distancce
// Data
let	merDAT = [Mod360(merorbDAT[merday]-meraxy),mersun*merdstDAT[merday]];
let	venDAT = [Mod360(venorbDAT[venday]-venaxy),vensun*vendstDAT[venday]];
let	earDAT = [Mod360(earorbDAT[earday]-earaxy),earsun*eardstDAT[earday]];
let	marDAT = [Mod360(marorbDAT[marday]-maraxy),marsun*mardstDAT[marday]];
// Objects
let	geometry, material, texture, specular, sprite, mesh;
// Camera
let	camdst = 210;								// Starting distance
let	camdmx = 1000;								// Max distance
let	camdmn = 50;								// Min distance
let	camlat = 5;
let	camlon = 90;								// Vernal Equinox
let	latmax = 85;
let	latmin = -85;
let	onPointerDownPointerX, onPointerDownPointerY, onPointerDownLon, onPointerDownLat;
// Output
let	XRote, YRote, ZRote;
let	XValu, YValu, ZValu;
// Flags
let	PawsOn = 0;
// Data
let	DAT00, DAT01, DAT02;

/* = Basic Values ===========================================================*/

// Display
let scene = new THREE.Scene();
	scene.background = new THREE.Color(0x000000);
let renderer = new THREE.WebGLRenderer({antialias: true});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth,window.innerHeight);
	document.body.appendChild(renderer.domElement);
// Lights
let	light = new THREE.PointLight(0xffffff);
	scene.add(light);
let	light2 = new THREE.AmbientLight(0xffffff, 0.25);
	scene.add(light2);
// Camera
let	camera = new THREE.PerspectiveCamera(45, window.innerWidth/window.innerHeight, 1, 125000);
	camera.rotation.order = "YXZ";
	camera.position.z = -camdst;
	camera.rotation.y = 180*DegRad;				// Default = looking in
let	camobj = new THREE.Object3D();				// Armature base - use to rotate camera
	camobj.rotation.order = "YXZ";
	camobj.add(camera);
// Inputs
	renderer.domElement.addEventListener("mousedown", onMouseDown, false);
	renderer.domElement.addEventListener("mouseup", onMouseUp, false);
	renderer.domElement.addEventListener("mousemove", onMouseMove, false);
	renderer.domElement.addEventListener('mousewheel', onMouseWheel, {capture: false, passive: false});
	renderer.domElement.addEventListener("touchstart", onTouchStart, false);
	renderer.domElement.addEventListener("touchmove", onTouchMove, false);
	renderer.domElement.addEventListener("touchend", onTouchEnd, false);
	window.addEventListener("resize", onWindowResize, false);
	let	isUserInteracting = false;					// Initial value
// Loading Manager
// Create a loading manager to set RESOURCES_LOADED when appropriate.
// Pass loadingManager to all resource loaders.
let	loadingManager = new THREE.LoadingManager();
let	RESOURCES_LOADED = false;
	loadingManager.onLoad = function(){
	console.log("loaded all resources");
	RESOURCES_LOADED = true;
};
let	loader = new THREE.TextureLoader(loadingManager);

/* 3D Objects and Links  --------------------------------------------------- */
// Sky
let	skyobj = new THREE.Object3D();
	scene.add(skyobj);
// Sun
let	sunpos = new THREE.Object3D();
	scene.add(sunpos);
	sunpos.add(camobj);
// Mercury - Axis
let	meraxe = new THREE.Object3D();				// Basic Object
	meraxe.rotation.order = "YXZ";
	scene.add(meraxe);
	meraxe.rotation.y = meraxy*DegRad;			// Max Alt
	meraxe.rotation.x = meraxx*DegRad;			// Pitch
let	merorb = 0;									// Orbit line
// Mercury - Objects
let	merrot = new THREE.Object3D();				// Rotation
	meraxe.add(merrot);
	merrot.rotation.y = merDAT[plndeg]*DegRad;	// Relative to North
let	merpos = new THREE.Object3D();				// Distance
	merrot.add(merpos);							// Lock to rotation
	merpos.position.z = -merDAT[plndst];		// Distance
// Venus - Axis
let	venaxe = new THREE.Object3D();				// Basic Object
	venaxe.rotation.order = "YXZ";
	scene.add(venaxe);
	venaxe.rotation.y = venaxy*DegRad;			// Max Alt
	venaxe.rotation.x = venaxx*DegRad;			// Pitch
let	venorb = 0;									// Orbit line
// Venus - Objects
let	venrot = new THREE.Object3D();				// Rotation
	venaxe.add(venrot);
	venrot.rotation.y = venDAT[plndeg]*DegRad;	// Relative to North
let	venpos = new THREE.Object3D();				// Distance
	venrot.add(venpos);							// Lock to rotation
	venpos.position.z = -venDAT[plndst];		// Distance
// Earth - Axis
let	earaxe = new THREE.Object3D();				// Basic Object
	earaxe.rotation.order = "YXZ";
	scene.add(earaxe);
let	earorb = 0;									// Orbit line
// Earth - Objects
let	earrot = new THREE.Object3D();				// Rotation
	earaxe.add(earrot);
	earrot.rotation.y = earDAT[plndeg]*DegRad;	// Relative to North
let	earpos = new THREE.Object3D();				// Distance
	earrot.add(earpos);							// Lock to rotation
	earpos.position.z = --earDAT[plndst];		// Distance
// Mars - Axis
let	maraxe = new THREE.Object3D();				// Axis
	maraxe.rotation.order = "YXZ";
	scene.add(maraxe);
	maraxe.rotation.y = maraxy*DegRad;			// Max Alt = 76.67
	maraxe.rotation.x = maraxx*DegRad;			// Pitch = 3.395
let	marorb = 0;									// Orbit line
// Mars - Objects
let	marrot = new THREE.Object3D();				// Rotation
	maraxe.add(marrot);
	marrot.rotation.y = marDAT[plndeg]*DegRad;	// Relative to North
let	marpos = new THREE.Object3D();				// Distance
	marrot.add(marpos);							// Lock to rotation
	marpos.position.z = -marDAT[plndst];		// Distance

/* Labels ------------------------------------------------------------------ */

let	labNAM = ["win","spr","sum","fall"];
let	labLON = [0,90,180,270];
let	labels = 0;

/* HTML Overlay Text ------------------------------------------------------- */
let	DAT_00Element = document.getElementById("DAT_00");
let	DAT_00Node = document.createTextNode("");
DAT_00Element.appendChild(DAT_00Node);
let	DAT_01Element = document.getElementById("DAT_01");
let	DAT_01Node = document.createTextNode("");
DAT_01Element.appendChild(DAT_01Node);
let	DAT_02Element = document.getElementById("DAT_02");
let	DAT_02Node = document.createTextNode("");
DAT_02Element.appendChild(DAT_02Node);


/* = Main Program ============================================================*/

	initAll();
	rendAll();

/* 1 Initialize ==============================================================*/

function initAll() {
	makeSkyBox();
	makeOrbits();
	makePlanet();
	makeLabels();
	moveCamera();
}

function makeSkyBox() {
	// SkySphere	
	geometry = new THREE.SphereGeometry(100000, 256, 256);
	material = new THREE.MeshBasicMaterial({
		map:loader.load("../3js/common/sky/box/milkyway/milkyway4k.jpg"),
		side: THREE.BackSide
	});
	material.map.colorSpace = THREE.SRGBColorSpace;	// ### r152	
	mesh = new THREE.Mesh(geometry, material);
	mesh.rotation.y = 177.2*DegRad;				// Point to correct star at vernal equinoz
	skyobj.add(mesh);
}

//= Make Orbits ================================================================
function makeOrbits() {
	make1Orbit(mermax,meraxy,mersun,merorbDAT,merdstDAT,merorb,meraxe);		// Mercury
	make1Orbit(venmax,venaxy,vensun,venorbDAT,vendstDAT,venorb,venaxe);		// Venus
	make1Orbit(earmax,earaxy,earsun,earorbDAT,eardstDAT,earorb,earaxe);		// Earth
	make1Orbit(marmax,maraxy,marsun,marorbDAT,mardstDAT,marorb,maraxe);		// Mars
}

function make1Orbit(xxxmax,xxxaxy,xxxsun,xxxorbDAT,xxxdstDAT,xxxorb,xxxaxe) {
// Must deal with right handed coordinate system.  Add 90 to rotation.  Reverse x, not z.
	let	r,d,x,z=0;
	let	positions = [];
//	positions.push(0, 0, 0);					// Start at 0,0
	for (let	i = 0; i <= xxxmax+1; i++) {
		r = Mod360(xxxorbDAT[i]-xxxaxy+90)*DegRad;
		d = xxxsun*xxxdstDAT[i];
		x = d*Math.cos(r);
		z = d*Math.sin(r);
		positions.push(x, 0, -z);
	}
	geometry = new THREE.BufferGeometry();
	geometry.setAttribute(
		'position',
		new THREE.BufferAttribute(new Float32Array(positions),3)
	);
	material = new THREE.LineBasicMaterial({
		color: 0xffffff							// White
	});
	xxxorb = new THREE.Line(geometry, material);
	xxxaxe.add(xxxorb);							// Link to Axis
}

//= Make Planets ===============================================================
function makePlanet() {
	makeSunObj();								// Sun
	makePlnObj(0.5,0xffffff,merpos,"../3js/common/textures/1_mercury_32.jpg");	// Mercury
	makePlnObj(1,0xcfffff,venpos,"../3js/common/textures/2_venus_32.jpg");		// Venus
	makePlnObj(1,0x00ffff,earpos,"../3js/common/textures/3_earth_32.jpg");		// Earth
	makePlnObj(1,0xff0000,marpos,"../3js/common/textures/4_mars_32.jpg");		// Mars
}

// Make Sun
function makeSunObj() {
	geometry = new THREE.SphereGeometry(3, 16, 16);
	material = new THREE.MeshBasicMaterial({color: 0xffff00});
	mesh = new THREE.Mesh(geometry, material);
//	sunpos.add(mesh);
	// Lens Flare - Load Textures
	let	texture0 = loader.load("../3js/common/sky/fx/lensflare1.png");
	let	texture1 = loader.load("../3js/common/sky/fx/hexangle.png");
	// Lens Flare - Activate
	let	lensFlare = new Lensflare();
	lensFlare.addElement(new LensflareElement(texture0, 512, 0));
	lensFlare.addElement(new LensflareElement(texture1, 32, 0.2));
	lensFlare.addElement(new LensflareElement(texture1, 64, 0.5));
	lensFlare.addElement(new LensflareElement(texture1, 256, 0.9));
	light.add(lensFlare);
}

// Make Planet
function makePlnObj(xxxsize,xxxcolor,xxxpos,fname) {
	geometry = new THREE.SphereGeometry(xxxsize, 16, 16);
	texture = loader.load(fname);
	material = new THREE.MeshPhongMaterial({
		map: texture,
		reflectivity: .5,
	});
	mesh = new THREE.Mesh(geometry, material);
	xxxpos.add(mesh);
}

/* Make Labels ==============================================================*/

function makeLabels() {
	labels = new THREE.Group();
	for (let	i = 0; i < 4; i ++) {
		texture = loader.load("../3js/common/textures/"+labNAM[i]+".png");
		material = new THREE.SpriteMaterial({
			map: texture, 
			transparent:true, 
			sizeAttenuation: false, 
			opacity:1			
		});
		material.encoding = THREE.sRGBEncoding;	// to counter gammaFactor lightening
		sprite = new THREE.Sprite(material);
		let	xr = 0;
		let	yr = Mod360(-labLON[i])*DegRad;
		let	yp = 90000 * Math.sin(xr);
		let	z = 90000 * Math.cos(xr);
		let	zp = z * Math.sin(yr);
		let	xp = z * Math.cos(yr);
		sprite.rotation.order = "YXZ";
		sprite.position.set(xp,yp,zp);
		sprite.scale.set(.08,.04,.04);
		labels.add(sprite);
	}
	labels.rotation.y = 90*DegRad;
	scene.add(labels);
}

/* 2 Render ==================================================================*/

function rendAll() {
	requestAnimationFrame(rendAll);
	if (PawsOn == 0) {
		merday = rotePlanet(merrot,merday,mermax,merorbDAT,meraxy,merpos,merdstDAT,mersun,merDAT);		// Venus
		venday = rotePlanet(venrot,venday,venmax,venorbDAT,venaxy,venpos,vendstDAT,vensun,venDAT);		// Venus
		earday = rotePlanet(earrot,earday,earmax,earorbDAT,earaxy,earpos,eardstDAT,earsun,earDAT);		// Earth
		marday = rotePlanet(marrot,marday,marmax,marorbDAT,maraxy,marpos,mardstDAT,marsun,marDAT);		// Earth
	}	
	moveCamera();								// Camera Position
	DAT00 = earday;
	DAT01 = earDAT[plndeg];
	DAT02 = earDAT[plndst];
	showValues()
	renderer.render(scene, camera);				// Render
}

// Rotate Planet
function rotePlanet(xxxrot,xxxday,xxxmax,xxxorbDAT,xxxaxy,xxxpos,xxxdstDAT,xxxsun,xxxDAT) {
// Note - this does not save values
	let	int, frx, bas, int2, dif = 0;
	xxxday = xxxday + addday;					// Degrees from North
	if (xxxday>=xxxmax) xxxday = xxxday-xxxmax;	// venmax => 0
	int = Math.trunc(xxxday);					// index
	frx = xxxday-int;							// fraction of day
	bas = xxxorbDAT[int];						// integer of day (0 to venmax-1)
	int2 = int+1;
	dif = xxxorbDAT[int2]-bas;
	if (int == xxxmax) dif = 360 - bas;
	xxxDAT[plndeg] = Mod360(bas+frx*dif-xxxaxy);	// Interpolate
	xxxrot.rotation.y = xxxDAT[plndeg]*DegRad;	// Relative to North
	xxxDAT[plndst] = xxxsun*xxxdstDAT[int];		// Distance
	xxxpos.position.z = -xxxDAT[plndst];
return xxxday;}

/* Move Camera ==============================================================*/

function moveCamera() {
	camera.position.z = -camdst;
	camobj.rotation.x = Mod360(camlat) * DegRad;
	camobj.rotation.y = Mod360(camlon+180)*DegRad;
}

/* 4 Misc Subroutines =======================================================*/

/* Converts degrees to 360 */
function Mod360(deg) {
	if (deg < 0) deg = deg + 360;
	else if (deg == 360 || deg > 360) deg = deg - 360;
return deg;}

/* 5 Output ==================================================================*/

// Change HUD Values
function showValues() {
	DAT_00Node.nodeValue = DAT00.toFixed(2);
	DAT_01Node.nodeValue = DAT01.toFixed(2);
	DAT_02Node.nodeValue = DAT02.toFixed(2);
}

/* 6 Inputs ================================================================ */

function onMouseDown(event) {
	event.preventDefault();
	isUserInteracting = true;
	onPointerDownPointerX = event.clientX;
	onPointerDownPointerY = event.clientY;
	onPointerDownLon = camlon;
	onPointerDownLat = camlat;
}

function onMouseUp(event) {
	isUserInteracting = false;
}

function onMouseMove(event) {
	if (isUserInteracting === true) {
		camlon = (onPointerDownPointerX - event.clientX) * 0.2 + onPointerDownLon;
		camlon = Mod360(camlon);
		camlat = (event.clientY - onPointerDownPointerY) * 0.2 + onPointerDownLat;
		camlat = Math.max(latmin, Math.min(latmax, camlat));
	}
}

function onMouseWheel(event) {
	camdst = camdst + event.deltaY * 0.025;
	camdst = Math.max(camdmn, Math.min(camdmx, camdst));
}

function onTouchStart(event) {
	// Single Touch
	if (event.touches.length == 1) {
		event.preventDefault();
		onPointerDownPointerX = event.touches[0].clientX;
		onPointerDownPointerY = event.touches[0].clientY;
		onPointerDownLon = camlon;
		onPointerDownLat = camlat;
	}
	// Dual Touch
	if (event.touches.length == 2) {
		_state = STATE.TOUCH_ZOOM_PAN;
		let	dx = event.touches[0].clientX - event.touches[1].clientX;
		let	dy = event.touches[0].clientY - event.touches[1].clientY;
		_touchZoomDistanceEnd = _touchZoomDistanceStart = Math.sqrt( dx * dx + dy * dy );
    }
}

function onTouchMove(event) {
	// Single Touch
	if (event.touches.length == 1) {
		event.preventDefault();
		camlon = (onPointerDownPointerX - event.touches[0].clientX) * 0.2 + onPointerDownLon;
		camlon = Mod360(camlon);
		camlat = (event.touches[0].clientY - onPointerDownPointerY) * 0.2 + onPointerDownLat;
		camlat = Math.max(latmin, Math.min(latmax, camlat));
	}
	// Dual Touch
	if (event.touches.length == 2) {
		let	dx = event.touches[0].clientX - event.touches[1].clientX;
		let	dy = event.touches[0].clientY - event.touches[1].clientY;
		_touchZoomDistanceEnd = Math.sqrt(dx*dx+dy*dy);	
		camdst = camdst + (_touchZoomDistanceEnd-_touchZoomDistanceStart) * 0.05;
		camdst = Math.max(camdmn, Math.min(camdmx, camdst));
		_touchZoomDistanceStart = _touchZoomDistanceEnd;
    }
}

function onTouchEnd(event) {
	_touchZoomDistanceStart = _touchZoomDistanceEnd = 0;
}

// Toggle Pause
function togglePause() {
    if (PawsOn == 0) PawsOn = 1;
    else PawsOn = 0;
}

function onWindowResize() {
	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();
	renderer.setSize( window.innerWidth, window.innerHeight );
}

