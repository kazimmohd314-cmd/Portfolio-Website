import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const outImagesDir = path.resolve('src/assets/images');
const outPublicDir = path.resolve('public');

fs.mkdirSync(outImagesDir, { recursive: true });
fs.mkdirSync(outPublicDir, { recursive: true });

// 1. OG Image (1200x630)
const ogSvg = `
<svg width="1200" height="630" viewBox="0 0 1200 630" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#262626" stroke-width="1"/>
    </pattern>
  </defs>

  <!-- Background -->
  <rect width="1200" height="630" fill="#121212"/>
  <rect width="1200" height="630" fill="url(#grid)" opacity="0.6"/>

  <!-- Border Frame -->
  <rect x="32" y="32" width="1136" height="566" fill="none" stroke="#6B675F" stroke-width="1" opacity="0.4"/>

  <!-- Top bar info -->
  <text x="64" y="80" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="700" fill="#FF4D1C" letter-spacing="3">01 / PORTFOLIO</text>
  <text x="1136" y="80" text-anchor="end" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="500" fill="#9E9A90" letter-spacing="1">LUCKNOW, IN — 26.8467° N, 80.9462° E</text>

  <!-- Divider -->
  <line x1="64" y1="104" x2="1136" y2="104" stroke="#6B675F" stroke-width="1" opacity="0.3"/>

  <!-- Headline -->
  <text x="64" y="220" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="76" font-weight="800" fill="#F2EFE8" letter-spacing="-2">MOHD KAZIM</text>
  <text x="64" y="300" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="34" font-weight="400" fill="#9E9A90" letter-spacing="-0.5">Software Developer &amp; CSE Undergraduate</text>

  <!-- Focus Tags -->
  <g transform="translate(64, 380)">
    <rect x="0" y="0" width="140" height="40" rx="4" fill="#1E1E1E" stroke="#6B675F" stroke-width="1" stroke-opacity="0.4"/>
    <text x="70" y="25" text-anchor="middle" font-family="monospace" font-size="14" fill="#F2EFE8">WEB SYSTEMS</text>

    <rect x="156" y="0" width="160" height="40" rx="4" fill="#1E1E1E" stroke="#6B675F" stroke-width="1" stroke-opacity="0.4"/>
    <text x="236" y="25" text-anchor="middle" font-family="monospace" font-size="14" fill="#F2EFE8">C++ &amp; DATA STR</text>

    <rect x="332" y="0" width="140" height="40" rx="4" fill="#1E1E1E" stroke="#6B675F" stroke-width="1" stroke-opacity="0.4"/>
    <text x="402" y="25" text-anchor="middle" font-family="monospace" font-size="14" fill="#F2EFE8">ASTRO &amp; REACT</text>
  </g>

  <!-- Bottom Details -->
  <line x1="64" y1="500" x2="1136" y2="500" stroke="#6B675F" stroke-width="1" opacity="0.3"/>
  <text x="64" y="546" font-family="monospace" font-size="16" fill="#F2EFE8" font-weight="600">mohdkazim.netlify.app</text>
  <circle cx="280" cy="541" r="5" fill="#FF4D1C"/>
  <text x="296" y="546" font-family="monospace" font-size="14" fill="#9E9A90">AVAILABLE FOR INTERNSHIPS</text>
</svg>
`;

// 2. skill1swap Cover Image (960x600)
const skill1swapSvg = `
<svg width="960" height="600" viewBox="0 0 960 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="dotgrid" width="24" height="24" patternUnits="userSpaceOnUse">
      <circle cx="2" cy="2" r="1.5" fill="#2E2E2E"/>
    </pattern>
  </defs>

  <rect width="960" height="600" fill="#141414"/>
  <rect width="960" height="600" fill="url(#dotgrid)"/>

  <!-- Border -->
  <rect x="24" y="24" width="912" height="552" fill="none" stroke="#333333" stroke-width="1"/>

  <!-- Badge -->
  <rect x="56" y="56" width="130" height="32" rx="4" fill="#FF4D1C"/>
  <text x="121" y="77" text-anchor="middle" font-family="monospace" font-size="12" font-weight="700" fill="#121212" letter-spacing="1">FEATURED APP</text>

  <text x="56" y="160" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="52" font-weight="800" fill="#F2EFE8" letter-spacing="-1">skill1swap</text>
  <text x="56" y="204" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="20" font-weight="400" fill="#9E9A90">Peer-to-peer technical skill barter network</text>

  <!-- Interactive Graphic Box -->
  <g transform="translate(56, 260)">
    <rect width="848" height="260" rx="8" fill="#1A1A1A" stroke="#2E2E2E" stroke-width="1"/>
    
    <!-- Left Card: Offering -->
    <rect x="32" y="32" width="340" height="196" rx="6" fill="#222222" stroke="#363636" stroke-width="1"/>
    <text x="56" y="68" font-family="monospace" font-size="12" fill="#FF4D1C" font-weight="700">USER A OFFERS</text>
    <text x="56" y="106" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="22" font-weight="700" fill="#F2EFE8">React &amp; Frontend</text>
    <text x="56" y="136" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" fill="#9E9A90">Component systems, State mgmt, Tailwind</text>
    <rect x="56" y="160" width="100" height="24" rx="3" fill="#2A2A2A"/>
    <text x="106" y="176" text-anchor="middle" font-family="monospace" font-size="11" fill="#9E9A90">INTERMEDIATE</text>

    <!-- Center Exchange Arrow -->
    <circle cx="424" cy="130" r="28" fill="#FF4D1C"/>
    <path d="M 414 130 L 434 130 M 428 124 L 434 130 L 428 136 M 434 130 L 414 130 M 420 124 L 414 130 L 420 136" stroke="#121212" stroke-width="2.5" stroke-linecap="round"/>

    <!-- Right Card: Requesting -->
    <rect x="476" y="32" width="340" height="196" rx="6" fill="#222222" stroke="#363636" stroke-width="1"/>
    <text x="500" y="68" font-family="monospace" font-size="12" fill="#FF4D1C" font-weight="700">USER B TRADES</text>
    <text x="500" y="106" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="22" font-weight="700" fill="#F2EFE8">C++ &amp; DSA</text>
    <text x="500" y="136" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" fill="#9E9A90">Algorithms, Memory, Competitive coding</text>
    <rect x="500" y="160" width="100" height="24" rx="3" fill="#2A2A2A"/>
    <text x="550" y="176" text-anchor="middle" font-family="monospace" font-size="11" fill="#9E9A90">ADVANCED</text>
  </g>
</svg>
`;

