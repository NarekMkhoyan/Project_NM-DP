import { NmLanguageType } from "../interfaces/language.type";
import { NmLocalizationType } from "../interfaces/localization.type";

export const NM_LOCALIZATION: NmLocalizationType = {
  en: {
    WEEKDAY_NAMES_SHORT: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
    MONTH_NAMES_SHORT: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    MONTH_NAMES: [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ],
  },
  ru: {
    WEEKDAY_NAMES_SHORT: ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"],
    MONTH_NAMES_SHORT: ["Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"],
    MONTH_NAMES: [
      "Января",
      "Февраля",
      "Марта",
      "Апреля",
      "Мая",
      "Июня",
      "Июля",
      "Августа",
      "Сентября",
      "ОктябрЯ",
      "Ноября",
      "Декабря",
    ],
  },
  am: {
    WEEKDAY_NAMES_SHORT: ["Կիր", "Երկ", "Երք", "Չոր", "Հնգ", "Ուր", "Շաբ"],
    MONTH_NAMES_SHORT: ["Հնվ", "Փետ", "Մրտ", "Ապր", "Մայ", "Հնս", "Հուլ", "Օգոս", "Սեպ", "Հոկ", "Նոյ", "Դեկ"],
    MONTH_NAMES: [
      "Հունվարի",
      "Փետրվարի",
      "Մարտի",
      "Ապրիլի",
      "Մայիսի",
      "Հունիսի",
      "Հուլիսի",
      "Օգոստոսի",
      "Սեպտեմբերի",
      "Հոկտեմբերի",
      "Նոյեմբերի",
      "Դեկտեմբերի",
    ],
  },
};

export const NM_SELECTOR_LABEL_LOCALIZATION: { [key in NmLanguageType]: string } = {
  en: "Date",
  ru: "Дата",
  am: "Ամսաթիվ",
};

export const NM_FALLBACK_LANGUAGE = "en";
