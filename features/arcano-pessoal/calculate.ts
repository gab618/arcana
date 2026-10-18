const MAX = 22;

export const sumDigits = (n: number): number =>
  String(n)
    .split("")
    .reduce((sum, d) => sum + Number(d), 0);

/** Enquanto passar de 22, soma os algarismos. Valores de 1 a 22 ficam como estão. */
export function reduceToArcanum(n: number): number {
  while (n > MAX) n = sumDigits(n);
  return n;
}

/** Passo 1: soma todos os dígitos da data e reduz para 1–22. */
export function dateValue(day: number, month: number, year: number): number {
  return reduceToArcanum(sumDigits(Number(`${day}${month}${year}`)));
}

// Tabela pitagórica: A–I = 1–9, J–R = 1–9, S–Z = 1–8
const letterValue = (letter: string): number =>
  ((letter.charCodeAt(0) - 65) % 9) + 1;

/** Remove acentos, passa para maiúsculas e mantém só A–Z. */
export function normalizeName(fullName: string): string {
  return fullName
    .normalize("NFD")
    .replace(/[^A-Za-z]/g, "")
    .toUpperCase();
}

/** Passo 2: converte as letras pela tabela pitagórica, soma e reduz para 1–22. */
export function nameValue(fullName: string): number {
  const total = [...normalizeName(fullName)].reduce(
    (sum, letter) => sum + letterValue(letter),
    0,
  );
  return reduceToArcanum(total);
}

/** Passo 3: soma data + nome e reduz para 1–22. */
export function personalArcanum(
  fullName: string,
  year: number,
  month: number,
  day: number,
) {
  const date = dateValue(day, month, year);
  const name = nameValue(fullName);
  return { date, name, final: reduceToArcanum(date + name) };
}
