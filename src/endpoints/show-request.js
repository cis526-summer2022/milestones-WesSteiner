const templates = require('../templates');
const db = require('../database');

/** @function showPost 
 * Serves the specified post as a resonse.  The post id should be in req.params.id
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object 
 */
function showRequest(req, res) {
  // TODO: Retreive the post and serve it as HTML
    const id = parseInt(req.params.id, 10);
    var box = db.prepare("SELECT * FROM boxes WHERE id = ?").get(id);
    var html = templates["layout.html"](box);
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Length", html.length);
    res.end(html);
}

module.exports = showRequest;