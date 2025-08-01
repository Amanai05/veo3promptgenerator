# Veo3 Prompt Generator - Complete Documentation

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Technical Architecture](#technical-architecture)
3. [Core Files & Components](#core-files--components)
4. [User Flows & Journey](#user-flows--journey)
5. [API Endpoints](#api-endpoints)
6. [AI Service Implementation](#ai-service-implementation)
7. [Frontend Components](#frontend-components)
8. [Configuration & Environment](#configuration--environment)
9. [Features & Capabilities](#features--capabilities)
10. [Troubleshooting Guide](#troubleshooting-guide)

---

## 🎯 Project Overview

The Veo3 Prompt Generator is a specialized AI-powered tool designed to create production-ready prompts for Google's Veo3 AI video generation platform. It transforms user ideas into structured JSON and narrative paragraph formats optimized for Veo3's capabilities.

### Key Features:
- **Dual Mode Operation**: Chat Mode (simple) and Advanced Mode (detailed forms)
- **Dual Output Formats**: JSON (technical) and Paragraph (creative)
- **AI-Powered Processing**: Google Gemini 2.5 Pro with OpenRouter fallback
- **Dialogue Options**: Has Dialogue, Auto Generate, No Dialogue
- **Subtitle Options**: Include/Exclude subtitles
- **Responsive Design**: Mobile-first approach with professional UI

---

## 🏗️ Technical Architecture

### Tech Stack:
- **Framework**: Next.js 14.2.16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + shadcn/ui components
- **AI APIs**: Google Gemini 2.5 Pro (primary), OpenRouter (fallback)
- **Icons**: Lucide React
- **State Management**: React useState hooks
- **API Routes**: Next.js API routes

### Architecture Pattern:
```
Frontend (React/Next.js)
    ↓
API Routes (Next.js)
    ↓
AI Service Layer (Gemini/OpenRouter)
    ↓
External AI APIs
```

---

## 📁 Core Files & Components

### 1. Main Frontend Page
**File**: `app/veo3-prompt-generator/page.tsx`
**Purpose**: Main user interface for the Veo3 Prompt Generator
**Key Features**:
- Mode switching (Chat/Advanced)
- Input handling for both modes
- Output display (JSON/Paragraph)
- Copy functionality
- Responsive design
- Error handling

**Key Components**:
- Mode selection buttons
- Input textarea (Chat Mode)
- Advanced form fields (Advanced Mode)
- Output display cards
- Copy buttons with toast notifications
- FAQ accordion

### 2. AI Service Layer
**File**: `lib/simple-ai-service.ts`
**Purpose**: Core AI processing logic for both modes
**Key Classes**:
- `GeminiAPI`: Direct Google Gemini API integration
- `OpenRouterAPI`: OpenRouter API integration
- `SimpleAIService`: Main service orchestrator

**Key Methods**:
- `generateJSONPrompt()`: Creates structured JSON output
- `generateParagraphPrompt()`: Creates narrative paragraph output
- `tryWithFallback()`: Handles API fallback logic

### 3. Advanced AI Service
**File**: `lib/advanced-ai-service.ts`
**Purpose**: AI processing for Advanced Mode with detailed form inputs
**Key Features**:
- Handles complex form data
- Enhanced system prompts
- Detailed JSON and paragraph generation
- Same fallback mechanism as simple service

### 4. API Routes

#### Simple Mode APIs:
**File**: `app/api/simple-veo3-prompt/json/route.ts`
**Purpose**: JSON prompt generation for Chat Mode
**Input**: `{ input: string, dialogueSetting: string }`
**Output**: `{ jsonPrompt: string, metadata: object }`

**File**: `app/api/simple-veo3-prompt/paragraph/route.ts`
**Purpose**: Paragraph prompt generation for Chat Mode
**Input**: `{ input: string, dialogueSetting: string }`
**Output**: `{ paragraphPrompt: string, metadata: object }`

#### Advanced Mode APIs:
**File**: `app/api/advanced-veo3-prompt/json/route.ts`
**Purpose**: JSON prompt generation for Advanced Mode
**Input**: `{ formData: object, dialogueSetting: string }`
**Output**: `{ jsonPrompt: string, metadata: object }`

**File**: `app/api/advanced-veo3-prompt/paragraph/route.ts`
**Purpose**: Paragraph prompt generation for Advanced Mode
**Input**: `{ formData: object, dialogueSetting: string }`
**Output**: `{ paragraphPrompt: string, metadata: object }`

### 5. UI Components
**Directory**: `components/ui/`
**Key Components**:
- `Button`: Action buttons with variants
- `Card`: Content containers
- `Textarea`: Input fields
- `Checkbox`: Selection controls
- `Tooltip`: Information displays
- `Toast`: Notification system

---

## 👥 User Flows & Journey

### Chat Mode Flow:
1. **User Input**: User types a simple description in the textarea
2. **Mode Selection**: User selects "Chat Mode" (default)
3. **Output Options**: User selects JSON and/or Paragraph checkboxes
4. **Dialogue Settings**: User chooses dialogue option (Has/Auto/No)
5. **Subtitle Settings**: User chooses subtitle preference
6. **Generate**: User clicks "Generate Prompt" button
7. **API Processing**: 
   - Frontend makes conditional API calls based on selections
   - AI processes input with dialogue instructions
   - Returns selected output formats
8. **Display**: Results shown in respective output cards
9. **Copy**: User can copy prompts to clipboard

### Advanced Mode Flow:
1. **Mode Selection**: User selects "Advanced Mode"
2. **Form Filling**: User fills detailed form fields:
   - Main Subject
   - Scene Action
   - Camera Movement
   - Other Details
   - Target Audience
   - Video Style
   - Duration Preference
   - Lighting Style
   - Color Palette
   - Audio Elements
   - Special Effects
3. **Output Options**: Same as Chat Mode
4. **Dialogue Settings**: Same as Chat Mode
5. **Subtitle Settings**: Same as Chat Mode
6. **Generate**: User clicks "Generate Prompt" button
7. **API Processing**:
   - Frontend sends complete form data
   - AI processes with enhanced system prompts
   - Returns selected output formats
8. **Display**: Results shown in respective output cards
9. **Copy**: User can copy prompts to clipboard

---

## 🔌 API Endpoints

### Simple Mode Endpoints:

#### POST `/api/simple-veo3-prompt/json`
**Purpose**: Generate JSON prompt for Chat Mode
**Request Body**:
```json
{
  "input": "string",
  "dialogueSetting": "yes|ai|no"
}
```
**Response**:
```json
{
  "jsonPrompt": "string",
  "metadata": {
    "model": "string",
    "processingTime": "number"
  }
}
```

#### POST `/api/simple-veo3-prompt/paragraph`
**Purpose**: Generate paragraph prompt for Chat Mode
**Request Body**:
```json
{
  "input": "string",
  "dialogueSetting": "yes|ai|no"
}
```
**Response**:
```json
{
  "paragraphPrompt": "string",
  "metadata": {
    "model": "string",
    "processingTime": "number"
  }
}
```

### Advanced Mode Endpoints:

#### POST `/api/advanced-veo3-prompt/json`
**Purpose**: Generate JSON prompt for Advanced Mode
**Request Body**:
```json
{
  "formData": {
    "mainSubject": "string",
    "sceneAction": "string",
    "cameraMovement": "string",
    "otherDetails": "string",
    "targetAudience": "string",
    "videoStyle": "string",
    "durationPreference": "string",
    "lightingStyle": "string",
    "colorPalette": "string",
    "audioElements": "string",
    "specialEffects": "string"
  },
  "dialogueSetting": "yes|ai|no"
}
```

#### POST `/api/advanced-veo3-prompt/paragraph`
**Purpose**: Generate paragraph prompt for Advanced Mode
**Request Body**: Same as JSON endpoint
**Response**: Same structure as simple mode

---

## 🤖 AI Service Implementation

### System Prompts:

#### JSON Prompt (Cine-Core 8):
```
You are "Cine-Core 8", a hyper-specialized AI prompt engineering system. Your sole mission is to function as a world-class cinematographer and translate a user's simple creative idea into a single, dense, and technically flawless 8-second JSON prompt for Google's Veo3 video generation model.

[Detailed system prompt with JSON schema and examples]
```

#### Paragraph Prompt:
```
You are an expert Veo3 video concept and prompt engineer. Your role is to take a user's initial video idea and transform it into a production-ready, highly optimized paragraph prompt for Google's Veo3 AI video generation platform.

[Detailed system prompt with output requirements]
```

### Dialogue Instructions:
- **"Has Dialogue"**: "create the detailed prompt with the dialogue provided by the users"
- **"Auto Generate"**: "if the prompt provided by the user doesn't have any dialogue add few dialogue relevant to the content or the user prompt the audio dialogue length should not exceed more than 5 seconds"
- **"No Dialogue"**: "remove if there are any dialogue in the video prompt and give an good veo3 prompt without any dialogues"

### API Configuration:
- **Gemini API**: `maxOutputTokens: 2048`, `temperature: 0.8`
- **OpenRouter API**: `max_tokens: 2048`, `temperature: 0.7`
- **Model**: `google/gemini-2.5-pro`

---

## 🎨 Frontend Components

### Main Page Structure:
```tsx
Veo3PromptGeneratorPage
├── Header (Title, Description)
├── Mode Selection (Chat/Advanced buttons)
├── Input Section
│   ├── Chat Mode: Textarea
│   └── Advanced Mode: Form fields
├── Output Options
│   ├── JSON/Paragraph checkboxes
│   ├── Dialogue Settings
│   └── Subtitle Settings
├── Generate Button
├── Output Display
│   ├── JSON Format Card
│   └── Paragraph Format Card
├── AI Status Card
├── How It Works Section
├── About Section
└── FAQ Section
```

### Key State Variables:
```typescript
const [activeMode, setActiveMode] = useState<"chat" | "advanced">("chat")
const [chatInput, setChatInput] = useState("")
const [advancedData, setAdvancedData] = useState({...})
const [outputOptions, setOutputOptions] = useState({
  jsonPrompt: true,
  paragraphPrompt: true,
  dialogue: "no" as "yes" | "ai" | "no",
  subtitles: "include" as "include" | "exclude"
})
const [generatedPrompts, setGeneratedPrompts] = useState({...})
const [isGenerating, setIsGenerating] = useState(false)
```

---

## ⚙️ Configuration & Environment

### Environment Variables:
```env
# Required for AI functionality
GEMINI_API_KEY=your_gemini_api_key_here
OPENROUTER_API_KEY=your_openrouter_api_key_here

# Optional
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Dependencies:
```json
{
  "next": "14.2.16",
  "react": "^18",
  "typescript": "^5",
  "tailwindcss": "^3.3.0",
  "@radix-ui/react-accordion": "^1.1.2",
  "@radix-ui/react-checkbox": "^1.0.4",
  "@radix-ui/react-dialog": "^1.0.5",
  "@radix-ui/react-label": "^2.0.2",
  "@radix-ui/react-tooltip": "^1.0.7",
  "lucide-react": "^0.294.0",
  "class-variance-authority": "^0.7.0",
  "clsx": "^2.0.0",
  "tailwind-merge": "^2.0.0"
}
```

---

## ✨ Features & Capabilities

### Core Features:
1. **Dual Mode Operation**
   - Chat Mode: Simple text input
   - Advanced Mode: Detailed form inputs

2. **Dual Output Formats**
   - JSON: Structured data for technical processing
   - Paragraph: Narrative descriptions for creative processing

3. **Dialogue Options**
   - Has Dialogue: Use user-provided dialogue
   - Auto Generate: AI generates relevant dialogue
   - No Dialogue: Remove all dialogue elements

4. **Subtitle Options**
   - Include Subtitles: Add subtitle elements
   - No Subtitles: Remove subtitle elements

5. **AI Processing**
   - Google Gemini 2.5 Pro (primary)
   - OpenRouter fallback
   - Enhanced system prompts
   - Dynamic prompt modification

6. **User Experience**
   - Responsive design
   - Copy to clipboard
   - Toast notifications
   - Loading states
   - Error handling
   - Professional UI

### Technical Features:
1. **Conditional API Calls**: Only calls APIs for selected outputs
2. **Token Optimization**: 2048 token limits for detailed responses
3. **Error Handling**: Comprehensive error management
4. **TypeScript**: Full type safety
5. **Performance**: Optimized rendering and API calls

---

## 🔧 Troubleshooting Guide

### Common Issues:

#### 1. API Key Errors
**Problem**: "No AI service available" error
**Solution**: 
- Check `.env.local` file exists
- Verify API keys are set correctly
- Ensure keys are not placeholder values

#### 2. Truncated Responses
**Problem**: Paragraphs getting cut off
**Solution**: 
- Token limits increased to 2048
- Check API response logs
- Verify no additional truncation in frontend

#### 3. Mode Switching Issues
**Problem**: Wrong API being called
**Solution**:
- Chat Mode uses simple APIs
- Advanced Mode uses advanced APIs
- Check `activeMode` state

#### 4. Output Not Displaying
**Problem**: Selected outputs not showing
**Solution**:
- Check `outputOptions` state
- Verify API responses
- Check conditional rendering logic

### Debug Steps:
1. Check browser console for errors
2. Verify API responses in Network tab
3. Check terminal logs for AI service errors
4. Validate environment variables
5. Test individual API endpoints

---

## 📝 Implementation Notes

### Key Design Decisions:
1. **Separate API Routes**: Each output type has its own endpoint
2. **Conditional Processing**: Only process selected outputs
3. **Fallback Mechanism**: Gemini → OpenRouter
4. **Dynamic Prompts**: System prompts modified based on user selections
5. **Responsive Design**: Mobile-first approach

### Performance Optimizations:
1. **Lazy Loading**: Components load as needed
2. **Conditional Rendering**: Only show selected outputs
3. **Efficient State Management**: Minimal re-renders
4. **API Optimization**: Single calls per output type

### Security Considerations:
1. **Input Validation**: All inputs validated
2. **Error Handling**: No sensitive data exposed
3. **Rate Limiting**: Consider implementing
4. **API Key Protection**: Keys not exposed to frontend

---

## 🚀 Future Enhancements

### Potential Improvements:
1. **Prompt Templates**: Pre-built templates for common scenarios
2. **Prompt History**: Save and reuse previous prompts
3. **Batch Processing**: Generate multiple prompts at once
4. **Export Options**: Download prompts in various formats
5. **Collaboration**: Share prompts with team members
6. **Analytics**: Track prompt usage and success rates

### Technical Enhancements:
1. **Caching**: Cache common prompt patterns
2. **Streaming**: Real-time prompt generation
3. **Webhooks**: Notify when prompts are ready
4. **API Versioning**: Support multiple Veo3 versions
5. **Multi-language**: Support for different languages

---

## 📞 Support & Maintenance

### File Locations Summary:
```
veo3promptgenerator/
├── app/
│   ├── veo3-prompt-generator/page.tsx          # Main frontend
│   └── api/
│       ├── simple-veo3-prompt/
│       │   ├── json/route.ts                   # Chat JSON API
│       │   └── paragraph/route.ts              # Chat Paragraph API
│       └── advanced-veo3-prompt/
│           ├── json/route.ts                   # Advanced JSON API
│           └── paragraph/route.ts              # Advanced Paragraph API
├── lib/
│   ├── simple-ai-service.ts                    # Chat Mode AI service
│   └── advanced-ai-service.ts                  # Advanced Mode AI service
├── components/
│   └── ui/                                     # UI components
├── .env.local                                  # Environment variables
└── package.json                                # Dependencies
```

### Maintenance Tasks:
1. **Regular Updates**: Keep dependencies updated
2. **API Monitoring**: Monitor AI API performance
3. **Error Tracking**: Implement error tracking
4. **Performance Monitoring**: Track response times
5. **User Feedback**: Collect and implement user suggestions

---

*This documentation serves as a complete reference for the Veo3 Prompt Generator implementation. All features, components, and workflows are documented to ensure easy maintenance and future development.* 