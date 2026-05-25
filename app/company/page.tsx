import Link from "next/link";
import { getPoints, getCompany } from "@/app/lib/actions";

export default async function CompanyDashboardPage() {
  const company = await getCompany();
  let points = await getPoints();

  const currentCompany = company?.[0];
  points = points.filter(
    (point) => point["company_id"] == currentCompany?.["id"],
  );

  const activePoints = points.filter(
    (point) => point["status"] === "active",
  ).length;
  const draftPoints = points.filter(
    (point) => point["status"] !== "active",
  ).length;

  return (
    <main className="company-page">
      <div className="company-container">
        <section className="company-hero">
          <div className="company-hero__content">
            <p className="company-kicker">Кабинет компании</p>
            <h1>{currentCompany?.name ?? "Управление точками EcoRoute"}</h1>
            <p className="company-subtitle">
              Создавайте новые точки для пользователей, обновляйте информацию о
              действующих пунктах и передайте этот экран backend-разработчику
              для подключения реального функционала.
            </p>
          </div>

          <div className="company-hero__actions">
            <button className="company-btn company-btn--primary" type="button">
              Создать точку
            </button>

            <Link
              href="/company/places"
              className="company-btn company-btn--secondary"
            >
              Все точки
            </Link>
          </div>
        </section>

        <section className="company-stats">
          <article className="company-stat-card">
            <span className="company-stat-card__value">{points.length}</span>
            <span className="company-stat-card__label">Всего точек</span>
          </article>

          <article className="company-stat-card">
            <span className="company-stat-card__value">{activePoints}</span>
            <span className="company-stat-card__label">Активные</span>
          </article>

          <article className="company-stat-card">
            <span className="company-stat-card__value">{draftPoints}</span>
            <span className="company-stat-card__label">Требуют проверки</span>
          </article>
        </section>

        <section className="company-layout">
          <article className="company-panel">
            <div className="company-panel__head">
              <h2>Быстрые действия</h2>
              <p>Заготовки под будущую бизнес-логику.</p>
            </div>

            <div className="company-action-list">
              <button type="button" className="company-action-card">
                <span className="company-action-card__title">
                  Создать новую точку
                </span>
                <span className="company-action-card__text">
                  Открывает форму создания адреса, графика, типов отходов и
                  координат.
                </span>
              </button>

              <button type="button" className="company-action-card">
                <span className="company-action-card__title">
                  Импортировать точки
                </span>
                <span className="company-action-card__text">
                  Место под массовую загрузку точек из таблицы или CSV.
                </span>
              </button>

              <button type="button" className="company-action-card">
                <span className="company-action-card__title">
                  Обновить статусы
                </span>
                <span className="company-action-card__text">
                  Заготовка под массовое изменение доступности точек.
                </span>
              </button>
            </div>
          </article>

          <article className="company-panel">
            <div className="company-panel__head">
              <h2>Последние точки</h2>
              <p>Краткий список для быстрого перехода в управление.</p>
            </div>

            <div className="company-points-list">
              {points.length > 0 ? (
                points.slice(0, 4).map((place) => (
                  <div key={place.id} className="company-point-row">
                    <div className="company-point-row__content">
                      <h3>{place["name"]}</h3>
                      <p>{place["adress"]}</p>
                    </div>

                    <div className="company-point-row__meta">
                      <span className="company-status-badge">
                        {place["status"] ?? "unknown"}
                      </span>
                      <Link
                        href={`/company/places/${place["id"]}`}
                        className="company-inline-link"
                      >
                        Управление
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="company-empty">
                  <h3>У компании пока нет точек</h3>
                  <p>
                    Здесь будет отображаться список пунктов приема после
                    подключения backend-логики создания.
                  </p>
                </div>
              )}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
