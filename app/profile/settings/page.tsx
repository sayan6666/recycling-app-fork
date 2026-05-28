import Link from "next/link";
import { getProfile, getSession } from "@/app/lib/actions";
import { ProfileSettingsPage } from "@/app/profile/settings/ProfileSettingsPage"

export default async function ProfileSettingsServer() {
  const session = await getSession();
  const profile = session ? await getProfile() : null;
  const user = Array.isArray(profile) && profile.length > 0 ? profile[0] : null;

  if (!user) {
    return (
      <main className="eco-profile-page">
        <div className="eco-profile-container">
          <section className="eco-profile-empty">
            <div className="eco-profile-empty-card">
              <h2>Нужно войти в аккаунт</h2>
              <p>
                Настройки аккаунта доступны только авторизованным пользователям.
              </p>

              <div className="eco-profile-empty-actions">
                <Link
                  href="/login"
                  className="eco-btn eco-btn-primary eco-btn-link"
                >
                  Войти
                </Link>
                <Link
                  href="/profile"
                  className="eco-btn eco-btn-secondary eco-btn-link"
                >
                  Назад в профиль
                </Link>
              </div>
            </div>
          </section>
        </div>
      </main>
    );
  }

    return <ProfileSettingsPage user={user} />
}
