import './style.css'

import * as THREE from 'three';
import { ACESFilmicToneMapping } from 'three';
//import { WebGLBufferRenderer } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
//import { SVGRenderer } from './jsm/renderers/SVGRenderer.js';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );

const renderer = new THREE.WebGLRenderer({
  canvas : document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.setZ(30);

renderer.render( scene, camera );

const geometry = new THREE.TorusGeometry( 10, 1, 16, 100 );
const material = new THREE.MeshStandardMaterial({ color:0x5abec8 }); //000f64
//const material = new THREE.MeshBasicMaterial({ color:0xFF6347, wireframe: true });
const torusA = new THREE.Mesh( geometry, material );


const material2 = new THREE.MeshStandardMaterial({ color:0x000f64 }); //000f64
//const material = new THREE.MeshBasicMaterial({ color:0xFF6347, wireframe: true });
const torusB = new THREE.Mesh( geometry, material2 );

scene.add(torusA, torusB);
torusB.position.set(1, 1, 0);

const pointLight = new THREE.PointLight(0xFFFFFF);
pointLight.position.set(20,20,20);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);

//const gridHelper = new THREE.gridHelper( 200, 50 );
//scene.add(gridHelper);
const controls = new OrbitControls(camera, renderer.domElement);


function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 10, 10);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(1000));

  star.position.set(x, y, z);
  scene.add(star);
}

Array(10000).fill().forEach(addStar);

//const spaceTexture = new THREE.TextureLoader().load('BluePlanet.svg');
//scene.background = spaceTexture;

const universoTexture = new THREE.TextureLoader().load('code/vite-project/assets/universo.svg');

const universo = new THREE.Mesh(
  //new THREE.SphereGeometry(5, 10, 10),
  new THREE.BoxGeometry( 8, 4, 0.01),
  new THREE.MeshBasicMaterial( { map: universoTexture } )
);

scene.add(universo);

//const loader = new THREE.ImageLoader();

// load a image resource
//loader.load(
	// resource URL
//	'universo.png',

	// onLoad callback
//	function ( image ) {
		// use the image, e.g. draw part of it on a canvas
//		const canvas2 = document.createElement( 'canvas' );
//		const context = canvas2.getContext( '2d' );
//		context.drawImage( image, 100, 100 );
//    scene.add( context.scene);
//	},
//  	// onProgress callback currently not supported
//	undefined,

	// onError callback
//	function () {
//		console.error( 'An error happened.' );
//	}
//);
 

const loader = new GLTFLoader();

loader.load( 'assets/universo3d.glb', function ( glb ) {
  glb.scene.scale.set(0.04, 0.04, 0.04); 
  glb.scene.rotation.x += 3.14/2;
  
  //glb.scene.t( { map: universoTexture } )
 
	//scene.add( glb.scene );

}, undefined, function ( error ) {

	console.error( error );

} );

function animate() {
  requestAnimationFrame( animate );

  torusA.rotation.x += 0.01;
  torusA.rotation.y += 0.01;
  torusA.rotation.z += 0.01;

  torusB.rotation.x += 0.005;
  torusB.rotation.y += 0.005;
  torusB.rotation.z += 0.005;

  controls.update();
  scene.updateMatrix();
  renderer.render( scene, camera );

}

animate();
