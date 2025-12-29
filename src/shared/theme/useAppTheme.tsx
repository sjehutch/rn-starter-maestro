import type React from "react";
import { createContext, useContext } from "react";
import { useColorScheme } from "react-native";

export type AppTheme = {
  colors: {
    background: string;
    text: string;
    primary: string;
    border: string;
    card: string;
  };
};

const lightTheme: AppTheme = {
  colors: {
    background: "#FFFFFF",
    text: "#111111",
    primary: "#1E40AF",
    border: "#E5E7EB",
    card: "#F9FAFB"
  }
};

const darkTheme: AppTheme = {
  colors: {
    background: "#0B0F1A",
    text: "#F3F4F6",
    primary: "#60A5FA",
    border: "#1F2937",
    card: "#111827"
  }
};

const ThemeContext = createContext<AppTheme>(lightTheme);

export const AppThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // We read the phone color choice and pick matching colors.
  const colorScheme = useColorScheme();
  const theme = colorScheme === "dark" ? darkTheme : lightTheme;

  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
};

export const useAppTheme = () => {
  // This lets any screen ask: "What colors should I use right now?"
  return useContext(ThemeContext);
};
