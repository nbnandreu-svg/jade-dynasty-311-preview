"use client";

import { type CSSProperties, type KeyboardEvent, type TouchEvent, useMemo, useState } from "react";

type ClassItem = {
  name: string;
  slug: string;
  race: "Люди" | "Теоны";
  role: string;
  range: string;
  weapon: string;
  description: string;
  suitable: string;
  caution: string;
  stats: [number, number, number, number, number];
};

export const adventureItems = [
  { title: "Небесные путешествия", image: "01-sky-travel", href: "#about", alt: "Воздушный корабль над небесными землями" },
  { title: "Торговля и ремёсла", image: "02-trade-craft", href: "#values", alt: "Торговая улица восточного города" },
  { title: "Эпические битвы", image: "03-epic-battles", href: "#classes", alt: "Сражение героев с магическими умениями" },
  { title: "Исследование мира", image: "04-world-exploration", href: "#about", alt: "Небесный храм среди гор и водопадов" },
  { title: "Праздники и события", image: "05-festivals-events", href: "#events", alt: "Праздник с фонарями и фейерверками" },
];

export const classItems: ClassItem[] = [
  { name: "Арден", slug: "arden", race: "Теоны", role: "Стрелок · мобильный урон", range: "Дальний бой", weapon: "Лук", description: "Подвижный стрелок, который удерживает дистанцию, быстро меняет позицию и наносит физический урон по одной цели.", suitable: "Тем, кто любит движение, точные атаки и безопасную дистанцию.", caution: "Ошибки в позиции особенно заметны в ближнем бою.", stats: [8, 4, 9, 5, 3] },
  { name: "Вим", slug: "vim", race: "Люди", role: "Защитник · контроль", range: "Ближний бой", weapon: "Тяжёлый клинок", description: "Стойкий воин первой линии. Выдерживает давление, удерживает противников рядом и создаёт пространство для группы.", suitable: "Тем, кто хочет вести бой с передней линии и защищать союзников.", caution: "Короткая дистанция требует уверенного входа в бой.", stats: [6, 9, 4, 7, 3] },
  { name: "Титан", slug: "titan", race: "Теоны", role: "Воин · натиск", range: "Ближний бой", weapon: "Секира", description: "Сильный боец ближнего боя, соединяющий высокую выживаемость с тяжёлыми ударами и постоянным давлением.", suitable: "Тем, кто ценит прямой бой и надёжность.", caution: "Меньше инструментов для игры на большой дистанции.", stats: [8, 8, 4, 5, 2] },
  { name: "Ская", slug: "skaya", race: "Люди", role: "Целитель · поддержка", range: "Дальний бой", weapon: "Посох", description: "Поддерживает отряд лечением и усилениями, помогая группе дольше сохранять темп в сложных сражениях.", suitable: "Тем, кому нравится усиливать команду и контролировать ход боя.", caution: "Сольный взрывной урон уступает боевым классам.", stats: [3, 5, 5, 6, 10] },
  { name: "Хаккан", slug: "hakkan", race: "Люди", role: "Убийца · критический урон", range: "Ближний бой", weapon: "Парные клинки", description: "Быстрый дуэлянт с мощными критическими атаками. Особенно опасен, когда выбирает момент и одну приоритетную цель.", suitable: "Тем, кто любит короткие комбинации и рискованный темп.", caution: "Невысокая защита не прощает затяжных разменов.", stats: [10, 3, 9, 6, 2] },
  { name: "Войда", slug: "voida", race: "Теоны", role: "Боец · комбинации", range: "Ближний бой", weapon: "Боевые перчатки", description: "Агрессивный мастер рукопашного боя. Сближается рывками и связывает удары в усиленные комбинации.", suitable: "Тем, кто предпочитает высокий темп и активное давление.", caution: "Сила раскрывается через последовательности умений.", stats: [8, 7, 8, 7, 2] },
  { name: "Айне", slug: "aine", race: "Люди", role: "Маг · массовый урон", range: "Дальний бой", weapon: "Магический меч", description: "Маг дальнего боя, который быстро справляется с группами противников и контролирует пространство атаками по площади.", suitable: "Тем, кто любит высокий урон, дальний бой и большие группы целей.", caution: "Слабая защита требует держать дистанцию.", stats: [10, 3, 5, 8, 3] },
  { name: "Умбра", slug: "umbra", race: "Теоны", role: "Убийца · скрытность", range: "Ближний бой", weapon: "Коса", description: "Скрытный охотник, который выбирает уязвимую цель, стремительно сближается и наносит точный взрывной урон.", suitable: "Тем, кто ценит внезапность, скорость и дуэли.", caution: "Требует точного выбора момента для атаки.", stats: [10, 3, 10, 7, 2] },
  { name: "Тайо", slug: "tayo", race: "Люди", role: "Маг · урон по площади", range: "Дальний бой", weapon: "Огненные артефакты", description: "Боевой маг с сильными атаками по площади и эффектами огня. Хорошо работает там, где нужно давить сразу несколько целей.", suitable: "Тем, кто любит яркие заклинания и управление зоной боя.", caution: "Нуждается в защите при плотном ближнем давлении.", stats: [9, 4, 5, 8, 4] },
  { name: "Вайлин", slug: "vailin", race: "Теоны", role: "Поддержка · отражение", range: "Дальний бой", weapon: "Цитра", description: "Музыкальный класс поддержки: лечит, усиливает союзников, ослабляет врагов и помогает группе переживать опасные фазы.", suitable: "Тем, кто хочет влиять на всю команду, а не только наносить урон.", caution: "Ключевые возможности раскрываются постепенно.", stats: [4, 6, 5, 7, 10] },
  { name: "Морто", slug: "morto", race: "Люди", role: "Чародей · формы и проклятия", range: "Смешанный бой", weapon: "Талисманы", description: "Гибкий чародей с несколькими формами, постепенным уроном и ослаблениями. Может менять задачу прямо во время боя.", suitable: "Тем, кто любит сложные сборки и адаптивный стиль.", caution: "Один из самых требовательных классов для освоения.", stats: [7, 7, 5, 10, 5] },
  { name: "Ниру", slug: "niru", race: "Теоны", role: "Маг · контроль групп", range: "Дальний бой", weapon: "Солнечные реликвии", description: "Дальний маг с двумя боевыми состояниями, групповыми атаками и инструментами контроля больших столкновений.", suitable: "Тем, кто хочет управлять темпом массового боя.", caution: "Для результата важно вовремя менять состояние и позицию.", stats: [8, 5, 5, 9, 6] },
];

