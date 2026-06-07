"use client"
import Link from "next/link";
import dynamic from 'next/dynamic';
import { useActionState } from "react"
import { handlePointChange } from "@/app/lib/handler"

const Map = dynamic(() => import("@/app/lib/map_coords"), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0'
        }}>
            Loading
        </div>
    )
});

type Props = {
    place: {
        id: number;
        name: string;
        status: string;
        adress: string;
        workhours: string;
        type: string;
        x: string;
        y: string;
    };
};

const initialState = {
    error: ""
    /*errors: {
        id: "",
        name: "",
        status: "",
        adress: "",
        workhours: "",
        type: "",
        x: 0,
        y: 0,
    },*/
};

export default function CompanyPlaceDetailsClient({ place }: Props) {
  const [state, formAction] = useActionState(handlePointChange, initialState);
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

              <form className="company-edit-layout" action={formAction}>
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
              <Map/>
            </div>

            <div className="company-form-grid company-form-grid--compact">
              <label className="company-field">
                <span>Широта</span>
                <input
                type="text"
                name="x"
                defaultValue={place["x"]}
                />
              </label>

              <label className="company-field">
                <span>Долгота</span>
                <input
                  type="text"
                  name="y"
                  defaultValue={place["y"]}
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
