"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  DndContext,
  DragEndEvent,
  DragStartEvent,
  DragOverlay,
  useDraggable,
  useDroppable,
  TouchSensor,
  MouseSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { kdcCategories, books, type Book, type KdcCategory } from "@/data/kdc-books";
import { saveScore } from "@/lib/score-store";

function DraggableBook({ book, isPlaced }: { book: Book; isPlaced: boolean }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: book.id,
    disabled: isPlaced,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`px-3 py-2 rounded-xl border-2 text-sm font-medium cursor-grab active:cursor-grabbing transition-all select-none touch-none
        ${isPlaced ? "opacity-40 bg-gray-100 border-gray-200 cursor-default" : "bg-white border-blue-300 shadow-sm active:scale-105"}
        ${isDragging ? "opacity-0" : ""}`}
    >
      📖 {book.title}
      <p className="text-xs text-gray-400 font-normal mt-0.5">{book.hint}</p>
    </div>
  );
}

function DroppableCategory({
  category,
  placedBooks,
  results,
}: {
  category: KdcCategory;
  placedBooks: Book[];
  results: Record<string, boolean>;
}) {
  const { setNodeRef, isOver } = useDroppable({ id: category.id });

  return (
    <div
      ref={setNodeRef}
      className={`rounded-xl border-2 p-2 transition-colors min-h-[56px]
        ${isOver ? "border-blue-500 bg-blue-50 scale-[1.02]" : category.color}
        ${placedBooks.length > 0 ? "border-solid" : "border-dashed"}`}
    >
      <p className="text-xs font-bold text-gray-600 mb-1">
        {category.code} {category.name}
      </p>
      <div className="space-y-1">
        {placedBooks.map((b) => (
          <div
            key={b.id}
            className={`text-xs px-2 py-1 rounded-lg font-medium
              ${results[b.id] === true ? "bg-green-200 text-green-800" : "bg-red-200 text-red-800"}`}
          >
            {results[b.id] === true ? "✓" : "✗"} {b.title}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Game2() {
  const router = useRouter();
  const [placements, setPlacements] = useState<Record<string, string>>({}); // bookId → categoryId
  const [submitted, setSubmitted] = useState(false);
  const [results, setResults] = useState<Record<string, boolean>>({});
  const [activeBook, setActiveBook] = useState<Book | null>(null);

  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } })
  );

  function handleDragStart(event: DragStartEvent) {
    const book = books.find((b) => b.id === event.active.id);
    if (book) setActiveBook(book);
  }

  function handleDragEnd(event: DragEndEvent) {
    setActiveBook(null);
    const { active, over } = event;
    if (!over) return;
    setPlacements((prev) => ({ ...prev, [active.id as string]: over.id as string }));
  }

  function handleSubmit() {
    const newResults: Record<string, boolean> = {};
    for (const [bookId, categoryId] of Object.entries(placements)) {
      const book = books.find((b) => b.id === bookId);
      newResults[bookId] = book?.correctCategoryId === categoryId;
    }
    setResults(newResults);
    setSubmitted(true);

    const correctCount = Object.values(newResults).filter(Boolean).length;
    saveScore("game2", Math.round((correctCount / books.length) * 100));
  }

  function handleFinish() {
    router.push("/");
  }

  const placedBookIds = new Set(Object.keys(placements));
  const allPlaced = books.every((b) => placedBookIds.has(b.id));

  const correctCount = submitted ? Object.values(results).filter(Boolean).length : 0;
  const finalScore = submitted ? Math.round((correctCount / books.length) * 100) : 0;

  return (
    <main className="flex flex-col px-4 pt-6 pb-10">
      {/* 헤더 */}
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={() => router.push("/")}
          className="w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 text-gray-600"
        >
          ←
        </button>
        <div>
          <h2 className="text-base font-bold text-gray-800">KDC 분류 챌린지</h2>
          <p className="text-xs text-gray-400">책을 알맞은 분류에 드래그하세요</p>
        </div>
      </div>

      {submitted ? (
        /* 결과 화면 */
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-center shadow-sm">
            <p className="text-4xl mb-2">
              {correctCount === books.length ? "🎉" : correctCount >= books.length / 2 ? "👍" : "📚"}
            </p>
            <p className="text-gray-500 text-sm mb-1">{books.length}개 중 {correctCount}개 정답</p>
            <p className="text-5xl font-bold text-[#003087]">{finalScore}</p>
            <p className="text-sm text-gray-400">/ 100점</p>
          </div>
          <div className="bg-blue-50 rounded-xl p-4 text-sm text-gray-700">
            <p className="font-bold mb-2">정답 해설</p>
            {books.map((book) => {
              const correctCat = kdcCategories.find((c) => c.id === book.correctCategoryId);
              return (
                <p key={book.id} className={`mb-1 ${results[book.id] ? "text-green-700" : "text-red-700"}`}>
                  {results[book.id] ? "✓" : "✗"} {book.title} → {correctCat?.code} {correctCat?.name}
                </p>
              );
            })}
          </div>
          <button
            onClick={handleFinish}
            className="w-full py-4 bg-[#003087] text-white font-bold rounded-2xl text-base active:scale-95 transition-transform"
          >
            메인으로 돌아가기
          </button>
        </div>
      ) : (
        <DndContext sensors={sensors} onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
          {/* 책 목록 */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-500 mb-2">📚 책 목록 (드래그하세요)</p>
            <div className="space-y-2">
              {books.map((book) => (
                <DraggableBook
                  key={book.id}
                  book={book}
                  isPlaced={placedBookIds.has(book.id)}
                />
              ))}
            </div>
          </div>

          {/* KDC 분류 드롭존 */}
          <div className="mb-4">
            <p className="text-xs font-semibold text-gray-500 mb-2">🗂️ KDC 분류표</p>
            <div className="grid grid-cols-2 gap-2">
              {kdcCategories.map((cat) => {
                const placedBooks = books.filter((b) => placements[b.id] === cat.id);
                return (
                  <DroppableCategory
                    key={cat.id}
                    category={cat}
                    placedBooks={placedBooks}
                    results={results}
                  />
                );
              })}
            </div>
          </div>

          <DragOverlay>
            {activeBook && (
              <div className="px-3 py-2 rounded-xl border-2 border-blue-500 bg-white shadow-lg text-sm font-medium opacity-90">
                📖 {activeBook.title}
              </div>
            )}
          </DragOverlay>

          <button
            onClick={handleSubmit}
            disabled={!allPlaced}
            className={`w-full py-4 font-bold rounded-2xl text-base transition-all
              ${allPlaced
                ? "bg-[#003087] text-white active:scale-95"
                : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}
          >
            {allPlaced ? "정답 확인하기" : `${books.length - placedBookIds.size}개 남음`}
          </button>
        </DndContext>
      )}
    </main>
  );
}
