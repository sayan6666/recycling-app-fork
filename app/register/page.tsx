import Link from "next/link";

export default function RegisterPage() {
  return (
    <main className="auth-shell">
      <section className="auth-mobile-card">
        <div className="auth-brand">
          <img src="/logo.png" alt="EcoRoute" className="auth-brand-image" />
        </div>

        <h1 className="auth-heading">Регистрация</h1>

        <form className="auth-form">
          <input type="text" placeholder="Имя" className="auth-field" />
          <input type="text" placeholder="Фамилия" className="auth-field" />
          <input type="email" placeholder="Email" className="auth-field" />
          <input type="password" placeholder="Пароль" className="auth-field" />
          <input
            type="password"
            placeholder="Повторите пароль"
            className="auth-field"
          />

          <button type="submit" className="auth-primary-btn">
            Создать аккаунт
          </button>
        </form>

        <p className="auth-agreement auth-agreement-register">
          Продолжая, Вы соглашаетесь с нашими
          <Link href="#"> Условия и положения</Link>, а также
          <Link href="#"> Политика конфиденциальности</Link>
        </p>

        <Link href="/login" className="auth-bottom-link">
          Уже есть аккаунт? Войти
        </Link>
      </section>
    </main>
  );
}
