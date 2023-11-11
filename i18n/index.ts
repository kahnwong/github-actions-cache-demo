import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import translationTH from 'public/locales/th/translation'
import translationEN from 'public/locales/en/translation'
import translationCN from 'public/locales/cn/translation'

export const defaultNS = 'translationTH'
const resources = {
  en: {
    translation: translationEN
  },
  th: {
    translation: translationTH
  },
  cn: {
    translation: translationCN
  }
}
i18n.use(LanguageDetector)
i18n.use(Backend)
i18n.use(initReactI18next).init({
  lng: 'th',
  resources,
  debug: false,
  defaultNS: 'translation',
  interpolation: {
    escapeValue: false
  }
})

export default i18n
