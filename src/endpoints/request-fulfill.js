const templates = require('../templates');
const db = require('../database');

/** @function showPost 
 * Serves the specified post as a resonse.  The post id should be in req.params.id
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object 
 */
function requestFulfill(req, res) {
  // TODO: Retreive the post and serve it as HTML
  const id = parseInt(req.params.request_id, 10);
  var request = db.prepare("SELECT * FROM requests WHERE id = ?").get(id);
  var fulfillHtml = templates['fulfill.html']({request: request, user: req.session.user});
  var title = request.box_id.name;

  var html = templates['layout.html']({request: fulfillHtml, list: "", form: "", title: title, user: req.session.user});

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}

module.exports = requestFulfill;