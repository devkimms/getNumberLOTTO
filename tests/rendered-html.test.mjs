import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the lotto product page", async () => {
  const response = await render();
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, /<html lang="ko">/i);
  assert.match(html, /<title>행운번호 \| 중복 없는 로또 번호 생성기<\/title>/i);
  assert.match(html, /pretendardvariable-dynamic-subset\.min\.css/i);
  assert.match(html, /한 주의/);
  assert.match(html, /소소한 희망을 위해/);
  assert.match(html, /최근 당첨번호/);
  assert.match(html, /새 번호 5줄 뽑기/);
  assert.match(html, /30개 전체/);
  assert.match(html, /각 줄만/);
  assert.doesNotMatch(html, /codex-preview|Building your site|react-loading-skeleton/i);
});
