import { REGEX } from "@/regex";

export function isValidEmail(value: string): boolean {
  return REGEX.EMAIL.test(value);
}
