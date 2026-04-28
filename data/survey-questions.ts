export interface SurveyQuestion {
  typeIndex: number; // 0~4 (어떤 유형 점수에 반영할지)
  question: string;
  weight: number;
}

export interface SurveyType {
  name: string;
  image: string;
}

export const surveyTypes: SurveyType[] = [
  { name: "사회형 공감 사서",    image: "/survey/1.png" },
  { name: "책벌레 척척박사",     image: "/survey/2.png" },
  { name: "뚝딱 콘텐츠 제작자", image: "/survey/3.png" },
  { name: "전략적인 경영가",     image: "/survey/4.png" },
  { name: "글로벌 탐험가",       image: "/survey/5.png" },
];

// 5개 유형을 라운드별로 교차 배치 (유형이 드러나지 않도록)
export const surveyQuestions: SurveyQuestion[] = [
  // Round 1
  { typeIndex: 0, question: "나는 남을 돕는 일에 관심이 있는 편이다.",                           weight: 3 },
  { typeIndex: 1, question: "나는 조용한 환경을 선호하는 편이다.",                               weight: 1 },
  { typeIndex: 2, question: "나는 유행에 민감한 편이다.",                                         weight: 3 },
  { typeIndex: 3, question: "나는 직접 조직을 운영해보고 싶은 욕심이 있다.",                     weight: 2 },
  { typeIndex: 4, question: "나는 다양한 사회 문제에 관심이 많으며, 평등한 사회를 지향한다.",   weight: 1 },
  // Round 2
  { typeIndex: 0, question: "나는 사람들과의 교류에서 에너지를 얻는 편이다.",                   weight: 1 },
  { typeIndex: 1, question: "나는 탐구하거나 분석하는 일을 좋아한다.",                           weight: 3 },
  { typeIndex: 2, question: "나는 출판 분야에 관심이 있다.",                                     weight: 2 },
  { typeIndex: 3, question: "나는 평소에 돈 관리를 꾸준히 하는 편이다.",                         weight: 1 },
  { typeIndex: 4, question: "나는 해외에서 일해보고 싶다.",                                       weight: 3 },
  // Round 3
  { typeIndex: 0, question: "나는 친구의 고민을 잘 들어주고 공감을 잘 해준다.",                 weight: 2 },
  { typeIndex: 1, question: "나는 1년에 3권 이상의 책을 꾸준히 읽는 편이다.",                   weight: 2 },
  { typeIndex: 2, question: "나는 영상을 직접 촬영하고 제작하는 데 흥미를 느낀다.",             weight: 1 },
  { typeIndex: 3, question: "나는 상황에 맞춰 세부적인 계획을 미리 세우는 편이다.",             weight: 3 },
  { typeIndex: 4, question: "나는 새로운 언어를 배우는 것에 흥미를 느낀다.",                     weight: 2 },
];
