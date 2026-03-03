import { toast } from "@/lib/toast";
import type { AxiosError } from "axios";

export interface FieldError {
  type: string;
  value?: string;
  msg: string;
  path: string;
  location?: string;
}

export interface ServerError {
  errors: FieldError[];
}

interface FieldMappings {
  topLevel?: Record<string, string>;
  childLevel?: Record<string, Record<string, string>>;
}

export interface ParsedServerError {
  message?: string;
  errors?: FieldError[];
}

export function applyServerErrorsToRHForm(
  errors: FieldError[],
  handleServerMessage: (name: string, message: string) => void,
  keyMapper?: (serverKey: string) => string,
): void {
  errors.forEach((err) => {
    if (err.type === "field") {
      const fieldName = keyMapper ? keyMapper(err.path) : err.path;
      handleServerMessage(fieldName, err.msg);
    }
  });
}

export function handleServerError(
  error: unknown,
  suppressToastIfFieldErrors = false,
  fullSuppress = false,
): ParsedServerError {
  const axiosError = error as AxiosError;
  const responseData = axiosError?.response?.data as {
    message?: string;
    errors?: unknown;
  };

  let message: string | undefined;
  let errors: FieldError[] | undefined;
  let isObjectError = false;

  if (responseData) {
    const rawErrors = responseData.errors;
    const parsed = parseResponseErrors(responseData, rawErrors);
    message = parsed.message;
    errors = parsed.errors;
    isObjectError = parsed.isObjectError;
  }

  if (!message && error instanceof Error) {
    message = error.message;
  }

  if (
    !fullSuppress &&
    message &&
    shouldShowToast(isObjectError, errors, suppressToastIfFieldErrors)
  ) {
    toast.error(message);
  }

  return { message, errors };
}

function parseResponseErrors(
  responseData: { message?: string; errors?: unknown },
  rawErrors: unknown,
): { message?: string; errors?: FieldError[]; isObjectError: boolean } {
  if (Array.isArray(rawErrors)) {
    return handleArrayErrors(responseData, rawErrors);
  }

  if (isNonNullObject(rawErrors)) {
    return handleObjectErrors(responseData, rawErrors);
  }

  return {
    message: responseData.message,
    errors: undefined,
    isObjectError: false,
  };
}

function handleArrayErrors(
  responseData: { message?: string },
  rawErrors: unknown[],
): { message?: string; errors?: FieldError[]; isObjectError: boolean } {
  const errors: FieldError[] = rawErrors
    .map((e) => (isFieldError(e) ? e : undefined))
    .filter((e): e is FieldError => !!e && !!e.path && e.path !== "undefined");

  return {
    message: responseData.message,
    errors,
    isObjectError: false,
  };
}

function handleObjectErrors(
  responseData: { message?: string },
  rawErrors: object,
): { message?: string; errors?: FieldError[]; isObjectError: boolean } {
  const objectMessage = (rawErrors as any).msg ?? (rawErrors as any).message;
  const message = objectMessage ?? responseData.message;
  const errors =
    Object.keys(rawErrors).length > 0 ? [rawErrors as FieldError] : undefined;

  return { message, errors, isObjectError: true };
}

function shouldShowToast(
  isObjectError: boolean,
  errors: FieldError[] | undefined,
  suppressToastIfFieldErrors: boolean,
): boolean {
  const hasErrorsArray = Array.isArray(errors);
  if (isObjectError) return true;
  if (!hasErrorsArray) return true;
  return (errors?.length ?? 0) === 0 || !suppressToastIfFieldErrors;
}

function isNonNullObject(value: unknown): value is object {
  return typeof value === "object" && value !== null;
}

function isFieldError(value: unknown): value is FieldError {
  return (
    typeof value === "object" &&
    value !== null &&
    "path" in value &&
    "msg" in value &&
    "type" in value
  );
}

export function mapServerKeyToFormKey(
  serverKey: string,
  mappings: FieldMappings,
  arrayFieldRegex: RegExp,
): string {
  const { topLevel = {}, childLevel = {} } = mappings;

  if (topLevel[serverKey]) return topLevel[serverKey];

  const [parent, child] = serverKey.split(".");
  if (parent && child && childLevel[parent]?.[child]) {
    const mappedParent = topLevel[parent] ?? parent;
    const mappedChild = childLevel[parent][child];
    return `${mappedParent}.${mappedChild}`;
  }

  const arrayMatch = arrayFieldRegex.exec(serverKey);
  if (arrayMatch) {
    const [, parentArr, index, childArr] = arrayMatch;
    const mappedParent = topLevel[parentArr] ?? parentArr;
    const mappedChild = childLevel[parentArr]?.[childArr] ?? childArr;
    return `${mappedParent}.${index}.${mappedChild}`;
  }

  return serverKey;
}
