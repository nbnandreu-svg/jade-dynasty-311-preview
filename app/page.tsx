"use client";

import Image from "next/image";
import { useState } from "react";

const classes = [
  { name: "Арден", slug: "arden" },
  { name: "Вим", slug: "vim" },
  { name: "Титан", slug: "titan" },
  { name: "Ская", slug: "skaya" },
  { name: "Хаккан", slug: "hakkan" },
  { name: "Войда", slug: "voida" },
  { name: "Айне", slug: "aine" },
  { name: "Умбра", slug: "umbra" },
  { name: "Тайо", slug: "tayo" },
  { name: "Вайлин", slug: "vailin" },
  { name: "Морто", slug: "morto" },
  { name: "Ниру", slug: "niru" },
];

const features = [
  { number: "01", title: "Исследовать мир", text: "Открывайте города, долины и небесные земли." },
  { number: "02", title: "Развивать героя", text: "Собирайте снаряжение и усиливайте умения." },
  { number: "03", title: "Побеждать боссов", text: "Проходите испытания в группе или в одиночку." },
  { number: "04", title: "Сражаться вместе", text: "Создавайте гильдии и участвуйте в событиях." },
];

const adventureItems = [
  {
    title: "Небесные путешествия",
    image: "/adventures/01-sky-travel.webp",
    href: "#world",
    alt: "Воздушный корабль над небесными землями",
  },
  {
    title: "Торговля и ремёсла",
    image: "/adventures/02-trade-craft.webp",
    href: "#activities",
    alt: "Торговая улица восточного города",
  },
  {
    title: "Эпические битвы",
    image: "/adventures/03-epic-battles.webp",
    href: "#classes",
    alt: "Сражение героев с магическими умениями",
  },
  {
    title: "Исследование мира",
    image: "/adventures/04-world-exploration.webp",
    href: "#about",
    alt: "Небесный храм среди гор и водопадов",
  },
  {
    title: "Праздники и события",
    image: "/adventures/05-festivals-events.webp",
    href: "#events",
    alt: "Праздник с фонарями и фейерверками",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [videoNote, setVideoNote] = useState(false);
  const [selectedClass, setSelectedClass] = useState<string | null>(null);

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

        <a className="cabinet-button" href="/account">Личный кабинет</a>
      </header>

      <section className="hero" id="top" aria-label="Jade Dynasty — Навстречу небесам">
        <a className="hero-start-button" href="/account#register">Начать путь</a>
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
              <a className="adventure-card" href={item.href} key={item.image}>
                <div className="adventure-art">
                  <Image src={item.image} alt={item.alt} fill sizes="205px" unoptimized />
                </div>
                <strong>{item.title}</strong>
              </a>
            ))}
          </div>
        </section>

        <section className="value-section section-wrap" id="about" aria-labelledby="value-title">
          <div className="value-intro">
            <span>Восточная фэнтезийная MMORPG</span>
            <h2 id="value-title">Что ждёт вас в Jade Dynasty</h2>
            <p>
              Исследуйте небесные земли, развивайте героя, проходите испытания
              и находите союзников в большом мире восточного фэнтези.
            </p>
          </div>

          <div className="value-layout">
            <article className="value-lead">
              <div className="value-lead-copy">
                <span>Открывайте мир</span>
                <h3>Путешествие, в котором всегда есть следующий горизонт</h3>
                <p>
                  Отправляйтесь к небесным городам и древним землям, находите новые
                  места и выбирайте, чем заняться сегодня.
                </p>
                <a href="#world">Посмотреть игровой процесс</a>
              </div>
            </article>

            <div className="value-cards" aria-label="Основные возможности игры">
              <article className="value-card value-card-growth">
                <span>01</span>
                <div><h3>Развивайте героя</h3><p>Выберите класс, осваивайте умения и двигайтесь к 160 РБ.</p></div>
              </article>
              <article className="value-card value-card-battle">
                <span>02</span>
                <div><h3>Проходите испытания</h3><p>Сражайтесь с сильными противниками и проверяйте выбранный стиль игры.</p></div>
              </article>
              <article className="value-card value-card-together">
                <span>03</span>
                <div><h3>Играйте вместе</h3><p>Объединяйтесь с другими игроками, вступайте в гильдии и участвуйте в событиях.</p></div>
              </article>
            </div>
          </div>

          <div className="server-passport" id="server">
            <div className="passport-copy">
              <span>О сервере</span>
              <h3>Параметры без догадок</h3>
              <p>Всё главное можно проверить до регистрации.</p>
            </div>
            <dl>
              <div><dt>Версия игры</dt><dd>3.1.1</dd></div>
              <div><dt>Максимальный уровень</dt><dd>160 РБ</dd></div>
              <div><dt>Игровые расы</dt><dd>2</dd></div>
              <div><dt>Классы</dt><dd>12</dd></div>
            </dl>
            <a href="/account#register">Создать аккаунт</a>
          </div>
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
                  <b>{feature.number}</b>
                  <strong>{feature.title}</strong>
                  <span>{feature.text}</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="class-section section-wrap" id="classes">
          <OrnamentHeading>Выбери свой путь</OrnamentHeading>
          <div className="class-grid">
            {classes.map((item) => (
              <button
                className={selectedClass === item.slug ? "class-card selected" : "class-card"}
                type="button"
                key={item.slug}
                aria-pressed={selectedClass === item.slug}
                onClick={() => setSelectedClass(item.slug)}
              >
                <div className="class-image">
                  <Image src={`/classes/${item.slug}.webp`} alt={`Класс ${item.name}`} fill sizes="(max-width: 620px) 48vw, (max-width: 950px) 25vw, 260px" unoptimized />
                </div>
                <div className="class-name"><strong>{item.name}</strong></div>
              </button>
            ))}
          </div>
          {selectedClass && (
            <div className="class-selection" role="status">
              <span>Вы выбрали класс</span>
              <strong>{classes.find((item) => item.slug === selectedClass)?.name}</strong>
              <a href="/account#register">Создать аккаунт</a>
            </div>
          )}
        </section>

        <section className="lower-grid section-wrap" id="events">
          <article className="ornate-panel compact-panel">
            <SectionTitle>Чем заняться</SectionTitle>
            <div className="activity-grid" id="activities">
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
              <li><a href="/account#register"><b>1</b><span>Создайте аккаунт</span></a></li>
              <li><b>2</b><span>Установите лаунчер</span></li>
              <li><b>3</b><span>Войдите в игру</span></li>
            </ol>
            <p>Регистрация и загрузка откроются после подготовки игровых сервисов.</p>
          </article>
        </section>

        <section className="cabinet-note section-wrap">
          <strong>Личный кабинет</strong>
          <span>Регистрация и вход вынесены на отдельную страницу.</span>
          <a href="/account">Открыть кабинет</a>
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

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h2 className="section-title"><span>{children}</span></h2>;
}

function OrnamentHeading({ children }: { children: React.ReactNode }) {
  return <h2 className="ornament-heading"><i /><b>◇</b><span>{children}</span><b>◇</b><i /></h2>;
}
