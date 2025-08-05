"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Copy, History, Trash2, Clock } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface PromptHistoryItem {
  id: string
  prompt: string
  timestamp: number
  mode: "chat" | "advanced" | "video-script"
  tool: "veo3-prompt" | "video-script"
  outputTypes: {
    json: boolean
    paragraph: boolean
  }
}

const PROMPT_HISTORY_KEY = "promptHistory"
const MAX_HISTORY_ITEMS = 10

export function PromptHistory() {
  const [promptHistory, setPromptHistory] = useState<PromptHistoryItem[]>([])
  const [isClient, setIsClient] = useState(false)
  const { toast } = useToast()

  // SSR protection
  useEffect(() => {
    setIsClient(true)
    loadPromptHistory()
  }, [])

  const loadPromptHistory = () => {
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(PROMPT_HISTORY_KEY)
        if (stored) {
          const parsed = JSON.parse(stored)
          setPromptHistory(parsed)
        }
      } catch (error) {
        console.error("Error loading prompt history:", error)
        // Clear corrupted data
        localStorage.removeItem(PROMPT_HISTORY_KEY)
      }
    }
  }

  const savePromptHistory = (history: PromptHistoryItem[]) => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(PROMPT_HISTORY_KEY, JSON.stringify(history))
      } catch (error) {
        console.error("Error saving prompt history:", error)
      }
    }
  }

  const addPromptToHistory = (
    prompt: string,
    mode: "chat" | "advanced",
    outputTypes: { json: boolean; paragraph: boolean }
  ) => {
    const newItem: PromptHistoryItem = {
      id: Date.now().toString(),
      prompt,
      timestamp: Date.now(),
      mode,
      outputTypes,
    }

    setPromptHistory((prev) => {
      // Remove duplicate if it's the same as the most recent
      const filtered = prev.filter((item) => item.prompt !== prompt)
      
      // Add new item to the beginning
      const updated = [newItem, ...filtered]
      
      // Keep only the last 10 items
      const limited = updated.slice(0, MAX_HISTORY_ITEMS)
      
      // Save to localStorage
      savePromptHistory(limited)
      
      return limited
    })
  }

  const copyPrompt = async (prompt: string) => {
    try {
      await navigator.clipboard.writeText(prompt)
      toast({
        title: "Copied!",
        description: "Prompt copied to clipboard",
      })
    } catch (error) {
      console.error("Error copying prompt:", error)
      toast({
        title: "Copy failed",
        description: "Failed to copy prompt to clipboard",
        variant: "destructive",
      })
    }
  }

  const clearHistory = () => {
    setPromptHistory([])
    if (typeof window !== "undefined") {
      localStorage.removeItem(PROMPT_HISTORY_KEY)
    }
    toast({
      title: "History cleared",
      description: "All prompt history has been removed",
    })
  }

  const formatTimestamp = (timestamp: number) => {
    const now = Date.now()
    const diff = now - timestamp
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return "Just now"
    if (minutes < 60) return `${minutes}m ago`
    if (hours < 24) return `${hours}h ago`
    if (days < 7) return `${days}d ago`
    
    return new Date(timestamp).toLocaleDateString()
  }

  const truncatePrompt = (prompt: string, maxLength: number = 150) => {
    if (prompt.length <= maxLength) return prompt
    return prompt.substring(0, maxLength) + "..."
  }

  if (!isClient) {
    return (
      <Card className="shadow-lg bg-white dark:bg-gray-800">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-purple-600 flex items-center gap-2">
            <History className="h-5 w-5" />
            Prompt History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <div className="animate-pulse">
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mx-auto"></div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="shadow-lg bg-white dark:bg-gray-800">
      <CardHeader>
        <CardTitle className="text-lg font-bold text-purple-600 flex items-center gap-2">
          <History className="h-5 w-5" />
          Prompt History
        </CardTitle>
      </CardHeader>
      <CardContent>
        {promptHistory.length === 0 ? (
          <div className="text-center py-8">
            <History className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 dark:text-gray-400 text-sm">
              No prompt history yet
            </p>
            <p className="text-gray-500 dark:text-gray-500 text-xs mt-1">
              Your generated prompts will appear here
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            <ScrollArea className="h-[400px] pr-4">
              <div className="space-y-3">
                {promptHistory.map((item) => (
                  <div
                    key={item.id}
                    className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 border border-gray-200 dark:border-gray-600"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-purple-100 dark:bg-purple-900 text-purple-700 dark:text-purple-300">
                            {item.mode === "chat" ? "Chat" : item.mode === "advanced" ? "Advanced" : "Video Script"}
                          </span>
                          <span className="text-xs font-medium px-2 py-1 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                            {item.tool === "veo3-prompt" ? "Veo3 Prompt" : "Video Script"}
                          </span>
                          <div className="flex items-center gap-1 text-xs text-gray-500">
                            <Clock className="h-3 w-3" />
                            {formatTimestamp(item.timestamp)}
                          </div>
                        </div>
                        
                        <p className="text-sm text-gray-800 dark:text-gray-200 leading-relaxed mb-3">
                          {truncatePrompt(item.prompt)}
                        </p>
                        
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <span>Outputs:</span>
                          {item.outputTypes.json && (
                            <span className="px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded">
                              JSON
                            </span>
                          )}
                          {item.outputTypes.paragraph && (
                            <span className="px-2 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded">
                              Paragraph
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => copyPrompt(item.prompt)}
                        className="flex-shrink-0 h-8 px-3"
                      >
                        <Copy className="h-3 w-3 mr-1" />
                        Copy
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className="pt-3 border-t border-gray-200 dark:border-gray-600">
              <Button
                variant="outline"
                size="sm"
                onClick={clearHistory}
                className="w-full text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-950"
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Clear History
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

// Export the function to add prompts to history
export const addPromptToHistoryGlobal = (
  prompt: string,
  mode: "chat" | "advanced" | "video-script",
  tool: "veo3-prompt" | "video-script",
  outputTypes: { json: boolean; paragraph: boolean }
) => {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(PROMPT_HISTORY_KEY)
      const existing = stored ? JSON.parse(stored) : []
      
      // Remove duplicate if it's the same as the most recent
      const filtered = existing.filter((item: PromptHistoryItem) => item.prompt !== prompt)
      
      const newItem: PromptHistoryItem = {
        id: Date.now().toString(),
        prompt,
        timestamp: Date.now(),
        mode,
        tool,
        outputTypes,
      }
      
      const updated = [newItem, ...filtered].slice(0, MAX_HISTORY_ITEMS)
      localStorage.setItem(PROMPT_HISTORY_KEY, JSON.stringify(updated))
    } catch (error) {
      console.error("Error adding prompt to history:", error)
    }
  }
} 