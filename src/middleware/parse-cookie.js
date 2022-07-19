/** @function parseCookie 
 * Loads and parses the cookie, attaching it as a Javascript object
 * to the `req` parameter
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object 
 * @param {function} next - a callback to trigger after the body has loaded
 */
function parseCookie(req, res, next) {
  // TODO parse cookie
    req.cookies = {};
    var cookieString = req.headers.cookie;
    var pairStrings = cookieString.split(";");

    pairStrings.forEach(function(pairString) {
    var pair = pairString.split("=");
    var key = pair[0].trim();
    var value = pair[1].trim();
    req.cookies[key] = value;
})

  next();
}

module.exports = parseCookie;