"use client";

import { type FormEvent, useState } from "react";
import Link from "next/link";

export default function AccountPage() {
  const [notice, setNotice] = useState("");

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
    <main className="account-page">
      <header className="account-header">
        <Link className="round-logo" href="/" aria-label="Вернуться на главную">JD</Link>
        <Link className="account-back" href="/">← На главную</Link>
      </header>

      <section className="account-hero" aria-labelledby="account-title">
        <div className="account-copy">
          <span>Jade Dynasty 3.1.1</span>
          <h1 id="account-title">Личный кабинет</h1>
          <p>Создайте аккаунт, чтобы подготовиться к путешествию по небесным землям.</p>
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
