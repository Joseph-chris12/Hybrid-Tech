import type { SymbolViewProps } from "expo-symbols";
import { Pressable, Text, View } from "react-native";
import { ON_SECONDARY_FIXED, ON_SURFACE_VARIANT, PRIMARY } from "./colors";
import { Icon } from "./Icon";

type TransactionRowProps = {
  icon: SymbolViewProps["name"];
  title: string;
  subtitle: string;
  amount: string;
  time?: string;
  muted?: boolean;
  onPress?: () => void;
};

export const TransactionRow = ({
  icon,
  title,
  subtitle,
  amount,
  time,
  muted,
  onPress,
}: TransactionRowProps) =>
  time !== undefined ? (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between rounded-2xl bg-surface-container-lowest p-3.5 shadow-sm shadow-black/5 active:bg-surface-container-low"
    >
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
        <Text className="text-label-lg font-bold text-on-surface">
          {amount}
        </Text>
        <Text className="text-label-sm text-on-surface-variant">{time}</Text>
      </View>
    </Pressable>
  ) : (
    <Pressable
      onPress={onPress}
      className="flex-row items-center justify-between rounded-xl bg-surface-container-lowest p-3.5 shadow-sm shadow-black/5 active:bg-surface-container-low"
    >
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
    </Pressable>
  );
