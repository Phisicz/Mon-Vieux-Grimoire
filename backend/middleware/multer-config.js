
const multer = require("multer");

// Extensions d'image autorisées
const MIME_TYPES = {
    "image/jpg": "jpg",
    "image/jpeg": "jpg",
    "image/png": "png",
    "image/webp": "webp",
};

// Stocke les images téléchargées dans le dossier racine 'images'
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "images");
    },
    filename: (req, file, callback) => {
        // Remplace les espaces par des underscores dans le nom de fichier original
        const name = file.originalname.split(" ").join("_").replace(/\.[^/.]+$/, "");
        const extension = MIME_TYPES[file.mimetype];

        let fileName;
        if (req.body.bookId) {
            // Modifie le nom du fichier pour inclure l'ID du livre
            fileName = req.body.bookId + "_" + name + "_" + Date.now() + "." + extension;
        } else {
            // Si bookId est indéfini, garde le nom de fichier original
            fileName = name + "_" + Date.now() + "." + extension;
        }

        callback(null, fileName);
    },
});

// Limite de taille de fichier de 2MB
module.exports = multer({
    storage: storage,
    limits: {
        fileSize: 2 * 1024 * 1024,
    },
}).single("image");
