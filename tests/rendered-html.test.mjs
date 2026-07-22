import assert from "node:assert/strict";
import { readdir, stat } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the approved landing-page structure", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Jade Dynasty 3\.1\.1/);
  assert.match(html, /aria-label="Jade Dynasty — Навстречу небесам"/);
  assert.match(html, />Мир приключений</);

  const adventureCards = html.match(/class="adventure-card"/g) ?? [];
  assert.equal(adventureCards.length, 5);

  for (const title of [
    "Небесные путешествия",
    "Торговля и ремёсла",
    "Эпические битвы",
    "Исследование мира",
    "Праздники и события",
  ]) {
    assert.match(html, new RegExp(`>${title}<`));
  }

  const classCards = html.match(/class="class-card"/g) ?? [];
  assert.equal(classCards.length, 12);
  assert.doesNotMatch(html, /class="class-card"[^>]*\bhidden\b/);
  assert.doesNotMatch(html, />Все 12 классов</);
});

test("ships separate adventure sources in PNG and WebP", async () => {
  const assetRoot = new URL("../public/adventures/", import.meta.url);
  const files = (await readdir(assetRoot)).sort();
  const expected = [
    "01-sky-travel",
    "02-trade-craft",
    "03-epic-battles",
    "04-world-exploration",
    "05-festivals-events",
  ].flatMap((name) => [`${name}.png`, `${name}.webp`]).sort();

  assert.deepEqual(files, expected);

  for (const file of files) {
    const info = await stat(new URL(file, assetRoot));
    assert.ok(info.size > 0, `${file} should not be empty`);
  }
});