export const eventItems = [
  { eyebrow: "Ближайшее событие", title: "Праздник небесных огней", image: "event-festival", alt: "Городской праздник с фонарями", text: "Описание и расписание появятся в сообществе проекта после подтверждения календаря." },
  { eyebrow: "Следующее событие", title: "Испытание небесных земель", image: "event-skies", alt: "Воздушные земли и герои перед большим испытанием", text: "Подробности будут опубликованы во ВКонтакте. На сайте не показываются неподтверждённые даты." },
];

const sectionPictures: Record<string, { alt: string; width: number; height: number }> = {
  "about-game": { alt: "Художественный обзор восточного фэнтезийного мира", width: 960, height: 371 },
  "final-journey": { alt: "Небесные земли на рассвете", width: 960, height: 419 },
};

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [classIndex, setClassIndex] = useState(6);
  const [touchStart, setTouchStart] = useState<number | null>(null);

  const currentClass = classItems[classIndex];
  const previousClass = classItems[(classIndex - 1 + classItems.length) % classItems.length];
  const nextClass = classItems[(classIndex + 1) % classItems.length];

  function changeClass(direction: number) {
    setClassIndex((index) => (index + direction + classItems.length) % classItems.length);
  }

  function selectClass(index: number) {
    setClassIndex(index);
  }

  function handleClassKeys(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      changeClass(-1);
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      changeClass(1);
    }
  }

  function handleTouchEnd(event: TouchEvent<HTMLElement>) {
    if (touchStart === null) return;
    const distance = event.changedTouches[0].clientX - touchStart;
    if (Math.abs(distance) > 45) changeClass(distance > 0 ? -1 : 1);
    setTouchStart(null);
  }

  return (
    <main className="page-shell">
      <a className="skip-link" href="#content">Перейти к содержанию</a>

      <header className="topbar">
        <a className="round-logo" href="#top" aria-label="Jade Dynasty — наверх"><span>JD</span></a>
        <nav className={menuOpen ? "topnav is-open" : "topnav"} aria-label="Основная навигация">
          <a href="#about" onClick={() => setMenuOpen(false)}>Об игре</a>
          <a href="#server" onClick={() => setMenuOpen(false)}>О сервере</a>
          <a href="#classes" onClick={() => setMenuOpen(false)}>Классы</a>
          <a href="#events" onClick={() => setMenuOpen(false)}>События</a>
          <a href="#start" onClick={() => setMenuOpen(false)}>Начать</a>
        </nav>
        <a className="cabinet-button" href="/account">Личный кабинет</a>
        <button className="menu-button" type="button" aria-label={menuOpen ? "Закрыть меню" : "Открыть меню"} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          <span /><span /><span />
        </button>
      </header>

      <section className="hero" id="top" aria-label="Jade Dynasty — Навстречу небесам">
        <picture className="hero-media">
          <source media="(max-width: 640px)" type="image/avif" srcSet="/hero/hero-clean-mobile.avif" />
          <source media="(max-width: 640px)" type="image/webp" srcSet="/hero/hero-clean-mobile.webp" />
          <source media="(max-width: 1100px)" type="image/avif" srcSet="/hero/hero-clean-tablet.avif" />
          <source media="(max-width: 1100px)" type="image/webp" srcSet="/hero/hero-clean-tablet.webp" />
          <source type="image/avif" srcSet="/hero/hero-clean-desktop.avif" />
          <img src="/hero/hero-clean-desktop.webp" alt="Герои Jade Dynasty на фоне небесного города" width="1672" height="736" fetchPriority="high" />
        </picture>
        <div className="hero-actions">
          <a className="primary-button hero-button" href="/account#register"><span>Начать путь</span></a>
          <p><b>3.1.1</b><i />160 РБ<i />2 расы<i />12 классов</p>
        </div>
        <div className="hero-cloud" aria-hidden="true" />
      </section>

      <div className="parchment" id="content">
        <section className="adventures section-wrap" aria-labelledby="adventure-title">
          <SectionHeading id="adventure-title">Мир приключений</SectionHeading>
          <p className="section-lead">Исследуйте небесные земли, развивайте героя и находите свой путь вместе с другими игроками.</p>
          <div className="adventure-list">
            {adventureItems.map((item) => (
              <a className="adventure-card" href={item.href} key={item.image}>
                <picture>
                  <source type="image/avif" srcSet={`/adventures/${item.image}.avif`} />
                  <img src={`/adventures/${item.image}.webp`} alt={item.alt} width="1200" height="1000" loading="lazy" />
                </picture>
                <strong>{item.title}</strong>
              </a>
            ))}
          </div>
        </section>

        <section className="about section-wrap" id="about" aria-labelledby="about-title">
          <div className="about-art art-frame">
            <ResponsiveSectionImage name="about-game" />
            <span>Художественный обзор мира</span>
          </div>
          <div className="about-copy">
            <p className="eyebrow">Об игре</p>
            <h2 id="about-title">Восточная MMORPG о пути героя</h2>
            <p>Jade Dynasty — фэнтезийная онлайн-игра о развитии персонажа, исследовании большого мира и сражениях вместе с другими игроками. Вы выбираете класс, осваиваете его умения и постепенно открываете новые испытания.</p>
            <div className="about-cycles" id="values">
              <article><b>01</b><div><strong>Исследовать</strong><span>Города, долины и небесные земли.</span></div></article>
              <article><b>02</b><div><strong>Развиваться</strong><span>Умения, снаряжение и собственный стиль.</span></div></article>
              <article><b>03</b><div><strong>Сражаться вместе</strong><span>Группы, гильдии и общие события.</span></div></article>
            </div>
          </div>
        </section>

        <section className="server section-wrap" id="server" aria-labelledby="server-title">
          <div className="server-head">
            <div><p className="eyebrow">О сервере</p><h2 id="server-title">Всё важное — до установки</h2></div>
            <p>Подтверждённые параметры собраны в одном месте. Остальные сведения появятся только после проверки.</p>
          </div>
          <dl className="server-facts">
            <div><dt>Версия</dt><dd>3.1.1</dd></div>
            <div><dt>Предел развития</dt><dd>160 РБ</dd></div>
            <div><dt>Расы</dt><dd>2</dd></div>
            <div><dt>Классы</dt><dd>12</dd></div>
          </dl>
          <div className="server-values">
            <article><span>01</span><div><strong>Понятные параметры</strong><p>Версия и предел развития без поиска по форумам.</p></div></article>
            <article><span>02</span><div><strong>Выбор до старта</strong><p>Роль и особенности каждого класса до регистрации.</p></div></article>
            <article><span>03</span><div><strong>Короткий путь</strong><p>Аккаунт, клиент и вход в игру — три ясных шага.</p></div></article>
          </div>
          <a className="primary-button server-button" href="#classes"><span>Подобрать класс</span></a>
        </section>

        <section className="classes section-wrap" id="classes" aria-labelledby="classes-title" tabIndex={0} onKeyDown={handleClassKeys} onTouchStart={(event) => setTouchStart(event.touches[0].clientX)} onTouchEnd={handleTouchEnd}>
          <div className="classes-heading"><SectionHeading id="classes-title">Выбери свой путь</SectionHeading><span>{String(classIndex + 1).padStart(2, "0")} / 12</span></div>
          <div className="class-layout">
            <div className="class-stage">
              <button className="class-preview previous" type="button" onClick={() => changeClass(-1)} aria-label={`Предыдущий класс: ${previousClass.name}`}>
                <ClassPicture item={previousClass} sizes="210px" />
              </button>
              <div className="class-main-card" aria-live="polite">
                <ClassPicture item={currentClass} sizes="(max-width: 640px) 86vw, 510px" priority />
                <strong>{currentClass.name}</strong>
              </div>
              <button className="class-preview next" type="button" onClick={() => changeClass(1)} aria-label={`Следующий класс: ${nextClass.name}`}>
                <ClassPicture item={nextClass} sizes="210px" />
              </button>
              <button className="class-arrow left" type="button" onClick={() => changeClass(-1)} aria-label="Показать предыдущий класс">‹</button>
              <button className="class-arrow right" type="button" onClick={() => changeClass(1)} aria-label="Показать следующий класс">›</button>
            </div>

            <article className="class-details" key={currentClass.slug}>
              <p className="class-race">{currentClass.race} · {currentClass.range}</p>
              <h3>{currentClass.name}</h3>
              <strong className="class-role">{currentClass.role}</strong>
              <p>{currentClass.description}</p>
              <dl className="class-meta"><div><dt>Подойдёт</dt><dd>{currentClass.suitable}</dd></div><div><dt>Учтите</dt><dd>{currentClass.caution}</dd></div><div><dt>Оружие</dt><dd>{currentClass.weapon}</dd></div></dl>
              <RadarChart stats={currentClass.stats} />
              <small>Ориентировочная оценка стиля класса, не серверные коэффициенты.</small>
              <a className="primary-button class-cta" href={`/account?class=${currentClass.slug}#register`}><span>Начать за {currentClass.name}</span></a>
            </article>
          </div>
          <div className="class-dots" role="group" aria-label="Выбор класса">
            {classItems.map((item, index) => <button className={index === classIndex ? "is-active" : ""} type="button" key={item.slug} onClick={() => selectClass(index)} aria-label={`Показать класс ${item.name}`} aria-current={index === classIndex ? "true" : undefined} />)}
          </div>
          <p className="class-hint">Листайте в стороны или используйте стрелки клавиатуры</p>
        </section>

        <section className="events section-wrap" id="events" aria-labelledby="events-title">
          <SectionHeading id="events-title">Ограниченные события</SectionHeading>
          <div className="event-grid">
            {eventItems.map((item) => (
              <article className="event-card" key={item.title}>
                <picture>
                  <source type="image/avif" srcSet={`/sections/${item.image}-640.avif 640w, /sections/${item.image}-960.avif 960w`} sizes="(max-width: 760px) 100vw, 50vw" />
                  <img src={`/sections/${item.image}-960.webp`} alt={item.alt} width="960" height="480" loading="lazy" />
                </picture>
                <div><span>{item.eyebrow}</span><h3>{item.title}</h3><p>{item.text}</p><button type="button" disabled>Подробнее во ВКонтакте — скоро</button></div>
              </article>
            ))}
          </div>
        </section>

        <section className="vk-strip section-wrap" aria-label="Новости проекта во ВКонтакте">
          <div className="vk-mark">VK</div><div><strong>Всё важное — во ВКонтакте</strong><span>Расписание событий, объявления и изменения проекта.</span></div><button type="button" disabled>Ссылка появится позже</button>
        </section>

        <section className="start section-wrap" id="start" aria-labelledby="start-title">
          <SectionHeading id="start-title">Три шага к началу путешествия</SectionHeading>
          <ol>
            <li><b>1</b><div><strong>Создайте аккаунт</strong><span>Регистрация и вход находятся в личном кабинете.</span></div><a href="/account#register">Перейти</a></li>
            <li><b>2</b><div><strong>Установите лаунчер</strong><span>Ссылка появится после подготовки клиента.</span></div><em>Скоро</em></li>
            <li><b>3</b><div><strong>Войдите в игру</strong><span>Выберите класс и начните своё приключение.</span></div><em>После запуска</em></li>
          </ol>
        </section>

        <section className="final-cta" aria-labelledby="final-title">
          <ResponsiveSectionImage name="final-journey" />
          <div><p className="eyebrow">Jade Dynasty 3.1.1</p><h2 id="final-title">Навстречу небесам</h2><p>Выберите свой путь и подготовьте аккаунт к началу путешествия.</p><a className="primary-button" href="/account#register"><span>Создать аккаунт</span></a></div>
        </section>

        <footer>
          <a className="round-logo" href="#top" aria-label="Jade Dynasty — наверх"><span>JD</span></a>
          <nav aria-label="Навигация в подвале"><a href="#about">Об игре</a><a href="#server">О сервере</a><a href="#classes">Классы</a><a href="#events">События</a></nav>
          <p>Jade Dynasty · версия 3.1.1</p>
        </footer>
      </div>
    </main>
  );
}

