# getNumberLOTTO

1부터 45까지의 숫자 중 **총 30개가 서로 겹치지 않는** 로또 번호 5줄을 생성하는 웹 앱입니다.

## 특징

- 한 줄에 중복 없는 번호 6개
- 한 번에 5줄 생성
- 다섯 줄 전체 30개 번호도 중복 없음
- Web Crypto API를 이용한 무작위 추첨
- 실제 누적 방문자 카운터
- 모바일·데스크톱 반응형 UI

## 실행

Node.js 22.13 이상이 필요합니다.

```bash
npm install
npm run dev
```

## 검증

```bash
npm test
```

## 라이선스

[MIT](./LICENSE)
