# Audio Files Directory

## Toast Notification Sound

Place your audio file in this directory. The system supports both WAV and MP3 formats.

**File Requirements:**
- **Primary**: `toastnotifications.wav` (WAV format)
- **Fallback**: `toastnotifications.mp3` (MP3 format)
- Duration: Short (1-2 seconds)
- Volume: Soft, non-intrusive
- Purpose: Desktop-only toast notification sound

**Supported Formats:**
1. **WAV** (recommended): `toastnotifications.wav`
2. **MP3** (fallback): `toastnotifications.mp3`

**Usage:**
The sound will play automatically when the toast notification appears on desktop devices after successful prompt generation.

**Features:**
- ✅ Desktop-only playback (screen width > 768px)
- ✅ 50% volume for better user experience
- ✅ Graceful fallback if autoplay is blocked
- ✅ Multiple format support (WAV/MP3)
- ✅ Error handling for missing files

**Note:** The audio will only play on desktop devices and respects user's browser autoplay settings. If autoplay is blocked, the toast will still appear without sound. 