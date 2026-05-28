"use client"
import { useActionState } from "react"
import Link from "next/link";
import { handleSettingChange } from "@/app/lib/handler"

type Props = {
    user: {
        name: string;
        surname: string;
        email: string;
        password: string;
        recycled: string;
        visited: string;
        reminders: string;
    };
};

const initialState = {
    errors: {
        email: "",
        password: "",
        name: "",
        surname: "",
    },
};

export function ProfileSettingsPage({ user }: Props) {
    const [state, formAction] = useActionState(handleSettingChange, initialState);
    return (
        <main className="eco-profile-page">
            <div className="eco-profile-container">
                <section className="eco-profile-hero">
                    <div className="eco-profile-identity">
                        <div className="eco-profile-avatar">
                            {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
                        </div>

                        <div className="eco-profile-user">
                            <p className="eco-profile-kicker">Настройки</p>
                            <h1>{user.name} {user.surname}</h1>
                            <p className="eco-profile-email">{user.email}</p>
                        </div>
                    </div>

                    <div className="eco-profile-actions">
                        <Link
                            href="/profile"
                            className="eco-btn eco-btn-secondary eco-btn-link"
                        >
                            Назад
                        </Link>
                    </div>
                </section>

                <section className="eco-panel eco-profile-form-panel">
                    <div className="eco-panel-head">
                        <h2 className="eco-section-title">Данные аккаунта</h2>
                    </div>

                    <form className="eco-profile-form" action={formAction}>
                        <label className="eco-field">
                            <span>Логин</span>
                            <input type="text" name="email" defaultValue={user.email ?? ""} />
                        </label>

                        <label className="eco-field">
                            <span>Пароль</span>
                            <input type="password" name="password" defaultValue={user.password ?? ""} />
                        </label>

                        <label className="eco-field">
                            <span>Имя</span>
                            <input
                                type="text"
                                name="name"
                                defaultValue={user.name ?? ""}
                            />
                        </label>

                        <label className="eco-field">
                            <span>Фамилия</span>
                            <input type="text" name="surname" defaultValue={user.surname ?? ""} />
                        </label>

                        <div className="eco-form-actions">
                            <button type="submit" className="eco-btn eco-btn-primary">
                                Сохранить настройки
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </main>);
}