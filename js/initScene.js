/**
 * Initialise the scene, etc.
 */
"use strict";

// Babylon engine.
var engine;
// Current scene.
var scene;
// HTML canvas.
var canvas;
// Camera, ship and ground will move.
var camera, ship, ground;

// Function onload() is called when DOM has been loaded.
document.addEventListener("DOMContentLoaded", function () {
  onload();
}, false);


/**
 * Onload function: creates Babylon engine and the scene.
 */
var onload = function () {
  // Engine creation.
  canvas = document.getElementById("renderCanvas");
  engine = new BABYLON.Engine(canvas, true);

  // Scene creation.
  initScene();

  // Render function.
  engine.runRenderLoop(function () {
    if (! ship.killed) {
      ship.move();

      // Move everything forward every frame.
      camera.position.z += ship.speed;
      ship.position.z += ship.speed;
      ground.position.z += ship.speed;
    }

    scene.render();
  });
}


/**
 * Initialise the scene.
 */
var initScene = function () {
  // Scene creation.
  scene = new BABYLON.Scene(engine);

  // Create camera.
  camera = new BABYLON.FreeCamera("Camera", new BABYLON.Vector3(0, 5, -30), scene);
  camera.setTarget(new BABYLON.Vector3(0, 0, 20));
  camera.maxZ = 1000;
  camera.speed = 4;

  // Hemispheric light to enlighten the scene.
  var h = new BABYLON.HemisphericLight("hemi", new BABYLON.Vector3(0, 0.5, 0), scene);
  h.intensity = 0.6;

  // Directional light to add some colours.
  var d = new BABYLON.DirectionalLight("dir", new BABYLON.Vector3(0, -0.5, 0.5), scene);
  d.position = new BABYLON.Vector3(0.1, 100, -100);
  d.intensity = 0.4;
  // Purple haze all around.
  d.diffuse = BABYLON.Color3.FromInts(204, 196, 255);

  // Ground.
  ground = BABYLON.Mesh.CreateGround("ground", 800, 2000, 2, scene);

  // Ship.
  ship = new Ship(1, scene);
};

