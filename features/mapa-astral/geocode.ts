import type { Location } from "./calculate";

export type PlaceResult = Location & {
  id: number;
  name: string;
  region: string;
};

type OpenMeteoItem = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
  timezone?: string;
  admin1?: string;
  country?: string;
};

/**
 * Busca cidades pela API pública do Open-Meteo (sem chave).
 * Só é chamada quando o usuário clica em "Buscar" — o nome da cidade é o único dado enviado.
 */
export async function searchPlaces(
  query: string,
  signal?: AbortSignal,
): Promise<PlaceResult[]> {
  const q = query.trim();
  if (q.length < 2) return [];
  const url = `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
    q,
  )}&count=6&language=pt&format=json`;
  const res = await fetch(url, { signal });
  if (!res.ok) throw new Error("Falha ao buscar cidades");
  const data = (await res.json()) as { results?: OpenMeteoItem[] };
  return (data.results ?? [])
    .filter((r) => r.timezone)
    .map((r) => ({
      id: r.id,
      name: r.name,
      region: [r.admin1, r.country].filter(Boolean).join(", "),
      latitude: r.latitude,
      longitude: r.longitude,
      timezone: r.timezone as string,
    }));
}
