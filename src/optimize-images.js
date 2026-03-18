import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Directories to optimize
const dirs = [
  'public/assets/details-images',
  'public/assets/timeline-images',
  'public/assets/item-images'
];

const optimizeImage = async (inputPath, outputPath) => {
  const ext = path.extname(inputPath).toLowerCase();
  
  if (ext === '.gif') {
    // For GIFs, we'll note them separately
    console.log(`⚠️  GIF detected: ${inputPath} - Consider converting to video`);
    return;
  }

  try {
    let pipeline = sharp(inputPath);
    
    // Get metadata
    const metadata = await pipeline.metadata();
    
    // Resize if too large
    if (metadata.width > 1200) {
      pipeline = pipeline.resize(1200);
    }
    
    // Compress based on format
    if (ext === '.jpg' || ext === '.jpeg') {
      await pipeline.jpeg({ quality: 70, mozjpeg: true }).toFile(outputPath);
    } else if (ext === '.png') {
      await pipeline.png({ quality: 70, palette: true }).toFile(outputPath);
    }
    
    const originalSize = fs.statSync(inputPath).size;
    const newSize = fs.statSync(outputPath).size;
    const savings = ((originalSize - newSize) / originalSize * 100).toFixed(1);
    
    console.log(`✓ ${path.basename(inputPath)}: ${(originalSize/1024/1024).toFixed(2)}MB → ${(newSize/1024/1024).toFixed(2)}MB (${savings}% savings)`);
  } catch (err) {
    console.error(`✗ Error processing ${inputPath}:`, err.message);
  }
};

// Process each directory
dirs.forEach(dir => {
  if (!fs.existsSync(dir)) return;
  
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isFile()) {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        const tempPath = path.join(dir, `optimized-${file}`);
        optimizeImage(fullPath, tempPath).then(() => {
          // Replace original with optimized
          fs.renameSync(tempPath, fullPath);
        });
      }
    }
  });
});

console.log('\n⚠️  For GIFs: Convert to video format for better performance');
