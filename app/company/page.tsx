import Link from "next/link";
import { getCompanyProfile } from "@/shared/api/company";

export default async function CompanyPage() {
  const company = await getCompanyProfile();

  return (
    <section>
      <h1>Кабинет компании</h1>
      <p>
        Здесь отображаются основные данные компании и краткая информация по
        точкам.
      </p>

      <div style={{ display: "grid", gap: 16, marginTop: 20 }}>
        <article
          style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16 }}
        >
          <h2>Информация о компании</h2>
          <p>
            <strong>Название:</strong> {company.companyName}
          </p>
          <p>
            <strong>Email:</strong> {company.email}
          </p>
          <p>
            <strong>Телефон:</strong> {company.phone}
          </p>
          <p>
            <strong>Статус:</strong> {company.status}
          </p>
        </article>

        <article
          style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16 }}
        >
          <h2>Сводка</h2>
          <p>
            <strong>Количество точек:</strong> {company.placesCount}
          </p>
          <p>
            <strong>Активные акции:</strong> {company.activePromotionsCount}
          </p>
          <Link href="/company/places">Перейти к управлению точками</Link>
        </article>
      </div>
    </section>
  );
}
