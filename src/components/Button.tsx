import { useAppTheme } from "@shared/theme/useAppTheme";
import type { GestureResponderEvent } from "react-native";
import { ActivityIndicator, Pressable, StyleSheet, Text } from "react-native";

type ButtonProps = {
  title: string;
  onPress: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  loading?: boolean;

  // Like you're 10:
  // - testID is the "name tag" for test robots (Maestro)
  testID?: string;

  // Optional: if you ever want a different spoken label than the title
  accessibilityLabel?: string;
};

export const Button = ({
  title,
  onPress,
  disabled,
  loading,
  testID,
  accessibilityLabel,
}: ButtonProps) => {
  const theme = useAppTheme();
  const isDisabled = Boolean(disabled) || Boolean(loading);

  return (
    <Pressable
      testID={testID}
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole="button"
      // ✅ IMPORTANT:
      // Maestro / VoiceOver can "see" the button as "Show Alert" now
      accessibilityLabel={accessibilityLabel ?? title}
      // ✅ Helps tools + screen readers know it's disabled
      accessibilityState={{ disabled: isDisabled }}
      style={[
        styles.button,
        { backgroundColor: theme.colors.primary },
        isDisabled && styles.buttonDisabled,
      ]}
    >
      {loading ? (
        <ActivityIndicator color="#FFFFFF" />
      ) : (
        <Text style={styles.buttonText}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});
