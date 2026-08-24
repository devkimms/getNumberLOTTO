export type WinningDraw = {
  round: number;
  date: string;
  numbers: number[];
  bonus: number;
};

export type OfficialDraw = {
  ltEpsd: number;
  ltRflYmd: string;
  tm1WnNo: number;
  tm2WnNo: number;
  tm3WnNo: number;
  tm4WnNo: number;
  tm5WnNo: number;
  tm6WnNo: number;
  bnsWnNo: number;
};

const formatDate = (value: string) =>
  value.length === 8
    ? `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`
    : value;

export const toWinningDraw = (draw: OfficialDraw): WinningDraw => ({
  round: Number(draw.ltEpsd),
  date: formatDate(String(draw.ltRflYmd)),
  numbers: [draw.tm1WnNo, draw.tm2WnNo, draw.tm3WnNo, draw.tm4WnNo, draw.tm5WnNo, draw.tm6WnNo].map(Number),
  bonus: Number(draw.bnsWnNo),
});

/** Last verified official results, used only when the live endpoint is unavailable. */
export const FALLBACK_WINNING_DRAWS: WinningDraw[] = [
  { round: 1238, date: "2026-08-22", numbers: [2, 13, 18, 32, 38, 42], bonus: 22 },
  { round: 1237, date: "2026-08-15", numbers: [10, 20, 23, 34, 37, 40], bonus: 36 },
];
