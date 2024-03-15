const sharp = require("sharp");
const fs = require("fs");

module.exports = async (req, res, next) => {
    if (!req.file) return next();

    try {
        await sharp(req.file.path)
            .webp({ quality: 80 })
            .toFile(`${req.file.path.split(".")[0]}.webp`, (err) => {
                if (err) {
                    return res.status(500).json({ error: "Impossible de convertir l'image en format WebP" });
                }

                // Supprimer l'image originale
                fs.unlink(req.file.path, (error) => {
                    if (error) {
                        console.log(error);
                    }
                    req.file.path = `${req.file.path.split(".")[0]}.webp`;
                    next();
                });
            });
    } catch (error) {
        res.status(500).json({ error: "Impossible d'optimiser l'image" });
    }
};
