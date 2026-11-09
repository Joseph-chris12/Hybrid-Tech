import type { SymbolViewProps } from "expo-symbols";
import { Pressable, Text } from "react-native";
import { ON_SURFACE_VARIANT, PRIMARY, SECONDARY } from "./colors";
import { Icon } from "./Icon";

type NavItemProps = {
  icon: SymbolViewProps["name"];
  label: string;
  active?: boolean;
  accent?: "primary" | "secondary";
  onPress?: () => void;
};

export const NavItem = ({
  icon,
  label,
  active,
  accent = "primary",
  onPress,
}: NavItemProps) => {
  const secondary = accent === "secondary";
  const activeColor = secondary ? SECONDARY : PRIMARY;
  const activeText = secondary ? "text-secondary" : "text-primary";
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="tab"
      accessibilityState={{ selected: active }}
      className="h-full flex-1 items-center justify-center"
    >
      <Icon
        name={icon}
        size={24}
        color={active ? activeColor : ON_SURFACE_VARIANT}
      />
      <Text
        numberOfLines={1}
        className={`mt-0.5 text-label-sm ${active ? `font-bold ${activeText}` : "text-on-surface-variant"}`}
      >
        {label}
      </Text>
    </Pressable>
  );
};
