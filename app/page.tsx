import Link from "next/link";

export default function HomePage() {
  return (
    <main className="home-page">
      <section className="home-hero">
        <div className="home-hero__content">
          <span className="home-badge">EcoRoute</span>
          <h1>Платформа переработки отходов</h1>
          <p>
            Находите ближайшие пункты приёма, изучайте категории отходов и
            следите за своей экологической активностью в одном месте.
          </p>

          <div className="home-actions">
            <Link href="/map" className="home-btn home-btn--primary">
              Открыть карту
            </Link>
            <Link href="/catalog" className="home-btn home-btn--secondary">
              Перейти в каталог
            </Link>
            <Link href="/profile" className="home-btn home-btn--secondary">
              Профиль
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
