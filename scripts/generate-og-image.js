import sharp from 'sharp';
import { createCanvas } from 'canvas';

// Create a simple 1200x630 image
const width = 1200;
const height = 630;

// Create canvas
const canvas = createCanvas(width, height);
const ctx = canvas.getContext('2d');

// Background gradient
const gradient = ctx.createLinearGradient(0, 0, width, height);
gradient.addColorStop(0, '#0a0a0a');
gradient.addColorStop(1, '#1a1a1a');
ctx.fillStyle = gradient;
ctx.fillRect(0, 0, width, height);

// Add text
ctx.fillStyle = '#e4b363';
ctx.font = 'bold 60px "Manrope", Arial';
ctx.textAlign = 'center';
ctx.fillText('Nahom Teklemariam', width/2, height/2 - 40);

ctx.fillStyle = '#ffffff';
ctx.font = '30px "Manrope", Arial';
ctx.fillText('Quant Developer & Full Stack Engineer', width/2, height/2 + 40);

// Save image
const buffer = canvas.toBuffer('image/jpeg');
await sharp(buffer).toFile('public/og-image.jpg');
console.log('✅ OG Image generated');
