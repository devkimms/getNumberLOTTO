import { FALLBACK_WINNING_DRAWS, toWinningDraw, type OfficialDraw } from "../../winning-numbers";

const resultPageUrl = "https://m.dhlottery.co.kr/lt645/result";

const fetchLatestDraws = async () => {
  const pageResponse = await fetch(resultPageUrl, {
    headers: { Accept: "text/html", "User-Agent": "getNumberLOTTO/1.0" },
  });
  if (!pageResponse.ok) throw new Error("Official result page is unavailable");

  const html = await pageResponse.text();
  const latestRound = html.match(/id=["']opt_val["'][^>]*value=["'](\d+)["']/i)?.[1];
  if (!latestRound) throw new Error("Latest draw round was not found");

  const dataUrl = new URL("/lt645/selectPstLt645InfoNew.do", resultPageUrl);
  dataUrl.searchParams.set("srchDir", "center");
  dataUrl.searchParams.set("srchLtEpsd", latestRound);

  const dataResponse = await fetch(dataUrl, {
    headers: { Accept: "application/json", "User-Agent": "getNumberLOTTO/1.0" },
  });
  if (!dataResponse.ok) throw new Error("Official draw data is unavailable");

  const payload = (await dataResponse.json()) as { data?: { list?: OfficialDraw[] } };
  const draws = (payload.data?.list ?? [])
    .map(toWinningDraw)
    .filter((draw) => draw.numbers.length === 6 && draw.numbers.every((number) => number >= 1 && number <= 45))
    .sort((a, b) => b.round - a.round)
    .slice(0, 2);

  if (draws.length < 2) throw new Error("Official draw data is incomplete");
  return draws;
};

export async function GET() {
  try {
    const draws = await fetchLatestDraws();
    return Response.json(
      { draws, source: "동행복권" },
      { headers: { "Cache-Control": "public, max-age=1800, s-maxage=1800" } },
    );
  } catch (error) {
    console.error("Failed to load official winning numbers", error);
    return Response.json(
      { draws: FALLBACK_WINNING_DRAWS, source: "동행복권", fallback: true },
      { headers: { "Cache-Control": "public, max-age=300" } },
    );
  }
}
