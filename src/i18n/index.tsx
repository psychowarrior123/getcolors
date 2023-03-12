import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import formatDate from "date-fns/format";
import formatRelative from "date-fns/formatRelative";
import formatDistance from "date-fns/formatRelative";
import isDate from "date-fns/isDate";
import { ru } from "date-fns/locale"; // import all locales we need
import { setDefaultOptions } from "date-fns";
import commonRU from "./locales/ru/common.json";

const locales = { ru }; // used to look up the required locale

setDefaultOptions({ locale: ru });

export default i18n.use(initReactI18next).init({
  resources: {
    ru: {
      common: commonRU,
    },
  },
  lng: "ru", // if you're using a language detector, do not define the lng option
  fallbackLng: "ru",
  interpolation: {
    escapeValue: false, // react already safes from xss => https://www.i18next.com/translation-function/interpolation#unescape,
    format: (value, format, lng) => {
      if (isDate(value) && lng && format) {
        // @ts-ignore
        const locale = locales[lng as string];

        if (format === "relative")
          return formatRelative(value, new Date(), { locale });
        if (format === "ago")
          return formatDistance(value, new Date(), {
            locale,
          });
        return formatDate(value, format, { locale });
      }

      return value;
    },
  },
});
