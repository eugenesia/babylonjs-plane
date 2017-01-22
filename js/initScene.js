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

  // Generate a box in front of the ship every 0.1 seconds.
  setInterval(box, 100);
};


/**
 * Generate a random number. Stolen from the Babylon source code.
 */
var randomNumber = function (min, max) {
  if (min == max) {
    return (min);
  }
  var random = Math.random();
  return ((random * (max - min)) + min);
};


/**
 * Create a random box in front of the camera.
 */
var box = function () {
  var minZ = camera.position.z + 500;
  var maxZ = camera.position.z + 1500;
  var minX = camera.position.x - 100, maxX = camera.position.x + 100;
  var minSize = 2, maxSize = 10;

  var randomX, randomZ, randomSize;

  randomX = randomNumber(minX, maxX);
  randomZ = randomNumber(minZ, maxZ);
  randomSize = randomNumber(minSize, maxSize);

  var b = BABYLON.Mesh.CreateBox('bb', randomSize, scene);

  b.scaling.x = randomNumber(0.5, 1.5);
  b.scaling.y = randomNumber(4, 8);
  b.scaling.z = randomNumber(2, 3);

  b.position.x = randomX;
  b.position.y = b.scaling.y/2;
  b.position.z = randomZ;

  // Create a new ActionManager for our building in order to use Actions.
  b.actionManager = new BABYLON.ActionManager(scene);

  // The trigger is OnIntersectionEnterTrigger.
  var trigger = {
    // Kind of trigger used.
    trigger: BABYLON.ActionManager.OnIntersectionEnterTrigger,
    // Object this building will collide with - the ship.
    parameter: ship,
  };

  // Our first action.
  // Params: trigger, object to modify, attribute of object to modify.
  var sba = new BABYLON.SwitchBooleanAction(trigger, ship, 'killed');
  b.actionManager.registerAction(sba);


  // condition: ammo > 0
  var condition = new BABYLON.ValueCondition(b.actionManager, ship, 'ammo', 0,
    BABYLON.ValueCondition.IsGreater);

  // Destroy a building if user clicks on it.
  var onpickAction = new BABYLON.ExecuteCodeAction(
    BABYLON.ActionManager.OnPickTrigger,
    function (evt) {  
      if (evt.meshUnderPointer) {
        // Find the clicked mesh.
        var meshClicked = evt.meshUnderPointer;
        // Destroy it.
        meshClicked.dispose();
        // Reduce the number of ammo by one.
        ship.ammo -= 1;
        // Update the ammo label.
        ship.sendEvent();
      }
    },
    condition);

  b.actionManager.registerAction(onpickAction);
};

