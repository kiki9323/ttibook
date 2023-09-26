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
- 어려웠던 기능
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

## 화면 캡쳐  
![image](https://github.com/kiki9323/ttibook/assets/77960430/1e74ba09-9ecc-4b67-b320-7aeec7f30bf1)  
* 무한 스크롤
* 상세 페이지 이동

![image](https://github.com/kiki9323/ttibook/assets/77960430/31068535-242a-4a10-85bc-b095d704050c)
* chartjs 라이브러리 사용

https://github.com/kiki9323/ttibook/assets/77960430/051a3b12-275a-4097-97dc-8f61251dd41d
* 랜덤 뽑기
  
![스크린샷 2023-09-10 오후 8 23 36](https://github.com/kiki9323/ttibook/assets/77960430/88b79d7f-e9dd-4b1f-b08d-6b86e7b62ec0)
* localStrage 캐싱
* 검색 기능
* 모달