function SectionHeading({ children, id }: { children: React.ReactNode; id: string }) {
  return <h2 className="section-heading" id={id}><i /><b>◇</b><span>{children}</span><b>◇</b><i /></h2>;
}

function ClassPicture({ item, sizes, priority = false }: { item: ClassItem; sizes: string; priority?: boolean }) {
  return (
    <picture>
      <source type="image/avif" srcSet={`/classes/${item.slug}-320.avif 320w, /classes/${item.slug}-480.avif 480w, /classes/${item.slug}-640.avif 640w`} sizes={sizes} />
      <source type="image/webp" srcSet={`/classes/${item.slug}-320.webp 320w, /classes/${item.slug}-480.webp 480w, /classes/${item.slug}-640.webp 640w`} sizes={sizes} />
      <img src={`/classes/${item.slug}-640.webp`} alt={`Класс ${item.name}`} width="640" height="800" loading={priority ? "eager" : "lazy"} />
    </picture>
  );
}

function ResponsiveSectionImage({ name }: { name: keyof typeof sectionPictures }) {
  const image = sectionPictures[name];
  return (
    <picture>
      <source type="image/avif" srcSet={`/sections/${name}-640.avif 640w, /sections/${name}-960.avif 960w, /sections/${name}-1440.avif 1440w`} sizes="(max-width: 760px) 100vw, 60vw" />
      <source type="image/webp" srcSet={`/sections/${name}-640.webp 640w, /sections/${name}-960.webp 960w, /sections/${name}-1440.webp 1440w`} sizes="(max-width: 760px) 100vw, 60vw" />
      <img src={`/sections/${name}-960.webp`} alt={image.alt} width={image.width} height={image.height} loading="lazy" />
    </picture>
  );
}

function RadarChart({ stats }: { stats: [number, number, number, number, number] }) {
  const polygon = useMemo(() => {
    const points = stats.map((value, index) => {
      const angle = (-90 + index * 72) * Math.PI / 180;
      const radius = 10 + value * 3.7;
      return `${50 + Math.cos(angle) * radius}% ${50 + Math.sin(angle) * radius}%`;
    });
    return `polygon(${points.join(",")})`;
  }, [stats]);
  return (
    <div className="radar" aria-label={`Ориентировочные характеристики: урон ${stats[0]} из 10, защита ${stats[1]} из 10, мобильность ${stats[2]} из 10, контроль ${stats[3]} из 10, поддержка ${stats[4]} из 10`}>
      <div className="radar-chart"><i /><i /><i /><div className="radar-data" style={{ clipPath: polygon } as CSSProperties} /></div>
      <span className="radar-damage">Урон</span><span className="radar-defense">Защита</span><span className="radar-control">Контроль</span><span className="radar-support">Поддержка</span><span className="radar-mobility">Мобильность</span>
    </div>
  );
}
