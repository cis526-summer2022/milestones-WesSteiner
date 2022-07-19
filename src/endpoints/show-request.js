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
    var requests = db.prepare("SELECT * FROM requests WHERE box_id = ?").all(id);
    var box = db.prepare("SELECT * FROM boxes WHERE id = ?").get(id);
    var request = requests[0];

    var requestHtml = templates['request.html'](box);
    var listHtml = templates['request-list.html']({requests: requests});
    var newHtml = templates['new-request.html']({box: box, user: req.session.user});
    var title = box.name;
    var html = templates['layout.html']({request: requestHtml, list: listHtml, form: newHtml, title: title, user: req.session.user});

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Length", html.length);
    res.end(html);
}

module.exports = showRequest;