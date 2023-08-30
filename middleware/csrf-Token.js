function addCsrf(req,res,next){
    res.locals.csrfToken = req.csrfToken();
    next();
}
module.exports = addCsrf;