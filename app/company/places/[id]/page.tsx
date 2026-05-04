import { notFound } from "next/navigation";
import { getCompanyPlaceById } from "@/shared/api/company";

export default async function CompanyPlaceDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const place = await getCompanyPlaceById(id);

  if (!place) {
    notFound();
  }

  return (
    <section>
      <h1>Управление точкой</h1>

      <article
        style={{
          border: "1px solid #ddd",
          borderRadius: 8,
          padding: 16,
          marginTop: 20,
        }}
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
      </article>

      <div style={{ display: "grid", gap: 12, marginTop: 20 }}>
        <button
          style={{ padding: 12, border: "1px solid #ccc", borderRadius: 8 }}
        >
          Редактировать информацию
        </button>
        <button
          style={{ padding: 12, border: "1px solid #ccc", borderRadius: 8 }}
        >
          Обновить график работы
        </button>
        <button
          style={{ padding: 12, border: "1px solid #ccc", borderRadius: 8 }}
        >
          Управлять принимаемыми отходами
        </button>
      </div>
    </section>
  );
}
