import Link from "next/link";
import { getProfile, getSession } from "@/app/lib/actions";

export default async function ProfileSettingsPage() {
  const session = await getSession();
  const profile = session ? await getProfile() : null;
  const user = Array.isArray(profile) && profile.length > 0 ? profile[0] : null;

  if (!user) {
    return (
      <main className="eco-profile-page">
        <div className="eco-profile-container">
          <section className="eco-profile-empty">
            <div className="eco-profile-empty-card">
              <h2>Нужно войти в аккаунт</h2>
              <p>
                Настройки аккаунта доступны только авторизованным пользователям.
              </p>

              <div className="eco-profile-empty-actions">
                <Link
                  href="/login"
                  className="eco-btn eco-btn-primary eco-btn-link"
                >
                  Войти
                </Link>
                <Link
                  href="/profile"
                  className="eco-btn eco-btn-secondary eco-btn-link"
                >
                  Назад в профиль
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="eco-profile-page">
      <div className="eco-profile-container">
        <section className="eco-profile-hero">
          <div className="eco-profile-identity">
            <div className="eco-profile-avatar">
              {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
            </div>

            <div className="eco-profile-user">
              <p className="eco-profile-kicker">Настройки</p>
                          <h1>{user.name} {user.surname}</h1>
              <p className="eco-profile-email">{user.email}</p>
            </div>
          </div>

          <div className="eco-profile-actions">
            <Link
              href="/profile"
              className="eco-btn eco-btn-secondary eco-btn-link"
            >
              Назад
            </Link>
          </div>
        </section>

        <section className="eco-panel eco-profile-form-panel">
          <div className="eco-panel-head">
            <h2 className="eco-section-title">Данные аккаунта</h2>
          </div>

          <form className="eco-profile-form">
            <label className="eco-field">
              <span>Логин</span>
              <input type="text" name="login" defaultValue={user.email ?? ""} />
            </label>

            <label className="eco-field">
              <span>Пароль</span>
                          <input type="password" name="password" defaultValue={user.password ?? ""} />
            </label>

            <label className="eco-field">
              <span>Имя</span>
              <input
                type="text"
                name="first_name"
                defaultValue={user.name ?? ""}
              />
            </label>

            <label className="eco-field">
              <span>Фамилия</span>
                          <input type="text" name="last_name" defaultValue={user.surname ?? ""} />
            </label>

            <div className="eco-form-actions">
              <button type="submit" className="eco-btn eco-btn-primary">
                Сохранить настройки
              </button>
            </div>
          </form>
        </section>
      </div>
    </main>
  );
}
