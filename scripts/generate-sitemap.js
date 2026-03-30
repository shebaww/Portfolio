import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// For a single-page portfolio, we only need the main URL
// But we can also add section anchors for better SEO
const pages = [
  { 
    url: '/', 
    priority: '1.0', 
    changefreq: 'monthly',
    lastmod: new Date().toISOString().split('T')[0]
  },
  // Optional: Add section anchors if you want them indexed separately
  // { url: '/#about', priority: '0.8', changefreq: 'monthly' },
  // { url: '/#projects', priority: '0.8', changefreq: 'monthly' },
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(page => `  <url>
    <loc>https://nahomtmariam.com${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(__dirname, '../public/sitemap.xml'), sitemap);
console.log('✅ Sitemap generated');
