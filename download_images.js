const https = require('https');
const fs = require('fs');
const path = require('path');

// Create directory if it doesn't exist
const imagesDir = path.join(__dirname, 'public', 'images');
if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir, { recursive: true });
}

// List of images to download with their Unsplash URLs
const imagesToDownload = [
  {
    name: 'capetown.jpg',
    url: 'https://source.unsplash.com/random/1200x800/?capetown,southafrica'
  },
  {
    name: 'vienna.jpg',
    url: 'https://source.unsplash.com/random/1200x800/?vienna,austria'
  },
  {
    name: 'iceland.jpg',
    url: 'https://source.unsplash.com/random/1200x800/?iceland,northernlights'
  },
  {
    name: 'thailand.jpg',
    url: 'https://source.unsplash.com/random/1200x800/?thailand,phuket'
  },
  {
    name: 'machupicchu.jpg',
    url: 'https://source.unsplash.com/random/1200x800/?machupicchu,peru'
  },
  {
    name: 'scotland.jpg',
    url: 'https://source.unsplash.com/random/1200x800/?scotland,highlands'
  },
  {
    name: 'costarica.jpg',
    url: 'https://source.unsplash.com/random/1200x800/?costarica,rainforest'
  },
  {
    name: 'portugal.jpg',
    url: 'https://source.unsplash.com/random/1200x800/?portugal,lisbon'
  }
];

// Function to download an image
function downloadImage(url, filename) {
  return new Promise((resolve, reject) => {
    const filePath = path.join(imagesDir, filename);
    console.log(`Downloading ${filename} from ${url}`);
    
    // Check if file already exists
    if (fs.existsSync(filePath)) {
      console.log(`File ${filename} already exists, skipping download.`);
      return resolve();
    }
    
    https.get(url, (response) => {
      // Handle redirects (Unsplash uses them)
      if (response.statusCode === 302 || response.statusCode === 301) {
        console.log(`Following redirect for ${filename} to ${response.headers.location}`);
        return downloadImage(response.headers.location, filename)
          .then(resolve)
          .catch(reject);
      }
      
      // Check if response is successful
      if (response.statusCode !== 200) {
        return reject(new Error(`Failed to download ${filename}: Status code ${response.statusCode}`));
      }
      
      const fileStream = fs.createWriteStream(filePath);
      
      response.pipe(fileStream);
      
      fileStream.on('finish', () => {
        fileStream.close();
        console.log(`Downloaded ${filename}`);
        resolve();
      });
      
      fileStream.on('error', (err) => {
        fs.unlinkSync(filePath); // Delete the file if there's an error
        reject(err);
      });
      
      response.on('error', (err) => {
        fs.unlinkSync(filePath); // Delete the file if there's an error
        reject(err);
      });
    }).on('error', reject);
  });
}

// Download all images
async function downloadAllImages() {
  for (const image of imagesToDownload) {
    try {
      await downloadImage(image.url, image.name);
    } catch (error) {
      console.error(`Error downloading ${image.name}:`, error.message);
    }
  }
  console.log('All downloads completed!');
}

downloadAllImages().catch(console.error); 