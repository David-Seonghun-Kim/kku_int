"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { typingKeywords } from "@/data/typing-keywords";
import ProgressBar from "@/components/ProgressBar";
import { saveScore } from "@/lib/score-store";

const TOTAL_TIME = 60;

export default function Game3() {
  const router = useRouter();
  const [phase, setPhase] = useState<"ready" | "playing" | "done">("ready");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [input, setInput] = useState("");
  const [timeLeft, setTimeLeft] = useState(TOTAL_TIME);
  const [correct, setCorrect] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [shake, setShake] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const endGame = useCallback(
    (correctCount: number) => {
      if (timerRef.current) clearInterval(timerRef.current);
      const score = Math.min(100, Math.round((correctCount / typingKeywords.length) * 100));
      saveScore("game3", score);
      setPhase("done");
    },
    []
  );

  useEffect(() => {
    if (phase !== "playing") return;

    timerRef.current = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(timerRef.current!);
          setPhase("done");
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase]);

  // Save score when phase turns to done from timer
  useEffect(() => {
    if (phase === "done") {
      saveScore("game3", Math.min(100, Math.round((correct / typingKeywords.length) * 100)));
    }
  }, [phase, correct]);

  function startGame() {
    setPhase("playing");
    setCurrentIndex(0);
    setInput("");
    setTimeLeft(TOTAL_TIME);
    setCorrect(0);
    setWrong(0);
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
        endGame(newCorrect);
      } else {
        setCurrentIndex((i) => i + 1);
      }
    } else if (target.startsWith(value)) {
      // 올바르게 입력 중 - 아무것도 하지 않음
    } else {
      // 틀린 입력
      if (value.length >= target.length || !target.startsWith(value)) {
        setShake(true);
        setTimeout(() => setShake(false), 400);
      }
    }
  }

  function handleFinish() {
    router.push("/");
  }

  const currentKeyword = typingKeywords[currentIndex];
  const finalScore = Math.min(100, Math.round((correct / typingKeywords.length) * 100));
  const timerColor = timeLeft <= 10 ? "text-red-500" : timeLeft <= 20 ? "text-orange-500" : "text-[#003087]";

  if (phase === "ready") {
    return (
      <main className="flex flex-col items-center justify-center flex-1 px-4 py-10">
        <div className="text-6xl mb-4">⌨️</div>
        <h2 className="text-2xl font-bold text-[#003087] mb-2">키워드 타이핑</h2>
        <p className="text-gray-500 text-center mb-2">
          문헌정보학 키워드를 60초 안에
          <br />
          최대한 많이 타이핑하세요!
        </p>
        <div className="w-full bg-blue-50 rounded-2xl p-4 mb-8 text-sm text-gray-600">
          <p className="font-semibold text-blue-800 mb-2">📋 게임 방법</p>
          <ul className="space-y-1">
            <li>• 화면에 표시된 단어를 정확하게 입력하세요</li>
            <li>• 맞으면 자동으로 다음 단어로 넘어갑니다</li>
            <li>• {typingKeywords.length}개 단어, 제한시간 {TOTAL_TIME}초</li>
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

  if (phase === "done") {
    return (
      <main className="flex flex-col items-center justify-center flex-1 px-4 py-10">
        <div className="text-6xl mb-4">
          {correct >= 10 ? "🏆" : correct >= 6 ? "🎉" : "📚"}
        </div>
        <h2 className="text-2xl font-bold text-[#003087] mb-6">타이핑 완료!</h2>
        <div className="w-full bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">정답</span>
            <span className="font-bold text-green-600">{correct}개</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-500 text-sm">전체</span>
            <span className="font-bold text-gray-700">{typingKeywords.length}개</span>
          </div>
          <div className="border-t pt-3 text-center">
            <p className="text-sm text-gray-400 mb-1">획득 점수</p>
            <p className="text-5xl font-bold text-[#003087]">{finalScore}</p>
            <p className="text-sm text-gray-400">/ 100점</p>
          </div>
        </div>
        <button
          onClick={handleFinish}
          className="w-full py-4 bg-[#003087] text-white font-bold rounded-2xl text-base active:scale-95 transition-transform"
        >
          메인으로 돌아가기
        </button>
      </main>
    );
  }

  // 현재 입력과 목표 단어 비교하여 하이라이팅
  const target = currentKeyword.word;
  const matchedChars = target.split("").map((char, i) => {
    if (i >= input.length) return { char, state: "pending" as const };
    return { char, state: input[i] === char ? "correct" : "wrong" as const };
  });

  return (
    <main className="flex flex-col px-4 pt-6 pb-10">
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => { if (timerRef.current) clearInterval(timerRef.current); router.push("/"); }}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600"
        >
          ←
        </button>
        <div className="flex-1">
          <ProgressBar current={correct} total={typingKeywords.length} label="진행도" />
        </div>
        <div className="text-right min-w-[48px]">
          <p className={`text-2xl font-bold tabular-nums ${timerColor}`}>{timeLeft}</p>
        </div>
      </div>

      {/* 점수 표시 */}
      <div className="flex gap-3 mb-6">
        <div className="flex-1 bg-green-50 rounded-xl p-3 text-center border border-green-100">
          <p className="text-xs text-gray-400">정답</p>
          <p className="text-2xl font-bold text-green-600">{correct}</p>
        </div>
        <div className="flex-1 bg-blue-50 rounded-xl p-3 text-center border border-blue-100">
          <p className="text-xs text-gray-400">남은 단어</p>
          <p className="text-2xl font-bold text-blue-600">{typingKeywords.length - currentIndex}</p>
        </div>
      </div>

      {/* 현재 단어 */}
      <div className={`bg-white rounded-2xl border-2 p-6 mb-3 text-center shadow-sm transition-all ${shake ? "border-red-400 animate-pulse" : "border-gray-100"}`}>
        <p className="text-xs text-gray-400 mb-1">{currentKeyword.meaning}</p>
        <div className="text-3xl font-bold tracking-widest mb-2">
          {matchedChars.map((m, i) => (
            <span
              key={i}
              className={
                m.state === "correct"
                  ? "text-blue-600"
                  : m.state === "wrong"
                  ? "text-red-500"
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
