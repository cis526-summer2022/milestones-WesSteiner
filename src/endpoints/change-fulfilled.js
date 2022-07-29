const db = require('../database');
const sanitizeHTML = require('sanitize-html');

/** @function createPost()
 * Creates a new post using the supplied form data.
 * Form data should be attached to req.body
 * @param {http.IncomingMessage} req - the request object
 * @param {http.ServerResponse} res - the reponse object
 */
function changeFulfilled(req, res) {
  // TODO: Create a post and send a response
  const id = parseInt(req.params.request_id, 10);
  const box_id = parseInt(req.params.box_id, 10);

  var fulfill = req.body.fulfill;

  fulfill = sanitizeHTML(fulfill);

  if(fulfill != "I have fulfilled the request")res.writeHead(302, {"Location": `.`}).end();

  var info = db.prepare("UPDATE requests SET fulfilled = 1 WHERE id = ?").run(id);

  if(info.changes != 1) return serveError(req, res, 500, `Unable to do the thing`);
  res.writeHead(302, {"Location": `/box-details/`+box_id}).end();
}

module.exports = changeFulfilled;