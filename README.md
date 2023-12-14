# 띠북띠북씰
Poke API를 사용하여 포켓몬 도감, 랜덤 뽑기, CRUD 구현
https://ttiboo-ttibook.netlify.app/

## 프로젝트 폴더 구조 
```
📂 src
├── 📂 api
├── 📂 assets
│   ├── 📂 scss
│   └── 📂 svg
├── 📂 components
└── 📂 context
└── 📂 hooks
└── 📂 layout
└── 📂 pages
└── 📂 utils
└── App.jsx
└── main.jsx
```

## 기술
- React + Vite  
- axios + react-query
- chartjs 차트 라이브러리
- stylelint, eslint, prettier 사용

## 기능 구현
- 무한 스크롤
- 상세 페이지
- CRUD (추가, 삭제, 좋아요 기능)
- localStroage 캐싱 활용
- 다크모드
- stat 별 차트 구현
- dom-to-image 이미지 다운로드 구현
- 모달

## 설치과정
* 개발환경: mac OS
* Node.js v18.16.0
* 실행  
  ```js
  npm install
  npm run dev
  ```
  
## 회고

1. CORS 에러
* 처음엔 node.js로 프록시 서버 설정하여 해결하였으나, axios 프록시 서버 설정하여 해결

2. Axios 전역 설정
* 인스턴스 생성 및 인터셉터를 사용

3. Promise.all
* 1. promise.get 처럼 data 값이 아닌, promise 배열들을 반환하는 걸 알게 됨.
상황: 하나의 UI에 필요한 데이터가 두 개의 엔드포인트에 존재.
해결: promise.all 사용하여 2개의 엔드포인트의 데이터를 불러오고 가공하여 사용 (가공js들은 utils, hooks로 뺌.)

