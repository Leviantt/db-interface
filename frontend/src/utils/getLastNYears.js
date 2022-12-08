export function getLastNYears(n) {
  const currentYear = new Date().getFullYear();
  const years = [];
  for(let i = n - 1; i >= 0; i--) {
    years.push(currentYear - i);
  }
  return years;
}
