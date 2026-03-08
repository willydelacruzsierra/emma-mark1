const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const photosDir = path.join(__dirname, 'photos');
const backupDir = path.join(__dirname, 'photos_original');

if (!fs.existsSync(backupDir)) {
    fs.mkdirSync(backupDir);
}

const excludeFiles = [
    'cute_fruits_animals_background.png',
    'cute_invitation_background.png'
];

async function optimizeImages() {
    try {
        const files = fs.readdirSync(photosDir);

        for (const file of files) {
            // Skip non-images or already optimized images or excluded files
            if (!file.match(/\.(jpg|jpeg|png|heic)$/i) || excludeFiles.includes(file)) {
                continue;
            }

            const currentPath = path.join(photosDir, file);
            const backupPath = path.join(backupDir, file);
            
            // Generate webp filename
            const ext = path.extname(file);
            const baseName = path.basename(file, ext);
            const newFileName = `${baseName}.webp`;
            const newPath = path.join(photosDir, newFileName);

            console.log(`Processing: ${file}`);

            // Move original to backup directory
            fs.renameSync(currentPath, backupPath);

            // Process image from backup and save to photos dir as webp
            await sharp(backupPath)
                .resize({
                    width: 1200,
                    withoutEnlargement: true // Don't enlarge if image is smaller than 1200px
                })
                .webp({ quality: 80 }) // Compress to WebP format
                .toFile(newPath);

            console.log(`Optimized and saved: ${newFileName}`);
        }
        console.log('Optimization complete!');
    } catch (error) {
        console.error('Error optimizing images:', error);
    }
}

optimizeImages();
