export type Language = 'en' | 'ta' | 'hi' | 'te';

export interface TranslationSet {
  title: string;
  tagline: string;
  inputPlaceholder: string;
  sendTooltip: string;
  selectLanguage: string;
  today: string;
  botWelcome: string;
  typingIndicator: string;
  historyTitle: string;
  newChatButton: string;
  historyMock: string[];
}

export const translations: Record<Language, TranslationSet> = {
  en: {
    title: 'CropAdvisor',
    tagline: 'Crop Specialist AI',
    inputPlaceholder: 'Ask CropAdvisor...',
    sendTooltip: 'Send message',
    selectLanguage: 'Language',
    today: 'Today',
    botWelcome: "Hello! I'm your Crop Specialist AI. How can I help you improve your farm's productivity today?",
    typingIndicator: 'CropAdvisor is thinking...',
    historyTitle: 'Recent Sessions',
    newChatButton: 'New Advice Session',
    historyMock: [
      '🌾 Wheat yellowing tips',
      '🍅 Tomato leaf curl treatment',
      '💧 Irrigation scheduling',
      '🐛 Neem oil organic pest control'
    ]
  },
  ta: {
    title: 'பயிர்ஆலோசகர்',
    tagline: 'பயிர் நிபுணர் AI',
    inputPlaceholder: 'பயிர்ஆலோசகரிடம் கேளுங்கள்...',
    sendTooltip: 'அனுப்புக',
    selectLanguage: 'மொழி',
    today: 'இன்று',
    botWelcome: 'வணக்கம்! நான் உங்கள் பயிர் நிபுணர் AI. இன்று உங்கள் பண்ணையின் உற்பத்தித்திறனை மேம்படுத்த நான் உங்களுக்கு எவ்வாறு உதவ முடியும்?',
    typingIndicator: 'CropAdvisor யோசிக்கிறது...',
    historyTitle: 'சமீபத்திய அமர்வுகள்',
    newChatButton: 'புதிய ஆலோசனை அமர்வு',
    historyMock: [
      '🌾 கோதுமை மஞ்சள் நிறமாதல்',
      '🍅 தக்காளி இலை சுருட்டல் நோய்',
      '💧 பாசன திட்டமிடல்',
      '🐛 வேப்ப எண்ணெய் பூச்சி கட்டுப்பாடு'
    ]
  },
  hi: {
    title: 'क्रॉपएडवाइजर',
    tagline: 'फसल विशेषज्ञ AI',
    inputPlaceholder: 'क्रॉपएडवाइजर से पूछें...',
    sendTooltip: 'संदेश भेजें',
    selectLanguage: 'भाषा',
    today: 'आज',
    botWelcome: 'नमस्ते! मैं आपका फसल विशेषज्ञ AI हूँ। आज आपकी कृषि उत्पादकता बढ़ाने में मैं आपकी क्या मदद कर सकता हूँ?',
    typingIndicator: 'क्रॉपएडवाइजर सोच रहा है...',
    historyTitle: 'हाल के सत्र',
    newChatButton: 'नया सलाह सत्र',
    historyMock: [
      '🌾 गेहूं का पीलापन उपाय',
      '🍅 टमाटर पत्ता मरोड़ रोग',
      '💧 सिंचाई का समय निर्धारण',
      '🐛 नीम का तेल कीट नियंत्रण'
    ]
  },
  te: {
    title: 'క్రాప్ అడ్వైజర్',
    tagline: 'పంట నిపుణుడు AI',
    inputPlaceholder: 'క్రాప్ అడ్వైజర్ ని అడగండి...',
    sendTooltip: 'సందేశం పంపు',
    selectLanguage: 'భాష',
    today: 'నేడు',
    botWelcome: 'నమస్కారం! నేను మీ పంట నిపుణుడు AI. ఈరోజు మీ పొలం ఉత్పాదకతను పెంచడంలో నేను మీకు ఎలా సహాయపడగలను?',
    typingIndicator: 'క్రాప్ అడ్వైజర్ ఆలోచిస్తున్నారు...',
    historyTitle: 'ఇటీవలి సెషన్లు',
    newChatButton: 'కొత్త సలహా సెషన్',
    historyMock: [
      '🌾 గోధుమ పసుపు ఆకుల నివారణ',
      '🍅 టొమాటో ఆకు ముడుత తెగులు',
      '💧 నీటి పారుదల ప్రణాళిక',
      '🐛 వేప నూనె తెగుళ్ల నివారణ'
    ]
  }
};
