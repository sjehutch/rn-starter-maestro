import { useMutation } from "@tanstack/react-query";
import { logger } from "@shared/logger/logger";
import { useAuthStore } from "@shared/state/authStore";

export type LoginInput = {
  userName: string;
  password: string;
};

type LoginResponse = {
  token: string;
};

const fakeLoginApi = async (loginInput: LoginInput): Promise<LoginResponse> => {
  // Pretend we call a server by waiting a tiny bit.
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (loginInput.userName.trim().length === 0) {
    throw new Error("Username is required");
  }

  return { token: "fake-token-123" };
};

export const useLogin = () => {
  const login = useAuthStore((authState) => authState.login);

  return useMutation({
    // This wraps the async login into a nice \"loading/error\" state.
    mutationFn: fakeLoginApi,
    onSuccess: (loginResponse, loginInput) => {
      // On success we save the user and token in our store.
      login(loginInput.userName, loginResponse.token);
      logger.info("Login success", { userName: loginInput.userName });
    }
  });
};
