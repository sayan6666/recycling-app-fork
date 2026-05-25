import Link from "next/link";
import { getCompanyProfile } from "@/shared/api/company";
import { getCompany, getCompanySession } from "@/app/lib/actions"
import { openDb } from "../opendb"

export default async function CompanyPage() {
    let company = await getCompany();
    if (company == null || company.length==0) {
        company = [[{"id": 0, "name": "", "email": "" , "contacts" : "", "verified" : ""}]]
    }
    //company = [[{ "id": 0, "name": "", "email": "", "contacts": "", "verified": "" }]]
    const db = await openDb();
    const points = await db.all("SELECT COUNT(id) FROM points WHERE company_id=?", company[0]["id"]);
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
            <strong>Название:</strong> {company[0]["name"]}
          </p>
          <p>
            <strong>Email:</strong> {company[0]["email"]}
          </p>
          <p>
            <strong>Телефон:</strong> {company[0]["contacts"]}
          </p>
          <p>
            <strong>Статус:</strong> {company[0]["verified"]==1 ? "verified" : "unverified"}
          </p>
        </article>

        <article
          style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16 }}
        >
          <h2>Сводка</h2>
                  <p>
                      <strong>Количество точек:</strong> {points[0]["COUNT(id)"]}
          </p>
          <p>
            <strong>Активные акции:</strong> {1}
          </p>
          <Link href="/company/places">Перейти к управлению точками</Link>
        </article>
      </div>
    </section>
  );
}
