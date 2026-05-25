import { notFound } from "next/navigation";
import { getPoints } from "@/app/lib/actions"

export default async function PlacePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const points = await getPoints();
  if (!points[id-1]) {
    notFound();
  }
    
  return (
    <section>
      <h1>{points[id-1]["name"]}</h1>  
      <p>
        <strong>Адрес:</strong> {points[id-1]["adress"]}
      </p>
      <p>
              <strong>График:</strong> {points[id-1]["workhours"] ?? "Не указан"}
      </p>
      <p>
              <strong>Контакты:</strong> {points[id-1]["contacts"] ?? "Не указаны"}
      </p>
      <p>
              <strong>Описание:</strong> {points[id - 1]["description"] ?? "Нет описания"}
      </p>
      <p>
        <strong>Принимаемые отходы:</strong> {points[id-1]["type"]}
      </p>
      <p>
              <strong>Координаты:</strong> {points[id-1]["x"]}, {points[id-1]["y"]}
      </p>
    </section>
  );
}
