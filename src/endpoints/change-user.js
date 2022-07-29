const db = require('../database');
const sanitizeHTML = require('sanitize-html');

/** @function createPost()
 * Creates a new post using the supplied form data.
 * Form data should be attached to req.body
 * @param {http.IncomingMessage} req - the request object
 * @param {http.ServerResponse} res - the reponse object
 */
function changeUser(req, res) {
  const id = parseInt(req.params.user_id, 10);

  var username = req.body.username;
  username = sanitizeHTML(username);

  var email = req.body.email;
  email = sanitizeHTML(email);

  var admin = req.body.admin;
  admin = sanitizeHTML(admin);

  //if(fulfill != "I have fulfilled the request")res.writeHead(302, {"Location": `.`}).end();

  var info = db.prepare("UPDATE users SET username = ?, email = ?, admin = ? WHERE id = ?").run(username, email, admin, id);

  if(info.changes != 1) return serveError(req, res, 500, `Unable to do the thing`);
  res.writeHead(302, {"Location": `/users/`+id}).end();
}

module.exports = changeUser;