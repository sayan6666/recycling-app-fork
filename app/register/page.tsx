'use client'
import Link from "next/link";
import { useActionState } from "react"
import { handleRegistration } from "@/app/lib/handler"

const initialState = {
    success: "",
    errors: {
        name: "",
        surname: "",
        email: "",
        password: "",
        password_repeat: "",
    }
};

export default function RegisterPage() {
    const [state, formAction] = useActionState(handleRegistration, initialState)
  return (
    <main className="auth-shell">
      <section className="auth-mobile-card">
        <div className="auth-brand">
          <img src="/logo.png" alt="EcoRoute" className="auth-brand-image" />
        </div>

        <h1 className="auth-heading">Регистрация</h1>

              <form className="auth-form" action={formAction}>
          <input type="text" name="name" placeholder="Имя" className="auth-field" />
          <input type="text" name="surname" placeholder="Фамилия" className="auth-field" />
          <input type="email" name="email" placeholder="Email" className="auth-field" />
          <input type="password" name="password" placeholder="Пароль" className="auth-field" />
          <input
            name="password_repeat"
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
