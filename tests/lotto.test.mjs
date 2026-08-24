import assert from "node:assert/strict";
import test from "node:test";
import { drawLottoLines } from "../app/lotto.ts";

test("draws five lines with six numbers each", () => {
  const lines = drawLottoLines();
  assert.equal(lines.length, 5);
  lines.forEach((line) => assert.equal(line.length, 6));
});

test("keeps all 30 numbers unique and in the 1-45 range", () => {
  for (let draw = 0; draw < 1_000; draw += 1) {
    const lines = drawLottoLines();
    const allNumbers = lines.flat();

    assert.equal(new Set(allNumbers).size, 30);
    assert.ok(allNumbers.every((number) => number >= 1 && number <= 45));
    assert.ok(lines.every((line) => line.every((number, index) => index === 0 || line[index - 1] < number)));
  }
});

test("line-only mode keeps each line unique while allowing repeats across lines", () => {
  const lines = drawLottoLines("line-unique", () => 0);
  assert.equal(lines.length, 5);

  lines.forEach((line) => {
    assert.equal(line.length, 6);
    assert.equal(new Set(line).size, 6);
    assert.ok(line.every((number) => number >= 1 && number <= 45));
  });

  assert.ok(new Set(lines.flat()).size < 30);
});
