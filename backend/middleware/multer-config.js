const multer = require("multer");

// image extensions allowed
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
};

// Stores uploaded images in the root images folder and renames them
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    filename: (req, file, callback) => {
        // Replaces spaces with underscores in the original file name
        const name = file.originalname.split(" ").join("_");
        const extension = MIME_TYPES[file.mimetype];
        // Modify the file name to include the WebP extension and the book ID
        const fileName = req.body.bookId + "_" + Date.now() + "." + extension;
        callback(null, fileName);
    },
});

// file size limit of 2MB
module.exports = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
}).single("image");
