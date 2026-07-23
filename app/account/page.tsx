"use client";

import { type CSSProperties, type FormEvent, useState, useSyncExternalStore } from "react";
import Link from "next/link";
import { ProjectMark } from "../ProjectMark";
import { withBasePath } from "../sitePaths";

type PlayerSection = "overview" | "game-account" | "top-up" | "security" | "support" | "promo";

const classNames: Record<string, string> = {
  arden: "Арден",
  vim: "Вим",
  titan: "Титан",
  skaya: "Ская",
  hakkan: "Хаккан",
  voida: "Войда",
  aine: "Айне",
  umbra: "Умбра",
  tayo: "Тайо",
  vailin: "Вайлин",
  morto: "Морто",
  niru: "Ниру",
};

function subscribeToLocation(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener("hashchange", callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener("hashchange", callback);
  };
}

function getSelectedClass() {
  const classSlug = new URLSearchParams(window.location.search).get("class") ?? "";
  return classNames[classSlug] ?? "";
}

function getAccountView() {
  return new URLSearchParams(window.location.search).get("view") === "player"
    ? "player"
    : "auth";
}

const playerNavItems: Array<{ id: Exclude<PlayerSection, "promo">; label: string }> = [
  { id: "overview", label: "Обзор" },
  { id: "game-account", label: "Игровой аккаунт" },
  { id: "top-up", label: "Пополнить счёт" },
  { id: "security", label: "Безопасность" },
  { id: "support", label: "Поддержка" },
];

