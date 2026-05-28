"use client"
import { useActionState } from "react"
import Link from "next/link";
import { handleEdit } from "@/app/lib/handler"

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
        recycled: 0,
        visited: 0,
        reminders: 0,
        email: ""
    },
};
export function ProfileEditPage({ user }: Props) {
    const [state, formAction] = useActionState(handleEdit, initialState);
    return (
        <main className="eco-profile-page">
            <div className="eco-profile-container">
                <section className="eco-profile-hero">
                    <div className="eco-profile-identity">
                        <div className="eco-profile-avatar">
                            {user?.name ? user.name.charAt(0).toUpperCase() : "?"}
                        </div>

                        <div className="eco-profile-user">
                            <p className="eco-profile-kicker">Редактирование профиля</p>
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
                        <h2 className="eco-section-title">Статистика профиля</h2>
                    </div>

                    <form className="eco-profile-form" action={formAction}>
                        <label className="eco-field">
                            <span>Сдано кг за месяц</span>
                            <input
                                type="text"
                                name="recycled"
                                defaultValue={user.recycled}
                            />
                        </label>

                        <label className="eco-field">
                            <span>Пунктов посещено</span>
                            <input
                                type="text"
                                name="visited"
                                defaultValue={user.visited}
                            />
                        </label>

                        <label className="eco-field">
                            <span>Активных напоминаний</span>
                            <input
                                type="text"
                                name="reminders"
                                defaultValue={user.reminders}
                            />
                        </label>
                        <label className="eco-field">
                            <span>Активных напоминаний</span>
                            <input
                                type="hidden"
                                name="email"
                                defaultValue={user.email}
                            />
                        </label>

                        <div className="eco-form-actions">
                            <button type="submit" className="eco-btn eco-btn-primary">
                                Сохранить изменения
                            </button>
                        </div>
                    </form>
                </section>
            </div>
        </main>
    );
};