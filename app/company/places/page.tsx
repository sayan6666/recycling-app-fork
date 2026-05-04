import Link from "next/link";
import { getCompanyPlaces } from "@/shared/api/company";

export default async function CompanyPlacesPage() {
  const places = await getCompanyPlaces();

  return (
    <section>
      <h1>Управление точками</h1>
      <p>
        Список точек компании с базовой информацией и переходом к управлению.
      </p>

      <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
        {places.map((place) => (
          <article
            key={place.id}
            style={{ border: "1px solid #ddd", borderRadius: 8, padding: 16 }}
          >
            <h2>{place.name}</h2>
            <p>
              <strong>Адрес:</strong> {place.address}
            </p>
            <p>
              <strong>График:</strong> {place.workHours}
            </p>
            <p>
              <strong>Статус:</strong> {place.status}
            </p>
            <p>
              <strong>Принимаемые отходы:</strong> {place.wasteTypes.join(", ")}
            </p>

            <div style={{ marginTop: 12 }}>
              <Link href={`/company/places/${place.id}`}>
                Открыть управление точкой
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
