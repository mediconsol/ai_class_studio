# PWA (Progressive Web App) 설정 가이드

## PWA 기능

이 애플리케이션은 PWA로 구성되어 있어 다음 기능을 제공합니다:

1. **홈 화면에 추가** - 앱처럼 설치 가능
2. **전체화면 모드** - URL 바 숨김으로 화면 최대 활용
3. **오프라인 지원** - 캐싱을 통한 오프라인 사용
4. **자동 업데이트** - 새 버전 자동 감지 및 업데이트

## 설치 방법

### iOS (iPhone/iPad)

1. Safari 브라우저로 사이트 접속
2. 하단 공유 버튼 탭
3. "홈 화면에 추가" 선택
4. "추가" 탭
5. 홈 화면에 생성된 아이콘으로 실행

### Android

1. Chrome 브라우저로 사이트 접속
2. 우측 상단 메뉴 (⋮) 탭
3. "홈 화면에 추가" 또는 "앱 설치" 선택
4. "추가" 탭
5. 홈 화면에 생성된 아이콘으로 실행

### Windows/Mac (데스크톱)

1. Chrome 또는 Edge 브라우저로 사이트 접속
2. 주소창 우측에 설치 아이콘 (⊕) 클릭
3. "설치" 클릭
4. 독립 창으로 실행됨

## PWA 아이콘 생성

현재 임시 아이콘이 사용되고 있습니다. 커스텀 아이콘을 생성하려면:

### 온라인 도구 사용

1. **PWA Asset Generator**: https://www.pwabuilder.com/imageGenerator
   - 512x512 PNG 업로드
   - 모든 크기 자동 생성
   - 다운로드 후 `/public` 폴더에 저장

2. **Favicon Generator**: https://realfavicongenerator.net/
   - SVG 또는 PNG 업로드
   - PWA 아이콘 옵션 선택
   - 생성된 파일 다운로드

### 필요한 파일

- `pwa-64x64.png` - 64x64px
- `pwa-192x192.png` - 192x192px
- `pwa-512x512.png` - 512x512px

모든 파일을 `/public` 폴더에 저장하세요.

## 설정 파일

PWA 설정은 `vite.config.ts`에서 관리됩니다:

- **name**: 전체 앱 이름
- **short_name**: 홈 화면 아이콘 하단 표시명
- **description**: 앱 설명
- **theme_color**: 주소창/상태바 색상
- **display**: `standalone` (전체화면 모드)
- **orientation**: `landscape` (가로 모드 권장)

## 빌드 및 배포

```bash
# 개발 서버 (PWA 미적용)
npm run dev

# 프로덕션 빌드 (PWA 적용)
npm run build

# 빌드 미리보기
npm run preview
```

## 주의사항

1. **HTTPS 필수**: PWA는 HTTPS 환경에서만 작동합니다 (localhost 제외)
2. **Vercel 배포**: 자동으로 HTTPS 제공
3. **캐시 관리**: Service Worker가 파일을 캐싱하므로 업데이트 시 자동 갱신됨
4. **브라우저 지원**: 최신 Chrome, Edge, Safari, Firefox 지원

## 테스트

1. 빌드: `npm run build`
2. 미리보기: `npm run preview`
3. Chrome DevTools > Application > Manifest 확인
4. Lighthouse 실행 (PWA 점수 확인)

---

*개발: MediConSol × 이노솔루션*
