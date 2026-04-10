export interface KdcCategory {
  id: string;
  code: string;
  name: string;
  color: string;
}

export interface Book {
  id: string;
  title: string;
  correctCategoryId: string;
  hint: string;
}

export const kdcCategories: KdcCategory[] = [
  { id: "cat0", code: "0류", name: "총류", color: "bg-gray-100 border-gray-400" },
  { id: "cat1", code: "1류", name: "철학", color: "bg-purple-100 border-purple-400" },
  { id: "cat2", code: "2류", name: "종교", color: "bg-yellow-100 border-yellow-400" },
  { id: "cat3", code: "3류", name: "사회과학", color: "bg-blue-100 border-blue-400" },
  { id: "cat4", code: "4류", name: "자연과학", color: "bg-green-100 border-green-400" },
  { id: "cat5", code: "5류", name: "기술과학", color: "bg-orange-100 border-orange-400" },
  { id: "cat6", code: "6류", name: "예술", color: "bg-pink-100 border-pink-400" },
  { id: "cat7", code: "7류", name: "언어", color: "bg-indigo-100 border-indigo-400" },
  { id: "cat8", code: "8류", name: "문학", color: "bg-red-100 border-red-400" },
  { id: "cat9", code: "9류", name: "역사", color: "bg-amber-100 border-amber-400" },
];

export const books: Book[] = [
  {
    id: "book1",
    title: "소크라테스의 변명",
    correctCategoryId: "cat1",
    hint: "고대 그리스 철학자의 이야기",
  },
  {
    id: "book2",
    title: "성경",
    correctCategoryId: "cat2",
    hint: "기독교의 경전",
  },
  {
    id: "book3",
    title: "경제학 원론",
    correctCategoryId: "cat3",
    hint: "사회의 자원 배분을 다루는 학문",
  },
  {
    id: "book4",
    title: "파이썬 프로그래밍",
    correctCategoryId: "cat5",
    hint: "컴퓨터 언어를 배우는 책",
  },
  {
    id: "book5",
    title: "한국어 문법",
    correctCategoryId: "cat7",
    hint: "우리말의 규칙과 구조",
  },
  {
    id: "book6",
    title: "삼국유사",
    correctCategoryId: "cat9",
    hint: "고려시대 역사서",
  },
  {
    id: "book7",
    title: "동물의 세계",
    correctCategoryId: "cat4",
    hint: "생물과 자연현상을 탐구",
  },
];
