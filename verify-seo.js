import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

console.log('\n🔍 SEO Verification Report\n' + '='.repeat(50));

// 1. Check index.html
console.log('\n📄 Checking index.html:');
const indexHtml = fs.readFileSync('index.html', 'utf8');

// Check meta tags
const hasDescription = /<meta name="description"/.test(indexHtml);
const hasOgTitle = /<meta property="og:title"/.test(indexHtml);
const hasViewport = /<meta name="viewport"/.test(indexHtml);
console.log(`  ${hasDescription ? '✅' : '❌'} Description meta tag`);
console.log(`  ${hasOgTitle ? '✅' : '❌'} Open Graph title`);
console.log(`  ${hasViewport ? '✅' : '❌'} Viewport meta tag`);

// Check JSON-LD syntax
const jsonLdMatches = indexHtml.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g);
if (jsonLdMatches) {
    console.log(`  ✅ Found ${jsonLdMatches.length} JSON-LD script(s)`);
    jsonLdMatches.forEach((match, i) => {
        try {
            const jsonStr = match.replace(/<script type="application\/ld\+json">/, '').replace('</script>', '');
            JSON.parse(jsonStr);
            console.log(`  ✅ Script ${i+1}: Valid JSON`);
        } catch(e) {
            console.log(`  ❌ Script ${i+1}: Invalid JSON - ${e.message}`);
        }
    });
} else {
    console.log(`  ❌ No JSON-LD scripts found`);
}

// Check for trailing commas in JSON-LD
if (/,(\s*[}\]])/g.test(indexHtml) && /application\/ld\+json/.test(indexHtml)) {
    console.log(`  ⚠️  Possible trailing comma in JSON-LD (check your script tags)`);
}

// 2. Check robots.txt
console.log('\n🤖 Checking robots.txt:');
if (fs.existsSync('robots.txt')) {
    const robots = fs.readFileSync('robots.txt', 'utf8');
    const hasAllow = /Allow: \//.test(robots);
    const hasSitemap = /Sitemap:/.test(robots);
    console.log(`  ✅ robots.txt exists`);
    console.log(`  ${hasAllow ? '✅' : '❌'} Has Allow directive`);
    console.log(`  ${hasSitemap ? '✅' : '❌'} Has Sitemap URL`);
} else {
    console.log(`  ❌ robots.txt missing`);
}

// 3. Check sitemap.xml
console.log('\n🗺️  Checking sitemap.xml:');
if (fs.existsSync('public/sitemap.xml')) {
    const sitemap = fs.readFileSync('public/sitemap.xml', 'utf8');
    const urlCount = (sitemap.match(/<loc>/g) || []).length;
    console.log(`  ✅ sitemap.xml exists`);
    console.log(`  📍 Contains ${urlCount} URL(s)`);
    
    // Check if URLs are correct
    const urls = sitemap.match(/<loc>(.*?)<\/loc>/g);
    if (urls) {
        urls.forEach(url => {
            const cleanUrl = url.replace('<loc>', '').replace('</loc>', '');
            if (cleanUrl.includes('nahomtmariam.com')) {
                console.log(`  ✅ URL format correct: ${cleanUrl}`);
            } else {
                console.log(`  ⚠️  URL might need updating: ${cleanUrl}`);
            }
        });
    }
} else {
    console.log(`  ❌ public/sitemap.xml missing - Run: node scripts/generate-sitemap.js`);
}

// 4. Check for images
console.log('\n🖼️  Checking images:');
const publicDir = 'public';
if (fs.existsSync(publicDir)) {
    const files = fs.readdirSync(publicDir);
    const hasOgImage = files.some(f => f === 'og-image.jpg' || f === 'og-image.png');
    const hasProfile = files.some(f => f === 'profile.jpg' || f === 'profile.png');
    const hasFavicon = files.some(f => f === 'favicon.svg');
    
    console.log(`  ${hasOgImage ? '✅' : '⚠️'} og-image.jpg (needed for social sharing)`);
    console.log(`  ${hasProfile ? '✅' : '⚠️'} profile.jpg (shows in search results)`);
    console.log(`  ${hasFavicon ? '✅' : '⚠️'} favicon.svg (browser tab icon)`);
    
    if (!hasOgImage) {
        console.log(`  💡 Tip: Create og-image.jpg (1200x630px) using Canva.com`);
    }
} else {
    console.log(`  ❌ public directory not found`);
}

// 5. Check package.json scripts
console.log('\n📦 Checking package.json:');
const pkg = JSON.parse(fs.readFileSync('package.json', 'utf8'));
const hasPrebuild = pkg.scripts?.prebuild;
console.log(`  ${hasPrebuild ? '✅' : '❌'} prebuild script (generates sitemap)`);
console.log(`  ${pkg.scripts?.build ? '✅' : '❌'} build script exists`);

// 6. Check React Helmet setup
console.log('\n⚛️  Checking React Helmet:');
const appFile = fs.readFileSync('src/App.tsx', 'utf8');
const hasHelmetImport = /import.*HelmetProvider/.test(appFile);
const hasLayoutImport = /import Layout/.test(appFile);
console.log(`  ${hasHelmetImport ? '✅' : '❌'} HelmetProvider imported`);
console.log(`  ${hasLayoutImport ? '✅' : '❌'} Layout component imported`);

// 7. Check for common issues
console.log('\n⚠️  Common Issues:');
const hasReactRouter = fs.existsSync('node_modules/react-router-dom');
console.log(`  ${hasReactRouter ? '✅' : '⚠️'} React Router DOM installed`);

// Check if source files exist
const hasHomePage = fs.existsSync('src/pages/Home.tsx') || fs.existsSync('src/Home.tsx');
console.log(`  ${hasHomePage ? '✅' : '⚠️'} Home page component exists`);

// Final summary
console.log('\n' + '='.repeat(50));
console.log('📊 SUMMARY');
console.log('='.repeat(50));

let issues = [];
if (!hasDescription) issues.push('Missing description meta tag');
if (!hasOgTitle) issues.push('Missing OG title');
if (!hasOgImage) issues.push('Missing og-image.jpg');
if (!hasProfile) issues.push('Missing profile.jpg');
if (fs.existsSync('public/sitemap.xml') && urlCount === 0) issues.push('Sitemap has no URLs');

if (issues.length === 0) {
    console.log('✅ All SEO checks passed! Your site is ready to deploy.');
} else {
    console.log('⚠️  Issues to fix:');
    issues.forEach(issue => console.log(`   - ${issue}`));
}

console.log('\n💡 Next steps:');
console.log('1. Run: node scripts/generate-sitemap.js');
console.log('2. Test locally: npm run dev');
console.log('3. Build: npm run build');
console.log('4. Deploy: npm run deploy');
console.log('5. Submit sitemap to Google Search Console');
