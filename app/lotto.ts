export type LottoLines = number[][];

const secureRandom = () => {
  const buffer = new Uint32Array(1);
  globalThis.crypto.getRandomValues(buffer);
  return buffer[0] / 4_294_967_296;
};

/** Draws 30 unique numbers from 1–45 into five sorted lines. */
export function drawLottoLines(random: () => number = secureRandom): LottoLines {
  const pool = Array.from({ length: 45 }, (_, index) => index + 1);

  for (let index = pool.length - 1; index > 0; index -= 1) {
    const target = Math.floor(random() * (index + 1));
    [pool[index], pool[target]] = [pool[target], pool[index]];
  }

  return Array.from({ length: 5 }, (_, lineIndex) =>
    pool.slice(lineIndex * 6, lineIndex * 6 + 6).sort((a, b) => a - b),
  );
}
