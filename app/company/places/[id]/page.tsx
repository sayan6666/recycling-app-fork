import Link from "next/link";
import { getPoints, getCompany } from "@/app/lib/actions";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function CompanyPlaceDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const company = await getCompany();
  let points = await getPoints();

  const currentCompany = company?.[0];
  points = points.filter(
    (point) => point["company_id"] == currentCompany?.["id"],
  );

  const place = points.find((point) => String(point["id"]) === id);

  if (!place) {
    return (
      <main className="company-page">
        <div className="company-container">
          <section className="company-empty company-empty--wide">
            <h1>Точка не найдена</h1>
            <p>
              Возможно, точка была удалена или не принадлежит текущей компании.
            </p>
            <Link
              href="/company/places"
              className="company-btn company-btn--secondary"
            >
              Вернуться к списку
            </Link>
          </section>
        </div>
      </main>
    );
  }

  return (
    <main className="company-page">
      <div className="company-container">
        <section className="company-section-head">
          <div>
            <p className="company-kicker">Управление точкой</p>
            <h1>{place["name"]}</h1>
            <p className="company-subtitle">
              Изменяйте данные точки, адрес, график работы, типы отходов и
              статус публикации.
            </p>
          </div>

          <div className="company-head-actions">
            <Link
              href="/company/places"
              className="company-btn company-btn--secondary"
            >
              Все точки
            </Link>
          </div>
        </section>

        <form className="company-edit-layout">
          <article className="company-panel">
            <div className="company-panel__head">
              <h2>Основная информация</h2>
              <p>Основные параметры точки.</p>
            </div>

            <div className="company-form-grid">
              <input
                type="hidden"
                name="id"
                defaultValue={String(place["id"])}
              />

              <label className="company-field">
                <span>Название точки</span>
                <input type="text" name="name" defaultValue={place["name"]} />
              </label>

              <label className="company-field">
                <span>Статус</span>
                <select
                  name="status"
                  defaultValue={place["status"] || "active"}
                >
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                  <option value="draft">draft</option>
                </select>
              </label>

              <label className="company-field company-field--full">
                <span>Адрес</span>
                <input
                  type="text"
                  name="adress"
                  defaultValue={place["adress"]}
                />
              </label>

              <label className="company-field">
                <span>График работы</span>
                <input
                  type="text"
                  name="workhours"
                  defaultValue={place["workhours"]}
                />
              </label>

              <label className="company-field">
                <span>Тип отходов</span>
                <input type="text" name="type" defaultValue={place["type"]} />
              </label>
            </div>
          </article>

          <article className="company-panel">
            <div className="company-panel__head">
              <h2>Координаты и карта</h2>
              <p>Карта и координаты точки.</p>
            </div>

            <div className="company-map-placeholder">
              <div className="company-map-placeholder__pin" />
              <span>Выберите местоположение точки на карте</span>
            </div>

            <div className="company-form-grid company-form-grid--compact">
              <label className="company-field">
                <span>Широта</span>
                <input
                  type="text"
                  name="lat"
                  placeholder="Например, 55.751244"
                />
              </label>

              <label className="company-field">
                <span>Долгота</span>
                <input
                  type="text"
                  name="lng"
                  placeholder="Например, 37.618423"
                />
              </label>
            </div>

            <div className="company-secondary-actions">
              <button
                type="submit"
                className="company-btn company-btn--primary"
              >
                Сохранить изменения
              </button>
            </div>
          </article>
        </form>

        <section className="company-panel">
          <div className="company-panel__head">
            <h2>Дополнительные действия</h2>
            <p>Дополнительные действия для этой точки.</p>
          </div>

          <div className="company-secondary-actions">
            <button type="button" className="company-btn company-btn--ghost">
              Отправить на модерацию
            </button>

            <button type="button" className="company-btn company-btn--ghost">
              Снять с публикации
            </button>

            <button type="button" className="company-btn company-btn--danger">
              Удалить точку
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
