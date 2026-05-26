import Link from "next/link";
import { getPoints, getCompany } from "@/app/lib/actions";

export default async function CompanyPlacesPage() {
  const company = await getCompany();
  let points = await getPoints();

  const currentCompany = company?.[0];
  points = points.filter(
    (point) => point["company_id"] == currentCompany?.["id"],
  );

  return (
    <main className="company-page">
      <div className="company-container">
        <section className="company-section-head">
          <div>
            <p className="company-kicker">Точки компании</p>
            <h1>Управление точками</h1>
            <p className="company-subtitle">
              Просматривайте все точки компании, редактируйте карточки и
              управляйте опубликованными локациями.
            </p>
          </div>

          <div className="company-head-actions">
            <Link
              href="/company/places/new"
              className="company-btn company-btn--primary"
            >
              Создать точку
            </Link>

            <Link
              href="/company"
              className="company-btn company-btn--secondary"
            >
              Назад в кабинет
            </Link>
          </div>
        </section>

        <section className="company-toolbar">
          <div className="company-search">
            <input type="text" placeholder="Поиск по названию или адресу" />
          </div>

          <div className="company-filters">
            <select defaultValue="all">
              <option value="all">Все статусы</option>
              <option value="active">Активные</option>
              <option value="inactive">Неактивные</option>
              <option value="draft">На модерации</option>
            </select>

            <select defaultValue="all">
              <option value="all">Все типы отходов</option>
              <option value="plastic">Пластик</option>
              <option value="glass">Стекло</option>
              <option value="paper">Бумага</option>
              <option value="mixed">Смешанные</option>
            </select>
          </div>
        </section>

        <section className="company-cards-grid">
          {points.length > 0 ? (
            points.map((place) => (
              <article key={place.id} className="company-place-card">
                <div className="company-place-card__top">
                  <div>
                    <h2>{place["name"]}</h2>
                    <p>{place["adress"]}</p>
                  </div>

                  <span className="company-status-badge">
                    {place["status"] ?? "unknown"}
                  </span>
                </div>

                <div className="company-place-card__details">
                  <div>
                    <span className="company-detail-label">График</span>
                    <strong>{place["workhours"] || "Не указан"}</strong>
                  </div>

                  <div>
                    <span className="company-detail-label">Отходы</span>
                    <strong>{place["type"] || "Не указаны"}</strong>
                  </div>
                </div>

                <div className="company-place-card__actions">
                  <Link
                    href={`/company/places/${place["id"]}`}
                    className="company-btn company-btn--secondary"
                  >
                    Открыть управление
                  </Link>
                </div>
              </article>
            ))
          ) : (
            <div className="company-empty company-empty--wide">
              <h3>Точки еще не созданы</h3>
              <p>После создания точки они появятся здесь в виде карточек.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
