"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import GameCard from "@/components/GameCard";
import { getScores, clearScores, getSurveyResult, clearSurveyResult, type Scores } from "@/lib/score-store";
import { surveyTypes } from "@/data/survey-questions";

export default function Home() {
  const router = useRouter();
  const [scores, setScores] = useState<Scores>({ game1: null, game2: null, game3: null });
  const [surveyResult, setSurveyResult] = useState<number | null>(null);

  useEffect(() => {
    setScores(getScores());
    setSurveyResult(getSurveyResult());
  }, []);

  const allCompleted =
    scores.game1 !== null && scores.game2 !== null && scores.game3 !== null;

  function handleReset() {
    clearScores();
    clearSurveyResult();
    setScores({ game1: null, game2: null, game3: null });
    setSurveyResult(null);
  }

  return (
    <main className="flex flex-col px-4 pt-8 pb-10">
      {/* 헤더 */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-[#003087] rounded-2xl mb-4 shadow-lg">
          <span className="text-4xl">📚</span>
        </div>
        <h1 className="text-2xl font-bold text-[#003087] leading-tight">
          건국대학교
          <br />
          문헌정보학과
        </h1>
        <p className="text-sm text-gray-500 mt-2">전공박람회 미니게임</p>
      </div>

      {/* 게임 카드 목록 */}
      <div className="space-y-4 mb-8">
        <GameCard
          href="/survey"
          icon="🐱"
          title="나에게 딱 맞는 전공은?"
          description="15개의 질문으로 내 성격에 맞는 전공 찾기"
          completed={surveyResult !== null}
          completedLabel={surveyResult !== null ? surveyTypes[surveyResult].name : undefined}
          color="border-orange-300 bg-orange-50 hover:bg-orange-100"
        />
        <GameCard
          href="/game1"
          icon="❓"
          title="O/X 퀴즈"
          description="문헌정보학 상식 10문제에 도전!"
          completed={scores.game1 !== null}
          score={scores.game1}
          color="border-blue-300 bg-blue-50 hover:bg-blue-100"
        />
        <GameCard
          href="/game2"
          icon="🗂️"
          title="KDC 분류 챌린지"
          description="책을 올바른 KDC 분류에 배치하세요"
          completed={scores.game2 !== null}
          score={scores.game2}
          color="border-green-300 bg-green-50 hover:bg-green-100"
        />
        <GameCard
          href="/game3"
          icon="⌨️"
          title="키워드 타이핑"
          description="문헌정보학 용어를 빠르게 타이핑하세요"
          completed={scores.game3 !== null}
          score={scores.game3}
          color="border-purple-300 bg-purple-50 hover:bg-purple-100"
        />
      </div>

      {/* 결과 보기 / 초기화 버튼 */}
      {allCompleted ? (
        <div className="space-y-3">
          <button
            onClick={() => router.push("/result")}
            className="w-full py-4 bg-[#003087] text-white font-bold rounded-2xl text-lg shadow-md active:scale-95 transition-transform"
          >
            🏆 최종 결과 보기
          </button>
          <button
            onClick={handleReset}
            className="w-full py-3 bg-gray-100 text-gray-600 font-medium rounded-2xl text-sm active:scale-95 transition-transform"
          >
            처음부터 다시 하기
          </button>
        </div>
      ) : (
        <p className="text-center text-sm text-gray-400">
          설문조사와 3개 게임을 모두 완료하면 최종 결과를 확인할 수 있어요!
        </p>
      )}
    </main>
  );
}
