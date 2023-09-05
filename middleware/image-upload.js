const multer = require("multer");
const uuid = require("uuid").v4;

const upload = multer({
storage: multer.diskStorage({
    destination: "product-data/images",
    filename: function(req,file,callback){
        callback(null,uuid() + "-" + file.originalname);//unique file name even for files with similar names and file extensions.
    }                                                       //uuid or similar package needed for unique id new files
})
});

const configuredMulterMiddleWare = upload.single("image");

module.exports = configuredMulterMiddleWare;//custom file config for multer is exported.