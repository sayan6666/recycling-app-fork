"use client"
import Link from "next/link";
import { handleLogin } from "@/app/lib/handler"
import { useActionState } from "react"

const initialState = {
    success: "",
    errors: {
        email: "",
        password: "",
    }
};

export default function LoginPage() {
  const [state, formAction] = useActionState(handleLogin, initialState);
  return (
    <main className="auth-shell">
      <section className="auth-mobile-card">
        <div className="auth-brand">
          <img src="/logo.png" alt="EcoRoute" className="auth-brand-image" />
        </div>

        <h1 className="auth-heading">Вход</h1>

              <form className="auth-form" action={formAction}>
          <input type="email" name="email" placeholder="Email" className="auth-field" />
          <input type="password" name="password" placeholder="Пароль" className="auth-field" />

          <button type="submit" className="auth-primary-btn">
            Войти
          </button>
        </form>

        <Link href="#" className="auth-forgot-link">
          Забыли пароль?
        </Link>

        <div className="auth-social-list">
          <button type="button" className="auth-outline-btn">
            <span className="auth-social-icon auth-google">G</span>
            Войти с помощью Google
          </button>

          <button type="button" className="auth-outline-btn">
            <span className="auth-social-icon auth-apple"></span>
            Войти с помощью Apple
          </button>
        </div>

        <div className="auth-separator">
          <span className="auth-separator-line" />
          <span className="auth-separator-text">или</span>
          <span className="auth-separator-line" />
        </div>

        <Link href="/register" className="auth-primary-btn auth-link-btn">
          Создать аккаунт
        </Link>

        <p className="auth-agreement">
          Продолжая, Вы соглашаетесь с нашими
          <Link href="#"> Условия и положения</Link>, а также
          <Link href="#"> Политика конфиденциальности</Link>
        </p>
      </section>
    </main>
  );
}
