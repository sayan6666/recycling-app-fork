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
              UI-заготовка для редактирования точки, координат, графика работы,
              типов отходов и статуса публикации.
            </p>
          </div>

          <div className="company-head-actions">
            <Link
              href="/company/places"
              className="company-btn company-btn--secondary"
            >
              Все точки
            </Link>

            <button type="button" className="company-btn company-btn--primary">
              Сохранить изменения
            </button>
          </div>
        </section>

        <section className="company-edit-layout">
          <article className="company-panel">
            <div className="company-panel__head">
              <h2>Основная информация</h2>
              <p>Поля для backend-подключения.</p>
            </div>

            <div className="company-form-grid">
              <label className="company-field">
                <span>Название точки</span>
                <input type="text" defaultValue={place["name"]} />
              </label>

              <label className="company-field">
                <span>Статус</span>
                <select defaultValue={place["status"] || "active"}>
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                  <option value="draft">draft</option>
                </select>
              </label>

              <label className="company-field company-field--full">
                <span>Адрес</span>
                <input type="text" defaultValue={place["adress"]} />
              </label>

              <label className="company-field">
                <span>График работы</span>
                <input type="text" defaultValue={place["workhours"]} />
              </label>

              <label className="company-field">
                <span>Тип отходов</span>
                <input type="text" defaultValue={place["type"]} />
              </label>
            </div>
          </article>

          <article className="company-panel">
            <div className="company-panel__head">
              <h2>Координаты и карта</h2>
              <p>
                Визуальная зона под будущую интеграцию карты и pin management.
              </p>
            </div>

            <div className="company-map-placeholder">
              <div className="company-map-placeholder__pin" />
              <span>
                Здесь второй разработчик подключит карту и выбор координат
              </span>
            </div>

            <div className="company-form-grid company-form-grid--compact">
              <label className="company-field">
                <span>Широта</span>
                <input type="text" placeholder="Например, 55.751244" />
              </label>

              <label className="company-field">
                <span>Долгота</span>
                <input type="text" placeholder="Например, 37.618423" />
              </label>
            </div>
          </article>
        </section>

        <section className="company-panel">
          <div className="company-panel__head">
            <h2>Дополнительные действия</h2>
            <p>Заготовки под удаление, публикацию и архивирование.</p>
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
