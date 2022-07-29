const db = require('../database');
const sanitizeHTML = require('sanitize-html');

/** @function createPost()
 * Creates a new post using the supplied form data.
 * Form data should be attached to req.body
 * @param {http.IncomingMessage} req - the request object
 * @param {http.ServerResponse} res - the reponse object
 */
function createRequest(req, res) {
  // TODO: Create a post and send a response
  const id = parseInt(req.params.id, 10);
  var box = db.prepare("SELECT * FROM boxes WHERE id = ?").get(id);
  var box_id = box.id;
  var request = req.body.request;
  var fulfilled = 0;

  request = sanitizeHTML(request);

    var info = db.prepare("INSERT INTO REQUESTS (box_id, user_id, request, fulfilled) VALUES (?, ?, ?, ?)").run(box_id, req.session.user.id, request, fulfilled);

    if(info.changes != 1) return serveError(req, res, 500, `Unable to insert ${box_id}, ${request}, ${fulfilled} into requests`);
    res.writeHead(302, {"Location": `.`}).end();
}

module.exports = createRequest;