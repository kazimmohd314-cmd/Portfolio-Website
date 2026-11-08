import puppeteer from 'puppeteer';
import { spawn } from 'child_process';
import path from 'path';
import fs from 'fs';

const screenshotDir = path.resolve('public/screenshots');
const artifactScreenshotDir = '/Users/admin/.gemini/antigravity/brain/6cdcf2b0-9e88-463c-a97c-b064ecbc9991/screenshots';

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  const server = spawn('npx', ['astro', 'preview', '--port', '4321'], {
    stdio: 'inherit',
    env: { ...process.env, ASTRO_TELEMETRY_DISABLED: '1' }
  });

  await wait(2500);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });

  const page = await browser.newPage();

  // Emulate light color scheme
  await page.emulateMediaFeatures([{ name: 'prefers-color-scheme', value: 'light' }]);
  await page.setViewport({ width: 1440, height: 900, deviceScaleFactor: 2 });
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle0' });
  await page.evaluate(() => {
    localStorage.setItem('theme', 'light');
    document.documentElement.setAttribute('data-theme', 'light');
    document.documentElement.classList.add('light');
    document.documentElement.classList.remove('dark');
  });
  await wait(300);

  const desktopLight = path.join(screenshotDir, 'desktop-light-1440px.png');
  await page.screenshot({ path: desktopLight });
  fs.copyFileSync(desktopLight, path.join(artifactScreenshotDir, 'desktop-light-1440px.png'));

  const mobileLight = path.join(screenshotDir, 'mobile-light-390px.png');
  await page.setViewport({ width: 390, height: 844, deviceScaleFactor: 2 });
  await page.screenshot({ path: mobileLight });
  fs.copyFileSync(mobileLight, path.join(artifactScreenshotDir, 'mobile-light-390px.png'));

  console.log('Light mode screenshots captured!');
  await browser.close();
  server.kill('SIGTERM');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

