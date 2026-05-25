"use client"
import Link from "next/link";
import dynamic from 'next/dynamic';
import { useEffect, useState } from "react";
import { getPlaces } from "@/shared/api/places";
import type { Place, WasteType } from "@/shared/types/place";
import { getPoints } from "@/app/lib/actions"

const wasteOptions: Array<WasteType | "all"> = [
  "all",
  "plastic",
  "paper",
  "glass",
  "metal",
  "electronics",
];

const Map = dynamic(() => import("@/app/lib/map"), {
    ssr: false,
    loading: () => (
        <div style={{
            height: '100%',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#f0f0f0'
        }}>
            Loading
        </div>
    )
});

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

          <div style={{ width: 1000, height: 1000, marginBottom: 20, padding: 16, background: "#f5f5f5" }}>
              <Map selectedFilters={wasteType} search={search} />
      </div>
    </section>
  );
}
