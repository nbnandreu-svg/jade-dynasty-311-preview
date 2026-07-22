import assert from "node:assert/strict";
import { readdir, stat } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
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
  assert.match(html, /<a class="cabinet-button" href="\/account">Личный кабинет<\/a>/);
  assert.match(html, /<a class="hero-start-button" href="\/account#register">Начать путь<\/a>/);
  assert.match(html, />Мир приключений</);

  const adventureCards = html.match(/class="adventure-card"/g) ?? [];
  assert.equal(adventureCards.length, 5);
  assert.match(html, /<a class="adventure-card" href="#world">/);

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
  assert.match(html, /<button class="class-card" type="button"[^>]*aria-pressed="false"/);
  assert.doesNotMatch(html, /class="class-card"[^>]*\bhidden\b/);
  assert.doesNotMatch(html, />Все 12 классов</);
  assert.doesNotMatch(html, /class="class-name"[^>]*>[^<]*<strong>[^<]+<\/strong><span>/);
  assert.doesNotMatch(html, /[\u3400-\u9fff]/u);
  assert.doesNotMatch(html, /\/_vinext\/image\?/);
});

test("server-renders the separate account and registration page", async () => {
  const response = await render("/account#register");
  assert.equal(response.status, 200);

  const html = await response.text();
  assert.match(html, />Личный кабинет</);
  assert.match(html, /id="login"/);
  assert.match(html, /id="register"/);
  assert.match(html, />Зарегистрироваться</);
  assert.match(html, /API игрового сервера/);
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

test("ships distinct section artwork from the project handoff", async () => {
  const assetRoot = new URL("../public/sections/", import.meta.url);
  const files = (await readdir(assetRoot)).sort();
  assert.deepEqual(files, [
    "event-treasure.webp",
    "gameplay-arena.webp",
    "news-airship.webp",
    "server-world.webp",
    "start-path.webp",
    "world-overview.webp",
  ]);

  for (const file of files) {
    const info = await stat(new URL(file, assetRoot));
    assert.ok(info.size > 100_000, `${file} should contain production artwork`);
  }
});
