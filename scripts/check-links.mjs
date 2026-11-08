import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');

function getHtmlFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getHtmlFiles(filePath, fileList);
    } else if (file.endsWith('.html')) {
      fileList.push(filePath);
    }
  }
  return fileList;
}

const htmlFiles = getHtmlFiles(distDir);
console.log(`Checking ${htmlFiles.length} generated HTML files for broken links and assets...`);

let hasError = false;

for (const htmlPath of htmlFiles) {
  const relPath = path.relative(distDir, htmlPath);
  const html = fs.readFileSync(htmlPath, 'utf-8');

  // Check all hrefs
  const hrefMatches = [...html.matchAll(/href=["']([^"']+)["']/g)].map(m => m[1]);
  for (const href of hrefMatches) {
    if (href.startsWith('http://') || href.startsWith('https://') || href.startsWith('mailto:') || href.startsWith('javascript:')) {
      continue;
    }

    // Anchor on same page
    if (href.startsWith('#')) {
      const anchorId = href.slice(1);
      if (!html.includes(`id="${anchorId}"`)) {
        console.warn(`⚠️ Warning: Anchor #${anchorId} not found in ${relPath}`);
      }
      continue;
    }

    // Relative or absolute path
    const [urlPath, hash] = href.split('#');
    let targetFile;
    if (urlPath.startsWith('/')) {
      targetFile = path.join(distDir, urlPath);
    } else {
      targetFile = path.join(path.dirname(htmlPath), urlPath);
    }

    // If target has no extension, check targetFile/index.html or targetFile.html
    let exists = fs.existsSync(targetFile);
    if (!exists && !path.extname(targetFile)) {
      if (fs.existsSync(path.join(targetFile, 'index.html'))) exists = true;
      else if (fs.existsSync(targetFile + '.html')) exists = true;
    }

    if (!exists) {
      console.error(`❌ Broken link in ${relPath}: href="${href}" -> target not found!`);
      hasError = true;
    }
  }

  // Check all image srcs
  const srcMatches = [...html.matchAll(/src=["']([^"']+)["']/g)].map(m => m[1]);
  for (const src of srcMatches) {
    if (src.startsWith('http://') || src.startsWith('https://') || src.startsWith('data:')) {
      continue;
    }

    const imgPath = src.startsWith('/') ? path.join(distDir, src) : path.join(path.dirname(htmlPath), src);
    if (!fs.existsSync(imgPath)) {
      console.error(`❌ Broken asset in ${relPath}: src="${src}" not found!`);
      hasError = true;
    }
  }
}

if (!hasError) {
  console.log('✅ ALL internal links and asset references resolved with 100% integrity!');
} else {
  process.exit(1);
}

