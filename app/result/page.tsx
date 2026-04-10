"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getScores, clearScores, getTotalScore, type Scores } from "@/lib/score-store";
import DepartmentInfo from "@/components/DepartmentInfo";

function getResultMessage(total: number): { emoji: string; title: string; message: string } {
  if (total >= 270) {
    return {
      emoji: "🏆",
      title: "문헌정보학 천재!",
      message: "완벽에 가까운 점수입니다! 당신은 이미 문헌정보학 전문가 수준이에요.",
    };
  } else if (total >= 210) {
    return {
      emoji: "🎓",
      title: "예비 사서 합격!",
      message: "훌륭해요! 문헌정보학과에 딱 어울리는 실력을 가지고 있어요.",
    };
  } else if (total >= 150) {
    return {
      emoji: "📚",
      title: "도서관 단골손님",
      message: "좋아요! 조금 더 공부하면 훌륭한 문헌정보학도가 될 수 있어요.",
    };
  } else {
    return {
      emoji: "🌱",
      title: "정보학의 씨앗",
      message: "시작이 반! 문헌정보학을 배우면 더 넓은 세계가 열릴 거예요.",
    };
  }
}

export default function ResultPage() {
  const router = useRouter();
  const [scores, setScores] = useState<Scores>({ game1: null, game2: null, game3: null });
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const s = getScores();
    setScores(s);
    setTotal(getTotalScore());
  }, []);

  function handleReset() {
    clearScores();
    router.push("/");
  }

  function handleShare() {
    const text = `건국대 문헌정보학과 전공박람회 미니게임 결과\n총점: ${total}/300점 ${getResultMessage(total).emoji}\n#건국대 #문헌정보학과`;
    if (navigator.share) {
      navigator.share({ text });
    } else {
      navigator.clipboard.writeText(text).then(() => alert("결과가 클립보드에 복사되었습니다!"));
    }
  }

  const result = getResultMessage(total);
  const percent = Math.round((total / 300) * 100);

  const gameNames = ["O/X 퀴즈", "KDC 분류", "키워드 타이핑"];
  const gameScores = [scores.game1, scores.game2, scores.game3];

  return (
    <main className="flex flex-col px-4 pt-8 pb-12">
      {/* 결과 헤더 */}
      <div className="text-center mb-6">
        <div className="text-6xl mb-3">{result.emoji}</div>
        <h1 className="text-2xl font-bold text-[#003087] mb-1">{result.title}</h1>
        <p className="text-sm text-gray-500 leading-relaxed max-w-[280px] mx-auto">
          {result.message}
        </p>
      </div>

      {/* 총점 카드 */}
      <div className="bg-[#003087] text-white rounded-2xl p-6 mb-4 shadow-lg">
        <p className="text-sm opacity-70 text-center mb-1">총점</p>
        <div className="text-center mb-3">
          <span className="text-6xl font-bold">{total}</span>
          <span className="text-xl opacity-70"> / 300</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2.5">
          <div
            className="bg-white h-2.5 rounded-full transition-all duration-700"
            style={{ width: `${percent}%` }}
          />
        </div>
        <p className="text-center text-sm opacity-70 mt-1">{percent}%</p>
      </div>

      {/* 게임별 점수 */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6">
        <p className="text-sm font-bold text-gray-600 mb-3">게임별 점수</p>
        <div className="space-y-3">
          {gameNames.map((name, i) => {
            const s = gameScores[i] ?? 0;
            const icons = ["❓", "🗂️", "⌨️"];
            return (
              <div key={name} className="flex items-center gap-3">
                <span className="text-xl">{icons[i]}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-sm mb-1">
                    <span className="text-gray-600">{name}</span>
                    <span className="font-bold text-[#003087]">{s}점</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-blue-500 h-1.5 rounded-full transition-all"
                      style={{ width: `${s}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 버튼 */}
      <div className="space-y-3 mb-8">
        <button
          onClick={handleShare}
          className="w-full py-3.5 bg-green-500 text-white font-bold rounded-2xl active:scale-95 transition-transform"
        >
          📤 결과 공유하기
        </button>
        <button
          onClick={handleReset}
          className="w-full py-3.5 bg-gray-100 text-gray-700 font-medium rounded-2xl active:scale-95 transition-transform"
        >
          처음으로 돌아가기
        </button>
      </div>

      {/* 학과 소개 */}
      <div>
        <h2 className="text-base font-bold text-gray-800 mb-1">🏫 건국대 문헌정보학과 소개</h2>
        <p className="text-xs text-gray-400 mb-3">게임을 통해 배운 문헌정보학의 세계!</p>
        <DepartmentInfo />
      </div>
    </main>
  );
}
