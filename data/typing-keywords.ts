export interface TypingKeyword {
  id: number;
  word: string;
  meaning: string;
}

export const typingKeywords: TypingKeyword[] = [
  { id: 1, word: "메타데이터", meaning: "데이터에 대한 데이터" },
  { id: 2, word: "시소러스", meaning: "통제 어휘 목록" },
  { id: 3, word: "정보검색", meaning: "필요한 정보를 찾는 과정" },
  { id: 4, word: "목록분류법", meaning: "자료를 체계적으로 정리하는 방법" },
  { id: 5, word: "사서", meaning: "도서관 전문직" },
  { id: 6, word: "문헌정보학", meaning: "정보와 도서관을 연구하는 학문" },
  { id: 7, word: "아카이브", meaning: "기록물 보존 시설" },
  { id: 8, word: "색인", meaning: "자료를 찾기 쉽게 만든 목록" },
  { id: 9, word: "서지학", meaning: "도서의 역사와 형태를 연구하는 학문" },
  { id: 10, word: "디지털도서관", meaning: "전자 자료를 제공하는 도서관" },
  { id: 11, word: "정보리터러시", meaning: "정보를 찾고 평가하는 능력" },
  { id: 12, word: "온톨로지", meaning: "개념 간 관계를 정의한 지식 구조" },
];
