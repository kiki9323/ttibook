# 띠북띠북씰
Poke API를 사용하여 포켓몬 도감, 랜덤 뽑기, CRUD 구현

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

## 워크플로우 및 구현 패턴
- 상황: 한 ui에 보여줘야 할 데이터가 2개의 엔드포인트에 각각 존재 하는 경우.
- 
- 이슈 버그
  (code)

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
