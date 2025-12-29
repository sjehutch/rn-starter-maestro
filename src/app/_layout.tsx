import { Stack, useRouter } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useState } from "react";
import { Pressable, Text } from "react-native";
import { AppThemeProvider } from "@shared/theme/useAppTheme";

export const RootLayout = () => {
  // We create the QueryClient once so it stays the same while the app runs.
  const [queryClient] = useState(() => new QueryClient());
  const router = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      {/* This shares light/dark colors with every screen. */}
      <AppThemeProvider>
        <Stack>
          <Stack.Screen
            name="(auth)/login"
            options={{
              presentation: "modal",
              headerTitle: "Login",
              headerRight: () => (
                <Pressable onPress={() => router.back()} hitSlop={10}>
                  <Text style={{ fontSize: 20, fontWeight: "700" }}>X</Text>
                </Pressable>
              )
            }}
          />
        </Stack>
      </AppThemeProvider>
    </QueryClientProvider>
  );
};

// Expo Router needs a default export for route files.
export default RootLayout;
