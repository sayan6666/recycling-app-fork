import { notFound } from "next/navigation";
import { getPlaceById } from "@/shared/api/places";

export default async function PlacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const place = await getPlaceById(id);

  if (!place) {
    notFound();
  }

  return (
    <section>
      <h1>{place.name}</h1>
      <p>
        <strong>Адрес:</strong> {place.address}
      </p>
      <p>
        <strong>График:</strong> {place.workHours ?? "Не указан"}
      </p>
      <p>
        <strong>Контакты:</strong> {place.contacts ?? "Не указаны"}
      </p>
      <p>
        <strong>Описание:</strong> {place.description ?? "Нет описания"}
      </p>
      <p>
        <strong>Принимаемые отходы:</strong> {place.wasteTypes.join(", ")}
      </p>
      <p>
        <strong>Координаты:</strong> {place.lat}, {place.lng}
      </p>
    </section>
  );
}
