const templates = require('../templates');
const db = require('../database');

/** @function showPost 
 * Serves the specified post as a resonse.  The post id should be in req.params.id
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object 
 */
function editUser(req, res) {
  const id = parseInt(req.params.user_id, 10);
  var user = db.prepare("SELECT * FROM users WHERE id = ?").get(id);
  var editUserHtml = templates['edit-user.html']({user: user});
  var title = "Edit User : Admin Only";

  var html = templates['layout.html']({request: editUserHtml, list: "", form: "", title: title, user: req.session.user});

  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}

module.exports = editUser;