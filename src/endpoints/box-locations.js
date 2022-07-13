const db = require('../database');
const templates = require('../templates');

function boxLocations(req, res) {
    const id = parseInt(req.params.id, 10);
    var boxes = db.prepare("SELECT * FROM boxes").all();
    return boxes;
}

module.exports = boxLocations;