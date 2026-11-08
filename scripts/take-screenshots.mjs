import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const screenshotDir = path.resolve('public/screenshots');
const artifactScreenshotDir = '/Users/admin/.gemini/antigravity/brain/6cdcf2b0-9e88-463c-a97c-b064ecbc9991/screenshots';

fs.mkdirSync(screenshotDir, { recursive: true });
fs.mkdirSync(artifactScreenshotDir, { recursive: true });

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log('Starting preview server on port 4321...');
  const server = spawn('npx', ['astro', 'preview', '--port', '4321'], {
    stdio: 'inherit',
    env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' }
  });

  await wait(3000);

  console.log('Launching headless browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Auto-scroll helper for full page screenshots
  async function autoScroll(p) {
    await p.evaluate(async () => {
      await new Promise((resolve) => {
        let totalHeight = 0;
        const distance = 300;
        const timer = setInterval(() => {
          const scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            window.scrollTo(0, 0);
            resolve();
          }
        }, 100);
      });
    });
    await wait(600);
  }

  // 1. Mobile viewport (390px x 844px - iPhone 12/13/14/15)
  console.log('Capturing mobile viewports (390px)...');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle0' });
  await wait(500);

  const mobileHero = path.join(screenshotDir, 'mobile-hero-390px.png');
  await page.screenshot({ path: mobileHero });
  fs.copyFileSync(mobileHero, path.join(artifactScreenshotDir, 'mobile-hero-390px.png'));

  await autoScroll(page);
  const mobileFull = path.join(screenshotDir, 'mobile-full-390px.png');
  await page.screenshot({ path: mobileFull, fullPage: true });
  fs.copyFileSync(mobileFull, path.join(artifactScreenshotDir, 'mobile-full-390px.png'));

  // 2. Desktop viewport (1440px x 900px)
  console.log('Capturing desktop viewports (1440px)...');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle0' });
  await wait(500);

  const desktopHero = path.join(screenshotDir, 'desktop-hero-1440px.png');
  await page.screenshot({ path: desktopHero });
  fs.copyFileSync(desktopHero, path.join(artifactScreenshotDir, 'desktop-hero-1440px.png'));

  await autoScroll(page);
  const desktopFull = path.join(screenshotDir, 'desktop-full-1440px.png');
  await page.screenshot({ path: desktopFull, fullPage: true });
  fs.copyFileSync(desktopFull, path.join(artifactScreenshotDir, 'desktop-full-1440px.png'));

  // 3. Project Detail Page (skill1swap)
  console.log('Capturing project detail page...');
  await page.goto('http://localhost:4321/projects/skill1swap', { waitUntil: 'networkidle0' });
  await wait(500);

  const projectMobile = path.join(screenshotDir, 'project-skill1swap-mobile.png');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.screenshot({ path: projectMobile });
  fs.copyFileSync(projectMobile, path.join(artifactScreenshotDir, 'project-skill1swap-mobile.png'));

  const projectDesktop = path.join(screenshotDir, 'project-skill1swap-desktop.png');
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.screenshot({ path: projectDesktop });
  fs.copyFileSync(projectDesktop, path.join(artifactScreenshotDir, 'project-skill1swap-desktop.png'));

  console.log('All screenshots captured successfully!');
  await browser.close();
  server.kill('SIGTERM');
  process.exit(0);
}

run().catch(err => {
  console.error('Error running screenshots:', err);
  process.exit(1);
});
