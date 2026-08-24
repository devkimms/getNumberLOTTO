"use client";

import { useEffect, useState } from "react";
import { Link2 } from "lucide-react";
import { drawLottoLines, type DrawMode, type LottoLines } from "./lotto";
import { FALLBACK_WINNING_DRAWS, type WinningDraw } from "./winning-numbers";

const colorClass = (number: number) => {
  if (number <= 10) return "ball-yellow";
  if (number <= 20) return "ball-blue";
  if (number <= 30) return "ball-red";
  if (number <= 40) return "ball-gray";
  return "ball-green";
};

export default function Home() {
  const [lines, setLines] = useState<LottoLines>([]);
  const [mode, setMode] = useState<DrawMode>("all-unique");
  const [drawCount, setDrawCount] = useState(0);
  const [isDrawing, setIsDrawing] = useState(false);
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [winningDraws, setWinningDraws] = useState<WinningDraw[]>(FALLBACK_WINNING_DRAWS);

  const draw = (nextMode: DrawMode = mode) => {
    setIsDrawing(true);
    window.setTimeout(() => {
      setLines(drawLottoLines(nextMode));
      setDrawCount((count) => count + 1);
      setIsDrawing(false);
    }, 220);
  };

  const changeMode = (nextMode: DrawMode) => {
    if (nextMode === mode) return;
    setMode(nextMode);
    draw(nextMode);
  };

  useEffect(() => {
    const initialDraw = window.setTimeout(() => {
      setLines(drawLottoLines("all-unique"));
      setDrawCount(1);
    }, 0);

    fetch("/api/visitors", { method: "POST" })
      .then((response) => {
        if (!response.ok) throw new Error("Visitor counter is unavailable");
        return response.json() as Promise<{ total: number }>;
      })
      .then(({ total }) => setVisitorCount(total))
      .catch(() => setVisitorCount(null));

    fetch("/api/winning-numbers")
      .then((response) => {
        if (!response.ok) throw new Error("Winning numbers are unavailable");
        return response.json() as Promise<{ draws: WinningDraw[] }>;
      })
      .then(({ draws }) => {
        if (draws.length >= 2) setWinningDraws(draws.slice(0, 2));
      })
      .catch(() => undefined);

    return () => window.clearTimeout(initialDraw);
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
          <div className="hero-title-row">
            <h1 id="page-title">
              한 주의
              <br />
              <span>소소한 희망을 위해.</span>
            </h1>

            <div className="hero-actions">
              <span
                className={`panel-visitor ${visitorCount === null ? "is-loading" : ""}`}
                aria-label={visitorCount === null ? "링크 방문자 수 불러오는 중" : `링크 방문자 수 ${visitorCount.toLocaleString()}명`}
              >
                <Link2 aria-hidden="true" />
                링크 방문 {visitorCount === null ? "—" : visitorCount.toLocaleString()}
              </span>

              <details className="winning-dropdown">
                <summary>
                  <span>최근 당첨번호</span>
                  <strong>{winningDraws[0]?.round}회</strong>
                </summary>
                <div className="winning-menu">
                  {winningDraws.map((draw, index) => (
                    <div className="winning-draw" key={draw.round}>
                      <div className="winning-draw-heading">
                        <strong>{index === 0 ? "직전 회차" : "지난 회차"} · {draw.round}회</strong>
                        <span>{draw.date.slice(5).replace("-", ".")}</span>
                      </div>
                      <div className="winning-balls" aria-label={`${draw.round}회 당첨번호`}>
                        {draw.numbers.map((number) => (
                          <span className={`winning-ball ${colorClass(number)}`} key={number}>{number}</span>
                        ))}
                        <i aria-hidden="true">+</i>
                        <span className={`winning-ball bonus ${colorClass(draw.bonus)}`}>{draw.bonus}</span>
                      </div>
                    </div>
                  ))}
                  <p>※ 동행복권 공식 결과 기준</p>
                </div>
              </details>
            </div>
          </div>
          <p>
            1부터 45까지, 원하는 중복 방식을 선택해
            <br className="mobile-break" /> 다섯 줄을 한 번에 뽑아요.
          </p>
        </header>

        <div className="result-panel" aria-live="polite" aria-busy={isDrawing}>
          <div className="result-heading">
            <div>
              <p className="result-label">YOUR NUMBERS</p>
              <h2>이번 주 추천 번호</h2>
            </div>
            <fieldset className="draw-mode">
              <legend>번호 중복 방식</legend>
              <label>
                <input
                  type="radio"
                  name="draw-mode"
                  value="all-unique"
                  checked={mode === "all-unique"}
                  onChange={() => changeMode("all-unique")}
                />
                <span>30개 전체</span>
              </label>
              <label>
                <input
                  type="radio"
                  name="draw-mode"
                  value="line-unique"
                  checked={mode === "line-unique"}
                  onChange={() => changeMode("line-unique")}
                />
                <span>각 줄만</span>
              </label>
            </fieldset>
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

          <button className="draw-button" type="button" onClick={() => draw()} disabled={isDrawing}>
            <span className="button-icon" aria-hidden="true">↻</span>
            {isDrawing ? "행운을 섞는 중..." : "새 번호 5줄 뽑기"}
          </button>

          <p className="draw-note">
            <span aria-hidden="true">✦</span>
            {mode === "all-unique"
              ? "30개 전체가 겹치지 않도록 5줄에 나눕니다"
              : "각 줄 안에서만 겹치지 않게 5줄을 뽑습니다"}
            {drawCount > 1 && <span className="draw-count"> · {drawCount}회 추첨</span>}
          </p>
        </div>

        <footer>
          <p>행운은 가볍게, 구매는 책임감 있게.</p>
          <span>GOOD LUCK!</span>
        </footer>
      </section>
    </main>
  );
}
