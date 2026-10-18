const TOTAL_ARCANA = 22;

export const DAILY_CARD_STORAGE_KEY = "arcana:carta-do-dia";

/** Data local no formato YYYY-MM-DD (a "virada" do dia segue o fuso do usuário). */
export function todayKey(date: Date = new Date()): string {
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
}

/** Sorteia um número de arcano entre 1 e 22. `random` é injetável para testes. */
export function drawArcanumNumber(random: () => number = Math.random): number {
  return Math.floor(random() * TOTAL_ARCANA) + 1;
}

export function serializeDraw(date: string, number: number): string {
  return JSON.stringify({ date, number });
}

/**
 * Lê o valor salvo e devolve o número do arcano somente se for de `today`
 * e válido. Qualquer outra coisa (vazio, JSON quebrado, dia anterior) vira null.
 */
export function parseStoredDraw(
  raw: string | null,
  today: string,
): number | null {
  if (!raw) return null;
  try {
    const data: unknown = JSON.parse(raw);
    if (typeof data !== "object" || data === null) return null;
    const { date, number } = data as { date?: unknown; number?: unknown };
    if (date !== today) return null;
    if (
      typeof number !== "number" ||
      !Number.isInteger(number) ||
      number < 1 ||
      number > TOTAL_ARCANA
    ) {
      return null;
    }
    return number;
  } catch {
    return null;
  }
}
