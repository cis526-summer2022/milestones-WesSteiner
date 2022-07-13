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
  var box_id = req.body.box_id;
  var request = req.body.request;
  var fulfilled = req.body.fulfilled;

  request = sanitizeHTML(request);

    var info = db.prepare("INSERT INTO REQUESTS (box_id, request, fulfilled) VALUES (?, ?, ?)").run(box_id, request, fulfilled);
    if(info.changes != 1) return serveError(req, res, 500, `Unable to insert ${box_id.name}, ${request}, ${fulfilled} into requests`);
    res.writeHead(302, {"Location": `posts/${info.lastInsertRowid}`}).end(); 
}

module.exports = createRequest;