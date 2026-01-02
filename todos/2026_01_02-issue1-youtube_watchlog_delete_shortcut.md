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

---

(하위 부분은 사람이 작성하는게 아니라 AI 가 작성하는 부분)

# AI 결과

## 3. (AI가 확인한) 기존 코드/구현의 핵심내용들/의도들

TODO

---

## 4. 생각한 수정 방안들 (ai 가 생각하기에) 구현에 필요한 핵심 변경점

TODO

---

## 5. 최종 결정된 수정 방안 (AI 가 자동 진행하면 안되고 **무조건**/**MUST** 사람에게 선택/결정을 맡겨야 한다)

TODO

---

## 6. 코드 수정 요약

TODO

---

## 7. 문제 해결에 참고

TODO
