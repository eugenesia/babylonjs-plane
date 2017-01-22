/**
 * A mesh representing the player's ship.
 * @param size The ship size.
 * @param scene The scene where the ship will be created.
 * @constructor
 */
var Ship = function(size, scene) {
  // Call the super class Babylon.Mesh
  BABYLON.Mesh.call(this, "ship", scene);
  // Creates a box representing the ship.
  var vd = BABYLON.VertexData.CreateBox(size);
  // Apply the box shape to our mesh.
  vd.applyToMesh(this, false);

  // Our ship is all fresh (for now).
  this.killed = false;
  // It has 3 bullets to destroy buildings.
  this.ammo = 3;

  // Its position is (0,0) and a little above the ground.
  this.position.x = 0;
  this.position.z = 0;
  this.position.y = size/2;

  // Movement attributes.
  this.speed = 3;
  this.moveLeft = false;
  this.moveRight = false;
}

// Our object is a BABYLON.Mesh
Ship.prototype = Object.create(BABYLON.Mesh.prototype);
// And its contructor is the Ship function described above.
Ship.prototype.constructor = Ship;

