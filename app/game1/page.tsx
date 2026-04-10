"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { quizQuestions } from "@/data/quiz-questions";
import ProgressBar from "@/components/ProgressBar";
import { saveScore } from "@/lib/score-store";

type Phase = "question" | "feedback" | "done";

export default function Game1() {
  const router = useRouter();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [phase, setPhase] = useState<Phase>("question");
  const [lastCorrect, setLastCorrect] = useState<boolean | null>(null);

  const question = quizQuestions[current];

  function handleAnswer(answer: boolean) {
    const correct = answer === question.answer;
    if (correct) setScore((s) => s + 10);
    setLastCorrect(correct);
    setPhase("feedback");
  }

  function handleNext() {
    if (current + 1 >= quizQuestions.length) {
      setPhase("done");
    } else {
      setCurrent((c) => c + 1);
      setPhase("question");
    }
  }

  function handleFinish() {
    saveScore("game1", score);
    router.push("/");
  }

  if (phase === "done") {
    return (
      <main className="flex flex-col items-center justify-center flex-1 px-4 py-10">
        <div className="text-6xl mb-4">🎉</div>
        <h2 className="text-2xl font-bold text-[#003087] mb-2">퀴즈 완료!</h2>
        <p className="text-gray-500 mb-6">10문제 중 {score / 10}개 정답</p>
        <div className="w-full bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center mb-6">
          <p className="text-sm text-gray-500 mb-1">획득 점수</p>
          <p className="text-5xl font-bold text-[#003087]">{score}</p>
          <p className="text-sm text-gray-400">/ 100점</p>
        </div>
        <button
          onClick={handleFinish}
          className="w-full py-4 bg-[#003087] text-white font-bold rounded-2xl text-lg active:scale-95 transition-transform"
        >
          메인으로 돌아가기
        </button>
      </main>
    );
  }

  return (
    <main className="flex flex-col px-4 pt-6 pb-10">
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.push("/")}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600"
        >
          ←
        </button>
        <div className="flex-1">
          <p className="text-xs text-gray-400 mb-1">O/X 퀴즈</p>
          <ProgressBar current={current + (phase === "feedback" ? 1 : 0)} total={10} />
        </div>
        <div className="text-right">
          <p className="text-xs text-gray-400">점수</p>
          <p className="text-sm font-bold text-[#003087]">{score}점</p>
        </div>
      </div>

      {/* 문제 카드 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <p className="text-xs text-gray-400 mb-3">문제 {current + 1} / {quizQuestions.length}</p>
        <p className="text-lg font-semibold text-gray-800 leading-relaxed">{question.question}</p>
      </div>

      {phase === "question" && (
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={() => handleAnswer(true)}
            className="py-8 bg-blue-500 hover:bg-blue-600 text-white text-4xl font-bold rounded-2xl shadow active:scale-95 transition-all"
          >
            O
          </button>
          <button
            onClick={() => handleAnswer(false)}
            className="py-8 bg-red-500 hover:bg-red-600 text-white text-4xl font-bold rounded-2xl shadow active:scale-95 transition-all"
          >
            X
          </button>
        </div>
      )}

      {phase === "feedback" && (
        <div className="space-y-4">
          <div
            className={`rounded-2xl p-5 border-2 ${
              lastCorrect
                ? "bg-green-50 border-green-300"
                : "bg-red-50 border-red-300"
            }`}
          >
            <p className={`text-xl font-bold mb-2 ${lastCorrect ? "text-green-700" : "text-red-700"}`}>
              {lastCorrect ? "✅ 정답!" : "❌ 오답!"}
            </p>
            <p className="text-sm text-gray-600 leading-relaxed">{question.explanation}</p>
          </div>
          <button
            onClick={handleNext}
            className="w-full py-4 bg-[#003087] text-white font-bold rounded-2xl text-base active:scale-95 transition-transform"
          >
            {current + 1 >= quizQuestions.length ? "결과 확인" : "다음 문제 →"}
          </button>
        </div>
      )}
    </main>
  );
}
