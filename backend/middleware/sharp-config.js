const sharp = require('sharp');

const compressImage = async (req, res, next) => {
  if (!req.file) {
    return next();
  }

  try {
    const buffer = await sharp(req.file.buffer)
      .toFormat('webp') // Convertir en format WebP
      .webp({ quality: 90 }) // Qualité de compression WebP
      .toBuffer(); // Convertir en tampon

    req.file.buffer = buffer;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = compressImage;
