import { router } from "expo-router";
import { SymbolView, type SymbolViewProps } from "expo-symbols";
import { useEffect, useState } from "react";
import {
  Animated,
  Easing,
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const mascot = require("../../assets/images/chacing_icon.png");

const PRIMARY = "#a23546";
const ON_PRIMARY = "#ffffff";
const ON_SURFACE_VARIANT = "#564143";

type IconProps = {
  name: SymbolViewProps["name"];
  size: number;
  color: string;
};

const Icon = ({ name, size, color }: IconProps) => (
  <SymbolView name={name} size={size} tintColor={color} />
);

type SmallCardProps = {
  icon: SymbolViewProps["name"];
  label: string;
  value: string;
  note: string;
  noteClassName: string;
};

const SmallCard = ({
  icon,
  label,
  value,
  note,
  noteClassName,
}: SmallCardProps) => (
  <View className="flex-1 justify-between gap-2.5 rounded-2xl bg-surface-container-lowest p-4 shadow-sm shadow-black/5">
    <View className="flex-row items-center justify-between">
      <View className="h-9 w-9 items-center justify-center rounded-full bg-surface-container-low">
        <Icon name={icon} size={20} color={PRIMARY} />
      </View>
    </View>
    <View>
      <Text className="text-label-md text-on-surface-variant">{label}</Text>
      <Text className="mt-0.5 text-headline-sm font-bold text-on-surface">
        {value}
      </Text>
      <Text className={`mt-0.5 text-label-sm ${noteClassName}`}>{note}</Text>
    </View>
  </View>
);

type TransactionRowProps = {
  icon: SymbolViewProps["name"];
  title: string;
  subtitle: string;
  amount: string;
  time: string;
};

const TransactionRow = ({
  icon,
  title,
  subtitle,
  amount,
  time,
}: TransactionRowProps) => (
  <Pressable className="flex-row items-center justify-between rounded-2xl bg-surface-container-lowest p-3.5 shadow-sm shadow-black/5 active:bg-surface-container-low">
    <View className="min-w-0 flex-1 flex-row items-center gap-3">
      <View className="h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-low">
        <Icon name={icon} size={22} color={PRIMARY} />
      </View>
      <View className="min-w-0 flex-1">
        <Text numberOfLines={1} className="text-label-lg text-on-surface">
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
    <View className="shrink-0 items-end pl-2">
      <Text className="text-label-lg font-bold text-on-surface">{amount}</Text>
      <Text className="text-label-sm text-on-surface-variant">{time}</Text>
    </View>
  </Pressable>
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
    <Icon name={icon} size={24} color={active ? PRIMARY : ON_SURFACE_VARIANT} />
    <Text
      numberOfLines={1}
      className={`mt-0.5 text-label-sm ${active ? "font-bold text-primary" : "text-on-surface-variant"}`}
    >
      {label}
    </Text>
  </Pressable>
);

export default function Home() {
  const insets = useSafeAreaInsets();
  const [wave] = useState(() => new Animated.Value(0));
  const [wiggle] = useState(() => new Animated.Value(0));
  const [tipsFlash, setTipsFlash] = useState(false);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(wave, {
          toValue: -6,
          duration: 500,
          easing: Easing.bezier(0.8, 0, 1, 1),
          useNativeDriver: true,
        }),
        Animated.timing(wave, {
          toValue: 0,
          duration: 500,
          easing: Easing.bezier(0, 0, 0.2, 1),
          useNativeDriver: true,
        }),
      ]),
      { iterations: 2 },
    ).start();
  }, [wave]);

  const onAvatarPress = () => {
    wiggle.setValue(0);
    Animated.timing(wiggle, {
      toValue: 3,
      duration: 400,
      easing: Easing.bezier(0.34, 1.56, 0.64, 1),
      useNativeDriver: true,
    }).start();
  };

  const onTipsPress = () => {
    setTipsFlash(true);
    setTimeout(() => setTipsFlash(false), 250);
  };

  const avatarRotate = wiggle.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: ["0deg", "-14deg", "14deg", "0deg"],
    extrapolate: "clamp",
  });
  const avatarScale = wiggle.interpolate({
    inputRange: [0, 1, 2, 3],
    outputRange: [1, 1.15, 1.15, 1],
    extrapolate: "clamp",
  });

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
        <View className="w-full gap-y-5">
          {/* 1. Top Greeting Area */}
          <View className="flex-row items-center justify-between pt-1">
            <View>
              <View className="flex-row items-center gap-1.5">
                <Text className="text-headline-lg-mobile text-on-surface">
                  Hai, Josep
                </Text>
                <Animated.Text
                  className="text-xl"
                  style={{ transform: [{ translateY: wave }] }}
                >
                  👋
                </Animated.Text>
              </View>
              <Text className="text-body-sm text-on-surface-variant">
                Kamis, 24 Oktober 2024
              </Text>
            </View>
            {/* Small Mascot Circular Frame */}
            <Pressable onPress={onAvatarPress} accessibilityRole="button">
              <Animated.View
                className="relative h-11 w-11 items-center justify-center rounded-full bg-surface-container-low shadow-sm shadow-secondary-container/30"
                style={{
                  transform: [{ rotate: avatarRotate }, { scale: avatarScale }],
                }}
              >
                <Image
                  source={mascot}
                  accessibilityLabel="Chacing Mascot Avatar"
                  className="h-9 w-9 rounded-full"
                  resizeMode="contain"
                />
                <View className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-tertiary-container" />
              </Animated.View>
            </Pressable>
          </View>
          {/* 2. Hero Card (Budget Tracker) */}
          <View className="relative gap-3.5 overflow-hidden rounded-[20px] bg-surface-container-lowest p-5 shadow-sm shadow-black/5">
            {/* Subtle Ambient Coral Glow in card background */}
            <View
              pointerEvents="none"
              className="absolute -right-12 -top-12 h-36 w-36 rounded-full bg-secondary-container/10"
            />
            {/* Top status bar inside hero */}
            <View className="relative z-10 flex-row items-center justify-between">
              <View className="flex-row items-center gap-1.5">
                <Text className="text-label-md text-on-surface-variant">
                  Sisa budget minggu ini
                </Text>
                <Pressable
                  accessibilityLabel="Informasi budget"
                  accessibilityRole="button"
                  className="flex-row items-center"
                >
                  {({ pressed }) => (
                    <Icon
                      name={{
                        ios: "info.circle",
                        android: "info",
                        web: "info",
                      }}
                      size={16}
                      color={pressed ? PRIMARY : ON_SURFACE_VARIANT}
                    />
                  )}
                </Pressable>
              </View>
              <View className="flex-row items-center gap-1 rounded-full bg-tertiary-container/15 px-2.5 py-0.5">
                <View className="h-1.5 w-1.5 rounded-full bg-tertiary-container" />
                <Text className="text-label-sm text-tertiary">
                  Sesuai rencana
                </Text>
              </View>
            </View>
            {/* Budget Numbers */}
            <View className="relative z-10">
              <View className="flex-row items-baseline gap-1">
                <Text className="text-display-mobile text-on-surface">
                  Rp 340.000
                </Text>
              </View>
              <Text className="text-body-sm text-on-surface-variant">
                dari total batas Rp 500.000
              </Text>
            </View>
            {/* Progress Bar Tracker */}
            <View className="relative z-10 gap-1.5">
              <View className="h-2.5 w-full overflow-hidden rounded-full bg-primary-fixed/60">
                <View className="h-full w-[32%] rounded-full bg-secondary-container" />
              </View>
              <View className="flex-row items-center justify-between">
                <Text className="text-label-sm text-on-surface-variant">
                  Terpakai 32% (Rp 160.000)
                </Text>
                <Text className="text-label-sm font-bold text-primary">
                  68% Aman
                </Text>
              </View>
            </View>
            {/* Micro Note Card / Speech Bubble from Chacing Worm */}
            <View className="relative z-10 mt-0.5 flex-row items-start gap-2.5 rounded-xl bg-surface-container-low p-3">
              <View className="mt-0.5 shrink-0">
                <Icon
                  name={{
                    ios: "sparkles",
                    android: "auto_awesome",
                    web: "auto_awesome",
                  }}
                  size={20}
                  color={PRIMARY}
                />
              </View>
              <Text className="flex-1 text-body-sm leading-snug text-on-surface">
                Keren banget, Josep! Pengeluaranmu masih terkendali minggu ini
                ✨
              </Text>
            </View>
          </View>
          {/* 3. Row of Two Small Cards */}
          <View className="flex-row gap-3">
            {/* Card 1: Aman dipakai hari ini */}
            <SmallCard
              icon={{
                ios: "checkmark.shield.fill",
                android: "shield_with_heart",
                web: "shield_with_heart",
              }}
              label="Aman hari ini"
              value="Rp 48.000"
              note="Biar cukup ke Minggu"
              noteClassName="text-primary"
            />
            {/* Card 2: Sudah terpakai */}
            <SmallCard
              icon={{
                ios: "list.bullet.rectangle.portrait",
                android: "receipt_long",
                web: "receipt_long",
              }}
              label="Sudah terpakai"
              value="Rp 160.000"
              note="4 transaksi minggu ini"
              noteClassName="text-on-surface-variant"
            />
          </View>
          {/* 4. Section "Transaksi terakhir" */}
          <View className="gap-3">
            <View className="flex-row items-center justify-between px-0.5">
              <Text className="text-headline-sm font-bold text-on-surface">
                Transaksi terakhir
              </Text>
              <Pressable
                onPress={() => router.replace("/detailTransaksi")}
                className="flex-row items-center gap-0.5"
              >
                {({ pressed }) => (
                  <>
                    <Text
                      className={`text-label-lg ${pressed ? "text-on-secondary-fixed-variant" : "text-primary"}`}
                    >
                      Lihat Semua
                    </Text>
                    <Icon
                      name={{
                        ios: "chevron.right",
                        android: "chevron_right",
                        web: "chevron_right",
                      }}
                      size={16}
                      color={pressed ? "#8a182f" : PRIMARY}
                    />
                  </>
                )}
              </Pressable>
            </View>
            {/* Transaction List Stack */}
            <View className="gap-2.5">
              {/* Row 1: Kopi Kenangan */}
              <TransactionRow
                icon={{
                  ios: "cup.and.saucer",
                  android: "coffee",
                  web: "coffee",
                }}
                title="Kopi Kenangan"
                subtitle="Makanan & Minuman • GoPay"
                amount="-Rp 22.000"
                time="Hari ini, 10:15"
              />
              {/* Row 2: GrabBike ke Kantor */}
              <TransactionRow
                icon={{
                  ios: "scooter",
                  android: "two_wheeler",
                  web: "two_wheeler",
                }}
                title="GrabBike ke Kantor"
                subtitle="Transportasi • OVO"
                amount="-Rp 14.000"
                time="Hari ini, 08:30"
              />
              {/* Row 3: Indomaret Point */}
              <TransactionRow
                icon={{
                  ios: "bag",
                  android: "shopping_bag",
                  web: "shopping_bag",
                }}
                title="Indomaret Point"
                subtitle="Kebutuhan Harian • Tunai"
                amount="-Rp 35.000"
                time="Kemarin, 19:40"
              />
              {/* Row 4: Spotify Family Plan */}
              <TransactionRow
                icon={{
                  ios: "headphones",
                  android: "headphones",
                  web: "headphones",
                }}
                title="Spotify Family Plan"
                subtitle="Hiburan • Bank BCA"
                amount="-Rp 29.000"
                time="22 Okt"
              />
            </View>
          </View>
          {/* 5. Interactive Tips Cuan Chacing Banner */}
          <Pressable
            onPress={onTipsPress}
            className={`relative flex-row items-center gap-3.5 overflow-hidden rounded-2xl p-4 shadow-sm shadow-secondary-container/20 active:scale-[0.99] ${tipsFlash ? "bg-primary-fixed" : "bg-surface-container-low"}`}
          >
            <View className="h-10 w-10 shrink-0 items-center justify-center rounded-full bg-surface-container-lowest shadow-sm">
              <Icon
                name={{
                  ios: "lightbulb.fill",
                  android: "lightbulb",
                  web: "lightbulb",
                }}
                size={22}
                color={PRIMARY}
              />
            </View>
            <View className="min-w-0 flex-1 gap-0.5">
              <View className="flex-row items-center gap-1.5">
                <Text className="text-label-sm font-bold uppercase tracking-wider text-primary">
                  Tips Cuan Chacing
                </Text>
              </View>
              <Text className="text-body-sm leading-snug text-on-surface">
                Kamu bisa hemat sampai{" "}
                <Text className="font-bold text-on-surface">Rp 50.000</Text>{" "}
                minggu ini kalau seduh kopi sendiri di kos! ☕🌱
              </Text>
            </View>
          </Pressable>
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
            active
          />
          <NavItem
            icon={{
              ios: "list.bullet.rectangle.portrait",
              android: "receipt_long",
              web: "receipt_long",
            }}
            label="Transaksi"
            onPress={() => router.replace("/detailTransaksi")}
          />
          <View className="relative h-full flex-1 items-center justify-center">
            <Pressable
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
