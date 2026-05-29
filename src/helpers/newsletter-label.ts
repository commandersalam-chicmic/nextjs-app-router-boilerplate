import type { SubscribeStatus } from "@/constants";
import { SUBSCRIBE_STATUS } from "@/constants";

import type { TFunction } from "i18next";

export function newsletterCtaLabel(status: SubscribeStatus, t: TFunction): string {
  if (status === SUBSCRIBE_STATUS.Idle) return t("homepage.footer.newsletterSubscribe");
  if (status === SUBSCRIBE_STATUS.Loading) return t("homepage.footer.newsletterSubscribing");
  return t("homepage.footer.newsletterSubscribed");
}
