"use client";

import { useEffect, useState } from "react";
import { drawLottoLines, type LottoLines } from "./lotto";

const colorClass = (number: number) => {
  if (number <= 10) return "ball-yellow";
  if (number <= 20) return "ball-blue";
  if (number <= 30) return "ball-red";
  if (number <= 40) return "ball-gray";
  return "ball-green";
};

export default function Home() {
  const [lines, setLines] = useState<LottoLines>([]);
  const [drawCount, setDrawCount] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);

  const draw = () => {
    setIsDrawing(true);
    window.setTimeout(() => {
      setLines(drawLottoLines());
      setDrawCount((count) => count + 1);
      setIsDrawing(false);
    }, 220);
  };

  useEffect(() => {
    setLines(drawLottoLines());
    setDrawCount(1);

    fetch("/api/visitors", { method: "POST" })
      .then((response) => {
        if (!response.ok) throw new Error("Visitor counter is unavailable");
        return response.json() as Promise<{ total: number }>;
      })
      .then(({ total }) => setVisitorCount(total))
      .catch(() => setVisitorCount(null));
  }, []);

  return (
    <main className="page-shell">
      <div className="ambient ambient-one" aria-hidden="true" />
      <div className="ambient ambient-two" aria-hidden="true" />

      <section className="lotto-card" aria-labelledby="page-title">
        <header className="hero">
          <div className="eyebrow">
            <span className="eyebrow-dot" aria-hidden="true" />
            LOTTO 6/45
          </div>
          <h1 id="page-title">
            행운의 숫자,
            <br />
            <span>한 번에 완벽하게.</span>
          </h1>
          <p>
            1부터 45까지, 다섯 줄의 모든 번호를
            <br className="mobile-break" /> 단 하나의 중복 없이 뽑아요.
          </p>
        </header>

        <div className="result-panel" aria-live="polite" aria-busy={isDrawing}>
          <div className="result-heading">
            <div>
              <p className="result-label">YOUR NUMBERS</p>
              <h2>이번 주 추천 번호</h2>
            </div>
            <div className="unique-badge">
              <span aria-hidden="true">✓</span>
              30개 전체 중복 없음
            </div>
          </div>

          <div className={`number-lines ${isDrawing ? "is-drawing" : ""}`}>
            {Array.from({ length: 5 }, (_, lineIndex) => {
              const numbers = lines[lineIndex] ?? [];
              return (
                <div className="number-row" key={lineIndex}>
                  <span className="line-label">{String.fromCharCode(65 + lineIndex)}</span>
                  <div className="balls">
                    {Array.from({ length: 6 }, (_, numberIndex) => {
                      const number = numbers[numberIndex];
                      return number ? (
                        <span
                          className={`number-ball ${colorClass(number)}`}
                          key={number}
                          aria-label={`${number}번`}
                        >
                          {number}
                        </span>
                      ) : (
                        <span className="number-ball ball-placeholder" key={numberIndex} />
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>

          <button className="draw-button" type="button" onClick={draw} disabled={isDrawing}>
            <span className="button-icon" aria-hidden="true">↻</span>
            {isDrawing ? "행운을 섞는 중..." : "새 번호 5줄 뽑기"}
          </button>

          <p className="draw-note">
            <span aria-hidden="true">✦</span>
            1~45 중 30개를 무작위로 선택해 5줄에 나눕니다
            {drawCount > 1 && <span className="draw-count"> · {drawCount}회 추첨</span>}
          </p>
        </div>

        <footer>
          <p>
            행운은 가볍게, 구매는 책임감 있게.
            {visitorCount !== null && (
              <span className="visitor-count" aria-label={`누적 방문자 ${visitorCount.toLocaleString()}명`}>
                누적 방문 {visitorCount.toLocaleString()}
              </span>
            )}
          </p>
          <span>GOOD LUCK!</span>
        </footer>
      </section>
    </main>
  );
}
