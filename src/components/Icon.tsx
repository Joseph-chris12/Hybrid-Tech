import { SymbolView, type SymbolViewProps } from "expo-symbols";

type IconProps = {
  name: SymbolViewProps["name"];
  size: number;
  color: string;
};

export const Icon = ({ name, size, color }: IconProps) => (
  <SymbolView name={name} size={size} tintColor={color} />
);
