// Display dates Vietnamese-style. Data stores ISO dates ("2026-06-10") or a
// bare year ("2021").
export function formatDate(value) {
  if (!value || /^\d{4}$/.test(value)) return value;
  const [year, month, day] = value.split("-");
  return `${day}/${month}/${year}`;
}
