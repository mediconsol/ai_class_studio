import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const publicDir = join(__dirname, '..', 'public');

// SVG 아이콘 템플릿 (MediConsol 브랜딩)
const createSVG = (size) => `
<svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
  <!-- 배경 -->
  <rect width="${size}" height="${size}" fill="#0EA5E9" rx="${size * 0.15}"/>

  <!-- AI 텍스트 -->
  <text
    x="50%"
    y="50%"
    text-anchor="middle"
    dominant-baseline="middle"
    font-family="Arial, sans-serif"
    font-weight="bold"
    font-size="${size * 0.45}px"
    fill="#FFFFFF"
  >AI</text>

  <!-- 하단 서브텍스트 (512px 이상일 때만) -->
  ${size >= 512 ? `
  <text
    x="50%"
    y="${size * 0.85}"
    text-anchor="middle"
    font-family="Arial, sans-serif"
    font-size="${size * 0.08}px"
    fill="#FFFFFF"
    opacity="0.9"
  >실무교육</text>
  ` : ''}
</svg>
`;

// 아이콘 생성 함수
async function generateIcon(size) {
  const svg = createSVG(size);
  const outputPath = join(publicDir, `pwa-${size}x${size}.png`);

  try {
    await sharp(Buffer.from(svg))
      .resize(size, size)
      .png()
      .toFile(outputPath);

    console.log(`✓ Generated: pwa-${size}x${size}.png`);
  } catch (error) {
    console.error(`✗ Failed to generate pwa-${size}x${size}.png:`, error.message);
  }
}

// 메인 실행
async function main() {
  console.log('Generating PWA icons...\n');

  const sizes = [64, 192, 512];

  for (const size of sizes) {
    await generateIcon(size);
  }

  console.log('\n✓ All PWA icons generated successfully!');
}

main().catch(console.error);
