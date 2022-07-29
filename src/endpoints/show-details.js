const templates = require('../templates');
const db = require('../database');

/** @function showPost 
 * Serves the specified post as a resonse.  The post id should be in req.params.id
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object 
 */
function showDetails(req, res) {
    const id = parseInt(req.params.id, 10);
    var requests = db.prepare("SELECT * FROM requests WHERE box_id = ?").all(id);
    var box = db.prepare("SELECT * FROM boxes WHERE id = ?").get(id);

    var detsHtml = templates['details.html']({requests: requests});
    var html = templates['layout.html']({request: detsHtml, list: "", form: "", title: "", user: req.session.user});

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Length", html.length);
    res.end(html);
}

module.exports = showDetails;