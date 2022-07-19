/** @function loadCookieSession 
 * Loads a session from the `session` cookie
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object 
 * @param {function} next - a callback to trigger after the body has loaded
 */
function loadCookieSession(req, res, next) {
  // TODO load cookie session
    var sessionCookie = req.cookies.session;
    var sessionJSON = decodeURIComponent(sessionCookie);
    var session = JSON.parse(sessionJSON);
    req.session = session;
    next();
}

module.exports = loadCookieSession;