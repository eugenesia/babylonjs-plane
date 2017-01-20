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
    // Nothing right now except rendering the scene.
    scene.render();
  });
}

