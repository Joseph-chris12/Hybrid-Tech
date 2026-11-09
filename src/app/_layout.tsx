import "@/global.css";

import { DarkTheme, DefaultTheme, ThemeProvider, Stack } from "expo-router";
import { useColorScheme } from "react-native";

export default function TabLayout() {
  const colorScheme = useColorScheme();
  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="Home" options={{ headerShown: false }} />
        <Stack.Screen
          name="transaksi"
          options={{
            headerShown: false,
            animation: "fade",
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name="detail/[id]"
          options={{ title: "Detail Transaksi" }}
        />
        <Stack.Screen
          name="tambahTransaksi"
          options={{ title: "Tambah Transaksi", presentation: "modal" }}
        />
      </Stack>
    </ThemeProvider>
  );
}
