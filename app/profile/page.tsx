import Link from "next/link";
import { getProfile, getSession } from "@/app/lib/actions";

export default async function ProfilePage() {
  const session = await getSession();
  const profile = session ? await getProfile() : null;
  const user = Array.isArray(profile) && profile.length > 0 ? profile[0] : null;

  return (
    <main className="eco-profile-page">
      <div className="eco-profile-container">
        <section className="eco-profile-hero">
          <div className="eco-profile-identity">
            <div className="eco-profile-avatar">
              {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
            </div>

            <div className="eco-profile-user">
              <p className="eco-profile-kicker">Профиль</p>

              {user ? (
                <>
                  <h1>{user.name}</h1>
                  <p className="eco-profile-email">{user.email}</p>
                </>
              ) : (
                <>
                  <h1>Войдите в аккаунт</h1>
                  <p className="eco-profile-email">
                    Чтобы увидеть статистику, историю и напоминания
                  </p>
                </>
              )}
            </div>
          </div>

          <div className="eco-profile-actions">
            {user ? (
              <>
                <Link
                  href="/profile/edit"
                  className="eco-btn eco-btn-secondary eco-btn-link"
                >
                  Редактировать профиль
                </Link>
                <Link
                  href="/profile/settings"
                  className="eco-btn eco-btn-primary eco-btn-link"
                >
                  Настройки
                </Link>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="eco-btn eco-btn-primary eco-btn-link"
                >
                  Войти
                </Link>
                <Link
                  href="/register"
                  className="eco-btn eco-btn-secondary eco-btn-link"
                >
                  Регистрация
                </Link>
              </>
            )}
          </div>
        </section>

        {user ? (
          <>
            <section className="eco-profile-section">
              <h2 className="eco-section-title">Моя статистика</h2>

              <div className="eco-stats-grid">
                <article className="eco-stat-card">
                  <span className="eco-stat-value">—</span>
                  <span className="eco-stat-label">Сдано за месяц</span>
                </article>

                <article className="eco-stat-card">
                  <span className="eco-stat-value">—</span>
                  <span className="eco-stat-label">Пунктов посещено</span>
                </article>

                <article className="eco-stat-card">
                  <span className="eco-stat-value">—</span>
                  <span className="eco-stat-label">Активных напоминаний</span>
                </article>
              </div>
            </section>

            <section className="eco-profile-layout">
              <article className="eco-panel">
                <div className="eco-panel-head">
                  <h2 className="eco-section-title">Напоминания</h2>
                </div>

                <form className="eco-reminders-form">
                  <fieldset className="eco-reminders-group">
                    <legend className="eco-reminders-legend">
                      Выберите выполненные напоминания
                    </legend>

                    <label className="eco-reminder-check">
                      <input
                        type="checkbox"
                        name="completed_reminders"
                        value="paper"
                      />
                      <span className="eco-reminder-check__content">
                        <strong>Сдать макулатуру</strong>
                        <small>Отметьте после сдачи бумаги или картона.</small>
                      </span>
                    </label>

                    <label className="eco-reminder-check">
                      <input
                        type="checkbox"
                        name="completed_reminders"
                        value="glass"
                      />
                      <span className="eco-reminder-check__content">
                        <strong>Сдать стекло</strong>
                        <small>
                          Подходит для бутылок, банок и стеклянной тары.
                        </small>
                      </span>
                    </label>

                    <label className="eco-reminder-check">
                      <input
                        type="checkbox"
                        name="completed_reminders"
                        value="places"
                      />
                      <span className="eco-reminder-check__content">
                        <strong>Проверить ближайшие пункты приёма</strong>
                        <small>
                          Используйте, если уже нашли подходящую точку.
                        </small>
                      </span>
                    </label>
                  </fieldset>

                  <div className="eco-form-actions">
                    <button type="submit" className="eco-btn eco-btn-primary">
                      Отметить выполненными
                    </button>

                    <Link
                      href="/profile/reminders/new"
                      className="eco-btn eco-btn-secondary eco-btn-link"
                    >
                      Добавить напоминание
                    </Link>
                  </div>
                </form>
              </article>

              <article className="eco-panel">
                <div className="eco-panel-head">
                  <h2 className="eco-section-title">История</h2>
                </div>

                <div className="eco-history-list">
                  <div className="eco-profile-empty-inline">
                    <p>Здесь будут отображаться выполненные напоминания.</p>
                  </div>
                </div>

                <Link
                  href="/profile/history"
                  className="eco-btn eco-btn-secondary eco-btn-link eco-panel-btn"
                >
                  Открыть всю историю
                </Link>
              </article>
            </section>
          </>
        ) : (
          <section className="eco-profile-empty">
            <div className="eco-profile-empty-card">
              <h2>Пока вы не вошли в систему</h2>
              <p>
                После входа здесь появятся ваша статистика, история сдачи
                отходов и персональные напоминания.
              </p>

              <div className="eco-profile-empty-actions">
                <Link
                  href="/login"
                  className="eco-btn eco-btn-primary eco-btn-link"
                >
                  Перейти ко входу
                </Link>
                <Link
                  href="/register"
                  className="eco-btn eco-btn-secondary eco-btn-link"
                >
                  Создать аккаунт
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}
