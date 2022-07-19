const db = require('../database');
const templates = require('../templates');

function indexHtml(req, res) {
    var boxes = db.prepare("SELECT * FROM boxes ORDER BY id DESC").all();

    var title = "MHK Community Chest";

    var html = templates['index.html']({title: title, user: req.session.user});

    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Length", html.length);
    res.end(html); 
}

module.exports = indexHtml;