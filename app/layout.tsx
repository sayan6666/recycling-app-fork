import Link from "next/link";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru">
      <body>
        <div className="app-shell">
          <header className="topbar">
            <div className="topbar__inner">
              <Link href="/" className="logo">
                EcoRoute
              </Link>

              <nav className="nav">
                <Link href="/">Главная</Link>
                <Link href="/map">Карта</Link>
                <Link href="/catalog">Каталог</Link>
                <Link href="/profile">Личный кабинет</Link>
                <Link href="/company">Кабинет компании</Link>
              </nav>
            </div>
          </header>

          <main className="page-container">{children}</main>
        </div>
      </body>
    </html>
  );
}
