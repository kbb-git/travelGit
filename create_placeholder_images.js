const fs = require('fs');
const path = require('path');

// Array of destination image filenames we need
const destinations = [
  'capetown.jpg',
  'vienna.jpg',
  'iceland.jpg',
  'thailand.jpg', 
  'machupicchu.jpg',
  'scotland.jpg',
  'costarica.jpg',
  'portugal.jpg'
];

// Instead of downloading, let's create symbolic links or copy existing images
// to use as placeholders for our new destinations
const imagesDir = path.join(__dirname, 'public', 'images');

// Check if we have existing images to use
fs.readdir(imagesDir, (err, files) => {
  if (err) {
    console.error('Error reading images directory:', err);
    return;
  }

  // Filter for just jpg files
  const jpgFiles = files.filter(file => file.endsWith('.jpg'));
  
  if (jpgFiles.length === 0) {
    console.error('No jpg files found to use as placeholders');
    return;
  }

  // Create placeholder images by copying existing ones
  destinations.forEach((dest, index) => {
    // Use existing images as sources in a round-robin fashion
    const sourceFile = jpgFiles[index % jpgFiles.length];
    const sourcePath = path.join(imagesDir, sourceFile);
    const destPath = path.join(imagesDir, dest);

    // Skip if the destination file already exists
    if (fs.existsSync(destPath)) {
      console.log(`Destination file ${dest} already exists, skipping.`);
      return;
    }

    // Copy the file
    fs.copyFile(sourcePath, destPath, (err) => {
      if (err) {
        console.error(`Error creating placeholder for ${dest}:`, err);
        return;
      }
      console.log(`Created placeholder for ${dest} using ${sourceFile}`);
    });
  });
}); 