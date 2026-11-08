import type { SymbolViewProps } from "expo-symbols";

export type Transaction = {
  id: string;
  icon: SymbolViewProps["name"];
  title: string;
  category: string;
  method: string;
  amount: number;
  date: string;
  time: string;
  muted?: boolean;
};

export type DayGroup = {
  date: string;
  title: string;
  total: number;
  isToday: boolean;
  items: Transaction[];
};

export const TODAY = "2024-10-24";
export const WEEKLY_BUDGET = 500000;

export const transactions: Transaction[] = [
  {
    id: "trx-001",
    icon: { ios: "cup.and.saucer", android: "coffee", web: "coffee" },
    title: "Kopi Kenangan",
    category: "Makan & Minum",
    method: "GoPay",
    amount: 22000,
    date: "2024-10-24",
    time: "10:15",
  },
  {
    id: "trx-002",
    icon: { ios: "scooter", android: "two_wheeler", web: "two_wheeler" },
    title: "GrabBike ke Kantor",
    category: "Transportasi",
    method: "OVO",
    amount: 14000,
    date: "2024-10-24",
    time: "08:30",
  },
  {
    id: "trx-003",
    icon: { ios: "bag", android: "shopping_bag", web: "shopping_bag" },
    title: "Indomaret Point",
    category: "Belanja",
    method: "Tunai",
    amount: 35000,
    date: "2024-10-23",
    time: "19:40",
  },
  {
    id: "trx-004",
    icon: { ios: "fork.knife", android: "restaurant", web: "restaurant" },
    title: "Nasi Padang Garuda",
    category: "Makan & Minum",
    method: "GoPay",
    amount: 40000,
    date: "2024-10-23",
    time: "12:30",
  },
  {
    id: "trx-005",
    icon: { ios: "music.note", android: "music_note", web: "music_note" },
    title: "Spotify Family Plan",
    category: "Tagihan / Hiburan",
    method: "Bank BCA",
    amount: 29000,
    date: "2024-10-21",
    time: "18:00",
    muted: true,
  },
  {
    id: "trx-006",
    icon: { ios: "bag", android: "local_mall", web: "local_mall" },
    title: "Belanja Bulanan Superindo",
    category: "Belanja",
    method: "Bank BCA",
    amount: 245000,
    date: "2024-10-21",
    time: "11:30",
  },
  {
    id: "trx-007",
    icon: { ios: "bolt", android: "bolt", web: "bolt" },
    title: "Token Listrik Kos",
    category: "Tagihan / Hiburan",
    method: "Bank BCA",
    amount: 150000,
    date: "2024-10-17",
    time: "20:10",
  },
  {
    id: "trx-008",
    icon: { ios: "cart", android: "shopping_cart", web: "shopping_cart" },
    title: "Belanja Mingguan Alfamart",
    category: "Belanja",
    method: "Tunai",
    amount: 135000,
    date: "2024-10-15",
    time: "16:45",
  },
  {
    id: "trx-009",
    icon: { ios: "film", android: "movie", web: "movie" },
    title: "Nonton Bioskop XXI",
    category: "Tagihan / Hiburan",
    method: "OVO",
    amount: 85000,
    date: "2024-10-13",
    time: "19:00",
  },
  {
    id: "trx-010",
    icon: { ios: "fork.knife", android: "restaurant", web: "restaurant" },
    title: "Ayam Geprek Bu Rini",
    category: "Makan & Minum",
    method: "GoPay",
    amount: 40000,
    date: "2024-10-12",
    time: "13:05",
  },
  {
    id: "trx-011",
    icon: { ios: "printer", android: "print", web: "print" },
    title: "Fotokopi & Print Tugas",
    category: "Belanja",
    method: "GoPay",
    amount: 27000,
    date: "2024-10-14",
    time: "09:20",
  },
];

export const CATEGORIES = [
  "Makan & Minum",
  "Transportasi",
  "Belanja",
  "Tagihan / Hiburan",
] as const;

export const METHODS = ["GoPay", "OVO", "Tunai", "Bank BCA"] as const;

export const CATEGORY_ICONS: Record<string, Transaction["icon"]> = {
  "Makan & Minum": {
    ios: "fork.knife",
    android: "restaurant",
    web: "restaurant",
  },
  Transportasi: { ios: "scooter", android: "two_wheeler", web: "two_wheeler" },
  Belanja: { ios: "bag", android: "shopping_bag", web: "shopping_bag" },
  "Tagihan / Hiburan": {
    ios: "music.note",
    android: "music_note",
    web: "music_note",
  },
};

export type Period = "week" | "month" | "all";

