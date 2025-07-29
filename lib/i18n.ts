export const defaultLocale = "en"
export const locales = ["en", "fr"] as const
export type Locale = (typeof locales)[number]

export const translations = {
  en: {
    // SEO and Branding
    siteTitle: "Veo3 Prompt Generator Free Online",
    mainHeading: "Veo3 Prompt Generator",
    accentWord: "Prompt",

    // Navigation
    home: "Home",
    tools: "Tools",
    blog: "Blog",
    about: "About",
    contact: "Contact",
    getStarted: "Get Started",

    // Main Tools Navigation
    videoScriptGenerator: "Video Script Generator",
    veo3PromptGenerator: "Veo3 Prompt Generator",

    // Video Script Generator
    videoTopic: "Video Topic & Main Characters (Describe in 1-2 sentences)",
    videoTopicPlaceholder:
      "Example: New product advertisement, product introduction, product usage guide,...\nCharacters: Example: Baby Bi, Mr. A, Mrs. B,...",
    audience: "Who is your audience?",
    selectAudience: "Select audience",
    scriptLength: "Script Length",
    selectLength: "Select length",
    scriptStyle: "Script Style",
    selectStyle: "Select style",
    language: "Language",
    vietnamese: "Vietnamese",
    english: "English",
    french: "French",
    spanish: "Spanish",
    german: "German",
    generator: "Generator",

    // Veo3 Prompt Generator - Structured Mode
    structuredMode: "Structured Mode",
    chatMode: "Chat Mode",
    mainSubject: "Describe the main subject of the video in detail?",
    mainSubjectPlaceholder: "Describe the main subject's appearance",
    mainSubjectRequired: "This field is required",
    sceneAction: "What is happening in the scene?",
    sceneActionPlaceholder: "What is the subject doing or feeling in the scene?",
    sceneActionRequired: "This field is required",
    dialogue: "Is there any specific dialogue or sound you want in the video?",
    dialogueOptional: "(optional)",
    dialoguePlaceholder: "Add dialogue, music, or sound effects if needed.",
    cameraMovement: "How should the camera move or frame the shot?",
    cameraOptional: "(optional)",
    cameraPlaceholder: "You can describe things like slow zoom, aerial view, close-up, tracking shot, etc.",
    otherDetails: "Any other details you want to include?",
    otherDetailsOptional: "(optional)",
    otherDetailsPlaceholder: "This could be lighting, weather, objects, mood, or small touches in the environment",
    subtitles: "Do you want subtitles in the video?",
    subtitlesOptional: "(optional)",
    yes: "Yes",
    no: "No",
    generate: "Generate",

    // Chat Mode
    chatPrompt:
      "Please describe your idea clearly, specify the required video dimensions, and accurately define your target audience. Example: An astronaut embarking on an exploratory mission to the moon, vertical video for TikTok targeting space and celestial body enthusiasts",
    chatPlaceholder: "Describe the video you want to create...",
    generateVideoPrompt: "Generate Video Prompt",

    // Audiences
    generalAudience: "General Audience",
    teenagers: "Teenagers (13-19)",
    youngAdults: "Young Adults (20-35)",
    professionals: "Professionals",
    parents: "Parents",
    seniors: "Seniors (55+)",

    // Script Lengths
    length15to30: "15-30 seconds",
    length30to60: "30-60 seconds",
    length1to2min: "1-2 minutes",
    length2to5min: "2-5 minutes",
    length5to10min: "5-10 minutes",

    // Script Styles
    conversational: "Conversational",
    professional: "Professional",
    energetic: "Energetic",
    educational: "Educational",
    storytelling: "Storytelling",
    promotional: "Promotional",

    // Footer
    footerDescription:
      "Transform your ideas into powerful video prompts with cutting-edge AI technology. Our platform combines advanced prompt engineering with intuitive design to help content creators, marketers, and businesses generate compelling video scripts and detailed prompts for AI video generation tools like Google's Veo 3.",

    // Tools Pages
    videoToPrompt: "Video to Prompt",
    transcription: "Transcription",
    promptGuide: "Prompt Guide",
    promptLibrary: "Prompt Library",

    // Common
    loading: "Loading...",
    error: "Error occurred",
    success: "Success",
    required: "required",
    optional: "optional",
  },
  fr: {
    // SEO and Branding
    siteTitle: "Générateur de Prompts Veo3 Gratuit en Ligne",
    mainHeading: "Générateur de Prompts Veo3",
    accentWord: "Prompts",

    // Navigation
    home: "Accueil",
    tools: "Outils",
    blog: "Blog",
    about: "À propos",
    contact: "Contact",
    getStarted: "Commencer",

    // Main Tools Navigation
    videoScriptGenerator: "Générateur de Script Vidéo",
    veo3PromptGenerator: "Générateur de Prompts Veo3",

    // Video Script Generator
    videoTopic: "Sujet vidéo et personnages principaux (Décrire en 1-2 phrases)",
    videoTopicPlaceholder:
      "Exemple: Nouvelle publicité produit, introduction produit, guide d'utilisation produit,...\nPersonnages: Exemple: Bébé Bi, M. A, Mme B,...",
    audience: "Qui est votre audience?",
    selectAudience: "Sélectionner l'audience",
    scriptLength: "Longueur du script",
    selectLength: "Sélectionner la longueur",
    scriptStyle: "Style du script",
    selectStyle: "Sélectionner le style",
    language: "Langue",
    vietnamese: "Vietnamien",
    english: "Anglais",
    french: "Français",
    spanish: "Espagnol",
    german: "Allemand",
    generator: "Générateur",

    // Veo3 Prompt Generator - Structured Mode
    structuredMode: "Mode Structuré",
    chatMode: "Mode Chat",
    mainSubject: "Décrivez le sujet principal de la vidéo en détail?",
    mainSubjectPlaceholder: "Décrivez l'apparence du sujet principal",
    mainSubjectRequired: "Ce champ est requis",
    sceneAction: "Que se passe-t-il dans la scène?",
    sceneActionPlaceholder: "Que fait ou ressent le sujet dans la scène?",
    sceneActionRequired: "Ce champ est requis",
    dialogue: "Y a-t-il un dialogue ou un son spécifique que vous voulez dans la vidéo?",
    dialogueOptional: "(optionnel)",
    dialoguePlaceholder: "Ajoutez du dialogue, de la musique ou des effets sonores si nécessaire.",
    cameraMovement: "Comment la caméra doit-elle bouger ou cadrer la prise?",
    cameraOptional: "(optionnel)",
    cameraPlaceholder: "Vous pouvez décrire des choses comme zoom lent, vue aérienne, gros plan, plan de suivi, etc.",
    otherDetails: "D'autres détails que vous voulez inclure?",
    otherDetailsOptional: "(optionnel)",
    otherDetailsPlaceholder:
      "Cela pourrait être l'éclairage, la météo, les objets, l'ambiance, ou de petites touches dans l'environnement",
    subtitles: "Voulez-vous des sous-titres dans la vidéo?",
    subtitlesOptional: "(optionnel)",
    yes: "Oui",
    no: "Non",
    generate: "Générer",

    // Chat Mode
    chatPrompt:
      "Veuillez décrire votre idée clairement, spécifier les dimensions vidéo requises, et définir précisément votre audience cible. Exemple: Un astronaute embarquant dans une mission d'exploration vers la lune, vidéo verticale pour TikTok ciblant les passionnés d'espace et de corps célestes",
    chatPlaceholder: "Décrivez la vidéo que vous voulez créer...",
    generateVideoPrompt: "Générer un Prompt Vidéo",

    // Audiences
    generalAudience: "Audience Générale",
    teenagers: "Adolescents (13-19)",
    youngAdults: "Jeunes Adultes (20-35)",
    professionals: "Professionnels",
    parents: "Parents",
    seniors: "Seniors (55+)",

    // Script Lengths
    length15to30: "15-30 secondes",
    length30to60: "30-60 secondes",
    length1to2min: "1-2 minutes",
    length2to5min: "2-5 minutes",
    length5to10min: "5-10 minutes",

    // Script Styles
    conversational: "Conversationnel",
    professional: "Professionnel",
    energetic: "Énergique",
    educational: "Éducatif",
    storytelling: "Narratif",
    promotional: "Promotionnel",

    // Footer
    footerDescription:
      "Transformez vos idées en prompts vidéo puissants avec une technologie IA de pointe. Notre plateforme combine l'ingénierie de prompts avancée avec un design intuitif pour aider les créateurs de contenu, les marketeurs et les entreprises à générer des scripts vidéo convaincants et des prompts détaillés pour les outils de génération vidéo IA comme Veo 3 de Google.",

    // Tools Pages
    videoToPrompt: "Vidéo vers Prompt",
    transcription: "Transcription",
    promptGuide: "Guide des Prompts",
    promptLibrary: "Bibliothèque de Prompts",

    // Common
    loading: "Chargement...",
    error: "Erreur survenue",
    success: "Succès",
    required: "requis",
    optional: "optionnel",
  },
} as const

export function getTranslation(locale: Locale, key: keyof typeof translations.en): string {
  return translations[locale][key] || translations.en[key]
}
