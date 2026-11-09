import { router, useLocalSearchParams } from "expo-router";
import { SymbolView } from "expo-symbols";
import { Pressable, ScrollView, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { formatDayTitle, formatExpense } from "../../data/transaction";
import {
  removeTransaction,
  useTransactions,
} from "../../data/transactionStore";

const PRIMARY = "#a23546";

type InfoRowProps = {
  label: string;
  value: string;
};

const InfoRow = ({ label, value }: InfoRowProps) => (
  <View className="flex-row items-center justify-between py-3">
    <Text className="text-body-sm text-on-surface-variant">{label}</Text>
    <Text className="ml-4 shrink text-right text-label-lg text-on-surface">
      {value}
    </Text>
  </View>
);

export default function DetailTransaksi() {
  const insets = useSafeAreaInsets();
  const { id } = useLocalSearchParams<{ id: string }>();
  const list = useTransactions();
  const trx = list.find((item) => item.id === id);

  if (!trx) {
    return (
      <View className="flex-1 items-center justify-center bg-surface px-margin">
        <Text className="text-headline-sm text-on-surface">
          Transaksi tidak ditemukan
        </Text>
        <Pressable
          onPress={() => router.back()}
          className="mt-4 rounded-full bg-primary px-5 py-2.5"
        >
          <Text className="text-label-lg font-bold text-on-primary">
            Kembali
          </Text>
        </Pressable>
      </View>
    );
  }

  const onDelete = () => {
    removeTransaction(trx.id);
    router.back();
  };

  return (
    <ScrollView
      className="flex-1 bg-surface"
      contentContainerClassName="gap-5 px-margin pt-5"
      contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
    >
      <View className="items-center gap-2 rounded-[20px] bg-surface-container-low p-6 shadow-sm shadow-black/5">
        <View className="h-16 w-16 items-center justify-center rounded-full bg-surface-container-lowest">
          <SymbolView name={trx.icon} size={30} tintColor={PRIMARY} />
        </View>
        <Text className="text-center text-headline-sm text-on-surface">
          {trx.title}
        </Text>
        <Text className="text-display-mobile text-on-surface">
          {formatExpense(trx.amount)}
        </Text>
      </View>
      <View className="rounded-2xl bg-surface-container-lowest px-4 shadow-sm shadow-black/5">
        <InfoRow label="Kategori" value={trx.category} />
        <InfoRow label="Metode bayar" value={trx.method} />
        <InfoRow label="Tanggal" value={formatDayTitle(trx.date)} />
        <InfoRow label="Jam" value={trx.time} />
        <InfoRow label="ID transaksi" value={trx.id} />
      </View>
      <Pressable
        onPress={onDelete}
        accessibilityRole="button"
        className="flex-row items-center justify-center gap-2 rounded-2xl bg-error py-3.5 active:opacity-90"
      >
        <SymbolView
          name={{ ios: "trash", android: "delete", web: "delete" }}
          size={20}
          tintColor="#ffffff"
        />
        <Text className="text-label-lg font-bold text-on-error">
          Hapus transaksi
        </Text>
      </Pressable>
    </ScrollView>
  );
}
