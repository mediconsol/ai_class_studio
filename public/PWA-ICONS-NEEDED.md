# PWA 아이콘 생성 필요

이 폴더에 다음 PWA 아이콘 파일들이 필요합니다:

## 필요한 파일

- `pwa-64x64.png` (64 x 64 픽셀)
- `pwa-192x192.png` (192 x 192 픽셀)
- `pwa-512x512.png` (512 x 512 픽셀)

## 생성 방법

### 옵션 1: 온라인 도구 사용 (추천)

1. **PWA Builder**: https://www.pwabuilder.com/imageGenerator
   - 512x512 PNG 업로드
   - 모든 크기 자동 생성

2. **Real Favicon Generator**: https://realfavicongenerator.net/
   - SVG 또는 PNG 업로드
   - PWA 아이콘 생성 옵션 선택

### 옵션 2: 직접 생성

1. 디자인 도구(Figma, Photoshop 등)에서 512x512px 아이콘 제작
2. 배경색: `#0EA5E9` (Primary 색상)
3. 로고/텍스트: 흰색 또는 대비되는 색상
4. 각 크기(64x64, 192x192, 512x512)로 Export

### 옵션 3: 기존 파비콘 활용

기존 `favicon.svg`를 PNG로 변환:

```bash
# ImageMagick 사용
convert -background "#0EA5E9" -density 300 favicon.svg -resize 64x64 pwa-64x64.png
convert -background "#0EA5E9" -density 300 favicon.svg -resize 192x192 pwa-192x192.png
convert -background "#0EA5E9" -density 300 favicon.svg -resize 512x512 pwa-512x512.png
```

## 디자인 가이드

- **앱 이름**: AI 실무 교육 또는 MediConSol
- **주요 색상**: `#0EA5E9` (Primary Blue)
- **보조 색상**: `#F0FDFA` (Accent)
- **텍스트**: 간결하고 읽기 쉽게 (예: "AI")
- **스타일**: 의료 + AI 컨셉

## 아이콘 생성 후

1. 이 폴더(`/public`)에 3개 파일 저장
2. `PWA-ICONS-NEEDED.md` 파일 삭제
3. Git add & commit
4. 빌드 후 배포

---

*임시 아이콘 없이 빌드하면 에러가 발생할 수 있습니다.*
