"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

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

const worldFeatures = [
  {
    mark: "01",
    title: "Путь бессмертия",
    text: "Развивайте героя, осваивайте новые ступени силы и находите собственный путь в мире восточного фэнтези.",
  },
  {
    mark: "02",
    title: "Большой живой мир",
    text: "Путешествуйте между городами и небесными землями, участвуйте в событиях и открывайте историю мира.",
  },
  {
    mark: "03",
    title: "Игра вместе",
    text: "Объединяйтесь с другими игроками, создавайте гильдии и проходите испытания, рассчитанные на команду.",
  },
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeClass, setActiveClass] = useState(0);

  useEffect(() => {
    const closeMenu = () => setMenuOpen(false);
    window.addEventListener("hashchange", closeMenu);
    return () => window.removeEventListener("hashchange", closeMenu);
  }, []);

  const selectedClass = classes[activeClass];

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Jade Dynasty — наверх">
          <span className="brand-mark" aria-hidden="true">JD</span>
          <span className="brand-copy">
            <strong>Jade Dynasty</strong>
            <small>версия 3.1.1</small>
          </span>
        </a>

        <button
          className="menu-toggle"
          type="button"
          aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((current) => !current)}
        >
          <span />
          <span />
        </button>

        <nav className={menuOpen ? "main-nav is-open" : "main-nav"} aria-label="Основная навигация">
          <a href="#about" onClick={() => setMenuOpen(false)}>Об игре</a>
          <a href="#server" onClick={() => setMenuOpen(false)}>О сервере</a>
          <a href="#classes" onClick={() => setMenuOpen(false)}>Классы</a>
          <a href="#start" onClick={() => setMenuOpen(false)}>Начать играть</a>
        </nav>

        <a className="account-link" href="#account">Личный кабинет</a>
      </header>

      <section className="hero" id="top">
        <div className="hero-sun" aria-hidden="true" />
        <div className="cloud cloud-one" aria-hidden="true" />
        <div className="cloud cloud-two" aria-hidden="true" />

        <div className="hero-copy">
          <p className="eyebrow"><span /> Jade Dynasty 3.1.1</p>
          <h1>Небеса ближе,<br /><em>чем кажется</em></h1>
          <p className="hero-lead">
            Восточная MMORPG о пути к бессмертию, великих сражениях и мире,
            который лучше открывать вместе.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#about">Открыть мир</a>
            <a className="button button-quiet" href="#classes">Выбрать класс <span>→</span></a>
          </div>
          <dl className="hero-facts" aria-label="Основные параметры сервера">
            <div><dt>3.1.1</dt><dd>версия</dd></div>
            <div><dt>160 РБ</dt><dd>макс. уровень</dd></div>
            <div><dt>2</dt><dd>расы</dd></div>
            <div><dt>12</dt><dd>классов</dd></div>
          </dl>
        </div>

        <div className="hero-art" aria-label="Персонаж Jade Dynasty">
          <div className="hero-art-frame">
            <Image
              src="/classes/vim.webp"
              alt="Воин в мире Jade Dynasty"
              fill
              priority
              sizes="(max-width: 900px) 88vw, 46vw"
            />
          </div>
          <div className="hero-seal" aria-hidden="true">天</div>
          <p className="hero-caption"><span>Мир приключений</span> Ваш путь начинается здесь</p>
        </div>

        <a className="scroll-cue" href="#about" aria-label="Перейти к разделу об игре">
          <span>Листайте вниз</span>
          <i aria-hidden="true">↓</i>
        </a>
      </section>

      <section className="about section" id="about">
        <div className="section-heading">
          <p className="eyebrow centered"><span /> Об игре <span /></p>
          <h2>Мир, полный <em>легенд</em></h2>
          <p>
            Jade Dynasty — многопользовательская ролевая игра в атмосфере восточного фэнтези.
            Здесь вы создаёте героя, выбираете класс, проходите сюжетные задания и сражаетесь
            рядом с другими игроками.
          </p>
        </div>

        <div className="feature-grid">
          {worldFeatures.map((feature) => (
            <article className="feature-card" key={feature.mark}>
              <span className="feature-number">{feature.mark}</span>
              <div className="feature-symbol" aria-hidden="true">◆</div>
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="server section" id="server">
        <div className="server-panel">
          <div className="server-copy">
            <p className="eyebrow"><span /> О сервере</p>
            <h2>Знакомая эпоха.<br /><em>Новый путь.</em></h2>
            <p>
              Проект строится на версии 3.1.1 с максимальным уровнем 160 РБ и двумя расами.
              Мы сохраняем узнаваемый мир Jade Dynasty и собираем понятную точку входа как
              для давних игроков, так и для тех, кто только знакомится с игрой.
            </p>
          </div>
          <div className="server-stats">
            <article><span>Версия игры</span><strong>3.1.1</strong></article>
            <article><span>Развитие героя</span><strong>160 РБ</strong></article>
            <article><span>Игровые расы</span><strong>2</strong></article>
            <article><span>Доступные классы</span><strong>12</strong></article>
          </div>
        </div>
      </section>

      <section className="classes section" id="classes">
        <div className="classes-heading">
          <div>
            <p className="eyebrow"><span /> Классы</p>
            <h2>Выберите свой <em>путь</em></h2>
          </div>
          <p>
            Двенадцать героев уже собраны в едином визуальном стиле. Выберите имя,
            чтобы рассмотреть образ класса.
          </p>
        </div>

        <div className="class-showcase">
          <div className="class-stage">
            <Image
              key={selectedClass.slug}
              src={`/classes/${selectedClass.slug}.webp`}
              alt={`Класс ${selectedClass.name}`}
              fill
              sizes="(max-width: 900px) 92vw, 44vw"
            />
            <div className="class-stage-copy">
              <span>Класс {String(activeClass + 1).padStart(2, "0")}</span>
              <strong>{selectedClass.name}</strong>
            </div>
          </div>

          <div className="class-selector" role="list" aria-label="Список классов">
            {classes.map((item, index) => (
              <button
                className={index === activeClass ? "class-option is-active" : "class-option"}
                key={item.slug}
                type="button"
                onClick={() => setActiveClass(index)}
                aria-pressed={index === activeClass}
              >
                <span>{String(index + 1).padStart(2, "0")}</span>
                <strong>{item.name}</strong>
                <i aria-hidden="true">→</i>
              </button>
            ))}
            <p className="class-note">
              Роли, оружие и особенности классов будут добавлены после проверки игровых данных.
            </p>
          </div>
        </div>
      </section>

      <section className="start section" id="start">
        <div className="start-ornament" aria-hidden="true">✦</div>
        <p className="eyebrow centered"><span /> Скоро открытие <span /></p>
        <h2>Начните свою <em>легенду</em></h2>
        <p>
          Регистрация, загрузка клиента и новости о запуске появятся здесь после подготовки игровых сервисов.
        </p>
        <button className="button button-primary" type="button" disabled>Подготовка к запуску</button>
      </section>

      <section className="account-note" id="account">
        <span>Личный кабинет</span>
        <p>Отдельная страница находится в проектировании и будет собрана следующим этапом.</p>
      </section>

      <footer>
        <a className="brand footer-brand" href="#top" aria-label="Jade Dynasty — наверх">
          <span className="brand-mark" aria-hidden="true">JD</span>
          <span className="brand-copy"><strong>Jade Dynasty</strong><small>версия 3.1.1</small></span>
        </a>
        <p>Неофициальный игровой проект. Название сервера находится в разработке.</p>
        <a href="#top">Наверх ↑</a>
      </footer>
    </main>
  );
}
