# getNumberLOTTO

1부터 45까지의 숫자로 로또 번호 5줄을 만들고, 원하는 중복 방식을 선택할 수 있는 웹 앱입니다.

**바로 실행:** [GitHub Pages](https://devkimms.github.io/getNumberLOTTO/)

## 특징

- 한 줄에 중복 없는 번호 6개
- 한 번에 5줄 생성
- 다섯 줄 전체 30개 중복 없음 또는 각 줄 내부 중복 없음 선택
- 동행복권 공식 최신·이전 회차 당첨번호 확인
- Web Crypto API를 이용한 무작위 추첨
- 링크 방문 누적 카운터
- 스크롤 없이 한 화면에 맞는 모바일·데스크톱 반응형 UI

## 실행

Node.js 22.13 이상이 필요합니다.

```bash
npm install
npm run dev
```

GitHub Pages용 정적 결과물은 `npm run build:pages`로 생성할 수 있습니다.

## 검증

```bash
npm test
```

## 라이선스

[MIT](./LICENSE)
