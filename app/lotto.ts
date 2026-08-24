export type LottoLines = number[][];
export type DrawMode = "all-unique" | "line-unique";

const secureRandom = () => {
  const buffer = new Uint32Array(1);
  globalThis.crypto.getRandomValues(buffer);
  return buffer[0] / 4_294_967_296;
};

const shuffledNumbers = (random: () => number) => {
  const pool = Array.from({ length: 45 }, (_, index) => index + 1);

  for (let index = pool.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [pool[index], pool[target]] = [pool[target], pool[index]];
  }

  return pool;
};

/** Draws five sorted lines using the selected duplicate rule. */
export function drawLottoLines(
  mode: DrawMode = "all-unique",
  random: () => number = secureRandom,
): LottoLines {
  if (mode === "line-unique") {
    return Array.from({ length: 5 }, () =>
      shuffledNumbers(random).slice(0, 6).sort((a, b) => a - b),
    );
  }

  const pool = shuffledNumbers(random);
  return Array.from({ length: 5 }, (_, lineIndex) =>
    pool.slice(lineIndex * 6, lineIndex * 6 + 6).sort((a, b) => a - b),
  );
}
