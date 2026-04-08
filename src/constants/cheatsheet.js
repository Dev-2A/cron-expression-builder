export const CHEATSHEET = [
  {
    title: "기본 문법",
    rows: [
      {
        symbol: "*",
        meaning: "모든 값",
        example: "* * * * *",
        desc: "매분 실행",
      },
      {
        symbol: ",",
        meaning: "여러 값 나열",
        example: "0 9,18 * * *",
        desc: "9시, 18시",
      },
      {
        symbol: "-",
        meaning: "범위 지정",
        example: "0 9-18 * * *",
        desc: "9시~18시 매시",
      },
      {
        symbol: "/",
        meaning: "간격 지정",
        example: "*/15 * * * *",
        desc: "15분마다",
      },
    ],
  },
  {
    title: "필드 범위",
    rows: [
      {
        symbol: "분",
        meaning: "0 - 59",
        example: "30 * * * *",
        desc: "매시 30분",
      },
      {
        symbol: "시",
        meaning: "0 - 23",
        example: "* 9 * * *",
        desc: "오전 9시",
      },
      {
        symbol: "일",
        meaning: "1 - 31",
        example: "* * 15 * *",
        desc: "매월 15일",
      },
      { symbol: "월", meaning: "1 - 12", example: "* * * 6 *", desc: "6월" },
      {
        symbol: "요일",
        meaning: "0 - 6 (일~토)",
        example: "* * * * 1",
        desc: "월요일",
      },
    ],
  },
  {
    title: "조합 패턴",
    rows: [
      {
        symbol: "*/N",
        meaning: "N 간격마다",
        example: "*/10 * * * *",
        desc: "10분마다",
      },
      {
        symbol: "A-B/N",
        meaning: "A~B 범위에서 N 간격",
        example: "0 9-17/2 * * *",
        desc: "9~17시 2시간마다",
      },
      {
        symbol: "A,B,C",
        meaning: "특정 값 나열",
        example: "0 0 1,15 * *",
        desc: "1일, 15일 자정",
      },
      {
        symbol: "A-B",
        meaning: "연속 범위",
        example: "0 9 * * 1-5",
        desc: "월~금 9시",
      },
    ],
  },
  {
    title: "자주 쓰는 예제",
    rows: [
      { symbol: "매분", meaning: "* * * * *", example: "", desc: "테스트용" },
      { symbol: "매시", meaning: "0 * * * *", example: "", desc: "모니터링" },
      {
        symbol: "매일 자정",
        meaning: "0 0 * * *",
        example: "",
        desc: "DB 백업, 로그 정리",
      },
      {
        symbol: "평일 9시",
        meaning: "0 9 * * 1-5",
        example: "",
        desc: "업무 알림",
      },
      {
        symbol: "매월 1일",
        meaning: "0 0 1 * *",
        example: "",
        desc: "월간 리포트",
      },
      {
        symbol: "매년 1/1",
        meaning: "0 0 1 1 *",
        example: "",
        desc: "연간 작업",
      },
    ],
  },
];

export const FIELD_ORDER_DIAGRAM = [
  { label: "분", range: "0-59", position: 1 },
  { label: "시", range: "0-23", position: 2 },
  { label: "일", range: "1-31", position: 3 },
  { label: "월", range: "1-12", position: 4 },
  { label: "요일", range: "0-6", position: 5 },
];
