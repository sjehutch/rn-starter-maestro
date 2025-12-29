import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "expo-router";
import { Controller, useForm } from "react-hook-form";
import { StyleSheet, Text, View } from "react-native";
import { z } from "zod";
import { Button } from "@components/Button";
import { TextField } from "@components/TextField";
import { useLogin } from "@features/auth/hooks/useLogin";
import { logger } from "@shared/logger/logger";
import { useAppTheme } from "@shared/theme/useAppTheme";

const loginSchema = z.object({
  userName: z.string().min(1, "Username is required"),
  password: z.string().min(1, "Password is required")
});

type LoginForm = z.infer<typeof loginSchema>;

export const LoginScreen = () => {
  const theme = useAppTheme();
  const router = useRouter();
  const { mutateAsync, isPending, error } = useLogin();

  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: { userName: "", password: "" }
  });

  const onSubmit = handleSubmit(async (credentials) => {
    // We always wrap async calls in try/catch so errors are predictable.
    try {
      // This calls the fake API and updates the auth store on success.
      await mutateAsync(credentials);
      router.replace("/");
    } catch (submitError) {
      logger.error("Login failed", { error: submitError });
    }
  });

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <Text style={[styles.title, { color: theme.colors.text }]}>Login</Text>

      <Controller
        control={control}
        name="userName"
        render={({ field: { onChange, value: fieldValue }, fieldState }) => (
          <TextField
            label="Username"
            value={fieldValue}
            onChangeText={onChange}
            autoCapitalize="none"
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, value: fieldValue }, fieldState }) => (
          <TextField
            label="Password"
            value={fieldValue}
            onChangeText={onChange}
            secureTextEntry
            errorMessage={fieldState.error?.message}
          />
        )}
      />

      {error ? (
        <Text style={styles.errorText}>Login failed. Try again.</Text>
      ) : null}

      <Button title="Sign In" onPress={onSubmit} loading={isPending} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: "center"
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    marginBottom: 16
  },
  errorText: {
    color: "#DC2626",
    marginBottom: 12
  }
});

// Expo Router needs a default export for route files.
export default LoginScreen;