function PlayerDashboard({ selectedClass }: { selectedClass: string }) {
  const [activeSection, setActiveSection] = useState<PlayerSection>("overview");
  const [menuOpen, setMenuOpen] = useState(false);
  const [notice, setNotice] = useState("");

  function openSection(section: PlayerSection) {
    setActiveSection(section);
    setMenuOpen(false);
    setNotice("");
  }

  function showBackendNotice(action: string) {
    setNotice(`${action} станет доступно после подключения защищённого API личного кабинета.`);
  }

  return (
    <main className="player-account">
      <button
        className={`player-sidebar-scrim${menuOpen ? " is-open" : ""}`}
        type="button"
        aria-label="Закрыть меню"
        tabIndex={menuOpen ? 0 : -1}
        onClick={() => setMenuOpen(false)}
      />

      <aside className={`player-sidebar${menuOpen ? " is-open" : ""}`} aria-label="Навигация личного кабинета">
        <div className="player-brand">
          <Link className="round-logo" href="/" aria-label="Вернуться на главную">
            <ProjectMark />
          </Link>
          <div>
            <strong>Jade Dynasty</strong>
            <span>Сервер 3.1.1</span>
          </div>
        </div>

        <div className="player-nav-label">Аккаунт</div>
        <nav className="player-nav">
          {playerNavItems.map((item) => (
            <button
              key={item.id}
              className={activeSection === item.id ? "is-active" : ""}
              type="button"
              aria-current={activeSection === item.id ? "page" : undefined}
              onClick={() => openSection(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <div className="player-sidebar-footer">
          <Link href="/">← На сайт</Link>
          <Link href="/account">Выйти из демо</Link>
        </div>
      </aside>

      <section className="player-workspace">
        <header className="player-topbar">
          <button
            className="player-menu-button"
            type="button"
            aria-label="Открыть меню личного кабинета"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            <span />
            <span />
            <span />
          </button>
          <div>
            <span>Личный кабинет</span>
            <strong>Демо структуры</strong>
          </div>
          <Link href="/account" className="player-exit">Вход и регистрация</Link>
        </header>

        <div className="player-content">
          <p className="player-demo-note">
            Это интерактивный прототип авторизованной части. Серверные данные и операции не имитируются.
          </p>

          {activeSection === "overview" && (
            <section aria-labelledby="player-overview-title">
              <div
                className="player-welcome"
                style={{ "--account-banner": `url("${withBasePath("/sections/final-journey-1440.webp")}")` } as CSSProperties}
              >
                <div>
                  <span>Панель игрока</span>
                  <h1 id="player-overview-title">Добро пожаловать</h1>
                  <p>Здесь будут собраны состояние игрового аккаунта, персонажи и защита профиля.</p>
                  {selectedClass && (
                    <small>
                      С главной передан класс <strong>{selectedClass}</strong>. Окончательный выбор выполняется в игре.
                    </small>
                  )}
                </div>
              </div>

              <div className="player-status-grid" aria-label="Состояние сервисов">
                <article>
                  <span>Сервер</span>
                  <strong>Статус не подключён</strong>
                  <p>Доступность появится после подключения status API.</p>
                </article>
                <article>
                  <span>Игровой аккаунт</span>
                  <strong>Ещё не создан</strong>
                  <p>Создание будет доступно после согласования backend-контракта.</p>
                </article>
                <article>
                  <span>Баланс</span>
                  <strong>Данные недоступны</strong>
                  <p>Сумма появится после подключения платёжного и игрового API.</p>
                  <button type="button" onClick={() => openSection("top-up")}>Пополнить счёт</button>
                </article>
                <article>
                  <span>Защита профиля</span>
                  <strong>Данные недоступны</strong>
                  <p>Подтверждение почты и сессии появятся вместе с авторизацией.</p>
                </article>
              </div>

              <div className="player-overview-grid">
                <article className="player-panel player-characters">
                  <div className="player-panel-heading">
                    <div>
                      <span>Игровые данные</span>
                      <h2>Мои персонажи</h2>
                    </div>
                  </div>
                  <div className="player-empty-state">
                    <b aria-hidden="true">◇</b>
                    <strong>Персонажей пока нет</strong>
                    <p>Они появятся здесь после создания игрового аккаунта и подключения game API.</p>
                    <button type="button" onClick={() => openSection("game-account")}>
                      Перейти к аккаунту
                    </button>
                  </div>
                </article>

                <aside className="player-panel player-quick-actions" aria-labelledby="quick-actions-title">
                  <div className="player-panel-heading">
                    <div>
                      <span>Без лишних переходов</span>
                      <h2 id="quick-actions-title">Быстрые действия</h2>
                    </div>
                  </div>
                  <button type="button" onClick={() => openSection("game-account")}>
                    <span>Игровой аккаунт</span><b aria-hidden="true">→</b>
                  </button>
                  <button type="button" onClick={() => openSection("top-up")}>
                    <span>Пополнить счёт</span><b aria-hidden="true">→</b>
                  </button>
                  <button type="button" onClick={() => openSection("security")}>
                    <span>Изменить пароль</span><b aria-hidden="true">→</b>
                  </button>
                  <button type="button" onClick={() => openSection("promo")}>
                    <span>Активировать промокод</span><b aria-hidden="true">→</b>
                  </button>
                  <button type="button" onClick={() => openSection("support")}>
                    <span>Обратиться в поддержку</span><b aria-hidden="true">→</b>
                  </button>
                </aside>
              </div>

              <article className="player-security-strip">
                <div className="player-security-mark" aria-hidden="true">✓</div>
                <div>
                  <span>Безопасность аккаунта</span>
                  <strong>Настройки появятся после подключения авторизации</strong>
                  <p>Пароль, подтверждение почты и активные сессии будут собраны в одном разделе.</p>
                </div>
                <button type="button" onClick={() => openSection("security")}>Открыть</button>
              </article>
            </section>
          )}

          {activeSection === "game-account" && (
            <section className="player-detail-section" aria-labelledby="game-account-title">
              <div className="player-page-heading">
                <span>Связь с игрой</span>
                <h1 id="game-account-title">Игровой аккаунт</h1>
                <p>Web-профиль и учётная запись игрового сервера будут разделены, чтобы игрок понимал, какими данными он управляет.</p>
              </div>
              <article className="player-panel player-account-empty">
                <div className="player-empty-state">
                  <b aria-hidden="true">◇</b>
                  <strong>Игровой аккаунт не подключён</strong>
                  <p>Имя, дата создания и последний вход появятся только после ответа игрового API.</p>
                  <button type="button" onClick={() => showBackendNotice("Создание игрового аккаунта")}>
                    Создать игровой аккаунт
                  </button>
                </div>
              </article>
              <div className="player-flow-grid">
                <article><strong>Создать web-профиль</strong><p>Почта и безопасный пароль для входа в ЛК.</p></article>
                <article><strong>Создать игровой аккаунт</strong><p>Отдельные данные для входа через клиент.</p></article>
                <article><strong>Увидеть персонажей</strong><p>Только фактические данные игрового сервера.</p></article>
              </div>
            </section>
          )}

          {activeSection === "top-up" && (
            <section className="player-detail-section" aria-labelledby="top-up-title">
              <div className="player-page-heading">
                <span>Баланс аккаунта</span>
                <h1 id="top-up-title">Пополнить счёт</h1>
                <p>Платёжный провайдер, валюта, комиссии и правила начисления ещё не утверждены. Интерфейс показывает будущий сценарий, но не принимает оплату.</p>
              </div>

              <div className="player-payment-grid">
                <article className="player-panel player-payment-form">
                  <div className="player-panel-heading">
                    <div>
                      <span>Пополнение баланса</span>
                      <h2>Укажите сумму</h2>
                    </div>
                  </div>
                  <form onSubmit={(event) => {
                    event.preventDefault();
                    showBackendNotice("Переход к оплате");
                  }}>
                    <label htmlFor="top-up-amount">Сумма пополнения</label>
                    <input
                      id="top-up-amount"
                      name="topUpAmount"
                      type="number"
                      min="1"
                      step="1"
                      inputMode="decimal"
                      placeholder="Введите сумму"
                      required
                    />

                    <div className="player-payment-unavailable">
                      <span>Валюта</span>
                      <strong>Будет определена</strong>
                    </div>
                    <div className="player-payment-unavailable">
                      <span>Способ оплаты</span>
                      <strong>Провайдер не подключён</strong>
                    </div>

                    <button type="submit">Продолжить</button>
                  </form>
                </article>

                <aside className="player-panel player-payment-summary" aria-labelledby="payment-summary-title">
                  <div className="player-panel-heading">
                    <div>
                      <span>Расчёт операции</span>
                      <h2 id="payment-summary-title">Итог</h2>
                    </div>
                  </div>
                  <dl>
                    <div>
                      <dt>К зачислению</dt>
                      <dd>Рассчитается после подключения</dd>
                    </div>
                    <div>
                      <dt>Комиссия</dt>
                      <dd>Не определена</dd>
                    </div>
                    <div>
                      <dt>Платёжный сервис</dt>
                      <dd>Не выбран</dd>
                    </div>
                  </dl>
                  <p>В демо не запрашиваются реквизиты карты и не создаётся платёж.</p>
                </aside>
              </div>

              <article className="player-payment-safety">
                <b aria-hidden="true">!</b>
                <div>
                  <strong>До подключения оплаты</strong>
                  <p>Нужно утвердить валюту, внутренний баланс, бонусы, возвраты, юридические документы и платёжного провайдера.</p>
                </div>
              </article>
            </section>
          )}

          {activeSection === "security" && (
            <section className="player-detail-section" aria-labelledby="security-title">
              <div className="player-page-heading">
                <span>Защита профиля</span>
                <h1 id="security-title">Безопасность</h1>
                <p>Критичные операции будут требовать повторного подтверждения личности и не станут выполняться только на клиенте.</p>
              </div>
              <div className="player-settings-list">
                {[
                  ["Электронная почта", "Состояние появится после подключения авторизации"],
                  ["Пароль", "Изменение с повторной аутентификацией"],
                  ["Двухфакторная защита", "Будет добавлена только при поддержке backend"],
                  ["Активные сессии", "Устройства и завершение всех сессий"],
                ].map(([title, description]) => (
                  <article key={title}>
                    <div><strong>{title}</strong><p>{description}</p></div>
                    <button type="button" onClick={() => showBackendNotice(title)}>Настроить</button>
                  </article>
                ))}
              </div>
            </section>
          )}

          {activeSection === "promo" && (
            <section className="player-detail-section" aria-labelledby="promo-title">
              <div className="player-page-heading">
                <span>Быстрое действие</span>
                <h1 id="promo-title">Промокод</h1>
                <p>Код можно будет активировать здесь, а результат доставки награды будет показан отдельно.</p>
              </div>
              <article className="player-panel player-promo-panel">
                <form onSubmit={(event) => {
                  event.preventDefault();
                  showBackendNotice("Активация промокода");
                }}>
                  <label htmlFor="promo-code">Промокод</label>
                  <div>
                    <input id="promo-code" name="promoCode" placeholder="Введите код" autoComplete="off" required />
                    <button type="submit">Активировать</button>
                  </div>
                </form>
                <p>В демо код не проверяется и не отправляется.</p>
              </article>
            </section>
          )}

          {activeSection === "support" && (
            <section className="player-detail-section" aria-labelledby="support-title">
              <div className="player-page-heading">
                <span>Помощь игроку</span>
                <h1 id="support-title">Поддержка</h1>
                <p>До появления собственной тикет-системы здесь будет указан только подтверждённый официальный канал связи.</p>
              </div>
              <article className="player-panel player-support-panel">
                <div className="player-empty-state">
                  <b aria-hidden="true">?</b>
                  <strong>Канал поддержки ещё не указан</strong>
                  <p>Мы не создаём фиктивную форму: сообщение должно уходить в реальную систему и получать номер обращения.</p>
                  <button type="button" onClick={() => showBackendNotice("Обращение в поддержку")}>
                    Проверить доступность
                  </button>
                </div>
              </article>
            </section>
          )}

          {notice && <p className="player-live-notice" role="status" aria-live="polite">{notice}</p>}
        </div>
      </section>
    </main>
  );
}

export default function AccountPage() {
  const [notice, setNotice] = useState("");
  const selectedClass = useSyncExternalStore(subscribeToLocation, getSelectedClass, () => "");
  const accountView = useSyncExternalStore(subscribeToLocation, getAccountView, () => "auth");

  if (accountView === "player") {
    return <PlayerDashboard selectedClass={selectedClass} />;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>, action: "login" | "register") {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    if (action === "register" && data.get("password") !== data.get("passwordConfirmation")) {
      setNotice("Пароли не совпадают. Проверьте ввод и повторите попытку.");
      return;
    }

    setNotice(
      action === "register"
        ? "Форма регистрации готова. Для создания аккаунта нужно подключить API игрового сервера."
        : "Форма входа готова. Авторизация станет доступна после подключения API игрового сервера.",
    );
  }

  return (
    <main
      className="account-page"
      style={{ "--account-background": `url("${withBasePath("/sections/final-journey-1440.webp")}")` } as CSSProperties}
    >
      <header className="account-header">
        <Link className="round-logo" href="/" aria-label="Вернуться на главную"><ProjectMark /></Link>
        <Link className="account-back" href="/">← На главную</Link>
      </header>

      <section className="account-hero" aria-labelledby="account-title">
        <div className="account-copy">
          <span>Jade Dynasty 3.1.1</span>
          <h1 id="account-title">Личный кабинет</h1>
          <p>Создайте аккаунт, чтобы подготовиться к путешествию по небесным землям.</p>
          {selectedClass && <p className="account-selected-class">Выбранный класс: <strong>{selectedClass}</strong>. Вы сможете подтвердить выбор уже в игре.</p>}
        </div>

        <div className="account-auth">
          <nav className="account-tabs" aria-label="Вход или регистрация">
            <a href="#login">Вход</a>
            <a href="#register">Регистрация</a>
          </nav>

          <section className="account-form-panel account-login" id="login" aria-labelledby="login-title">
            <h2 id="login-title">Войти в аккаунт</h2>
            <form onSubmit={(event) => handleSubmit(event, "login")}>
              <label>
                Электронная почта
                <input type="email" name="email" autoComplete="email" required />
              </label>
              <label>
                Пароль
                <input type="password" name="password" autoComplete="current-password" minLength={8} required />
              </label>
              <button type="submit">Войти</button>
            </form>
          </section>

          <section className="account-form-panel account-register" id="register" aria-labelledby="register-title">
            <h2 id="register-title">Создать аккаунт</h2>
            <form onSubmit={(event) => handleSubmit(event, "register")}>
              <label>
                Электронная почта
                <input type="email" name="email" autoComplete="email" required />
              </label>
              <label>
                Пароль
                <input type="password" name="password" autoComplete="new-password" minLength={8} required />
              </label>
              <label>
                Повторите пароль
                <input type="password" name="passwordConfirmation" autoComplete="new-password" minLength={8} required />
              </label>
              <label className="account-agreement">
                <input type="checkbox" name="agreement" required />
                <span>Я принимаю правила сервера и условия обработки данных.</span>
              </label>
              <button type="submit">Зарегистрироваться</button>
            </form>
          </section>

          {notice && <p className="account-notice" role="status">{notice}</p>}
          <p className="account-service-note">Подключение API игрового сервера ещё не выполнено: данные формы никуда не отправляются.</p>
        </div>
      </section>
    </main>
  );
}
