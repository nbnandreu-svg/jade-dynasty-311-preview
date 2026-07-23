import assert from "node:assert/strict";
import { readdir, stat } from "node:fs/promises";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${Math.random()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the production landing structure and real actions", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>Jade Dynasty 3\.1\.1 — Навстречу небесам<\/title>/);
  assert.match(html, /class="skip-link" href="#content"/);
  assert.match(html, /class="cabinet-button" href="\/account"/);
  assert.match(html, /class="primary-button hero-button" href="\/account#register"/);
  assert.match(html, /hero-clean-desktop\.avif/);
  assert.doesNotMatch(html, /hero-selected-reference/);

  for (const heading of ["Мир приключений", "Об игре", "О сервере", "Выбери свой путь", "Ограниченные события", "Три шага к началу путешествия"]) {
    assert.match(html, new RegExp(heading));
  }

  const adventureCards = html.match(/class="adventure-card"/g) ?? [];
  assert.equal(adventureCards.length, 5);
  const eventCards = html.match(/class="event-card"/g) ?? [];
  assert.equal(eventCards.length, 2);
  const selectorDots = html.match(/aria-label="Показать класс [^"]+"/g) ?? [];
  assert.equal(selectorDots.length, 12);

  assert.match(html, /aria-label="Показать предыдущий класс"/);
  assert.match(html, /aria-label="Показать следующий класс"/);
  assert.match(html, /\/account\?class=aine#register/);
  assert.match(html, /Ориентировочная оценка стиля класса/);
  assert.match(html, /disabled=""[^>]*>Подробнее во ВКонтакте — скоро/);

  assert.doesNotMatch(html, /Legacy/i);
  assert.doesNotMatch(html, /4\.8\.0|170 РБ|три расы/i);
  assert.doesNotMatch(html, /[\u3400-\u9fff]/u);
  assert.doesNotMatch(html, /\/_vinext\/image\?/);
});

test("renders the separate account and registration interface", async () => {
  const response = await render("/account?class=aine#register");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, />Личный кабинет</);
  assert.match(html, /id="login"/);
  assert.match(html, /id="register"/);
  assert.match(html, />Зарегистрироваться</);
  assert.match(html, /данные формы никуда не отправляются/);
});

test("ships complete responsive hero, adventure and class assets", async () => {
  const publicRoot = new URL("../public/", import.meta.url);

  for (const name of ["desktop", "tablet", "mobile"]) {
    for (const format of ["avif", "webp"]) {
      const file = new URL(`hero/hero-clean-${name}.${format}`, publicRoot);
      assert.ok((await stat(file)).size > 40_000, `${file.pathname} should contain hero artwork`);
    }
  }

  const adventureNames = ["01-sky-travel", "02-trade-craft", "03-epic-battles", "04-world-exploration", "05-festivals-events"];
  for (const name of adventureNames) {
    for (const format of ["png", "avif", "webp"]) {
      assert.ok((await stat(new URL(`adventures/${name}.${format}`, publicRoot))).size > 1_000);
    }
  }

  const classNames = ["arden", "vim", "titan", "skaya", "hakkan", "voida", "aine", "umbra", "tayo", "vailin", "morto", "niru"];
  for (const name of classNames) {
    for (const width of [320, 480, 640]) {
      for (const format of ["avif", "webp"]) {
        assert.ok((await stat(new URL(`classes/${name}-${width}.${format}`, publicRoot))).size > 10_000);
      }
    }
  }
});

test("ships distinct section artwork and a bespoke social preview", async () => {
  const publicRoot = new URL("../public/", import.meta.url);
  const sectionNames = ["about-game", "event-festival", "event-skies", "final-journey", "value-world"];
  const sizes = new Set();

  for (const name of sectionNames) {
    for (const width of [640, 960, 1440]) {
      for (const format of ["avif", "webp"]) {
        const info = await stat(new URL(`sections/${name}-${width}.${format}`, publicRoot));
        assert.ok(info.size > 20_000);
        if (width === 960 && format === "webp") sizes.add(info.size);
      }
    }
  }
  assert.equal(sizes.size, sectionNames.length, "section artwork should not reuse one mock image");
  assert.ok((await stat(new URL("og.png", publicRoot))).size > 100_000);
});

test("adventure directory contains only supported production formats", async () => {
  const files = await readdir(new URL("../public/adventures/", import.meta.url));
  assert.ok(files.every((file) => /\.(png|webp|avif)$/.test(file)));
});
