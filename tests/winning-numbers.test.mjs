import assert from "node:assert/strict";
import test from "node:test";
import { toWinningDraw } from "../app/winning-numbers.ts";

test("maps an official draw response to the public winning-number shape", () => {
  const draw = toWinningDraw({
    ltEpsd: 1238,
    ltRflYmd: "20260822",
    tm1WnNo: 2,
    tm2WnNo: 13,
    tm3WnNo: 18,
    tm4WnNo: 32,
    tm5WnNo: 38,
    tm6WnNo: 42,
    bnsWnNo: 22,
  });

  assert.deepEqual(draw, {
    round: 1238,
    date: "2026-08-22",
    numbers: [2, 13, 18, 32, 38, 42],
    bonus: 22,
  });
});
