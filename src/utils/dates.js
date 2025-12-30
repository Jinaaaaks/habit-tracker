export function toISODateOnly(dateObj) {
  const yyyy = dateObj.getFullYear();
  const mm = String(dateObj.getMonth() + 1).padStart(2, "0");
  const dd = String(dateObj.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

export function getTodayISO() {
  return toISODateOnly(new Date());
}

export function getYesterdayISO(todayISO) {
  const d = new Date(todayISO + "T00:00:00");
  d.setDate(d.getDate() - 1);
  return toISODateOnly(d);
}
