import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

import frCommon from "./locales/fr/common.json";
import frNav from "./locales/fr/nav.json";
import frLanding from "./locales/fr/landing.json";
import frFooter from "./locales/fr/footer.json";
import frAuth from "./locales/fr/auth.json";
import frDashboard from "./locales/fr/dashboard.json";
import frOnboarding from "./locales/fr/onboarding.json";
import frPages from "./locales/fr/pages.json";

import enCommon from "./locales/en/common.json";
import enNav from "./locales/en/nav.json";
import enLanding from "./locales/en/landing.json";
import enFooter from "./locales/en/footer.json";
import enAuth from "./locales/en/auth.json";
import enDashboard from "./locales/en/dashboard.json";
import enOnboarding from "./locales/en/onboarding.json";
import enPages from "./locales/en/pages.json";

export const resources = {
  fr: {
    common: frCommon,
    nav: frNav,
    landing: frLanding,
    footer: frFooter,
    auth: frAuth,
    dashboard: frDashboard,
    onboarding: frOnboarding,
    pages: frPages,
  },
  en: {
    common: enCommon,
    nav: enNav,
    landing: enLanding,
    footer: enFooter,
    auth: enAuth,
    dashboard: enDashboard,
    onboarding: enOnboarding,
    pages: enPages,
  },
} as const;

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: "fr",
    supportedLngs: ["fr", "en"],
    ns: ["common", "nav", "landing", "footer", "auth", "dashboard", "onboarding", "pages"],
    defaultNS: "common",
    interpolation: { escapeValue: false },
    detection: {
      order: ["localStorage", "navigator"],
      lookupLocalStorage: "quercus_lang",
      caches: ["localStorage"],
    },
  });

export default i18n;
