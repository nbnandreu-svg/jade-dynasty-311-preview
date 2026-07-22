"use client";

import Image from "next/image";
import { useState } from "react";

const classes = [
  { name: "Арден", slug: "arden", seal: "弓" },
  { name: "Вим", slug: "vim", seal: "武" },
  { name: "Титан", slug: "titan", seal: "力" },
  { name: "Ская", slug: "skaya", seal: "光" },
  { name: "Хаккан", slug: "hakkan", seal: "刃" },
  { name: "Войда", slug: "voida", seal: "影" },
  { name: "Айне", slug: "aine", seal: "霜" },
  { name: "Умбра", slug: "umbra", seal: "夜" },
  { name: "Тайо", slug: "tayo", seal: "炎" },
  { name: "Вайлин", slug: "vailin", seal: "音" },
  { name: "Морто", slug: "morto", seal: "魂" },
  { name: "Ниру", slug: "niru", seal: "星" },
];

const features = [
  { symbol: "山", title: "Исследовать мир" },
  { symbol: "道", title: "Развивать героя" },
  { symbol: "王", title: "Побеждать боссов" },
  { symbol: "盟", title: "Сражаться вместе" },
];

const adventureItems = [
  {
    title: "Небесные путешествия",
    image: "/adventures/01-sky-travel.webp",
    alt: "Воздушный корабль над небесными землями",
  },
  {
    title: "Торговля и ремёсла",
    image: "/adventures/02-trade-craft.webp",
    alt: "Торговая улица восточного города",
  },
  {
    title: "Эпические битвы",
    image: "/adventures/03-epic-battles.webp",
    alt: "Сражение героев с магическими умениями",
  },
  {
    title: "Исследование мира",
    image: "/adventures/04-world-exploration.webp",
    alt: "Небесный храм среди гор и водопадов",
  },
  {
    title: "Праздники и события",
    image: "/adventures/05-festivals-events.webp",
    alt: "Праздник с фонарями и фейерверками",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoNote, setVideoNote] = useState(false);

  return (
    <main className="page-shell">
      <header className="topbar">
        <a className="round-logo" href="#top" aria-label="Jade Dynasty — наверх">JD</a>

        <button
          className="menu-button"
          type="button"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span /><span /><span />
        </button>

        <nav className={menuOpen ? "topnav open" : "topnav"} aria-label="Основная навигация">
          <a href="#about" onClick={() => setMenuOpen(false)}>Об игре</a>
          <a href="#server" onClick={() => setMenuOpen(false)}>О сервере</a>
          <a href="#classes" onClick={() => setMenuOpen(false)}>Классы</a>
          <a href="#events" onClick={() => setMenuOpen(false)}>События</a>
          <a className="active" href="#start" onClick={() => setMenuOpen(false)}>Начать</a>
        </nav>

        <a className="cabinet-button" href="#cabinet" aria-label="Личный кабинет" title="Личный кабинет">
          <span aria-hidden="true">●</span>
        </a>
      </header>

      <section className="hero" id="top" aria-label="Jade Dynasty — Навстречу небесам">
        <a className="hero-start-hotspot" href="#start" aria-label="Начать путь в Jade Dynasty" />
        <div className="cloud-divider" aria-hidden="true" />
      </section>

      {videoNote && (
        <div className="floating-note" role="status">
          Игровой ролик появится после подготовки материалов.
          <button type="button" aria-label="Закрыть сообщение" onClick={() => setVideoNote(false)}>×</button>
        </div>
      )}

      <div className="parchment-content">
        <section className="adventure-strip section-wrap" aria-labelledby="adventure-title">
          <h2 className="adventure-heading" id="adventure-title">
            <i /><b>◇</b><span>Мир приключений</span><b>◇</b><i />
          </h2>
          <div className="adventure-list">
            {adventureItems.map((item) => (
              <article className="adventure-card" key={item.image}>
                <div className="adventure-art">
                  <Image src={item.image} alt={item.alt} fill sizes="205px" />
                </div>
                <strong>{item.title}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="intro-grid section-wrap" aria-label="Знакомство с игрой и сервером">
          <article className="ornate-panel about-panel" id="about">
            <SectionTitle symbol="閣">Об игре</SectionTitle>
            <div className="world-picture" role="img" aria-label="Небесные города мира Jade Dynasty" />
            <p className="panel-intro">
              Jade Dynasty — MMORPG в мире восточного фэнтези. Исследуйте небесные земли,
              развивайте героя и проходите испытания вместе с другими игроками.
            </p>
            <div className="mini-features">
              <div><b>界</b><strong>Огромный мир</strong><span>Свободное путешествие по небесным землям</span></div>
              <div><b>剑</b><strong>Динамичные бои</strong><span>Зрелищные сражения и яркие умения</span></div>
              <div><b>仙</b><strong>Рост персонажа</strong><span>Прокачивайте героя и раскрывайте потенциал</span></div>
            </div>
          </article>

          <article className="ornate-panel server-panel" id="server">
            <SectionTitle symbol="印">О сервере</SectionTitle>
            <div className="server-facts">
              <div><b>旋</b><span><strong>3.1.1</strong><small>версия игры</small></span></div>
              <div><b>鼎</b><span><strong>160 РБ</strong><small>максимальный уровень</small></span></div>
              <div><b>族</b><span><strong>2 расы</strong><small>игровые народы</small></span></div>
              <div><b>武</b><span><strong>12 классов</strong><small>рабочий состав</small></span></div>
            </div>
            <div className="server-landscape" role="img" aria-label="Город игрового мира" />
          </article>
        </section>

        <section className="world section-wrap" id="world">
          <OrnamentHeading>Мир и возможности</OrnamentHeading>
          <div className="world-grid">
            <button className="video-frame" type="button" onClick={() => setVideoNote(true)} aria-label="Смотреть игровой процесс">
              <span className="play"><i>▶</i></span>
              <span className="video-controls"><i>▶</i><em /><i>●</i><i>⛶</i></span>
            </button>
            <div className="feature-tiles">
              {features.map((feature) => (
                <article key={feature.title}>
                  <b>{feature.symbol}</b>
                  <strong>{feature.title}</strong>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="class-section section-wrap" id="classes">
          <OrnamentHeading>Выбери свой путь</OrnamentHeading>
          <div className="class-grid">
            {classes.map((item) => (
              <article className="class-card" key={item.slug}>
                <div className="class-image">
                  <Image src={`/classes/${item.slug}.webp`} alt={`Класс ${item.name}`} fill sizes="(max-width: 620px) 48vw, (max-width: 950px) 25vw, 260px" />
                </div>
                <div className="class-name"><strong>{item.name}</strong><span>{item.seal}</span></div>
              </article>
            ))}
          </div>
        </section>

        <section className="lower-grid section-wrap" id="events">
          <article className="ornate-panel compact-panel">
            <SectionTitle>Чем заняться</SectionTitle>
            <div className="activity-grid">
              <div className="activity activity-one"><span>Исследовать мир</span></div>
              <div className="activity activity-two"><span>Проходить подземелья</span></div>
              <div className="activity activity-three"><span>Собирать и создавать</span></div>
              <div className="activity activity-four"><span>Вступать в гильдии</span></div>
            </div>
          </article>

          <article className="ornate-panel compact-panel events-panel">
            <SectionTitle>События</SectionTitle>
            <div className="event-main" />
            <div className="event-row"><div /><div /></div>
            <p>Расписание и новости появятся ближе к запуску.</p>
          </article>

          <article className="ornate-panel compact-panel start-panel" id="start">
            <SectionTitle>Начать играть</SectionTitle>
            <ol>
              <li><b>1</b><i>人</i><span>Создайте аккаунт</span></li>
              <li><b>2</b><i>↓</i><span>Установите лаунчер</span></li>
              <li><b>3</b><i>旋</i><span>Войдите в игру</span></li>
            </ol>
            <p>Регистрация и загрузка откроются после подготовки игровых сервисов.</p>
          </article>
        </section>

        <section className="cabinet-note section-wrap" id="cabinet">
          <strong>Личный кабинет</strong>
          <span>Будет собран отдельной страницей на следующем этапе.</span>
        </section>

        <footer>
          <span className="footer-rule" />
          <a className="round-logo" href="#top" aria-label="Jade Dynasty — наверх">JD</a>
          <strong>Jade Dynasty</strong>
          <small>Версия 3.1.1</small>
          <span className="footer-rule" />
        </footer>
      </div>
    </main>
  );
}

function SectionTitle({ children, symbol }: { children: React.ReactNode; symbol?: string }) {
  return <h2 className="section-title">{symbol && <b aria-hidden="true">{symbol}</b>}<span>{children}</span></h2>;
}

function OrnamentHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="ornament-heading"><i /><b>◇</b><span>{children}</span><b>◇</b><i /></h2>;
}
