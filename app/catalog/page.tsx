"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getCatalog } from "@/shared/api/catalog";
import type { WasteItem } from "@/shared/types/waste";
import type { WasteType } from "@/shared/types/place";

const categoryOptions: Array<WasteType | "all"> = [
  "all",
  "plastic",
  "paper",
  "glass",
  "metal",
  "electronics",
];

export default function CatalogPage() {
  const [items, setItems] = useState<WasteItem[]>([]);
    const [category, setCategory] = useState<WasteType | "all">("all");
  useEffect(() => {
    getCatalog(category).then(setItems);
  }, [category]);

  return (
    <section>
      <h1>Каталог отходов</h1>
      <p>Список отходов с правилами подготовки и ссылками на точки приёма.</p>

      <div style={{ margin: "16px 0" }}>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value as WasteType | "all")}
          style={{ padding: 8 }}
        >
          {categoryOptions.map((option) => (
            <option key={option} value={option}>
              {option === "all" ? "Все категории" : option}
            </option>
          ))}
        </select>
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {items.map((item) => (
          <article
            key={item.id}
            style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}
          >
            <h3>{item.name}</h3>
            <p>Категория: {item.category}</p>
            <p>Подготовка: {item.preparation}</p>
            <p>{item.description}</p>

            {item.relatedPlaceIds.length > 0 && (
              <div>
                <p>Подходящие точки:</p>
                <ul>
                  {item.relatedPlaceIds.map((placeId) => (
                    <li key={placeId}>
                      <Link href={`/place/${placeId}`}>Точка #{placeId}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </article>
        ))}
      </div>
    </section>
  );
}
