export const enum StorageTypes {
  LOCAL = "localStorage",
  COOKIES = "cookies",
  SESSION = "session",
}

export type TLocalStorage = StorageTypes.LOCAL | StorageTypes.COOKIES | StorageTypes.SESSION;

const LocalStorage = (function LocalStorage() {
  const isClient = globalThis.window !== undefined;

  const setStorageData = (values: string, type: TLocalStorage, key: string): void => {
    if (!isClient) return;
    if (type === StorageTypes.LOCAL) {
      localStorage.setItem(key, values);
    } else if (type === StorageTypes.COOKIES) {
      setCookie(key, values);
    } else {
      sessionStorage.setItem(key, values);
    }
  };

  const getStorageData = (type: TLocalStorage, key: string): string | null => {
    if (!isClient) return null;
    if (type === StorageTypes.LOCAL) {
      return localStorage.getItem(key);
    } else if (type === StorageTypes.COOKIES) {
      return getCookie(key);
    }
    return sessionStorage.getItem(key);
  };

  const remove = (type: TLocalStorage, key: string): void => {
    if (!isClient) return;
    if (type === StorageTypes.LOCAL) {
      localStorage.removeItem(key);
    } else if (type === StorageTypes.COOKIES) {
      clearCookie(key);
    } else {
      sessionStorage.removeItem(key);
    }
  };

  return {
    setStorageData,
    getStorageData,
    remove,
  };
})();

export default LocalStorage;

function setCookie(name: string, value: string, domain?: string, daysToExpire = 50000): void {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + daysToExpire);
  let cookieString = `${name}=${encodeURIComponent(value)}; expires=${expirationDate.toUTCString()}; path=/`;
  if (domain) {
    cookieString += `; domain=${domain}`;
  }
  document.cookie = cookieString;
}

function getCookie(name: string): string | null {
  const cookies = document.cookie.split(";");
  for (const element of cookies) {
    const cookie = element.trim();
    if (cookie.startsWith(`${name}=`)) {
      return decodeURIComponent(cookie.substring(name.length + 1));
    }
  }
  return null;
}

function clearCookie(name: string, domain?: string): void {
  if (typeof document === "undefined") return;

  let cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  if (domain) {
    cookie += ` domain=${domain};`;
  }

  document.cookie = cookie;
}
