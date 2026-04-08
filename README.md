# ⏰ Cron Expression Builder

> GUI로 조합하고, 자연어로 확인하는 크론 표현식 시각화 도구

[![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-blue?logo=github)](https://dev-2a.github.io/cron-expression-builder/)
[![License](https://img.shields.io/badge/license-MIT-green)](./LICENSE)

**"개발자가 자주 쓰지만 매번 헷갈리는 문법을 시각화하는 도구"** 시리즈

🔗 **Live Demo**: [https://dev-2a.github.io/cron-expression-builder/](https://dev-2a.github.io/cron-expression-builder/)

---

## ✨ 주요 기능

- **GUI 빌더** — 분/시/일/월/요일 5개 필드를 매번·특정 값·범위·간격 4가지 타입으로 조합
- **양방향 동기화** — 표현식 직접 입력 ↔ GUI 실시간 동기화, 커서 위치 기반 필드 하이라이트
- **자연어 설명** — 전체 요약 + 필드별 분해 설명 자동 생성 (한국어)
- **실행 시간 미리보기** — 다음 5/10/20회 실행 시간 계산, 상대 시간 표시
- **프리셋 예제** — 기본·업무·주기·월간/연간·새벽/야간 5개 카테고리 20개 프리셋
- **크론 치트시트** — 기본 문법·필드 범위·조합 패턴·자주 쓰는 예제 + 필드 순서 다이어그램
- **공유 기능** — URL 쿼리 파라미터로 표현식 공유 (`?expr=0+9+*+*+1-5`)
- **다크/라이트 모드** — 시스템 설정 감지 + 수동 전환 + localStorage 저장
- **반응형 디자인** — 모바일/태블릿/데스크톱 대응

---

## 🛠️ 기술 스택

| 분류 | 기술 |
| --- | --- |
| Framework | React 19 + Vite |
| Styling | Tailwind CSS v4 + CSS Variables |
| Cron 파싱 | cron-parser |
| 자연어 변환 | cronstrue (i18n 한국어) |
| 배포 | GitHub Pages |

---

## 🚀 로컬 실행

```bash
git clone https://github.com/Dev-2A/cron-expression-builder.git
cd cron-expression-builder
npm install
npm run dev
```

---

## 📁 프로젝트 구조

```text
src/
├── components/
│   ├── Builder/         # GUI 필드 선택 (CronInput, CronBuilder, FieldSelector)
│   ├── Preview/         # 자연어 설명 + 실행 시간 미리보기
│   ├── Preset/          # 프리셋 예제 패널
│   ├── CheatSheet/      # 치트시트 패널
│   └── Layout/          # Header, Footer, ShareButton, ThemeToggle
├── hooks/               # useCron, useTheme, useUrlSync
├── utils/               # cronParser, cronValidator, cronSchedule, cronDescriptor
├── constants/           # cronFields, presets, cheatsheet
├── App.jsx
├── index.css
└── main.jsx
```

---

## 📸 스크린샷

### 다크 모드

![dark](./docs/dark.png)

### 라이트 모드

![light](./docs/light.png)

> 실제 스크린샷으로 교체 예정

---

## 🔗 관련 프로젝트

- [Regex Playground](https://github.com/Dev-2A/regex-playground) — 정규표현식 시각화 도구 (자매작)

---

## 📄 License

[MIT](./LICENSE)

---

Made with 🥤 and 💙 by [Dev-2A](https://github.com/Dev-2A)
