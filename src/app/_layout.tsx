import { Stack } from "expo-router";
import { MarketProvider } from "../context/marketContext";
import { NavigationMenu } from "../components/navigationMenu";

export default function RootLayout() {
  return (
    <MarketProvider>
      <Stack screenOptions={{ headerShown: false }} />
      <NavigationMenu />
    </MarketProvider>
  );
}