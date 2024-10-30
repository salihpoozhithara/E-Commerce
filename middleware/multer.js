import multer from "multer";

// create storage configuaration
const storage = multer.diskStorage({
    filename: function(req,file,callback){
        callback(null,file.originalname)
    }
})

// using this diskstorage will create upload middleware
const upload =multer({storage}) 


export default upload