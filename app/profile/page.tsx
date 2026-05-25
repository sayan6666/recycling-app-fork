import { openDb } from "../opendb"
import { getProfile, getSession } from "@/app/lib/actions"
import { UserProfile } from "@/shared/types"

export default async function ProfilePage() {
  const reminders = [
    "Сдать макулатуру",
    "Сдать стекло",
    "Проверить ближайшие пункты приема",
  ];

  const history = [
    {
      title: "Сданы пластиковые бутылки",
      date: "02.05.2026",
      status: "Выполнено",
    },
    {
      title: "Посещение ЭкоПункт Центральный",
      date: "29.04.2026",
      status: "Завершено",
    },
    {
      title: "Запланирована сдача стекла",
      date: "27.04.2026",
      status: "Запланировано",
    },
    ];
    let profile = await getProfile();
    if (profile == null) {
        profile = [[{"name":"","email":""}]]
    }
  return (
    <main className="eco-profile-page">
      <div className="eco-profile-container">
        <section className="eco-profile-hero">
          <div className="eco-profile-identity">
            <div className="eco-profile-avatar">A</div>

            <div className="eco-profile-user">
              <p className="eco-profile-kicker">Личный кабинет</p>
              <h1>{profile[0]["name"]}</h1>
              <p className="eco-profile-email">{profile[0]["email"]}</p>
            </div>
          </div>

          <div className="eco-profile-actions">
            <button className="eco-btn eco-btn-secondary">
              Редактировать профиль
            </button>
            <button className="eco-btn eco-btn-primary">Настройки</button>
          </div>
        </section>

        <section className="eco-profile-section">
          <h2 className="eco-section-title">Моя статистика</h2>

          <div className="eco-stats-grid">
            <article className="eco-stat-card">
              <span className="eco-stat-value">12 кг</span>
              <span className="eco-stat-label">Сдано за месяц</span>
            </article>

            <article className="eco-stat-card">
              <span className="eco-stat-value">7</span>
              <span className="eco-stat-label">Пунктов посещено</span>
            </article>

            <article className="eco-stat-card">
              <span className="eco-stat-value">3</span>
              <span className="eco-stat-label">Активных напоминания</span>
            </article>
          </div>
        </section>

        <section className="eco-profile-layout">
          <article className="eco-panel">
            <div className="eco-panel-head">
              <h2 className="eco-section-title">Напоминания</h2>
            </div>

            <div className="eco-reminders-list">
              {reminders.map((item) => (
                <div key={item} className="eco-reminder-item">
                  <span>{item}</span>
                </div>
              ))}

              <button className="eco-btn eco-btn-primary eco-panel-btn">
                Добавить напоминание
              </button>
            </div>
          </article>

          <article className="eco-panel">
            <div className="eco-panel-head">
              <h2 className="eco-section-title">История</h2>
            </div>

            <div className="eco-history-list">
              {history.map((item) => (
                <div
                  key={`${item.title}-${item.date}`}
                  className="eco-history-item"
                >
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.date}</p>
                  </div>

                  <span className="eco-history-badge">{item.status}</span>
                </div>
              ))}
            </div>

            <button className="eco-btn eco-btn-secondary eco-panel-btn">
              Открыть всю историю
            </button>
          </article>
        </section>
      </div>
    </main>
  );
}
