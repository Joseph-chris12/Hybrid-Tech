import { router } from "expo-router";
import { SymbolView, type SymbolViewProps } from "expo-symbols";
import { useState, type ReactNode } from "react";
import {
  Animated,
  Image,
  PanResponder,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Svg, { Circle } from "react-native-svg";
import {
  CATEGORIES,
  filterTransactions,
  formatExpense,
  formatRupiah,
  formatSubtitle,
  getGroupedTransactions,
  getPeriodBudget,
  getWeeklyChange,
  PERIOD_LABELS,
  sumAmount,
  type Period,
} from "../data/transaction";
import { removeTransaction, useTransactions } from "../data/transactionStore";

const mascot = require("../../assets/images/chacing_icon.png");

const PRIMARY = "#a23546";
const SECONDARY = "#aa3145";
const ON_PRIMARY = "#ffffff";
const ON_SECONDARY_FIXED = "#40000e";
const ON_SURFACE_VARIANT = "#564143";

type IconProps = {
  name: SymbolViewProps["name"];
  size: number;
  color: string;
};

const Icon = ({ name, size, color }: IconProps) => (
  <SymbolView name={name} size={size} tintColor={color} />
);

type DayHeaderProps = {
  title: string;
  total: string;
  dot?: boolean;
};

const DayHeader = ({ title, total, dot }: DayHeaderProps) => (
  <View className="flex-row items-center justify-between bg-surface/95 py-1.5">
    <View className="flex-row items-center gap-1.5">
      {dot && <View className="h-2 w-2 rounded-full bg-secondary-container" />}
      <Text className="text-headline-sm text-on-surface">{title}</Text>
    </View>
    <Text className="text-label-md text-on-surface-variant">{total}</Text>
  </View>
);

type TransactionRowProps = {
  icon: SymbolViewProps["name"];
  title: string;
  subtitle: string;
  amount: string;
  muted?: boolean;
};

const TransactionRow = ({
  icon,
  title,
  subtitle,
  amount,
  muted,
}: TransactionRowProps) => (
  <View className="flex-row items-center justify-between rounded-xl bg-surface-container-lowest p-3.5 shadow-sm shadow-black/5">
    <View className="min-w-0 flex-1 flex-row items-center gap-3">
      <View
        className={`h-11 w-11 shrink-0 items-center justify-center rounded-full ${muted ? "bg-surface-container-high" : "bg-secondary-fixed"}`}
      >
        <Icon
          name={icon}
          size={20}
          color={muted ? ON_SURFACE_VARIANT : ON_SECONDARY_FIXED}
        />
      </View>
      <View className="min-w-0 flex-1">
        <Text
          numberOfLines={1}
          className="text-[15px] font-semibold text-on-surface"
        >
          {title}
        </Text>
        <Text
          numberOfLines={1}
          className="text-body-sm text-on-surface-variant"
        >
          {subtitle}
        </Text>
      </View>
    </View>
    <Text className="shrink-0 pl-2 text-right text-label-lg font-bold text-on-surface">
      {amount}
    </Text>
  </View>
);

type NavItemProps = {
  icon: SymbolViewProps["name"];
  label: string;
  active?: boolean;
  onPress?: () => void;
};

const NavItem = ({ icon, label, active, onPress }: NavItemProps) => (
  <Pressable
    onPress={onPress}
    accessibilityRole="tab"
    accessibilityState={{ selected: active }}
    className="h-full flex-1 items-center justify-center"
  >
    <Icon
      name={icon}
      size={24}
      color={active ? SECONDARY : ON_SURFACE_VARIANT}
    />
    <Text
      numberOfLines={1}
      className={`mt-0.5 text-label-sm ${active ? "font-bold text-secondary" : "text-on-surface-variant"}`}
    >
      {label}
    </Text>
  </Pressable>
);

const ACTION_WIDTH = 80;

type SwipeableRowProps = {
  onDelete: () => void;
  children: ReactNode;
};

const SwipeableRow = ({ onDelete, children }: SwipeableRowProps) => {
  const [{ translateX, panHandlers }] = useState(() => {
    const translateX = new Animated.Value(0);
    let open = false;
    const settle = (toValue: number) => {
      open = toValue !== 0;
      Animated.spring(translateX, {
        toValue,
        bounciness: 0,
        useNativeDriver: true,
      }).start();
    };
    const responder = PanResponder.create({
      onMoveShouldSetPanResponder: (_, g) =>
        Math.abs(g.dx) > 8 && Math.abs(g.dx) > Math.abs(g.dy),
      onPanResponderMove: (_, g) => {
        const base = open ? -ACTION_WIDTH : 0;
        translateX.setValue(Math.max(-ACTION_WIDTH, Math.min(0, base + g.dx)));
      },
      onPanResponderRelease: (_, g) => {
        const base = open ? -ACTION_WIDTH : 0;
        settle(base + g.dx < -ACTION_WIDTH / 2 ? -ACTION_WIDTH : 0);
      },
      onPanResponderTerminate: () => settle(open ? -ACTION_WIDTH : 0),
    });
    return { translateX, panHandlers: responder.panHandlers };
  });

  return (
    <View className="relative overflow-hidden rounded-xl">
      <View className="absolute inset-y-0 right-0 w-20 items-center justify-center bg-error">
        <Pressable
          onPress={onDelete}
          accessibilityLabel="Hapus transaksi"
          accessibilityRole="button"
          className="h-full w-full items-center justify-center gap-0.5"
        >
          <Icon
            name={{ ios: "trash", android: "delete", web: "delete" }}
            size={22}
            color={ON_PRIMARY}
          />
          <Text className="text-label-sm font-bold text-on-error">Hapus</Text>
        </Pressable>
      </View>
      <Animated.View
        {...panHandlers}
        style={{ transform: [{ translateX }] }}
        className="z-10"
      >
        {children}
      </Animated.View>
    </View>
  );
};

const PERIOD_OPTIONS: { key: Period; label: string }[] = [
  { key: "week", label: "Minggu ini" },
  { key: "month", label: "Bulan ini" },
  { key: "all", label: "Semua" },
];

export default function DetailTransaksi() {
  const insets = useSafeAreaInsets();
  const list = useTransactions();
  const [period, setPeriod] = useState<Period>("week");
  const [category, setCategory] = useState<string | null>(null);
  const [showCategories, setShowCategories] = useState(false);
  const filtered = filterTransactions(list, period, category);
  const groups = getGroupedTransactions(filtered);
  const periodTotal = sumAmount(filtered);
  const ringProgress = Math.min(1, periodTotal / getPeriodBudget(period));
  const weeklyChange = getWeeklyChange(list);
  const saving = (weeklyChange ?? 0) >= 0;

  return (
    <View className="flex-1 bg-surface">
      <ScrollView
        className="flex-1"
        contentContainerClassName="w-full max-w-[440px] self-center px-margin"
        contentContainerStyle={{
          paddingTop: insets.top + 64,
          paddingBottom: insets.bottom + 96,
        }}
        showsVerticalScrollIndicator={false}
      >
        <View className="w-full pb-8">
          {/* Title & Action Bar */}
          <View className="mb-space-md flex-row items-center justify-between">
            <View className="flex-row items-center gap-space-xs">
              <Text className="text-headline-lg-mobile text-on-surface">
                Transaksi
              </Text>
              <View className="items-center justify-center rounded-full bg-secondary-fixed px-2 py-0.5">
                <Text className="text-label-sm text-on-secondary-fixed">
                  {filtered.length} Catatan
                </Text>
              </View>
            </View>
            <View className="flex-row items-center gap-space-xs">
              <Pressable
                accessibilityLabel="Cari transaksi"
                accessibilityRole="button"
                className="h-10 w-10 items-center justify-center rounded-full bg-surface-container-low shadow-sm shadow-black/5"
              >
                <Icon
                  name={{
                    ios: "magnifyingglass",
                    android: "search",
                    web: "search",
                  }}
                  size={20}
                  color={ON_SURFACE_VARIANT}
                />
              </Pressable>
              <Pressable
                accessibilityLabel="Filter tanggal dan kategori"
                accessibilityRole="button"
                className="relative h-10 w-10 items-center justify-center rounded-full bg-surface-container-low shadow-sm shadow-black/5"
              >
                <Icon
                  name={{
                    ios: "slider.horizontal.3",
                    android: "tune",
                    web: "tune",
                  }}
                  size={20}
                  color={ON_SURFACE_VARIANT}
                />
                <View className="absolute right-2 top-2 h-2 w-2 rounded-full bg-secondary-container" />
              </Pressable>
            </View>
          </View>
          {/* Weekly Total Spending Summary Card */}
          <View className="relative mb-space-lg overflow-hidden rounded-[20px] bg-surface-container-low p-space-md shadow-sm shadow-black/5">
            <View className="flex-row items-start justify-between">
              <View className="flex-1 gap-1">
                <View className="flex-row items-center gap-1.5">
                  <Icon
                    name={{
                      ios: "calendar",
                      android: "date_range",
                      web: "date_range",
                    }}
                    size={16}
                    color={SECONDARY}
                  />
                  <Text className="text-label-md text-on-surface-variant">
                    {period === "all"
                      ? "Total Pengeluaran"
                      : `Total Pengeluaran ${PERIOD_LABELS[period]}`}
                  </Text>
                </View>
                <Text className="text-display-mobile text-on-surface">
                  {formatRupiah(periodTotal)}
                </Text>
                {period === "week" && !category && weeklyChange !== null ? (
                  <View className="flex-row flex-wrap items-center gap-1 pt-0.5">
                    <Icon
                      name={
                        saving
                          ? {
                              ios: "chart.line.downtrend.xyaxis",
                              android: "trending_down",
                              web: "trending_down",
                            }
                          : {
                              ios: "chart.line.uptrend.xyaxis",
                              android: "trending_up",
                              web: "trending_up",
                            }
                      }
                      size={14}
                      color={PRIMARY}
                    />
                    <Text className="text-body-sm text-on-surface-variant">
                      <Text className="font-bold text-primary">
                        {Math.abs(weeklyChange)}%{" "}
                        {saving ? "lebih hemat" : "lebih boros"}
                      </Text>{" "}
                      dibanding minggu lalu!{saving ? " ✨" : ""}
                    </Text>
                  </View>
                ) : (
                  <Text className="pt-0.5 text-body-sm text-on-surface-variant">
                    {category ? `${category} • ` : ""}
                    {filtered.length} transaksi tercatat
                  </Text>
                )}
              </View>
              {/* Playful Mascot Micro Ring Badge */}
              <View className="relative h-14 w-14 shrink-0 items-center justify-center rounded-full bg-surface-container-lowest shadow-sm shadow-black/5">
                <Svg
                  width={48}
                  height={48}
                  viewBox="0 0 36 36"
                  style={{ transform: [{ rotate: "-90deg" }] }}
                >
                  <Circle
                    cx={18}
                    cy={18}
                    r={14}
                    fill="none"
                    stroke="#d9e3f6"
                    strokeWidth={3}
                  />
                  <Circle
                    cx={18}
                    cy={18}
                    r={14}
                    fill="none"
                    stroke="#fd7081"
                    strokeWidth={3.5}
                    strokeDasharray={88}
                    strokeDashoffset={88 * (1 - ringProgress)}
                    strokeLinecap="round"
                  />
                </Svg>
                <View className="absolute inset-0 items-center justify-center">
                  <Icon
                    name={{
                      ios: "banknote",
                      android: "savings",
                      web: "savings",
                    }}
                    size={22}
                    color={SECONDARY}
                  />
                </View>
              </View>
            </View>
          </View>
          {/* Filter Pills Carousel */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="-mx-1 mb-space-lg"
            contentContainerClassName="items-center gap-space-xs px-1 pb-1"
          >
            {PERIOD_OPTIONS.map((option) => {
              const active = option.key === period;
              return (
                <Pressable
                  key={option.key}
                  onPress={() => setPeriod(option.key)}
                  className={`shrink-0 flex-row items-center gap-1.5 rounded-full px-4 py-2 shadow-sm shadow-black/5 active:scale-95 ${active ? "bg-secondary" : "bg-surface-container-lowest"}`}
                >
                  {active && (
                    <Icon
                      name={{
                        ios: "calendar",
                        android: "calendar_today",
                        web: "calendar_today",
                      }}
                      size={16}
                      color={ON_PRIMARY}
                    />
                  )}
                  <Text
                    className={`text-label-md ${active ? "text-on-secondary" : "text-on-surface-variant"}`}
                  >
                    {option.label}
                  </Text>
                </Pressable>
              );
            })}
            <Pressable
              onPress={() => setShowCategories((value) => !value)}
              className={`shrink-0 flex-row items-center gap-1 rounded-full px-3.5 py-2 shadow-sm shadow-black/5 active:bg-surface-container ${category ? "bg-secondary" : "bg-surface-container-low"}`}
            >
              <Text
                className={`text-label-md ${category ? "text-on-secondary" : "text-on-surface-variant"}`}
              >
                {category ?? "Kategori"}
              </Text>
              <Icon
                name={
                  showCategories
                    ? {
                        ios: "chevron.up",
                        android: "expand_less",
                        web: "expand_less",
                      }
                    : {
                        ios: "chevron.down",
                        android: "expand_more",
                        web: "expand_more",
                      }
                }
                size={16}
                color={category ? ON_PRIMARY : ON_SURFACE_VARIANT}
              />
            </Pressable>
          </ScrollView>
          {showCategories && (
            <View className="mb-space-lg flex-row flex-wrap gap-space-xs">
              {[null, ...CATEGORIES].map((item) => (
                <Pressable
                  key={item ?? "all"}
                  onPress={() => {
                    setCategory(item);
                    setShowCategories(false);
                  }}
                  className={`rounded-full px-3.5 py-1.5 shadow-sm shadow-black/5 ${item === category ? "bg-secondary" : "bg-surface-container-lowest"}`}
                >
                  <Text
                    className={`text-label-md ${item === category ? "text-on-secondary" : "text-on-surface-variant"}`}
                  >
                    {item ?? "Semua kategori"}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}
          {/* Grouped Transactions Feed */}
          <View className="gap-space-lg">
            {groups.length === 0 && (
              <Text className="py-space-lg text-center text-body-sm text-on-surface-variant">
                Belum ada transaksi untuk filter ini.
              </Text>
            )}
            {groups.map((group) => (
              <View key={group.date}>
                <DayHeader
                  title={group.title}
                  total={formatRupiah(group.total)}
                  dot={group.isToday}
                />
                <View className="mt-1 gap-space-xs">
                  {group.items.map((trx) => (
                    <SwipeableRow
                      key={trx.id}
                      onDelete={() => removeTransaction(trx.id)}
                    >
                      <TransactionRow
                        icon={trx.icon}
                        title={trx.title}
                        subtitle={formatSubtitle(trx)}
                        amount={formatExpense(trx.amount)}
                        muted={trx.muted}
                      />
                    </SwipeableRow>
                  ))}
                </View>
              </View>
            ))}
          </View>
          {/* Friendly Mascot Milestone Footer Note */}
          <View className="mt-space-lg flex-row items-center gap-3 rounded-xl bg-surface-container-low p-4 shadow-sm shadow-black/5">
            <View className="h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary-fixed">
              <Icon
                name={{
                  ios: "checkmark.circle",
                  android: "check_circle",
                  web: "check_circle",
                }}
                size={20}
                color="#40000e"
              />
            </View>
            <View className="min-w-0 flex-1">
              <Text className="text-[13px] font-semibold text-on-surface">
                Semua pengeluaran tercatat rapi!
              </Text>
              <Text className="text-body-sm text-on-surface-variant">
                Chacing siap membantu pantau sisa jatah harianmu.
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>

      <View
        className="absolute left-0 right-0 top-0 z-50 bg-surface/90 shadow-sm shadow-black/5"
        style={{ paddingTop: insets.top }}
      >
        <View className="mx-auto h-16 w-full max-w-[440px] flex-row items-center justify-between px-margin">
          <View className="flex-row items-center gap-space-xs">
            <Image
              source={mascot}
              accessibilityLabel="Chacing Mascot Logo"
              className="h-8 w-8"
              resizeMode="contain"
            />
            <Text className="text-headline-sm text-on-surface">Chacing</Text>
          </View>
          <View className="flex-row items-center gap-space-sm">
            <Text className="hidden text-label-md text-on-surface-variant">
              Beranda
            </Text>
            <View className="h-8 w-8 items-center justify-center rounded-full bg-primary">
              <Icon
                name={{ ios: "person.fill", android: "person", web: "person" }}
                size={18}
                color={ON_PRIMARY}
              />
            </View>
          </View>
        </View>
      </View>

      {/* Highlight Transaksi nav item in the global shell */}
      <View
        className="absolute bottom-0 left-0 right-0 z-50 bg-surface/90 shadow-md shadow-black/10"
        style={{ paddingBottom: insets.bottom }}
      >
        <View className="relative mx-auto h-16 w-full max-w-[440px] flex-row items-center justify-around px-space-xs">
          <NavItem
            icon={{
              ios: "square.grid.2x2",
              android: "grid_view",
              web: "grid_view",
            }}
            label="Beranda"
            onPress={() => router.replace("/Home")}
          />
          <NavItem
            icon={{
              ios: "list.bullet.rectangle.portrait",
              android: "receipt_long",
              web: "receipt_long",
            }}
            label="Transaksi"
            active
          />
          <View className="relative h-full flex-1 items-center justify-center">
            <Pressable
              onPress={() => router.push("/tambahTransaksi")}
              accessibilityLabel="Tambah Transaksi"
              accessibilityRole="button"
              className="absolute -top-5 h-12 w-12 items-center justify-center rounded-full bg-primary shadow-lg shadow-secondary-container/50 active:translate-y-px"
            >
              <Icon
                name={{ ios: "plus", android: "add", web: "add" }}
                size={28}
                color={ON_PRIMARY}
              />
            </Pressable>
          </View>
          <NavItem
            icon={{ ios: "chart.pie", android: "pie_chart", web: "pie_chart" }}
            label="Budget"
          />
          <NavItem
            icon={{
              ios: "person.crop.circle",
              android: "account_circle",
              web: "account_circle",
            }}
            label="Profil"
          />
        </View>
      </View>
    </View>
  );
}
