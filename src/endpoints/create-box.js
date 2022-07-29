const db = require('../database');
const sanitizeHTML = require('sanitize-html');

/** @function createPost()
 * Creates a new post using the supplied form data.
 * Form data should be attached to req.body
 * @param {http.IncomingMessage} req - the request object
 * @param {http.ServerResponse} res - the reponse object
 */
function createBox(req, res) {
  var name = req.body.name;
  var lat = req.body.lat;
  var lng = req.body.lng; 

  name = sanitizeHTML(name);
  lat = sanitizeHTML(lat);
  lng = sanitizeHTML(lng);

    var info = db.prepare("INSERT INTO BOXES (name, lat, lng) VALUES (?, ?, ?)").run(name, lat, lng);
    var boxes = db.prepare("SELECT * FROM boxes WHERE name = ?").all(name);
    var box = boxes[0];
    var id = box.id;

    if(info.changes != 1) return serveError(req, res, 500, `Unable to insert ${name}`);
    res.writeHead(302, {"Location": `/box-details/`+id}).end();
}

module.exports = createBox;