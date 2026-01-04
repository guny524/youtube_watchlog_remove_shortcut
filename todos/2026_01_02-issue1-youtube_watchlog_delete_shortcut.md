# YouTube 시청기록 Delete 키 삭제 Chrome 확장 프로그램
- 이슈 주소: `https://github.com/guny524/youtube_watchlog_remove_shortcut/issues/1`
- 유부트 시청기록에서 (https://www.youtube.com/feed/history) 에서 이전 시청기록을 지우려면 마우스로 '...' 설정 버튼, '시청 기록에서 삭제' 버튼 총 2번 타고 들어가 눌러야해서 불편 -> 마우스 호버링 중인 시청 기록 키보드 delete 버튼으로 지울 수 있는 크롬 extension 필요

## 1. 배경
- 사용자는 arc browser 사용하고 있고, arc browswer 는 chrome 과 extension 이 호환되므로, chrome extension 을 만들면 됨
- 유투브에서 시청기록(https://www.youtube.com/feed/history)에서 이전 시청기록을 지우려면 마우스로 버튼을 '...' 설정 버튼, '시청 기록에서 삭제' 버튼 총 2번 타고 들어가 눌러야해서 불편함
## 1-1. 유투브 시청기록 페이지
- 시청기록 페이지에 가면 shot form 영상과 일반 영상이 나누어져 있음
```
# 오늘 날짜 숏폼영상들
# 오늘 날짜 일반 영상들
# 어제 날짜 숏폼 영상들
# 어제 날짜 일반 영상들
# ...
```
- 아래 full xpath 들은 잘못 지정된 걸수 있으니까 직접 mcp 나 playwright 로 브라우저 띄워서 지정된 xpath 들 부모/자식을 주루룩 타고 올라가서 실제 list 나 그런 구성요소를 찾아서 어떤 구조인지 파악이 필요함
  - mcp 를 사용하던, playwright 를 사용하던, 여러 개 있는 xpath 사이 경로를 직접 추적해봐야함
- 로그인 한 화면이랑 안 한 화면이랑 다를 수도 있어서 이거 어떻게 대처할건지도 고민해야 함
  - 로그인 안 했을 시 아예 시철기록 페이지 자체 접근이 불가할 수 있음
- 삭제 성공하면 이 위치 full xpath 에 삭제했다는 메세지의 토스트가 뜸 `/html/body/ytd-app/ytd-popup-container/yt-notification-action-renderer/tp-yt-paper-toast`

### 1-1-1. 기본적인 삭제법
- 숏폼 시청 기록 삭제
  - 오늘 날짜 숏폼
    - '...' 설정 버튼 누르기
      - `/html/body/ytd-app/div[1]/ytd-page-manager/ytd-browse[2]/ytd-two-column-browse-results-renderer/div[1]/ytd-section-list-renderer/div[2]/ytd-item-section-renderer[1]/div[3]/ytd-reel-shelf-renderer/div[2]/yt-horizontal-list-renderer/div[2]/div/div/ytm-shorts-lockup-view-model-v2[1]/ytm-shorts-lockup-view-model/div/div[2]/button/yt-touch-feedback-shape/div[2]`
      - `/html/body/ytd-app/div[1]/ytd-page-manager/ytd-browse[2]/ytd-two-column-browse-results-renderer/div[1]/ytd-section-list-renderer/div[2]/ytd-item-section-renderer[1]/div[3]/ytd-reel-shelf-renderer/div[2]/yt-horizontal-list-renderer/div[2]/div/div/ytm-shorts-lockup-view-model-v2[1]/ytm-shorts-lockup-view-model/div/div[2]`
      - `/html/body/ytd-app/div[1]/ytd-page-manager/ytd-browse[2]/ytd-two-column-browse-results-renderer/div[1]/ytd-section-list-renderer/div[2]/ytd-item-section-renderer[1]/div[3]/ytd-reel-shelf-renderer/div[2]/yt-horizontal-list-renderer/div[2]/div/div/ytm-shorts-lockup-view-model-v2[2]/ytm-shorts-lockup-view-model/div/div[2]/button/yt-touch-feedback-shape/div[2]`
      - `/html/body/ytd-app/div[1]/ytd-page-manager/ytd-browse[2]/ytd-two-column-browse-results-renderer/div[1]/ytd-section-list-renderer/div[2]/ytd-item-section-renderer[1]/div[3]/ytd-reel-shelf-renderer/div[2]/yt-horizontal-list-renderer/div[2]/div/div/ytm-shorts-lockup-view-model-v2[2]/ytm-shorts-lockup-view-model/div/div[2]`
    - '시청 기록에서 삭제' 누르기
      - `/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/yt-sheet-view-model/yt-contextual-sheet-layout/div[2]/yt-list-view-model/yt-list-item-view-model[5]/div/div[2]/div`
      - `/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/yt-sheet-view-model/yt-contextual-sheet-layout/div[2]/yt-list-view-model/yt-list-item-view-model[5]`
      - `/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/yt-sheet-view-model/yt-contextual-sheet-layout/div[2]/yt-list-view-model/yt-list-item-view-model[5]/div/div[2]/div`
      - `/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/yt-sheet-view-model/yt-contextual-sheet-layout/div[2]/yt-list-view-model/yt-list-item-view-model[5]`
  - 어제 날짜 숏폼
    - '...' 설정 버튼 누르기
      - `/html/body/ytd-app/div[1]/ytd-page-manager/ytd-browse[2]/ytd-two-column-browse-results-renderer/div[1]/ytd-section-list-renderer/div[2]/ytd-item-section-renderer[2]/div[3]/ytd-reel-shelf-renderer/div[2]/yt-horizontal-list-renderer/div[2]/div/div/ytm-shorts-lockup-view-model-v2[1]/ytm-shorts-lockup-view-model/div/div[2]/button/yt-touch-feedback-shape/div[2]`
      - `/html/body/ytd-app/div[1]/ytd-page-manager/ytd-browse[2]/ytd-two-column-browse-results-renderer/div[1]/ytd-section-list-renderer/div[2]/ytd-item-section-renderer[2]/div[3]/ytd-reel-shelf-renderer/div[2]/yt-horizontal-list-renderer/div[2]/div/div/ytm-shorts-lockup-view-model-v2[1]/ytm-shorts-lockup-view-model/div/div[2]`
      - `/html/body/ytd-app/div[1]/ytd-page-manager/ytd-browse[2]/ytd-two-column-browse-results-renderer/div[1]/ytd-section-list-renderer/div[2]/ytd-item-section-renderer[2]/div[3]/ytd-reel-shelf-renderer/div[2]/yt-horizontal-list-renderer/div[2]/div/div/ytm-shorts-lockup-view-model-v2[2]/ytm-shorts-lockup-view-model/div/div[2]/button/yt-touch-feedback-shape/div[2]`
      - `/html/body/ytd-app/div[1]/ytd-page-manager/ytd-browse[2]/ytd-two-column-browse-results-renderer/div[1]/ytd-section-list-renderer/div[2]/ytd-item-section-renderer[2]/div[3]/ytd-reel-shelf-renderer/div[2]/yt-horizontal-list-renderer/div[2]/div/div/ytm-shorts-lockup-view-model-v2[2]/ytm-shorts-lockup-view-model/div/div[2]`
    - '시청 기록에서 삭제' 누르기
      - `/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/yt-sheet-view-model/yt-contextual-sheet-layout/div[2]/yt-list-view-model/yt-list-item-view-model[5]/div/div[2]/div`
      - `/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/yt-sheet-view-model/yt-contextual-sheet-layout/div[2]/yt-list-view-model/yt-list-item-view-model[5]`
      - `/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/yt-sheet-view-model/yt-contextual-sheet-layout/div[2]/yt-list-view-model/yt-list-item-view-model[5]/div/div[2]/div`
      - `/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/yt-sheet-view-model/yt-contextual-sheet-layout/div[2]/yt-list-view-model/yt-list-item-view-model[5]`
- 일반 영상 기록 삭제
  - 오늘 날짜 롱폼
    - '...' 설정 버튼 누르기
      - `/html/body/ytd-app/div[1]/ytd-page-manager/ytd-browse[2]/ytd-two-column-browse-results-renderer/div[1]/ytd-section-list-renderer/div[2]/ytd-item-section-renderer[1]/div[3]/yt-lockup-view-model[1]/div/div/yt-lockup-metadata-view-model/div[3]/button-view-model/button/yt-touch-feedback-shape/div[2]`
      - `/html/body/ytd-app/div[1]/ytd-page-manager/ytd-browse[2]/ytd-two-column-browse-results-renderer/div[1]/ytd-section-list-renderer/div[2]/ytd-item-section-renderer[1]/div[3]/yt-lockup-view-model[1]/div/div/yt-lockup-metadata-view-model/div[3]`
      - `/html/body/ytd-app/div[1]/ytd-page-manager/ytd-browse[2]/ytd-two-column-browse-results-renderer/div[1]/ytd-section-list-renderer/div[2]/ytd-item-section-renderer[1]/div[3]/yt-lockup-view-model[2]/div/div/yt-lockup-metadata-view-model/div[3]/button-view-model/button/yt-touch-feedback-shape/div[2]`
      - `/html/body/ytd-app/div[1]/ytd-page-manager/ytd-browse[2]/ytd-two-column-browse-results-renderer/div[1]/ytd-section-list-renderer/div[2]/ytd-item-section-renderer[1]/div[3]/yt-lockup-view-model[2]/div/div/yt-lockup-metadata-view-model/div[3]/button-view-model`
    - '시청 기록에서 삭제' 누르기
      - `/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/yt-sheet-view-model/yt-contextual-sheet-layout/div[2]/yt-list-view-model/yt-list-item-view-model[5]/div/div[2]/div`
      - `/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/yt-sheet-view-model/yt-contextual-sheet-layout/div[2]/yt-list-view-model/yt-list-item-view-model[5]`
      - `/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/yt-sheet-view-model/yt-contextual-sheet-layout/div[2]/yt-list-view-model/yt-list-item-view-model[5]/div/div[2]/div`
      - `/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/yt-sheet-view-model/yt-contextual-sheet-layout/div[2]/yt-list-view-model/yt-list-item-view-model[5]`
  - 어제 날짜 롱폼
    - '...' 설정 버튼 누르기
      - `/html/body/ytd-app/div[1]/ytd-page-manager/ytd-browse[2]/ytd-two-column-browse-results-renderer/div[1]/ytd-section-list-renderer/div[2]/ytd-item-section-renderer[2]/div[3]/yt-lockup-view-model[1]/div/div/yt-lockup-metadata-view-model/div[3]/button-view-model/button/yt-touch-feedback-shape/div[2]`
      - `/html/body/ytd-app/div[1]/ytd-page-manager/ytd-browse[2]/ytd-two-column-browse-results-renderer/div[1]/ytd-section-list-renderer/div[2]/ytd-item-section-renderer[2]/div[3]/yt-lockup-view-model[1]/div/div/yt-lockup-metadata-view-model/div[3]`
      - `/html/body/ytd-app/div[1]/ytd-page-manager/ytd-browse[2]/ytd-two-column-browse-results-renderer/div[1]/ytd-section-list-renderer/div[2]/ytd-item-section-renderer[2]/div[3]/yt-lockup-view-model[2]/div/div/yt-lockup-metadata-view-model/div[3]/button-view-model/button/yt-touch-feedback-shape/div[2]`
      - `/html/body/ytd-app/div[1]/ytd-page-manager/ytd-browse[2]/ytd-two-column-browse-results-renderer/div[1]/ytd-section-list-renderer/div[2]/ytd-item-section-renderer[2]/div[3]/yt-lockup-view-model[2]/div/div/yt-lockup-metadata-view-model/div[3]`
    - '시청 기록에서 삭제' 누르기
      - `/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/yt-sheet-view-model/yt-contextual-sheet-layout/div[2]/yt-list-view-model/yt-list-item-view-model[5]/div/div[2]/div`
      - `/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/yt-sheet-view-model/yt-contextual-sheet-layout/div[2]/yt-list-view-model/yt-list-item-view-model[5]`
      - `/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/yt-sheet-view-model/yt-contextual-sheet-layout/div[2]/yt-list-view-model/yt-list-item-view-model[5]/div/div[2]/div`
      - `/html/body/ytd-app/ytd-popup-container/tp-yt-iron-dropdown/div/yt-sheet-view-model/yt-contextual-sheet-layout/div[2]/yt-list-view-model/yt-list-item-view-model[5]`

---

## 2. 요구사항

### 2-1. Delete 키로 시청기록 삭제
- 사용자가 YouTube 시청기록 페이지에서 영상 위에 마우스를 호버
- Delete 키(또는 Backspace)를 누르면 해당 영상이 시청기록에서 삭제됨
- 숏폼 영상과 일반 영상 모두 동일하게 동작

### 2-2. 삭제 동작 구현
- '...' 버튼 클릭 → 메뉴 열림 → '시청 기록에서 삭제' 클릭 자동화
- 또는: YouTube API/내부 함수 직접 호출 가능 여부 조사

#### 2-2-1. 신경써야 할 부분
- 요즈음 chrome extension 만드는 방법이 무엇인지 조사 필요
  - 윈도우 앱 만드는데 사용하는게 electron 인 것 처럼, 잘 포장해주고 사람들이 많이 쓰는 lib 가 무엇인지 조사 필요
- YouTube는 SPA이므로 페이지 네비게이션 시 이벤트 리스너 재등록 필요
- 무한 스크롤로 동적 로딩되는 아이템 처리
- 삭제 후 DOM 변경으로 인한 에러 핸들링

#### 2-2-2. 우선적으로 참조/확인할 파일
- YouTube 시청기록 페이지 실제 DOM 구조 (puppeteer 이던, playwright 이던 직접 확인 필요)
- Chrome Extension Manifest V3 스펙

### 2-3. Chrome 웹 스토어 업로드 문서화
- 개발 완료 후 Chrome 웹 스토어 업로드 방법 문서화 필요
- 포함 내용: 개발자 계정 등록, 패키지 준비, 업로드 절차, 스토어 정보 입력, 심사 제출

---

(하위 부분은 사람이 작성하는게 아니라 AI 가 작성하는 부분)

# AI 결과

## 3. (AI가 확인한) 기존 코드/구현의 핵심내용들/의도들

### 3-1. YouTube 시청기록 페이지 DOM 구조 (puppeteer로 검증됨, 2026-01-02)

#### 3-1-1. 숏폼 영상 (Shorts)
- 컨테이너: `ytd-reel-shelf-renderer`
- 개별 아이템: `ytm-shorts-lockup-view-model-v2` > `ytm-shorts-lockup-view-model`
- 메뉴 버튼('...'): `.shortsLockupViewModelHostOutsideMetadataMenu button`
- 버튼 aria-label: "추가 작업"

#### 3-1-2. 일반 영상
- 컨테이너: `yt-lockup-view-model`
- 메뉴 버튼('...'): `.yt-lockup-metadata-view-model__menu-button button`
- 버튼 aria-label: "추가 작업"

#### 3-1-3. 팝업 메뉴 구조
- 팝업 컨테이너: `ytd-popup-container > tp-yt-iron-dropdown`
- 메뉴 리스트: `yt-list-view-model`
- 각 메뉴 아이템: `yt-list-item-view-model`

#### 3-1-4. 메뉴 항목 비교 (숏폼 vs 일반)
| 순서 | 숏폼 메뉴 | 일반 영상 메뉴 |
|------|-----------|---------------|
| 1 | 현재 재생목록에 추가 | 현재 재생목록에 추가 |
| 2 | 나중에 볼 동영상에 저장 | 나중에 볼 동영상에 저장 |
| 3 | 재생목록에 저장 | 재생목록에 저장 |
| 4 | 공유 | 공유 |
| **5** | **시청 기록에서 삭제** | **시청 기록에서 삭제** |
| 6 | 의견 보내기 | (없음) |

- 숏폼: 6개 메뉴, 일반: 5개 메뉴
- **삭제 버튼은 둘 다 5번째** → `yt-list-item-view-model:nth-child(5)` 사용 가능
- 안전한 방법: 텍스트 "시청 기록에서 삭제" 포함하는 요소 찾기

#### 3-1-5. 삭제 성공 토스트
- 위치: `ytd-popup-container > yt-notification-action-renderer > tp-yt-paper-toast`

### 3-2. Chrome Extension 기술 스택 (2025년 기준)

#### 3-2-1. Chrome Extension Manifest V3
- 2024년부터 MV2 deprecated, MV3 필수
- Service Worker 기반 background script (persistent background page 없음)
- Content Script로 페이지 DOM 조작

#### 3-2-2. 프레임워크 비교
| 프레임워크 | 특징 | 추천도 |
|------------|------|--------|
| **WXT** | Vite 기반, TypeScript 지원, HMR, 크로스 브라우저 | ★★★★★ |
| **Plasmo** | React 친화적, 자동 설정 | ★★★★ |
| **순수 MV3** | 의존성 없음, 단순 | ★★★ |

- 사용자 선택: **WXT + TypeScript**

---

## 4. 생각한 수정 방안들 (ai 가 생각하기에) 구현에 필요한 핵심 변경점

### 4-1. 방안 A: 클릭 시뮬레이션 방식
- **How**: Delete 키 감지 → 호버된 아이템의 '...' 버튼 클릭 → 메뉴에서 '시청 기록에서 삭제' 클릭
- **Why**: YouTube 내부 API 의존 없이 사용자 행동 그대로 재현
- **장점**: 안정적, YouTube 업데이트에 덜 민감
- **단점**: 메뉴 열고 닫는 동안 시각적 깜빡임

```javascript
// 의사코드
hoveredItem.querySelector('button[aria-label="추가 작업"]').click();
await waitForPopup();
document.querySelector('yt-list-item-view-model:nth-child(5)').click();
```

### 4-2. 방안 B: YouTube 내부 API 호출 방식
- **How**: YouTube의 내부 함수/이벤트 시스템을 찾아서 직접 삭제 요청
- **Why**: UI 조작 없이 깔끔하게 삭제
- **장점**: 빠름, 깜빡임 없음
- **단점**: YouTube 업데이트 시 깨질 가능성 높음, 리버스 엔지니어링 필요

### 4-3. 방안 C: 하이브리드 방식 (추천)
- **How**:
  1. 먼저 내부 API 시도 (있으면 사용)
  2. 실패 시 클릭 시뮬레이션으로 fallback
- **Why**: 최적의 UX + 안정성 모두 확보
- **장점**: 빠르고 안정적
- **단점**: 구현 복잡도 증가

### 4-4. 핵심 구현 포인트

#### 4-4-1. 호버 감지
```javascript
// mouseover 이벤트로 현재 호버된 아이템 추적
let hoveredItem = null;
document.addEventListener('mouseover', (e) => {
  const item = e.target.closest('ytm-shorts-lockup-view-model, yt-lockup-view-model');
  if (item) hoveredItem = item;
});
```

#### 4-4-2. Delete 키 감지
```javascript
document.addEventListener('keydown', (e) => {
  if (e.key === 'Delete' && hoveredItem) {
    deleteFromHistory(hoveredItem);
  }
});
```

#### 4-4-3. SPA 대응 (URL 변경 감지)
```javascript
// YouTube는 SPA이므로 페이지 변경 감지 필요
const observer = new MutationObserver(() => {
  if (location.pathname === '/feed/history') {
    initExtension();
  }
});
```

---

## 5. 최종 결정된 수정 방안 (AI 가 자동 진행하면 안되고 **무조건**/**MUST** 사람에게 선택/결정을 맡겨야 한다)

### 5-1. 사용자 선택 (2026-01-02)
- **구현 방식**: B - YouTube 내부 API 직접 호출
- **프레임워크**: WXT + TypeScript
- **추가 요구사항**: Chrome 웹 스토어 업로드 문서화

### 5-2. 결정 이유
- **Internal API Only 선택 이유**: UI 조작 없이 빠르고 깔끔한 삭제 경험 제공. 메뉴 깜빡임 없음.
- **WXT 선택 이유**: TypeScript 기본 지원, HMR로 개발 편의성, 나중에 기능 확장 용이

---

## 6. 코드 수정 요약

YouTube Internal API를 사용하여 Delete 키로 시청기록 삭제 기능 구현

### 6-1. TypeScript 타입 정의
- [x] `src/lib/types.ts` 생성
  - InnerTubeConfig, InnerTubeContext, FeedbackRequest, FeedbackResponse 타입 정의
  - VideoItemType, VideoItemData 타입 정의
  - VIDEO_ITEM_SELECTORS 상수 정의

### 6-2. YouTube API Adapter 구현 (Facade 패턴)
- [x] `src/lib/youtube-api.ts` 생성
  - YouTubeAPIAdapter 클래스 (Facade 패턴)
  - extractInnerTubeConfig: window.ytcfg에서 API 설정 추출
  - extractFeedbackToken: DOM Polymer 데이터에서 토큰 추출
  - deleteFromHistory: /youtubei/v1/feedback API 호출
  - findVideoItemElement: 비디오 아이템 요소 탐색

### 6-3. Content Script 구현
- [x] `src/entrypoints/content.ts` 수정
  - URL match: *://www.youtube.com/* (SPA 네비게이션 대응)
  - setupHoverTracking: mouseover/mouseout 이벤트로 호버 추적
  - setupKeyboardListener: Delete/Backspace 키 감지
  - deleteByClickSimulation: API 실패 시 클릭 시뮬레이션 fallback
  - setupNavigationObserver: SPA 네비게이션 감지

### 6-4. 빌드 및 테스트
- [x] `make build` 성공 확인 (49.57 kB)
- [ ] 실제 YouTube 시청기록 페이지에서 동작 테스트

### 6-5. 프로젝트 설정
- [x] `Makefile` 생성 (install, lint, test, build, dev, clean, zip 타겟)
- [x] `eslint.config.mjs` 생성 (typescript-eslint 설정)
- [x] `package.json` 업데이트 (eslint, typescript-eslint 의존성 추가)

---

## 7. 문제 해결에 참고

TODO
