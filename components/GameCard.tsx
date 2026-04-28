import Link from "next/link";

interface GameCardProps {
  href: string;
  icon: string;
  title: string;
  description: string;
  completed: boolean;
  score?: number | null;
  completedLabel?: string; // 점수 대신 표시할 커스텀 뱃지 텍스트
  color: string;
}

export default function GameCard({
  href,
  icon,
  title,
  description,
  completed,
  score,
  completedLabel,
  color,
}: GameCardProps) {
  const badge = completedLabel ?? (score != null ? `완료 ${score}점` : "완료");

  return (
    <Link href={href} className="block">
      <div
        className={`relative rounded-2xl border-2 p-5 transition-all active:scale-95 ${color} ${
          completed ? "opacity-80" : ""
        }`}
      >
        {completed && (
          <div className="absolute top-3 right-3 bg-green-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {badge}
          </div>
        )}
        <div className="text-4xl mb-3">{icon}</div>
        <h3 className="text-lg font-bold text-gray-800 mb-1">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="mt-3 text-sm font-semibold text-blue-700">
          {completed ? "다시 하기 →" : "시작하기 →"}
        </div>
      </div>
    </Link>
  );
}
