import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import type { LoginPayload } from "@/services";
import { useAuthStore } from "@/store/auth-store";

import { LoginForm } from "./login-form";

vi.mock("@/store/auth-store", () => ({
  useAuthStore: vi.fn(),
}));

type AuthSlice = {
  user: null;
  loading: boolean;
  error: null;
  fetchUser: () => Promise<void>;
  login: (payload: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: unknown) => void;
  clearUser: () => void;
  setLoading: (loading: boolean) => void;
};

describe("LoginForm component", () => {
  const mockLogin = vi.fn(async (_payload: LoginPayload) => {
    /* noop */
  });

  beforeEach(() => {
    const state: AuthSlice = {
      user: null,
      loading: false,
      error: null,
      fetchUser: vi.fn(),
      login: mockLogin,
      logout: vi.fn(),
      setUser: vi.fn(),
      clearUser: vi.fn(),
      setLoading: vi.fn(),
    };
    vi.mocked(useAuthStore).mockImplementation((selector) => selector(state));
  });

  it("renders email and password inputs and buttons", () => {
    render(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/^password$/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /sign in/i })).toBeInTheDocument();
  });

  it("shows validation errors on empty submission", async () => {
    render(<LoginForm />);

    const submitBtn = screen.getByRole("button", { name: /sign in/i });
    fireEvent.click(submitBtn);

    expect(await screen.findByText(/email is required/i)).toBeInTheDocument();
    expect(await screen.findByText(/password is required/i)).toBeInTheDocument();
    expect(mockLogin).not.toHaveBeenCalled();
  });

  it("toggles password visibility", () => {
    render(<LoginForm />);

    const passwordInput = screen.getByLabelText(/^password$/i);
    expect(passwordInput).toHaveAttribute("type", "password");

    fireEvent.click(screen.getByRole("button", { name: /login.showPassword/i }));
    expect(passwordInput).toHaveAttribute("type", "text");

    fireEvent.click(screen.getByRole("button", { name: /login.hidePassword/i }));
    expect(passwordInput).toHaveAttribute("type", "password");
  });

  it("calls login store action on valid submission", async () => {
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/email/i);
    const passwordInput = screen.getByLabelText(/^password$/i);
    const submitBtn = screen.getByRole("button", { name: /sign in/i });

    fireEvent.change(emailInput, { target: { value: "test@example.com" } });
    fireEvent.change(passwordInput, { target: { value: "N7$vQ2!mX9@Lp4#Zd8" } });
    fireEvent.click(submitBtn);

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "N7$vQ2!mX9@Lp4#Zd8",
      });
    });
  });
});
