"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getPlaces } from "@/shared/api/places";
import type { Place, WasteType } from "@/shared/types/place";

const wasteOptions: Array<WasteType | "all"> = [
  "all",
  "plastic",
  "paper",
  "glass",
  "metal",
  "electronics",
];

export default function MapPage() {
  const [places, setPlaces] = useState<Place[]>([]);
  const [search, setSearch] = useState("");
  const [wasteType, setWasteType] = useState<WasteType | "all">("all");

  useEffect(() => {
    getPlaces({ search, wasteType }).then(setPlaces);
  }, [search, wasteType]);

  return (
    <section>
      <h1>Карта пунктов приёма</h1>
      <p>Пока вместо настоящей карты используем список точек и фильтры.</p>

      <div
        style={{ display: "flex", gap: 12, margin: "16px 0", flexWrap: "wrap" }}
      >
        <input
          type="text"
          placeholder="Поиск по адресу или названию"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: 8, minWidth: 260 }}
        />

        <select
          value={wasteType}
          onChange={(e) => setWasteType(e.target.value as WasteType | "all")}
          style={{ padding: 8 }}
        >
          {wasteOptions.map((option) => (
            <option key={option} value={option}>
              {option === "all" ? "Все категории" : option}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: 20, padding: 16, background: "#f5f5f5" }}>
        Здесь позже будет интерактивная карта.
      </div>

      <div style={{ display: "grid", gap: 12 }}>
        {places.map((place) => (
          <article
            key={place.id}
            style={{ border: "1px solid #ddd", padding: 16, borderRadius: 8 }}
          >
            <h3>{place.name}</h3>
            <p>{place.address}</p>
            <p>Принимает: {place.wasteTypes.join(", ")}</p>
            <Link href={`/place/${place.id}`}>Открыть карточку точки</Link>
          </article>
        ))}

        {places.length === 0 && <p>По вашему запросу ничего не найдено.</p>}
      </div>
    </section>
  );
}
