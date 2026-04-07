"use client"

import { createContext, useContext, useState, useEffect, ReactNode } from 'react'

export type Language = 'en' | 'te' | 'hi'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations: Record<Language, Record<string, string>> = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.analyze': 'Analyze',
    'nav.explore': 'Explore',
    'nav.cases': 'Case Studies',
    'nav.quiz': 'Quiz',
    'nav.games': 'Games',
    
    // Hero
    'hero.title': 'Know Your Rights.',
    'hero.subtitle': 'Act With Confidence.',
    'hero.description': 'AI-powered constitutional assistant for everyday real-life decisions',
    'hero.cta.analyze': 'Analyze My Situation',
    'hero.cta.explore': 'Explore Articles',
    
    // Features
    'features.intake.title': 'AI Legal Intake',
    'features.intake.description': 'Describe your situation. We\'ll ask the right questions.',
    'features.engine.title': 'Rule Engine',
    'features.engine.description': 'Deterministic verdict. Not AI guessing.',
    'features.explorer.title': 'Constitution Explorer',
    'features.explorer.description': 'Browse all articles, simplified.',
    'features.pathfinder.title': 'Action Pathfinder',
    'features.pathfinder.description': 'Know exactly what to do next.',
    
    // How It Works
    'how.title': 'How It Works',
    'how.step1.title': 'Describe',
    'how.step1.description': 'Tell us your situation using text or voice',
    'how.step2.title': 'Clarify',
    'how.step2.description': 'AI asks targeted follow-up questions',
    'how.step3.title': 'Analyze',
    'how.step3.description': 'Rule engine evaluates conditions',
    'how.step4.title': 'Act',
    'how.step4.description': 'Receive verdict and action plan',
    
    // Domains
    'domains.title': 'Explore by Domain',
    'domains.police': 'Police & Arrest',
    'domains.workplace': 'Workplace Rights',
    'domains.speech': 'Free Speech',
    'domains.equality': 'Equality',
    'domains.protest': 'Protest Rights',
    'domains.govt': 'Govt Services',
    
    // Analyze Page
    'analyze.title': 'Analyze Your Situation',
    'analyze.placeholder': 'Describe what happened...',
    'analyze.context.domain': 'Detected Domain',
    'analyze.context.keywords': 'Keywords',
    'analyze.context.progress': 'Progress',
    'analyze.context.article': 'Evaluating Article',
    'analyze.quickstart': 'Or choose a scenario to get started',
    'analyze.quick.arrest': 'I was arrested unfairly',
    'analyze.quick.speech': 'My speech was censored',
    'analyze.quick.workplace': 'I faced workplace discrimination',
    'analyze.quick.govt': 'I was denied a government service',
    'analyze.quick.protest': 'My protest was stopped',
    
    // Results
    'result.verdict': 'Verdict',
    'result.valid': 'VALID',
    'result.violation': 'VIOLATION',
    'result.depends': 'DEPENDS',
    'result.article': 'Relevant Article',
    'result.severity': 'Severity',
    'result.severity.minor': 'Minor',
    'result.severity.serious': 'Serious',
    'result.severity.fundamental': 'Fundamental Breach',
    'result.reasoning': 'Step-by-Step Reasoning',
    'result.simplify': 'Explain Simply',
    'result.action': 'What should you do next?',
    'result.related': 'Related Articles',
    'result.share': 'Share',
    'result.save': 'Save',
    
    // Explore Page
    'explore.title': 'Constitution Explorer',
    'explore.search': 'Search articles, rights, or topics...',
    'explore.filter.all': 'All',
    'explore.filter.part1': 'Part I',
    'explore.filter.part3': 'Part III',
    'explore.filter.part4': 'Part IV',
    'explore.filter.amendments': 'Amendments',
    'explore.readmore': 'Read More',
    'explore.simple': 'Simple Explanation',
    'explore.example': 'Real-life Example',
    'explore.analyze': 'Analyze under this article',
    
    // Case Studies
    'cases.title': 'Case Studies',
    'cases.view': 'View Full Case',
    'cases.situation': 'Situation',
    'cases.articles': 'Articles Applied',
    'cases.takeaway': 'Key Takeaway',
    'cases.similar': 'Analyze a similar situation',
    
    // Quiz
    'quiz.title': 'Test Your Knowledge',
    'quiz.category': 'Select Category',
    'quiz.difficulty': 'Difficulty',
    'quiz.beginner': 'Beginner',
    'quiz.intermediate': 'Intermediate',
    'quiz.advanced': 'Advanced',
    'quiz.start': 'Start Quiz',
    'quiz.question': 'Question',
    'quiz.correct': 'Correct!',
    'quiz.incorrect': 'Incorrect',
    'quiz.explanation': 'Explanation',
    'quiz.next': 'Next Question',
    'quiz.score': 'Your Score',
    'quiz.retry': 'Retry',
    
    // Games
    'games.title': 'Learning Games',
    'games.scenario.title': 'Scenario Challenge',
    'games.scenario.description': 'Read scenarios and determine the correct legal outcome',
    'games.rightwrong.title': 'Right vs Wrong',
    'games.rightwrong.description': 'Quick-fire decisions on constitutional violations',
    'games.play': 'Play Now',
    'games.score': 'Score',
    'games.streak': 'Streak',
    'games.level': 'Level',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Something went wrong',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.submit': 'Submit',
    'common.cancel': 'Cancel',
    'common.close': 'Close',
    
    // Footer
    'footer.disclaimer': 'Not a substitute for legal advice. For awareness only.',
    'footer.tagline': 'Know Your Rights. Act With Confidence.',
    
    // Accessibility
    'a11y.simpleMode': 'Simple Mode',
    'a11y.largeText': 'Large Text',
    'a11y.voiceInput': 'Voice Input',
  },
  te: {
    // Navigation
    'nav.home': 'హోమ్',
    'nav.analyze': 'విశ్లేషణ',
    'nav.explore': 'అన్వేషించు',
    'nav.cases': 'కేస్ స్టడీస్',
    'nav.quiz': 'క్విజ్',
    'nav.games': 'గేమ్స్',
    
    // Hero
    'hero.title': 'మీ హక్కులు తెలుసుకోండి.',
    'hero.subtitle': 'నమ్మకంతో వ్యవహరించండి.',
    'hero.description': 'రోజువారీ నిజ జీవిత నిర్ణయాల కోసం AI-ఆధారిత రాజ్యాంగ సహాయకుడు',
    'hero.cta.analyze': 'నా పరిస్థితిని విశ్లేషించు',
    'hero.cta.explore': 'ఆర్టికల్స్ చూడండి',
    
    // Features
    'features.intake.title': 'AI లీగల్ ఇన్‌టేక్',
    'features.intake.description': 'మీ పరిస్థితిని వివరించండి. మేము సరైన ప్రశ్నలు అడుగుతాము.',
    'features.engine.title': 'రూల్ ఇంజిన్',
    'features.engine.description': 'నిర్ణయాత్మక తీర్పు. AI ఊహించడం కాదు.',
    'features.explorer.title': 'రాజ్యాంగ అన్వేషకుడు',
    'features.explorer.description': 'అన్ని ఆర్టికల్స్ చూడండి, సరళంగా.',
    'features.pathfinder.title': 'యాక్షన్ పాత్‌ఫైండర్',
    'features.pathfinder.description': 'తదుపరి ఏమి చేయాలో తెలుసుకోండి.',
    
    // How It Works
    'how.title': 'ఇది ఎలా పనిచేస్తుంది',
    'how.step1.title': 'వివరించండి',
    'how.step1.description': 'టెక్స్ట్ లేదా వాయిస్ ఉపయోగించి మీ పరిస్థితిని చెప్పండి',
    'how.step2.title': 'స్పష్టం చేయండి',
    'how.step2.description': 'AI లక్ష్య ఫాలో-అప్ ప్రశ్నలు అడుగుతుంది',
    'how.step3.title': 'విశ్లేషించండి',
    'how.step3.description': 'రూల్ ఇంజిన్ షరతులను మూల్యాంకనం చేస్తుంది',
    'how.step4.title': 'చర్య తీసుకోండి',
    'how.step4.description': 'తీర్పు మరియు యాక్షన్ ప్లాన్ పొందండి',
    
    // Domains
    'domains.title': 'డొమైన్ ద్వారా అన్వేషించండి',
    'domains.police': 'పోలీసు & అరెస్ట్',
    'domains.workplace': 'వర్క్‌ప్లేస్ హక్కులు',
    'domains.speech': 'వాక్ స్వాతంత్ర్యం',
    'domains.equality': 'సమానత్వం',
    'domains.protest': 'నిరసన హక్కులు',
    'domains.govt': 'ప్రభుత్వ సేవలు',
    
    // Analyze Page
    'analyze.title': 'మీ పరిస్థితిని విశ్లేషించండి',
    'analyze.placeholder': 'ఏమి జరిగిందో వివరించండి...',
    'analyze.context.domain': 'గుర్తించిన డొమైన్',
    'analyze.context.keywords': 'కీవర్డ్స్',
    'analyze.context.progress': 'ప్రగతి',
    'analyze.context.article': 'ఆర్టికల్ మూల్యాంకనం',
    'analyze.quickstart': 'లేదా ప్రారంభించడానికి ఒక సన్నివేశాన్ని ఎంచుకోండి',
    'analyze.quick.arrest': 'నన్ను అన్యాయంగా అరెస్ట్ చేశారు',
    'analyze.quick.speech': 'నా ప్రసంగాన్ని సెన్సార్ చేశారు',
    'analyze.quick.workplace': 'నేను వర్క్‌ప్లేస్ వివక్షను ఎదుర్కొన్నాను',
    'analyze.quick.govt': 'నాకు ప్రభుత్వ సేవ నిరాకరించబడింది',
    'analyze.quick.protest': 'నా నిరసనను ఆపారు',
    
    // Results
    'result.verdict': 'తీర్పు',
    'result.valid': 'చెల్లుబాటు',
    'result.violation': 'ఉల్లంఘన',
    'result.depends': 'ఆధారపడి ఉంటుంది',
    'result.article': 'సంబంధిత ఆర్టికల్',
    'result.severity': 'తీవ్రత',
    'result.severity.minor': 'చిన్నది',
    'result.severity.serious': 'తీవ్రమైనది',
    'result.severity.fundamental': 'ప్రాథమిక ఉల్లంఘన',
    'result.reasoning': 'దశల వారీ తర్కం',
    'result.simplify': 'సరళంగా వివరించండి',
    'result.action': 'తదుపరి ఏమి చేయాలి?',
    'result.related': 'సంబంధిత ఆర్టికల్స్',
    'result.share': 'షేర్ చేయండి',
    'result.save': 'సేవ్ చేయండి',
    
    // Explore Page
    'explore.title': 'రాజ్యాంగ అన్వేషకుడు',
    'explore.search': 'ఆర్టికల్స్, హక్కులు లేదా అంశాలను శోధించండి...',
    'explore.filter.all': 'అన్నీ',
    'explore.filter.part1': 'పార్ట్ I',
    'explore.filter.part3': 'పార్ట్ III',
    'explore.filter.part4': 'పార్ట్ IV',
    'explore.filter.amendments': 'సవరణలు',
    'explore.readmore': 'మరింత చదవండి',
    'explore.simple': 'సరళ వివరణ',
    'explore.example': 'నిజ జీవిత ఉదాహరణ',
    'explore.analyze': 'ఈ ఆర్టికల్ కింద విశ్లేషించండి',
    
    // Case Studies
    'cases.title': 'కేస్ స్టడీస్',
    'cases.view': 'పూర్తి కేస్ చూడండి',
    'cases.situation': 'పరిస్థితి',
    'cases.articles': 'వర్తించే ఆర్టికల్స్',
    'cases.takeaway': 'ముఖ్య సారాంశం',
    'cases.similar': 'ఇలాంటి పరిస్థితిని విశ్లేషించండి',
    
    // Quiz
    'quiz.title': 'మీ జ్ఞానాన్ని పరీక్షించండి',
    'quiz.category': 'వర్గం ఎంచుకోండి',
    'quiz.difficulty': 'కష్టం స్థాయి',
    'quiz.beginner': 'ప్రారంభకుడు',
    'quiz.intermediate': 'మధ్యస్థం',
    'quiz.advanced': 'అధునాతన',
    'quiz.start': 'క్విజ్ ప్రారంభించండి',
    'quiz.question': 'ప్రశ్న',
    'quiz.correct': 'సరైనది!',
    'quiz.incorrect': 'తప్పు',
    'quiz.explanation': 'వివరణ',
    'quiz.next': 'తదుపరి ప్రశ్న',
    'quiz.score': 'మీ స్కోర్',
    'quiz.retry': 'మళ్ళీ ప్రయత్నించండి',
    
    // Games
    'games.title': 'నేర్చుకునే గేమ్స్',
    'games.scenario.title': 'సన్నివేశ సవాలు',
    'games.scenario.description': 'సన్నివేశాలను చదివి సరైన న్యాయ ఫలితాన్ని నిర్ణయించండి',
    'games.rightwrong.title': 'సరైన vs తప్పు',
    'games.rightwrong.description': 'రాజ్యాంగ ఉల్లంఘనలపై త్వరిత నిర్ణయాలు',
    'games.play': 'ఇప్పుడు ఆడండి',
    'games.score': 'స్కోర్',
    'games.streak': 'స్ట్రీక్',
    'games.level': 'స్థాయి',
    
    // Common
    'common.loading': 'లోడ్ అవుతోంది...',
    'common.error': 'ఏదో తప్పు జరిగింది',
    'common.back': 'వెనుకకు',
    'common.next': 'తదుపరి',
    'common.submit': 'సమర్పించండి',
    'common.cancel': 'రద్దు చేయండి',
    'common.close': 'మూసివేయండి',
    
    // Footer
    'footer.disclaimer': 'న్యాయ సలహాకు ప్రత్యామ్నాయం కాదు. అవగాహన కోసం మాత్రమే.',
    'footer.tagline': 'మీ హక్కులు తెలుసుకోండి. నమ్మకంతో వ్యవహరించండి.',
    
    // Accessibility
    'a11y.simpleMode': 'సరళ మోడ్',
    'a11y.largeText': 'పెద్ద టెక్స్ట్',
    'a11y.voiceInput': 'వాయిస్ ఇన్‌పుట్',
  },
  hi: {
    // Navigation
    'nav.home': 'होम',
    'nav.analyze': 'विश्लेषण',
    'nav.explore': 'अन्वेषण',
    'nav.cases': 'केस स्टडीज',
    'nav.quiz': 'क्विज',
    'nav.games': 'गेम्स',
    
    // Hero
    'hero.title': 'अपने अधिकार जानें।',
    'hero.subtitle': 'आत्मविश्वास से कार्य करें।',
    'hero.description': 'रोजमर्रा के वास्तविक जीवन के फैसलों के लिए AI-संचालित संवैधानिक सहायक',
    'hero.cta.analyze': 'मेरी स्थिति का विश्लेषण करें',
    'hero.cta.explore': 'अनुच्छेद देखें',
    
    // Features
    'features.intake.title': 'AI लीगल इनटेक',
    'features.intake.description': 'अपनी स्थिति बताएं। हम सही सवाल पूछेंगे।',
    'features.engine.title': 'रूल इंजन',
    'features.engine.description': 'निर्णायक फैसला। AI अनुमान नहीं।',
    'features.explorer.title': 'संविधान अन्वेषक',
    'features.explorer.description': 'सभी अनुच्छेद देखें, सरल भाषा में।',
    'features.pathfinder.title': 'एक्शन पाथफाइंडर',
    'features.pathfinder.description': 'जानें आगे क्या करना है।',
    
    // How It Works
    'how.title': 'यह कैसे काम करता है',
    'how.step1.title': 'वर्णन करें',
    'how.step1.description': 'टेक्स्ट या वॉइस का उपयोग करके अपनी स्थिति बताएं',
    'how.step2.title': 'स्पष्ट करें',
    'how.step2.description': 'AI लक्षित फॉलो-अप प्रश्न पूछता है',
    'how.step3.title': 'विश्लेषण',
    'how.step3.description': 'रूल इंजन शर्तों का मूल्यांकन करता है',
    'how.step4.title': 'कार्रवाई',
    'how.step4.description': 'फैसला और एक्शन प्लान प्राप्त करें',
    
    // Domains
    'domains.title': 'डोमेन के अनुसार अन्वेषण करें',
    'domains.police': 'पुलिस और गिरफ्तारी',
    'domains.workplace': 'कार्यस्थल अधिकार',
    'domains.speech': 'अभिव्यक्ति की स्वतंत्रता',
    'domains.equality': 'समानता',
    'domains.protest': 'विरोध के अधिकार',
    'domains.govt': 'सरकारी सेवाएं',
    
    // Analyze Page
    'analyze.title': 'अपनी स्थिति का विश्लेषण करें',
    'analyze.placeholder': 'क्या हुआ वर्णन करें...',
    'analyze.context.domain': 'पहचाना गया डोमेन',
    'analyze.context.keywords': 'कीवर्ड्स',
    'analyze.context.progress': 'प्रगति',
    'analyze.context.article': 'अनुच्छेद मूल्यांकन',
    'analyze.quickstart': 'या शुरू करने के लिए एक परिदृश्य चुनें',
    'analyze.quick.arrest': 'मुझे अन्यायपूर्ण तरीके से गिरफ्तार किया गया',
    'analyze.quick.speech': 'मेरी बात को सेंसर किया गया',
    'analyze.quick.workplace': 'मुझे कार्यस्थल पर भेदभाव का सामना करना पड़ा',
    'analyze.quick.govt': 'मुझे सरकारी सेवा से वंचित किया गया',
    'analyze.quick.protest': 'मेरा विरोध प्रदर्शन रोका गया',
    
    // Results
    'result.verdict': 'फैसला',
    'result.valid': 'वैध',
    'result.violation': 'उल्लंघन',
    'result.depends': 'निर्भर करता है',
    'result.article': 'संबंधित अनुच्छेद',
    'result.severity': 'गंभीरता',
    'result.severity.minor': 'मामूली',
    'result.severity.serious': 'गंभीर',
    'result.severity.fundamental': 'मौलिक उल्लंघन',
    'result.reasoning': 'चरण-दर-चरण तर्क',
    'result.simplify': 'सरल भाषा में समझाएं',
    'result.action': 'आगे क्या करना चाहिए?',
    'result.related': 'संबंधित अनुच्छेद',
    'result.share': 'शेयर करें',
    'result.save': 'सेव करें',
    
    // Explore Page
    'explore.title': 'संविधान अन्वेषक',
    'explore.search': 'अनुच्छेद, अधिकार या विषय खोजें...',
    'explore.filter.all': 'सभी',
    'explore.filter.part1': 'भाग I',
    'explore.filter.part3': 'भाग III',
    'explore.filter.part4': 'भाग IV',
    'explore.filter.amendments': 'संशोधन',
    'explore.readmore': 'और पढ़ें',
    'explore.simple': 'सरल व्याख्या',
    'explore.example': 'वास्तविक जीवन उदाहरण',
    'explore.analyze': 'इस अनुच्छेद के तहत विश्लेषण करें',
    
    // Case Studies
    'cases.title': 'केस स्टडीज',
    'cases.view': 'पूरा केस देखें',
    'cases.situation': 'स्थिति',
    'cases.articles': 'लागू अनुच्छेद',
    'cases.takeaway': 'मुख्य सीख',
    'cases.similar': 'इसी तरह की स्थिति का विश्लेषण करें',
    
    // Quiz
    'quiz.title': 'अपना ज्ञान परखें',
    'quiz.category': 'श्रेणी चुनें',
    'quiz.difficulty': 'कठिनाई',
    'quiz.beginner': 'शुरुआती',
    'quiz.intermediate': 'मध्यम',
    'quiz.advanced': 'उन्नत',
    'quiz.start': 'क्विज शुरू करें',
    'quiz.question': 'प्रश्न',
    'quiz.correct': 'सही!',
    'quiz.incorrect': 'गलत',
    'quiz.explanation': 'व्याख्या',
    'quiz.next': 'अगला प्रश्न',
    'quiz.score': 'आपका स्कोर',
    'quiz.retry': 'पुनः प्रयास करें',
    
    // Games
    'games.title': 'सीखने वाले गेम्स',
    'games.scenario.title': 'परिदृश्य चुनौती',
    'games.scenario.description': 'परिदृश्य पढ़ें और सही कानूनी परिणाम निर्धारित करें',
    'games.rightwrong.title': 'सही vs गलत',
    'games.rightwrong.description': 'संवैधानिक उल्लंघनों पर त्वरित निर्णय',
    'games.play': 'अभी खेलें',
    'games.score': 'स्कोर',
    'games.streak': 'स्ट्रीक',
    'games.level': 'स्तर',
    
    // Common
    'common.loading': 'लोड हो रहा है...',
    'common.error': 'कुछ गलत हो गया',
    'common.back': 'वापस',
    'common.next': 'अगला',
    'common.submit': 'जमा करें',
    'common.cancel': 'रद्द करें',
    'common.close': 'बंद करें',
    
    // Footer
    'footer.disclaimer': 'कानूनी सलाह का विकल्प नहीं। केवल जागरूकता के लिए।',
    'footer.tagline': 'अपने अधिकार जानें। आत्मविश्वास से कार्य करें।',
    
    // Accessibility
    'a11y.simpleMode': 'सरल मोड',
    'a11y.largeText': 'बड़ा टेक्स्ट',
    'a11y.voiceInput': 'वॉइस इनपुट',
  }
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')

  useEffect(() => {
    const saved = localStorage.getItem('samvidhan-language') as Language
    if (saved && ['en', 'te', 'hi'].includes(saved)) {
      setLanguageState(saved)
    }
  }, [])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    localStorage.setItem('samvidhan-language', lang)
  }

  const t = (key: string): string => {
    return translations[language][key] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}
