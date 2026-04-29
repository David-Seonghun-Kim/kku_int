"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { surveyQuestions, surveyTypes } from "@/data/survey-questions";
import ProgressBar from "@/components/ProgressBar";
import { saveSurveyResult } from "@/lib/score-store";

const LIKERT_OPTIONS = [
  { value: 1, label: "전혀 그렇지 않음" },
  { value: 2, label: "대체로 그렇지 않음" },
  { value: 3, label: "보통" },
  { value: 4, label: "대체로 그러함" },
  { value: 5, label: "매우 그러함" },
];

type Phase = "ready" | "survey" | "result";

export default function SurveyPage() {
  const router = useRouter();
  const [phase, setPhase] = useState<Phase>("ready");
  const [current, setCurrent] = useState(0);
  const [typeScores, setTypeScores] = useState([0, 0, 0, 0, 0]);
  const [selected, setSelected] = useState<number | null>(null);
  const [resultTypeIndex, setResultTypeIndex] = useState(0);

  function startSurvey() {
    setCurrent(0);
    setTypeScores([0, 0, 0, 0, 0]);
    setSelected(null);
    setPhase("survey");
  }

  function handleNext() {
    if (selected === null) return;

    const q = surveyQuestions[current];
    const newScores = [...typeScores];
    newScores[q.typeIndex] += selected * q.weight;
    setTypeScores(newScores);
    setSelected(null);

    if (current + 1 >= surveyQuestions.length) {
      const maxScore = Math.max(...newScores);
      const typeIndex = newScores.indexOf(maxScore);
      setResultTypeIndex(typeIndex);
      saveSurveyResult(typeIndex);
      setPhase("result");
    } else {
      setCurrent((c) => c + 1);
    }
  }

  // ── 준비 화면 ──────────────────────────────────────────────
  if (phase === "ready") {
    return (
      <main className="flex flex-col items-center justify-center flex-1 px-4 py-10">
        <div className="text-6xl mb-4">🐱</div>
        <h2 className="text-2xl font-bold text-[#003087] mb-2 text-center">
          나는 어떤 유형?
        </h2>
        <p className="text-gray-500 text-center mb-6 leading-relaxed">
          15개의 질문에 솔직하게 답하면
          <br />
          나에게 맞는 전공을 알려드려요!!!
        </p>
        <div className="w-full bg-blue-50 rounded-2xl p-4 mb-8 text-sm text-gray-600">
          <p className="font-semibold text-blue-800 mb-2">📋 안내</p>
          <ul className="space-y-1">
            <li>• 총 {surveyQuestions.length}개 문항</li>
            <li>• 5점 척도로 솔직하게 답해주세요</li>
            <li>• 5가지 유형 중 나에게 맞는 유형을 찾아드려요</li>
          </ul>
        </div>
        <button
          onClick={startSurvey}
          className="w-full py-4 bg-[#003087] text-white font-bold rounded-2xl text-lg active:scale-95 transition-transform"
        >
          시작하기
        </button>
        <button
          onClick={() => router.push("/")}
          className="mt-3 w-full py-3 bg-gray-100 text-gray-600 font-medium rounded-2xl text-sm active:scale-95 transition-transform"
        >
          돌아가기
        </button>
      </main>
    );
  }

  // ── 결과 화면 ──────────────────────────────────────────────
  if (phase === "result") {
    const type = surveyTypes[resultTypeIndex];
    return (
      <main className="flex flex-col items-center justify-center flex-1 px-4 py-8">
        <div className="w-full">
          <Image
            src={type.image}
            alt={type.name}
            width={430}
            height={430}
            className="w-full rounded-2xl shadow-md"
            priority
          />
        </div>
        <div className="mt-6 w-full space-y-3">
          <button
            onClick={() => router.push("/")}
            className="w-full py-4 bg-[#003087] text-white font-bold rounded-2xl text-base active:scale-95 transition-transform"
          >
            메인으로 돌아가기
          </button>
          <button
            onClick={startSurvey}
            className="w-full py-3 bg-gray-100 text-gray-600 font-medium rounded-2xl text-sm active:scale-95 transition-transform"
          >
            다시 하기
          </button>
        </div>
      </main>
    );
  }

  // ── 설문 화면 ──────────────────────────────────────────────
  const question = surveyQuestions[current];

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
          <p className="text-xs text-gray-400 mb-1">나는 어떤 유형?</p>
          <ProgressBar current={current} total={surveyQuestions.length} />
        </div>
        <p className="text-xs text-gray-400 min-w-[40px] text-right">
          {current + 1}/{surveyQuestions.length}
        </p>
      </div>

      {/* 질문 카드 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <p className="text-xs text-gray-400 mb-3">Q{current + 1}</p>
        <p className="text-lg font-semibold text-gray-800 leading-relaxed">
          {question.question}
        </p>
      </div>

      {/* 리커트 척도 */}
      <div className="space-y-2.5 mb-8">
        {LIKERT_OPTIONS.map((opt) => {
          const isSelected = selected === opt.value;
          return (
            <button
              key={opt.value}
              onClick={() => setSelected(opt.value)}
              className={`w-full py-3.5 px-4 rounded-xl border-2 text-sm font-medium transition-all active:scale-95 flex items-center gap-3
                ${isSelected
                  ? "border-[#003087] bg-[#003087] text-white"
                  : "border-gray-200 bg-white text-gray-700"
                }`}
            >
              <span
                className={`w-7 h-7 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0
                  ${isSelected ? "bg-white text-[#003087]" : "bg-gray-100 text-gray-500"}`}
              >
                {opt.value}
              </span>
              {opt.label}
            </button>
          );
        })}
      </div>

      {/* 다음 버튼 */}
      <button
        onClick={handleNext}
        disabled={selected === null}
        className={`w-full py-4 font-bold rounded-2xl text-base transition-all
          ${selected !== null
            ? "bg-[#003087] text-white active:scale-95"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
      >
        {current + 1 >= surveyQuestions.length ? "결과 확인하기 🎉" : "다음 →"}
      </button>
    </main>
  );
}
