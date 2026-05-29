"use client";

import { Heart } from "lucide-react";
import { useTranslation } from "react-i18next";

import type { ScrollSectionId, SubscribeStatus } from "@/constants";
import { SCROLL_SECTION, SUBSCRIBE_STATUS } from "@/constants";
import { newsletterCtaLabel } from "@/helpers/newsletter-label";

import type { MouseEvent } from "react";

export interface FooterProps {
  email: string;
  subscribeStatus: SubscribeStatus;
  onEmailChange: (value: string) => void;
  onSubscribe: () => void;
  onLinkClick: (e: MouseEvent<HTMLAnchorElement>, targetId: ScrollSectionId) => void;
}

export function Footer({
  email,
  subscribeStatus,
  onEmailChange,
  onSubscribe,
  onLinkClick,
}: Readonly<FooterProps>): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <footer className="bg-muted pt-24 pb-12 px-6 text-muted-foreground">
      <div className="max-w-[1800px] mx-auto grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-4">
          <h4 className="text-2xl font-serif text-foreground mb-6">
            {t("homepage.footer.brandTitle")}
          </h4>
          <p className="max-w-xs font-light leading-relaxed text-sm">
            {t("homepage.footer.brandBody")}
          </p>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-medium text-foreground mb-6 tracking-wide text-xs uppercase">
            {t("homepage.footer.colStackTitle")}
          </h4>
          <ul className="space-y-4 font-light text-sm">
            <li>
              <a
                className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
                href={`#${SCROLL_SECTION.Products}`}
                onClick={(e) => onLinkClick(e, SCROLL_SECTION.Products)}
              >
                {t("homepage.footer.colStackLinks.coreModules")}
              </a>
            </li>
            <li>
              <a
                className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
                href={`#${SCROLL_SECTION.Products}`}
                onClick={(e) => onLinkClick(e, SCROLL_SECTION.Products)}
              >
                {t("homepage.footer.colStackLinks.stateUi")}
              </a>
            </li>
            <li>
              <a
                className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
                href={`#${SCROLL_SECTION.Products}`}
                onClick={(e) => onLinkClick(e, SCROLL_SECTION.Products)}
              >
                {t("homepage.footer.colStackLinks.encryption")}
              </a>
            </li>
            <li>
              <a
                className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
                href={`#${SCROLL_SECTION.Products}`}
                onClick={(e) => onLinkClick(e, SCROLL_SECTION.Products)}
              >
                {t("homepage.footer.colStackLinks.testing")}
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-2">
          <h4 className="font-medium text-foreground mb-6 tracking-wide text-xs uppercase">
            {t("homepage.footer.colCompanyTitle")}
          </h4>
          <ul className="space-y-4 font-light text-sm">
            <li>
              <a
                className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
                href={`#${SCROLL_SECTION.About}`}
                onClick={(e) => onLinkClick(e, SCROLL_SECTION.About)}
              >
                {t("homepage.footer.colCompanyLinks.philosophy")}
              </a>
            </li>
            <li>
              <a
                className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
                href={`#${SCROLL_SECTION.About}`}
                onClick={(e) => onLinkClick(e, SCROLL_SECTION.About)}
              >
                {t("homepage.footer.colCompanyLinks.sustainability")}
              </a>
            </li>
            <li>
              <a
                className="hover:text-foreground transition-colors underline-offset-4 hover:underline"
                href={`#${SCROLL_SECTION.Journal}`}
                onClick={(e) => onLinkClick(e, SCROLL_SECTION.Journal)}
              >
                {t("homepage.footer.colCompanyLinks.journal")}
              </a>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h4 className="font-medium text-foreground mb-6 tracking-wide text-xs uppercase">
            {t("homepage.footer.newsletterTitle")}
          </h4>
          <div className="flex flex-col gap-4">
            <input
              className="bg-transparent border-b border-muted-foreground/50 py-2 outline-none focus:border-foreground transition-colors placeholder-muted-foreground/50 text-foreground disabled:opacity-50 text-sm"
              placeholder={t("homepage.footer.newsletterPlaceholder")}
              type="email"
              value={email}
              disabled={
                subscribeStatus === SUBSCRIBE_STATUS.Loading ||
                subscribeStatus === SUBSCRIBE_STATUS.Success
              }
              onChange={(e) => onEmailChange(e.target.value)}
            />
            <button
              className="self-start text-xs font-semibold uppercase tracking-widest mt-2 hover:text-foreground disabled:cursor-default disabled:hover:text-muted-foreground disabled:opacity-50 transition-opacity"
              disabled={subscribeStatus !== SUBSCRIBE_STATUS.Idle || !email}
              type="button"
              onClick={onSubscribe}
            >
              {newsletterCtaLabel(subscribeStatus, t)}
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-[1800px] mx-auto mt-20 pt-8 border-t flex flex-col md:flex-row justify-between items-center text-[10px] uppercase tracking-widest opacity-60 gap-4">
        <p className="flex items-center gap-1">
          {t("homepage.footer.signatureMadePrefix")}{" "}
          <Heart className="h-3.5 w-3.5 text-red-500 fill-red-500 inline" />{" "}
          {t("homepage.footer.signatureMadeSuffix")}
        </p>
        <p>{t("homepage.footer.copyright")}</p>
      </div>
    </footer>
  );
}
