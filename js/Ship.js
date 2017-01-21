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

  // To be continued...
}

// Our object is a BABYLON.Mesh
Ship.prototype = Object.create(BABYLON.Mesh.prototype);
// And its contructor is the Ship function described above.
Ship.prototype.constructor = Ship;

