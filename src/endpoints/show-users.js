const templates = require('../templates');
const db = require('../database');

/** @function showPost 
 * Serves the specified post as a resonse.  The post id should be in req.params.id
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object 
 */
function showUser(req, res) {
    var users = db.prepare("SELECT * FROM users").all();
    
    var userHtml = templates['users.html']({users:users});
    var title = "Users Information : Admin Only";
    var html = templates['layout.html']({request: userHtml, list: "", form: "", title: title, user: req.session.user});

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Length", html.length);
    res.end(html);
}

module.exports = showUser;