// 3. befit-gym Cover Image (960x600)
const befitSvg = `
<svg width="960" height="600" viewBox="0 0 960 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <pattern id="lines" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 0 30 L 30 0" fill="none" stroke="#252525" stroke-width="1"/>
    </pattern>
  </defs>

  <rect width="960" height="600" fill="#141414"/>
  <rect width="960" height="600" fill="url(#lines)"/>

  <!-- Border -->
  <rect x="24" y="24" width="912" height="552" fill="none" stroke="#333333" stroke-width="1"/>

  <!-- Badge -->
  <rect x="56" y="56" width="130" height="32" rx="4" fill="#F2EFE8"/>
  <text x="121" y="77" text-anchor="middle" font-family="monospace" font-size="12" font-weight="700" fill="#121212" letter-spacing="1">FITNESS WEB APP</text>

  <text x="56" y="160" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="52" font-weight="800" fill="#F2EFE8" letter-spacing="-1">BE FIT GYM</text>
  <text x="56" y="204" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="20" font-weight="400" fill="#9E9A90">Fitness brand experience &amp; interactive BMI calculator</text>

  <!-- Metric / Dashboard Graphic Box -->
  <g transform="translate(56, 260)">
    <rect width="848" height="260" rx="8" fill="#1A1A1A" stroke="#2E2E2E" stroke-width="1"/>
    
    <!-- Widget 1: BMI Calculator -->
    <rect x="32" y="32" width="360" height="196" rx="6" fill="#222222" stroke="#363636" stroke-width="1"/>
    <text x="56" y="68" font-family="monospace" font-size="12" fill="#FF4D1C" font-weight="700">BMI ENGINE</text>
    <text x="56" y="110" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="36" font-weight="800" fill="#F2EFE8">22.4 <tspan font-size="16" font-weight="500" fill="#9E9A90">kg/m²</tspan></text>
    <text x="56" y="142" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="14" fill="#9E9A90">Target: Optimal athletic health zone</text>
    <!-- Gauge bar -->
    <rect x="56" y="166" width="300" height="8" rx="4" fill="#333333"/>
    <rect x="56" y="166" width="180" height="8" rx="4" fill="#FF4D1C"/>

    <!-- Widget 2: Program Tiers -->
    <rect x="424" y="32" width="392" height="196" rx="6" fill="#222222" stroke="#363636" stroke-width="1"/>
    <text x="448" y="68" font-family="monospace" font-size="12" fill="#FF4D1C" font-weight="700">SERVICES &amp; TIERS</text>
    <g transform="translate(448, 92)">
      <text x="0" y="20" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="16" font-weight="700" fill="#F2EFE8">Strength &amp; Conditioning</text>
      <text x="340" y="20" text-anchor="end" font-family="monospace" font-size="14" fill="#FF4D1C">INCLUDED</text>
      <line x1="0" y1="36" x2="340" y2="36" stroke="#363636" stroke-width="1"/>

      <text x="0" y="64" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="16" font-weight="700" fill="#F2EFE8">Personalized Nutrition</text>
      <text x="340" y="64" text-anchor="end" font-family="monospace" font-size="14" fill="#FF4D1C">CUSTOM</text>
      <line x1="0" y1="80" x2="340" y2="80" stroke="#363636" stroke-width="1"/>

      <text x="0" y="108" font-family="-apple-system, BlinkMacSystemFont, sans-serif" font-size="16" font-weight="700" fill="#F2EFE8">Mobile Lead Generation</text>
      <text x="340" y="108" text-anchor="end" font-family="monospace" font-size="14" fill="#FF4D1C">ACTIVE</text>
    </g>
  </g>
</svg>
`;

async function build() {
  await sharp(Buffer.from(ogSvg)).png().toFile(path.join(outPublicDir, 'og-image.png'));
  console.log('og-image.png generated');

  await sharp(Buffer.from(skill1swapSvg)).png().toFile(path.join(outImagesDir, 'skill1swap-cover.png'));
  console.log('skill1swap-cover.png generated');

  await sharp(Buffer.from(befitSvg)).png().toFile(path.join(outImagesDir, 'befit-gym-cover.png'));
  console.log('befit-gym-cover.png generated');
}

build().catch(err => {
  console.error(err);
  process.exit(1);
});

