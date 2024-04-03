const sharp = require("sharp");
const fse = require('fs-extra'); // Utilisez fs-extra pour la suppression

// Désactive la mise en cache de sharp
sharp.cache(false);

module.exports = async (req, res, next) => {
    if (!req.file) return next();

    const originalFilePath = req.file.path;
    const newFilePath = originalFilePath.replace(/\.[^/.]+$/, "") + ".webp";

    try {
        // Convertir l'image en WebP
        await sharp(originalFilePath)
            .webp({ quality: 80 })
            .toFile(newFilePath);

        // Supprimer l'image originale après la conversion
        await fse.remove(originalFilePath).catch((error) => {
            console.error(`Erreur lors de la tentative de suppression du fichier original : ${originalFilePath}`, error);
        });

        // Mise à jour du chemin du fichier dans la requête pour utiliser le nouveau fichier WebP
        req.file.path = newFilePath;
        next();
    } catch (error) {
        console.error("Erreur lors de la conversion ou de la suppression du fichier : ", error);
        res.status(500).json({ error: "Impossible d'optimiser l'image" });
    }
};
