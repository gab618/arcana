const MAX = 22;

export const sumDigits = (n: number): number =>
  String(Math.abs(n))
    .split("")
    .reduce((sum, d) => sum + Number(d), 0);

/** Enquanto passar de 22, soma os algarismos. Valores de 1 a 22 ficam como estão. */
export function reduceToArcanum(n: number): number {
  while (n > MAX) n = sumDigits(n);
  return n;
}

/**
 * Retorna o ano do último aniversário com base na data de referência (padrão: hoje).
 * O ano pessoal abrange o ciclo de um aniversário ao outro.
 */
export function getLatestBirthdayYear(
  day: number,
  month: number,
  referenceDate: Date = new Date(),
): number {
  const currentYear = referenceDate.getFullYear();
  const currentMonth = referenceDate.getMonth() + 1; // 1–12
  const currentDay = referenceDate.getDate();

  if (currentMonth > month || (currentMonth === month && currentDay >= day)) {
    return currentYear;
  }
  return currentYear - 1;
}

/**
 * Calcula o Arcano Anual:
 * 1. Soma dia + mês + ano de nascimento.
 * 2. Soma o resultado ao ano do aniversário de referência (ex: último aniversário).
 * 3. Soma os dígitos do total e reduz para um valor entre 1 e 22 (onde 22 é O Louco).
 */
export function calculateAnnualArcanum(
  day: number,
  month: number,
  birthYear: number,
  referenceYear: number,
) {
  const birthSum = day + month + birthYear;
  const total = birthSum + referenceYear;
  const digitsSum = sumDigits(total);
  const final = reduceToArcanum(digitsSum);

  return {
    birthSum,
    referenceYear,
    total,
    digitsSum,
    final,
  };
}
