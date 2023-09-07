const multer = require("multer");
const path = require("path")

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "./");
    },
    filename: (req,file, cb) =>{
        const date = Date.now();
        console.log(file, file.fieldname +""+ date + path.extname(file.originalname));
        cb(null, file.fieldname + "" + date + path.extname(file.originalname));
    }
});

const csvUpload = multer({
    storage: storage,
    limits:{
        fileSize: 5000000 // 5000000 Bytes = 5 MB
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(csv)$/)) {
            // upload only png and jpg format
            return cb(new Error("Please upload the valid file type"));
        }
        cb(null, true);
    },
});

module.exports = csvUpload;