export type NmLanguageType = "en" | "ru" | "am" | string;

const supportedLanguages = ["en", "ru", "am"];
export type NmSupportedLanguagesType = (typeof supportedLanguages)[number];
export const isLanguageSupported = (language: string): language is NmSupportedLanguagesType =>
  supportedLanguages.includes(language);
