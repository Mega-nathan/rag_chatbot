import { useState, useRef, useEffect } from 'react';
import { translations } from './constants/translations';
import type { Language } from './constants/translations';
import { LeafIcon, GlobeIcon, ChevronDownIcon, ImageIcon, MicIcon, SendIcon } from './components/Icons';
import { BotAvatar, UserAvatar } from './components/Avatar';
import { getFormattedTime, formatApiResponse } from './utils/helpers';
import './App.css';

interface Message {
  id: string;
  sender: 'bot' | 'user';
  text: string;
  timestamp: string;
}

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  // Custom toast notifications for static actions
  const [toastText, setToastText] = useState('');
  const [isToastActive, setIsToastActive] = useState(false);

  // Initialize messages list with welcome greeting
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'bot',
      text: translations.en.botWelcome,
      timestamp: '9:41 AM', // matches mockup initial welcome timestamp
    }
  ]);

  const chatContainerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Sync initial welcome message translation if it's the only message in log
  useEffect(() => {
    if (messages.length === 1 && messages[0].id === 'welcome') {
      setMessages([
        {
          id: 'welcome',
          sender: 'bot',
          text: translations[language].botWelcome,
          timestamp: '9:41 AM',
        }
      ]);
    }
  }, [language]);

  // Scroll to bottom whenever messages list changes or typing starts
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Handle click-away for language dropdown
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const triggerToast = (text: string) => {
    setToastText(text);
    setIsToastActive(true);
    setTimeout(() => {
      setIsToastActive(false);
    }, 2500);
  };

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim()) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: getFormattedTime(),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');
    setIsTyping(true);

    try {
      // Append language instruction dynamically to assist the backend LLM
      let queryToSend = textToSend;
      if (language === 'ta') {
        queryToSend = `${textToSend} (Please reply in Tamil / தமிழில் பதிலளிக்கவும்)`;
      } else if (language === 'hi') {
        queryToSend = `${textToSend} (Please reply in Hindi / हिंदी में उत्तर दें)`;
      } else if (language === 'te') {
        queryToSend = `${textToSend} (Please reply in Telugu / తెలుగులో సమాధానం ఇవ్వండి)`;
      }

      const response = await fetch('http://127.0.0.1:8000/api/query', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: queryToSend,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned status code ${response.status}`);
      }

      const data = await response.json();
      const responseText = data.response || '';
      const formattedResponse = formatApiResponse(responseText);

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: formattedResponse,
        timestamp: getFormattedTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error('API Error:', error);
      
      const errorText = 
        language === 'ta' ? 'பயிர்ஆலோசகர் சேவையுடன் இணைக்க முடியவில்லை. பின்தள சேவையைச் சரிபார்க்கவும்.' :
        language === 'hi' ? 'क्रॉपएडवाइजर सेवा से जुड़ने में विफल। कृपया अपने बैकएंड कनेक्शन की जांच करें।' :
        language === 'te' ? 'క్రాప్ అడ్వైజర్ సేవకు కనెక్ట్ చేయడం విఫలమైంది. దయచేసి మీ బ్యాకెండ్ కనెక్షన్‌ని తనిఖీ చేయండి।' :
        'Failed to connect to CropAdvisor service. Please check your backend connection.';

      const botMsg: Message = {
        id: `bot-error-${Date.now()}`,
        sender: 'bot',
        text: `<p style="color: #dc2626; font-weight: 500;">⚠️ ${errorText}</p>`,
        timestamp: getFormattedTime(),
      };
      setMessages((prev) => [...prev, botMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const selectLanguage = (lang: Language) => {
    setLanguage(lang);
    setIsDropdownOpen(false);
  };

  const languageLabels: Record<Language, string> = {
    en: 'English',
    ta: 'தமிழ்',
    hi: 'हिन्दी',
    te: 'తెలుగు'
  };

  return (
    <div className="app-container">
      {/* Main UI Panel */}
      <main className="main-content">
        {/* Navigation Header */}
        <header className="header">
          <div className="logo-section">
            <LeafIcon />
            <span className="logo-text">{translations[language].title}</span>
          </div>

          <div className="header-actions">
            {/* Custom Dropdown */}
            <div className="lang-selector-container" ref={dropdownRef}>
              <button 
                className="lang-dropdown-btn" 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-haspopup="true"
                aria-expanded={isDropdownOpen}
              >
                <GlobeIcon />
                <span>{languageLabels[language]}</span>
                <ChevronDownIcon />
              </button>

              {isDropdownOpen && (
                <ul className="lang-dropdown-menu" role="menu">
                  {(Object.keys(languageLabels) as Language[]).map((lang) => (
                    <li 
                      key={lang}
                      role="menuitem"
                      className={`lang-dropdown-item ${language === lang ? 'active' : ''}`}
                      onClick={() => selectLanguage(lang)}
                    >
                      {languageLabels[lang]}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </header>

        {/* Message Feed */}
        <div className="chat-container" ref={chatContainerRef}>
          <div className="date-separator">{translations[language].today}</div>

          {messages.map((msg) => (
            <div key={msg.id} className={`message-wrapper ${msg.sender}`}>
              {msg.sender === 'bot' ? <BotAvatar /> : <UserAvatar />}
              <div className="message-bubble-container">
                <div 
                  className="message-bubble"
                  dangerouslySetInnerHTML={{ __html: msg.text }}
                />
                <span className="message-timestamp">{msg.timestamp}</span>
              </div>
            </div>
          ))}

          {/* Typing Indicator Bubble */}
          {isTyping && (
            <div className="message-wrapper bot">
              <BotAvatar />
              <div className="message-bubble-container">
                <div className="typing-bubble">
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                  <div className="typing-dot" />
                </div>
                <span className="message-timestamp">
                  {translations[language].typingIndicator}
                </span>
              </div>
            </div>
          )}
        </div>

        {/* Footer Input Bar */}
        <footer className="footer-panel">
          <div className="input-bar-container">
            {/* Attachment Button */}
            <button 
              className="input-action-btn"
              onClick={() => triggerToast(language === 'en' ? 'Image upload is disabled' : 
                                         language === 'ta' ? 'படம் பதிவேற்றம் முடக்கப்பட்டுள்ளது' :
                                         language === 'hi' ? 'छवि अपलोड अक्षम है' :
                                         'చిత్రం అప్‌లోడ్ నిలిపివేయబడింది')}
              aria-label="Upload Image"
            >
              <ImageIcon />
              <span className="action-tooltip">
                {language === 'en' ? 'Attach Image' : 
                 language === 'ta' ? 'படம் சேர்க்க' : 
                 language === 'hi' ? 'छवि संलग्न करें' : 
                 'చిత్రాన్ని జోడించు'}
              </span>
            </button>

            {/* Main Text Input */}
            <input 
              type="text"
              className="chat-input-field"
              placeholder={translations[language].inputPlaceholder}
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleSend(inputText);
              }}
            />

            {/* Voice typing Button */}
            <button 
              className="input-action-btn"
              onClick={() => triggerToast(language === 'en' ? 'Voice typing is disabled' : 
                                         language === 'ta' ? 'குரல் தட்டச்சு முடக்கப்பட்டுள்ளது' :
                                         language === 'hi' ? 'ध्वनि टाइपिंग अक्षम है' :
                                         'వాయిస్ టైపింగ్ నిలిపివేయబడింది')}
              aria-label="Voice Input"
            >
              <MicIcon />
              <span className="action-tooltip">
                {language === 'en' ? 'Voice Search' : 
                 language === 'ta' ? 'குரல் தேடல்' : 
                 language === 'hi' ? 'ध्वनि खोज' : 
                 'వాయిస్ సెర్చ్'}
              </span>
            </button>

            {/* Circular Send Button */}
            <button 
              className="send-btn"
              onClick={() => handleSend(inputText)}
              aria-label="Send Message"
            >
              <SendIcon />
            </button>
          </div>
        </footer>

        {/* Custom Premium Toast Message popup */}
        <div className={`custom-toast ${isToastActive ? 'show' : ''}`}>
          {toastText}
        </div>
      </main>
    </div>
  );
}
