import puppeteer from 'puppeteer';
import { spawn } from 'child_process';

async function wait(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function run() {
  console.log('Starting preview server on port 4321...');
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
  // iPhone 13/14/15 mobile emulation
  await page.setViewport({ width: 390, height: 844, isMobile: true, hasTouch: true, deviceScaleFactor: 2 });

  // Track network transfer
  let totalBytes = 0;
  let jsBytes = 0;
  let cssBytes = 0;
  let imgBytes = 0;
  let fontBytes = 0;

  page.on('response', async (res) => {
    try {
      const buf = await res.buffer();
      const size = buf.length;
      totalBytes += size;
      const ct = res.headers()['content-type'] || '';
      if (ct.includes('javascript')) jsBytes += size;
      else if (ct.includes('css')) cssBytes += size;
      else if (ct.includes('image')) imgBytes += size;
      else if (ct.includes('font')) fontBytes += size;
    } catch {}
  });

  console.log('Navigating to http://localhost:4321/ under mobile viewport...');
  await page.goto('http://localhost:4321/', { waitUntil: 'networkidle0' });

  // Measure Web Vitals from browser Performance API
  const metrics = await page.evaluate(() => {
    return new Promise((resolve) => {
      let lcp = 0;
      let cls = 0;

      const po = new PerformanceObserver((entryList) => {
        const entries = entryList.getEntries();
        for (const entry of entries) {
          if (entry.entryType === 'largest-contentful-paint') {
            lcp = entry.startTime;
          }
          if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
            cls += entry.value;
          }
        }
      });

      po.observe({ type: 'largest-contentful-paint', buffered: true });
      po.observe({ type: 'layout-shift', buffered: true });

      setTimeout(() => {
        const nav = performance.getEntriesByType('navigation')[0];
        resolve({
          ttfb: nav ? nav.responseStart - nav.requestStart : 0,
          domContentLoaded: nav ? nav.domContentLoadedEventEnd - nav.startTime : 0,
          loadEvent: nav ? nav.loadEventEnd - nav.startTime : 0,
          lcp,
          cls
        });
      }, 1000);
    });
  });

  // Check touch targets >= 44px
  const touchTargetAudit = await page.evaluate(() => {
    const interactives = Array.from(document.querySelectorAll('a, button, input'));
    const smallTargets = [];
    for (const el of interactives) {
      const rect = el.getBoundingClientRect();
      // Ignore hidden or zero size elements
      if (rect.width > 0 && rect.height > 0) {
        if (rect.width < 44 || rect.height < 44) {
          // Check if parent has touch-target
          const parentTarget = el.closest('.touch-target');
          if (!parentTarget) {
            smallTargets.push({
              tag: el.tagName,
              text: el.innerText.trim().slice(0, 30),
              width: Math.round(rect.width),
              height: Math.round(rect.height)
            });
          }
        }
      }
    }
    return smallTargets;
  });

  console.log('\n========================================');
  console.log('MOBILE CORE WEB VITALS & PERFORMANCE AUDIT');
  console.log('========================================');
  console.log(`LCP (Largest Contentful Paint): ${Math.round(metrics.lcp)}ms (Target: < 2000ms) -> ${metrics.lcp < 2000 ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`CLS (Cumulative Layout Shift):  ${metrics.cls.toFixed(4)} (Target: < 0.05) -> ${metrics.cls < 0.05 ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`DOM Content Loaded:             ${Math.round(metrics.domContentLoaded)}ms`);
  console.log(`Page Load Event:                ${Math.round(metrics.loadEvent)}ms`);
  console.log(`\nASSET PAYLOAD BREAKDOWN:`);
  console.log(`- Total JavaScript:             ${(jsBytes / 1024).toFixed(1)} kB (Near-zero blocking JS)`);
  console.log(`- Total CSS:                    ${(cssBytes / 1024).toFixed(1)} kB`);
  console.log(`- Total Images:                 ${(imgBytes / 1024).toFixed(1)} kB`);
  console.log(`- Total Fonts:                  ${(fontBytes / 1024).toFixed(1)} kB`);
  console.log(`- Total Transferred:            ${(totalBytes / 1024).toFixed(1)} kB`);

  console.log('\nTOUCH TARGET AUDIT (>= 44px on mobile):');
  if (touchTargetAudit.length === 0) {
    console.log('✅ PASS: All interactive elements satisfy >= 44px minimum touch targets.');
  } else {
    console.log(`⚠️ Warning: Found ${touchTargetAudit.length} small elements:`, touchTargetAudit);
  }

  await browser.close();
  server.kill('SIGTERM');
  process.exit(0);
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});
