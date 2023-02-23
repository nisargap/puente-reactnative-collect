import * as Localization from "expo-localization";
import I18n from "i18n-js";

import english from "./english/en.json";
import haitian from "./kreyol/hk.json";
import spanish from "./spanish/es.json";

I18n.translations = {
  en: english,
  es: spanish,
  hk: haitian,
};

I18n.locale = Localization.locale;

I18n.fallbacks = true;

export default I18n;
