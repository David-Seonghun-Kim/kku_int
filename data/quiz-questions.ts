export interface QuizQuestion {
  id: number;
  question: string;
  answer: boolean; // true = O, false = X
  explanation: string;
}

export const quizQuestions: QuizQuestion[] = [
  {
    id: 1,
    question: "KDC는 '한국십진분류법'의 약자이다.",
    answer: true,
    explanation: "KDC(Korean Decimal Classification)는 한국도서관협회가 제정한 한국십진분류법입니다.",
  },
  {
    id: 2,
    question: "듀이십진분류법(DDC)은 한국에서 만든 도서 분류법이다.",
    answer: false,
    explanation: "DDC는 1876년 미국의 멜빌 듀이(Melvil Dewey)가 개발한 분류법입니다.",
  },
  {
    id: 3,
    question: "국립중앙도서관은 대한민국의 국가 대표 도서관이다.",
    answer: true,
    explanation: "국립중앙도서관은 도서관법에 따라 국가 문헌정보의 수집·보존·서비스를 담당하는 국가 대표 도서관입니다.",
  },
  {
    id: 4,
    question: "메타데이터(Metadata)란 데이터에 대한 데이터를 의미한다.",
    answer: true,
    explanation: "메타데이터는 다른 데이터를 설명하는 데이터로, 도서의 저자·제목·출판년도 등이 해당됩니다.",
  },
  {
    id: 5,
    question: "사서는 도서관에서만 근무할 수 있다.",
    answer: false,
    explanation: "사서는 도서관 외에도 기업 정보센터, 병원 의학도서관, 학교, 정부기관, 아카이브 등 다양한 곳에서 근무합니다.",
  },
  {
    id: 6,
    question: "ISBN은 국제 표준 도서 번호의 약자이다.",
    answer: true,
    explanation: "ISBN(International Standard Book Number)은 도서에 부여되는 13자리의 국제 표준 번호입니다.",
  },
  {
    id: 7,
    question: "시소러스(Thesaurus)는 단어 간의 관계(동의어, 반의어 등)를 정리한 어휘 도구이다.",
    answer: true,
    explanation: "시소러스는 정보 검색에서 검색어의 관계를 표현하기 위해 사용하는 통제 어휘 목록입니다.",
  },
  {
    id: 8,
    question: "공공도서관은 누구나 무료로 이용할 수 없다.",
    answer: false,
    explanation: "도서관법에 따라 공공도서관은 모든 국민이 무료로 이용할 수 있습니다.",
  },
  {
    id: 9,
    question: "정보 리터러시(Information Literacy)는 정보를 찾고, 평가하고, 활용하는 능력을 의미한다.",
    answer: true,
    explanation: "정보 리터러시는 현대 사회에서 문헌정보학의 핵심 개념 중 하나입니다.",
  },
  {
    id: 10,
    question: "OPAC은 도서관 온라인 목록 검색 시스템을 뜻한다.",
    answer: true,
    explanation: "OPAC(Online Public Access Catalog)은 도서관 소장 자료를 온라인으로 검색할 수 있는 공개 목록 시스템입니다.",
  },
];
