# 건국대 문헌정보학과 전공박람회 게임 웹페이지

## 프로젝트 개요
건국대학교 문헌정보학과 전공박람회에서 QR코드로 접속하는 모바일 웹 게임 페이지.
신입생/관심 학생들에게 학과를 재미있게 소개하는 인터랙티브 경험 제공.

## 기술 스택
- **Framework**: Next.js 15 (App Router)
- **Styling**: Tailwind CSS v4
- **Language**: TypeScript
- **Drag-and-drop**: @dnd-kit/core (모바일 터치 지원)
- **상태관리**: React useState (sessionStorage로 점수 유지)

## 게임 구성
| 경로 | 게임 | 점수 |
|------|------|------|
| `/game1` | 문헌정보학 O/X 퀴즈 (10문제) | 최대 100점 |
| `/game2` | KDC 책 분류 챌린지 (드래그앤드롭) | 최대 100점 |
| `/game3` | 문헌정보학 키워드 타이핑 게임 | 최대 100점 |
| `/result` | 총점 + 학과 소개 | - |

## 폴더 구조
```
app/            # Next.js App Router 페이지
components/     # 공통 UI 컴포넌트
data/           # 게임 데이터 (퀴즈 문제, KDC 분류, 키워드)
lib/            # 유틸리티 (점수 관리)
```

## 개발 명령어
```bash
npm run dev     # 개발 서버 (localhost:3000)
npm run build   # 프로덕션 빌드
npm run lint    # ESLint 검사
```

## 디자인 원칙
- **모바일 퍼스트**: max-width 430px 고정, QR코드 접속 최적화
- **메인 컬러**: 건국대 파란색 (#003087)
- **폰트**: Noto Sans KR (한국어 최적화)
- 게임 데이터는 `data/` 폴더에서 관리, 문제 추가/수정 용이

## 점수 관리
- `sessionStorage`에 `{game1, game2, game3}` 저장
- `lib/score-store.ts`의 `saveScore()` / `getScores()` 함수 사용
- 창 닫으면 초기화 (개인정보 미수집)
