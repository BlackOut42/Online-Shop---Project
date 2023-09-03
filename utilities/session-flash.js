function getSessionData(req) {
  const sessionData = req.session.flashedData;
  req.session.flashedData = null; // since I only need it for a single response I nullify it for the next response.
  return sessionData;
}
function flashDataToSession(req, data, action) {
  req.session.flashedData = data;
  req.session.save(action);
}
module.exports = {
  getSessionData: getSessionData,
  flashDataToSession: flashDataToSession,
};
