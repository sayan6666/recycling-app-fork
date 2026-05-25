import Link from "next/link";

export default function HomePage() {
  return (
    <main className="welcome-home">
      <div className="welcome-home__overlay">
        <header className="welcome-home__header">
          <img src="/logo.png" alt="EcoRoute" className="welcome-home__logo" />
        </header>

        <section className="welcome-home__content">
          <Link href="/catalog" className="welcome-home__start">
            Начать
          </Link>
        </section>
      </div>

      <nav className="bottom-nav" aria-label="Основная навигация">
        <Link href="/map" className="bottom-nav__item">
          <img
            src="/mapnavimage.png"
            alt=""
            className="bottom-nav__icon"
            aria-hidden="true"
          />
          <span>Карта</span>
        </Link>

        <Link href="/catalog" className="bottom-nav__item">
          <img
            src="/katnavimage.png"
            alt=""
            className="bottom-nav__icon"
            aria-hidden="true"
          />
          <span>Каталог</span>
        </Link>

        <Link href="/" className="bottom-nav__item bottom-nav__item--active">
          <img
            src="/recnavimage.png"
            alt=""
            className="bottom-nav__icon"
            aria-hidden="true"
          />
          <span>Главная</span>
        </Link>

        <Link href="/profile" className="bottom-nav__item">
          <img
            src="/profilenavimage.png"
            alt=""
            className="bottom-nav__icon"
            aria-hidden="true"
          />
          <span>Профиль</span>
        </Link>
      </nav>
    </main>
  );
}
