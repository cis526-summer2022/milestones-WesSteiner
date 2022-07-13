const db = require('../database');
const templates = require('../templates');

/** @function homepage
 * Serves the home page 
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */
function serveHomepage(req, res) {
  // Get the newest request in the database
    var requests = db.prepare("SELECT * FROM requests ORDER BY box_id DESC").all();
    var request = requests[0];
  // Generate the request HTML
  var requestHtml = templates['request.html'](request);
  var listHtml = templates['request-list.html']( {requests: requests} );
  var id = request.id;
  var html = templates['layout.html']({request: requestHtml, list: listHtml, title: id});
  
  // Serve the HTML
  res.setHeader('Content-Type', "text/html");
  res.setHeader('Content-Length', html.length);
  res.end(html);
}

module.exports = serveHomepage;