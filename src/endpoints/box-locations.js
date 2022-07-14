const db = require('../database');
const templates = require('../templates');

function boxLocations(req, res) {
    var boxes = db.prepare("SELECT * FROM boxes ORDER BY id DESC").all();
    res.json(boxes);
}

module.exports = boxLocations;