import type { TextInputProps } from "react-native";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { useAppTheme } from "@shared/theme/useAppTheme";

type TextFieldProps = TextInputProps & {
  label: string;
  errorMessage?: string | undefined;
};

export const TextField = ({ label, errorMessage, ...props }: TextFieldProps) => {
  const theme = useAppTheme();

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.colors.text }]}>{label}</Text>
      <TextInput
        {...props}
        style={[
          styles.input,
          { color: theme.colors.text, borderColor: theme.colors.border }
        ]}
        placeholderTextColor="#9CA3AF"
      />
      {errorMessage ? (
        // We show a tiny red hint if the field is not valid.
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12
  },
  label: {
    marginBottom: 6,
    fontSize: 14,
    fontWeight: "600"
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10
  },
  errorText: {
    marginTop: 4,
    color: "#DC2626",
    fontSize: 12
  }
});
