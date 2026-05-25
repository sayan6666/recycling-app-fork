"use client"
import Link from "next/link";
import { handlePointAdding } from "../../../lib/handler";
import { useActionState } from "react"

const initialState = {
    errors: {
        name: "",
        status: "",
        adress: "",
        workhours: "",
        type: "",
        x: 0,
        y: 0,
    },
};

export default function CompanyCreatePlacePage() {
  const [state, formAction] = useActionState(handlePointAdding, initialState);
  return (
    <main className="company-page">
      <div className="company-container">
        <section className="company-section-head">
          <div>
            <p className="company-kicker">Новая точка</p>
            <h1>Создание точки</h1>
            <p className="company-subtitle">
              Заполните основную информацию о новой точке приема и укажите ее
              местоположение.
            </p>
          </div>

          <div className="company-head-actions">
            <Link
              href="/company/places"
              className="company-btn company-btn--secondary"
            >
              К списку точек
            </Link>
          </div>
        </section>

              <form className="company-edit-layout" action={formAction}>
          <article className="company-panel">
            <div className="company-panel__head">
              <h2>Основная информация</h2>
              <p>Основная информация о новой точке.</p>
            </div>

            <div className="company-form-grid">
              <label className="company-field">
                <span>Название точки</span>
                <input
                  type="text"
                  name="name"
                  placeholder="Например, Пункт приема EcoRoute"
                />
              </label>

              <label className="company-field">
                <span>Статус</span>
                <select name="status" defaultValue="draft">
                  <option value="draft">draft</option>
                  <option value="active">active</option>
                  <option value="inactive">inactive</option>
                </select>
              </label>

              <label className="company-field company-field--full">
                <span>Адрес</span>
                <input
                  type="text"
                  name="adress"
                  placeholder="Введите адрес точки"
                />
              </label>

              <label className="company-field">
                <span>График работы</span>
                <input
                  type="text"
                  name="workhours"
                  placeholder="Например, 09:00 - 20:00"
                />
              </label>

              <label className="company-field">
                <span>Типы отходов</span>
                <input
                  type="text"
                  name="type"
                  placeholder="Пластик, стекло, бумага"
                />
              </label>
            </div>
          </article>

          <article className="company-panel">
            <div className="company-panel__head">
              <h2>Координаты и карта</h2>
              <p>Укажите координаты и местоположение точки.</p>
            </div>

            <div className="company-map-placeholder">
              <div className="company-map-placeholder__pin" />
              <span>Выберите место новой точки на карте</span>
            </div>

            <div className="company-form-grid company-form-grid--compact">
              <label className="company-field">
                <span>Широта</span>
                <input
                  type="text"
                  name="x"
                  placeholder="Например, 55.751244"
                />
              </label>

              <label className="company-field">
                <span>Долгота</span>
                <input
                  type="text"
                  name="y"
                  placeholder="Например, 37.618423"
                />
              </label>
            </div>

            <div className="company-secondary-actions">
              <button
                type="submit"
                className="company-btn company-btn--primary"
              >
                Создать точку
              </button>
            </div>
          </article>
        </form>
      </div>
    </main>
  );
}
