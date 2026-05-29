import "@testing-library/jest-dom";
import { vi } from "vitest";

// Mock Next.js navigation hooks
vi.mock("next/navigation", () => {
  return {
    useRouter() {
      return {
        push: vi.fn(),
        replace: vi.fn(),
        prefetch: vi.fn(),
        back: vi.fn(),
        forward: vi.fn(),
        refresh: vi.fn(),
      };
    },
    usePathname() {
      return "/";
    },
    useSearchParams() {
      return new URLSearchParams();
    },
  };
});

// Mock react-i18next with static keys for tests
vi.mock("react-i18next", () => {
  const mockTranslations: Record<string, string> = {
    "login.title": "Sign in",
    "login.subTitle": "Boilerplate auth. Wire to your API.",
    "login.emailLabel": "Email",
    "login.passwordLabel": "Password",
    "login.emailPlaceholder": "you@example.com",
    "login.passwordPlaceholder": "••••••••",
    "login.error.emailRequired": "Email is required",
    "login.error.emailInvalid": "Invalid email",
    "login.error.passwordRequired": "Password is required",
    "button.signIn": "Sign in",
    "button.forgotPassword": "Forgot password?",
    "button.backToHome": "Back to home",
  };

  return {
    useTranslation() {
      return {
        t: (key: string) => mockTranslations[key] || key,
        i18n: {
          changeLanguage: () => Promise.resolve(),
          language: "en",
        },
      };
    },
    initReactI18next: {
      type: "3rdParty",
      init: () => {},
    },
  };
});
