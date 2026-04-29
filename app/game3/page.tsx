"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { typingKeywords } from "@/data/typing-keywords";
import ProgressBar from "@/components/ProgressBar";
import { saveScore } from "@/lib/score-store";

// 경과 시간(초) → 점수 변환 (10구간, 80·90점 구간을 가장 넓게)
function calcScore(elapsed: number): number {
  if (elapsed <= 20)  return 100;
  if (elapsed <= 45)  return 90;
  if (elapsed <= 75)  return 80;
  if (elapsed <= 105) return 70;
  if (elapsed <= 130) return 60;
  if (elapsed <= 155) return 50;
  if (elapsed <= 180) return 40;
  if (elapsed <= 205) return 30;
  if (elapsed <= 230) return 20;
  return 10;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return m > 0 ? `${m}분 ${s}초` : `${s}초`;
}

export default function Game3() {
  const router = useRouter();
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [elapsed, setElapsed] = useState(0);
  const [correct, setCorrect] = useState(0);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const finalElapsedRef = useRef(0);

  const endGame = useCallback((elapsedSeconds: number) => {
    if (timerRef.current) clearInterval(timerRef.current);
    finalElapsedRef.current = elapsedSeconds;
    const score = calcScore(elapsedSeconds);
    saveScore("game3", score);
    setPhase("done");
  }, []);

  useEffect(() => {
    if (phase !== "playing") return;

    timerRef.current = setInterval(() => {
      setElapsed((t) => t + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  function startGame() {
    setPhase("playing");
    setCurrentIndex(0);
    setInput("");
    setElapsed(0);
    setCorrect(0);
    finalElapsedRef.current = 0;
    setTimeout(() => inputRef.current?.focus(), 100);
  }

  function handleInput(value: string) {
    setInput(value);
    const target = typingKeywords[currentIndex].word;

    if (value === target) {
      const newCorrect = correct + 1;
      setCorrect(newCorrect);
      setInput("");

      if (currentIndex + 1 >= typingKeywords.length) {
        endGame(elapsed);
      } else {
        setCurrentIndex((i) => i + 1);
      }
    } else if (!target.startsWith(value)) {
      setShake(true);
      setTimeout(() => setShake(false), 400);
    }
  }

  const currentKeyword = typingKeywords[currentIndex];
  const finalScore = calcScore(finalElapsedRef.current);

  // 현재 입력 하이라이팅
  const target = phase === "playing" ? currentKeyword.word : "";
  const matchedChars = target.split("").map((char, i) => {
    if (i >= input.length) return { char, state: "pending" as const };
    return { char, state: input[i] === char ? "correct" : "wrong" as const };
  });

  // ── 준비 화면 ──────────────────────────────────────────────
  if (phase === "ready") {
    return (
      <main className="flex flex-col items-center justify-center flex-1 px-4 py-10">
        <div className="text-6xl mb-4">⌨️</div>
        <h2 className="text-2xl font-bold text-[#003087] mb-2">키워드 타이핑</h2>
        <p className="text-gray-500 text-center mb-2">
          문헌정보학 키워드를 얼마나 빠르게
          <br />
          입력할 수 있는지 도전해보세요!
        </p>
        <div className="w-full bg-blue-50 rounded-2xl p-4 mb-8 text-sm text-gray-600">
          <p className="font-semibold text-blue-800 mb-2">📋 게임 방법</p>
          <ul className="space-y-1">
            <li>• 화면에 표시된 단어를 정확하게 입력하세요</li>
            <li>• 맞으면 자동으로 다음 단어로 넘어갑니다</li>
            <li>• {typingKeywords.length}개 단어를 완료하는 총 시간으로 점수를 매겨요</li>
            <li>• 빠를수록 높은 점수!</li>
          </ul>
        </div>
        <button
          onClick={startGame}
          className="w-full py-4 bg-[#003087] text-white font-bold rounded-2xl text-lg active:scale-95 transition-transform"
        >
          시작!
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

  // ── 완료 화면 ──────────────────────────────────────────────
  if (phase === "done") {
    return (
      <main className="flex flex-col items-center justify-center flex-1 px-4 py-10">
        <div className="text-6xl mb-4">
          {finalScore >= 90 ? "🏆" : finalScore >= 70 ? "🎉" : "📚"}
        </div>
        <h2 className="text-2xl font-bold text-[#003087] mb-6">타이핑 완료!</h2>
        <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">완료 시간</span>
            <span className="font-bold text-gray-700">{formatTime(finalElapsedRef.current)}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">완료 단어</span>
            <span className="font-bold text-green-600">{typingKeywords.length}개 전체</span>
          </div>
          <div className="border-t pt-3 text-center">
            <p className="text-sm text-gray-400 mb-1">획득 점수</p>
            <p className="text-5xl font-bold text-[#003087]">{finalScore}</p>
            <p className="text-sm text-gray-400">/ 100점</p>
          </div>
        </div>
        <button
          onClick={() => router.push("/")}
          className="w-full py-4 bg-[#003087] text-white font-bold rounded-2xl text-base active:scale-95 transition-transform"
        >
          메인으로 돌아가기
        </button>
      </main>
    );
  }

  // ── 플레이 화면 ──────────────────────────────────────────────
  return (
    <main className="flex flex-col px-4 pt-6 pb-10">
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => {
            if (timerRef.current) clearInterval(timerRef.current);
            router.push("/");
          }}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600"
        >
          ←
        </button>
        <div className="flex-1">
          <ProgressBar current={correct} total={typingKeywords.length} label="진행도" />
        </div>
        {/* 경과 시간 */}
        <div className="text-right min-w-[52px]">
          <p className="text-2xl font-bold tabular-nums text-[#003087]">{elapsed}s</p>
        </div>
      </div>

      {/* 진행 현황 */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 bg-green-50 rounded-xl p-3 text-center border border-green-100">
          <p className="text-xs text-gray-400">완료</p>
          <p className="text-2xl font-bold text-green-600">{correct}</p>
        </div>
        <div className="flex-1 bg-blue-50 rounded-xl p-3 text-center border border-blue-100">
          <p className="text-xs text-gray-400">남은 단어</p>
          <p className="text-2xl font-bold text-blue-600">{typingKeywords.length - currentIndex}</p>
        </div>
      </div>

      {/* 현재 단어 */}
      <div
        className={`bg-white rounded-2xl border-2 p-6 mb-3 text-center shadow-sm transition-all
          ${shake ? "border-red-400 animate-pulse" : "border-gray-100"}`}
      >
        <p className="text-xs text-gray-400 mb-1">{currentKeyword.meaning}</p>
        <div className="text-3xl font-bold tracking-widest mb-2">
          {matchedChars.map((m, i) => (
            <span
              key={i}
              className={
                m.state === "correct" ? "text-blue-600"
                : m.state === "wrong"  ? "text-red-500"
                : "text-gray-300"
              }
            >
              {m.char}
            </span>
          ))}
        </div>
        <p className="text-xs text-gray-300">{currentIndex + 1} / {typingKeywords.length}</p>
      </div>

      {/* 다음 단어 미리보기 */}
      {currentIndex + 1 < typingKeywords.length && (
        <p className="text-center text-sm text-gray-300 mb-4">
          다음: {typingKeywords[currentIndex + 1].word}
        </p>
      )}

      {/* 입력 필드 */}
      <input
        ref={inputRef}
        type="text"
        value={input}
        onChange={(e) => handleInput(e.target.value)}
        className="w-full py-4 px-5 text-lg border-2 border-gray-200 rounded-2xl focus:outline-none focus:border-blue-400 text-center"
        placeholder="여기에 입력하세요"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
      />
    </main>
  );
}
