const templates = require('../templates');
const db = require('../database');

/** @function showPost 
 * Serves the specified post as a resonse.  The post id should be in req.params.id
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object 
 */
function newBox(req, res) {
  var newBoxHtml = templates['new-box.html']({user: req.session.user});
  var title = "New Box : Admin Only";

  var html = templates['layout.html']({request: newBoxHtml, list: "", form: "", title: title, user: req.session.user});

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}

module.exports = newBox;