export const PERIOD_LABELS: Record<Period, string> = {
  week: "Minggu Ini",
  month: "Bulan Ini",
  all: "Semua",
};

const PERIOD_BUDGET: Record<Period, number> = {
  week: WEEKLY_BUDGET,
  month: WEEKLY_BUDGET * 4,
  all: WEEKLY_BUDGET * 4,
};

const DAY_NAMES = [
  "Minggu",
  "Senin",
  "Selasa",
  "Rabu",
  "Kamis",
  "Jumat",
  "Sabtu",
];
const MONTH_SHORT = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "Mei",
  "Jun",
  "Jul",
  "Agu",
  "Sep",
  "Okt",
  "Nov",
  "Des",
];

const toUtc = (date: string) => new Date(`${date}T00:00:00Z`);

const dayDiff = (date: string) =>
  Math.round((toUtc(TODAY).getTime() - toUtc(date).getTime()) / 86400000);

export const formatRupiah = (value: number) =>
  `Rp ${value.toLocaleString("id-ID")}`;

export const formatExpense = (value: number) => `-${formatRupiah(value)}`;

export const formatShortDate = (date: string) => {
  const d = toUtc(date);
  return `${d.getUTCDate()} ${MONTH_SHORT[d.getUTCMonth()]}`;
};

export const formatDayTitle = (date: string) => {
  const diff = dayDiff(date);
  const short = formatShortDate(date);
  if (diff === 0) return `Hari Ini, ${short}`;
  if (diff === 1) return `Kemarin, ${short}`;
  return `${DAY_NAMES[toUtc(date).getUTCDay()]}, ${short}`;
};

export const formatRecentTime = (trx: Transaction) => {
  const diff = dayDiff(trx.date);
  if (diff === 0) return `Hari ini, ${trx.time}`;
  if (diff === 1) return `Kemarin, ${trx.time}`;
  return formatShortDate(trx.date);
};

export const formatSubtitle = (trx: Transaction) =>
  `${trx.category} • ${trx.method}`;

const sortNewestFirst = (list: Transaction[]) =>
  [...list].sort((a, b) =>
    `${b.date}${b.time}`.localeCompare(`${a.date}${a.time}`),
  );

export const sumAmount = (list: Transaction[]) =>
  list.reduce((total, trx) => total + trx.amount, 0);

const inWeek = (date: string, weeksAgo = 0) => {
  const diff = dayDiff(date);
  return diff >= weeksAgo * 7 && diff <= weeksAgo * 7 + 6;
};

const inMonth = (date: string) =>
  date.slice(0, 7) === TODAY.slice(0, 7) && dayDiff(date) >= 0;

export const filterTransactions = (
  list: Transaction[],
  period: Period,
  category: string | null,
) =>
  list.filter((trx) => {
    if (category && trx.category !== category) return false;
    if (period === "week") return inWeek(trx.date);
    if (period === "month") return inMonth(trx.date);
    return true;
  });

export const getPeriodBudget = (period: Period) => PERIOD_BUDGET[period];

export const getRecentTransactions = (list: Transaction[], limit = 4) =>
  sortNewestFirst(list).slice(0, limit);

export const getGroupedTransactions = (list: Transaction[]): DayGroup[] => {
  const groups = new Map<string, Transaction[]>();
  for (const trx of sortNewestFirst(list)) {
    groups.set(trx.date, [...(groups.get(trx.date) ?? []), trx]);
  }
  return [...groups.entries()].map(([date, items]) => ({
    date,
    title: formatDayTitle(date),
    total: sumAmount(items),
    isToday: date === TODAY,
    items,
  }));
};

export const getBudgetSummary = (list: Transaction[]) => {
  const week = list.filter((trx) => inWeek(trx.date));
  const spent = sumAmount(week);
  const remaining = Math.max(WEEKLY_BUDGET - spent, 0);
  const usedPercent = Math.min(100, Math.round((spent / WEEKLY_BUDGET) * 100));
  const dayOfWeek = toUtc(TODAY).getUTCDay();
  const daysLeft = dayOfWeek === 0 ? 1 : 8 - dayOfWeek;
  return {
    limit: WEEKLY_BUDGET,
    spent,
    remaining,
    usedPercent,
    safePercent: 100 - usedPercent,
    count: week.length,
    safePerDay: Math.floor(remaining / daysLeft),
  };
};

export const getWeeklyChange = (list: Transaction[]) => {
  const current = sumAmount(list.filter((trx) => inWeek(trx.date)));
  const previous = sumAmount(list.filter((trx) => inWeek(trx.date, 1)));
  if (previous === 0) return null;
  return Math.round(((previous - current) / previous) * 100);
};
