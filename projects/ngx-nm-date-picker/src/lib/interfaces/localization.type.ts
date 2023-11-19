export type NmLocalizationLanguageTypes = "en" | "ru" | "am" | string;

export type NmLocalizationType = {
  [key in NmLocalizationLanguageTypes]: {
    WEEKDAY_NAMES_SHORT: string[];
    MONTH_NAMES_SHORT: string[];
    MONTH_NAMES: string[];
  };
};
