import fs from 'fs';
import path from 'path';

const distDir = path.resolve('dist');

function inspectHtmlFile(filePath, relativeRoute) {
  const html = fs.readFileSync(filePath, 'utf-8');

  // Title
  const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
  const title = titleMatch ? titleMatch[1] : null;

  // Description
  const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i);
  const description = descMatch ? descMatch[1] : null;

  // Canonical
  const canonMatch = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']*)["']/i);
  const canonical = canonMatch ? canonMatch[1] : null;

  // H1 tags
  const h1Matches = [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)];

  // JSON-LD
  const jsonLdMatches = [...html.matchAll(/<script\s+type=["']application\/ld\+json["']>([\s\S]*?)<\/script>/gi)];

  // Images missing alt
  const imgMatches = [...html.matchAll(/<img\s+([^>]*?)>/gi)];
  const imgsWithoutAlt = imgMatches.filter(m => !m[1].includes('alt='));

  // Preloaded font
  const hasPreload = html.includes('rel="preload"') && html.includes('as="font"');

  console.log(`\n========================================`);
  console.log(`PAGE: ${relativeRoute}`);
  console.log(`Title (${title ? title.length : 0} chars): "${title}"`);
  console.log(`Description (${description ? description.length : 0} chars): "${description}"`);
  console.log(`Canonical: ${canonical}`);
  console.log(`H1 Count: ${h1Matches.length} (${h1Matches.map(m => m[1].replace(/<[^>]+>/g, '').trim()).join(' | ')})`);
  console.log(`JSON-LD schemas: ${jsonLdMatches.length}`);
  console.log(`Font Preload Present: ${hasPreload}`);
  console.log(`Images missing alt: ${imgsWithoutAlt.length}`);

  if (title && title.length > 60) console.warn(`⚠️ WARNING: Title exceeds 60 chars!`);
  if (description && description.length > 155) console.warn(`⚠️ WARNING: Description exceeds 155 chars!`);
  if (h1Matches.length !== 1) console.warn(`⚠️ WARNING: Expected exactly 1 H1!`);
  if (imgsWithoutAlt.length > 0) console.warn(`⚠️ WARNING: Images missing alt tags!`);
}

inspectHtmlFile(path.join(distDir, 'index.html'), '/');
inspectHtmlFile(path.join(distDir, 'projects/index.html'), '/projects');
inspectHtmlFile(path.join(distDir, 'projects/studyplanner/index.html'), '/projects/studyplanner');
inspectHtmlFile(path.join(distDir, 'projects/skill1swap/index.html'), '/projects/skill1swap');
inspectHtmlFile(path.join(distDir, 'projects/befit-gym/index.html'), '/projects/befit-gym');
inspectHtmlFile(path.join(distDir, '404.html'), '/404');
