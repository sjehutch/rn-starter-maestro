import { create } from "zustand";

export type AuthUser = {
  userName: string;
};

export type AuthState = {
  user: AuthUser | null;
  token: string | null;
  login: (userName: string, token: string) => void;
  logout: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  // This is our simple memory for \"who is logged in\".
  user: null,
  token: null,
  login: (userName, token) => {
    // When we log in, we save the user and token together.
    set({ user: { userName }, token });
  },
  logout: () => {
    // Logging out just clears our memory of the user.
    set({ user: null, token: null });
  }
}));
