import { router } from "expo-router";
import { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  CATEGORIES,
  CATEGORY_ICONS,
  METHODS,
  formatRupiah,
} from "../data/transaction";
import { addTransaction } from "../data/transactionStore";

type ChipProps = {
  label: string;
  selected: boolean;
  onPress: () => void;
};

const Chip = ({ label, selected, onPress }: ChipProps) => (
  <Pressable
    onPress={onPress}
    className={`rounded-full px-4 py-2 shadow-sm shadow-black/5 ${selected ? "bg-secondary" : "bg-surface-container-lowest"}`}
  >
    <Text
      className={`text-label-md ${selected ? "text-on-secondary" : "text-on-surface-variant"}`}
    >
      {label}
    </Text>
  </Pressable>
);

export default function TambahTransaksi() {
  const insets = useSafeAreaInsets();
  const [title, setTitle] = useState("");
  const [amountText, setAmountText] = useState("");
  const [category, setCategory] = useState<string>(CATEGORIES[0]);
  const [method, setMethod] = useState<string>(METHODS[0]);
  const [error, setError] = useState("");

  const amount = Number(amountText.replace(/\D/g, ""));

  const onSave = () => {
    if (!title.trim()) {
      setError("Nama transaksi wajib diisi.");
      return;
    }
    if (amount <= 0) {
      setError("Nominal harus lebih dari 0.");
      return;
    }
    addTransaction({
      icon: CATEGORY_ICONS[category],
      title: title.trim(),
      category,
      method,
      amount,
    });
    router.back();
  };

  return (
    <KeyboardAvoidingView
      className="flex-1 bg-surface"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerClassName="gap-5 px-margin pt-5"
        contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
      >
        <View className="gap-1.5">
          <Text className="text-label-md text-on-surface-variant">
            Nama transaksi
          </Text>
          <TextInput
            value={title}
            onChangeText={(text) => {
              setTitle(text);
              setError("");
            }}
            placeholder="Contoh: Kopi Kenangan"
            placeholderTextColor="#9CA3AF"
            className="w-full rounded-2xl border border-[#FED1D6] bg-white px-4 py-3.5 text-sm font-medium text-[#1F2937] focus:border-[#FB6E7F]"
          />
        </View>
        <View className="gap-1.5">
          <Text className="text-label-md text-on-surface-variant">Nominal</Text>
          <TextInput
            value={amount > 0 ? formatRupiah(amount) : ""}
            onChangeText={(text) => {
              setAmountText(text);
              setError("");
            }}
            placeholder="Rp 0"
            placeholderTextColor="#9CA3AF"
            keyboardType="number-pad"
            className="w-full rounded-2xl border border-[#FED1D6] bg-white px-4 py-3.5 text-sm font-medium text-[#1F2937] focus:border-[#FB6E7F]"
          />
        </View>
        <View className="gap-2">
          <Text className="text-label-md text-on-surface-variant">
            Kategori
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {CATEGORIES.map((item) => (
              <Chip
                key={item}
                label={item}
                selected={item === category}
                onPress={() => setCategory(item)}
              />
            ))}
          </View>
        </View>
        <View className="gap-2">
          <Text className="text-label-md text-on-surface-variant">
            Metode bayar
          </Text>
          <View className="flex-row flex-wrap gap-2">
            {METHODS.map((item) => (
              <Chip
                key={item}
                label={item}
                selected={item === method}
                onPress={() => setMethod(item)}
              />
            ))}
          </View>
        </View>
        {error ? (
          <Text className="text-body-sm text-[#BA1A1A]">{error}</Text>
        ) : null}
        <Pressable
          onPress={onSave}
          accessibilityRole="button"
          className="items-center rounded-2xl bg-primary py-3.5 active:opacity-90"
        >
          <Text className="text-label-lg font-bold text-on-primary">
            Simpan
          </Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
