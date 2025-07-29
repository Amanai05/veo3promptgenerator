"use client"

import { useState, useRef, useCallback, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Send,
  Paperclip,
  ImageIcon,
  Video,
  Loader2,
  Sparkles,
  User,
  Bot,
  X,
  Copy,
  AlertCircle,
  CreditCard,
} from "lucide-react"
import { useDropzone } from "react-dropzone"
import { useToast } from "@/hooks/use-toast"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: Date
  attachments?: Array<{
    name: string
    type: string
    url: string
  }>
  variations?: {
    detailed: string
    paragraph: string
    idea: string
  }
}

interface AttachedFile {
  name: string
  type: string
  data: string
  url: string
}

export function AIChatSection() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "assistant",
      content:
        "Hello! I'm your AI creative assistant powered by Gemini 2.5 Pro. I can help you create amazing video prompts, analyze your media files, and provide creative guidance. What kind of project are you working on today?",
      timestamp: new Date(),
    },
  ])
  const [inputMessage, setInputMessage] = useState("")
  const [attachedFiles, setAttachedFiles] = useState<AttachedFile[]>([])
  const [isProcessing, setIsProcessing] = useState(false)
  const [fallbackMode, setFallbackMode] = useState(false)
  const [apiError, setApiError] = useState<string | null>(null)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const { toast } = useToast()

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Save conversation to localStorage
  useEffect(() => {
    if (messages.length > 1) {
      localStorage.setItem("veo3-chat-history", JSON.stringify(messages))
    }
  }, [messages])

  // Load conversation from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("veo3-chat-history")
    if (saved) {
      try {
        const parsedMessages = JSON.parse(saved)
        if (Array.isArray(parsedMessages) && parsedMessages.length > 1) {
          setMessages(
            parsedMessages.map((msg) => ({
              ...msg,
              timestamp: new Date(msg.timestamp),
            })),
          )
        }
      } catch (error) {
        console.error("Failed to load chat history:", error)
      }
    }
  }, [])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        if (file.size > 50 * 1024 * 1024) {
          toast({
            title: "File too large",
            description: `${file.name} is larger than 50MB limit`,
            variant: "destructive",
          })
          return
        }

        const reader = new FileReader()
        reader.onload = () => {
          const newFile: AttachedFile = {
            name: file.name,
            type: file.type,
            data: reader.result as string,
            url: URL.createObjectURL(file),
          }
          setAttachedFiles((prev) => [...prev, newFile])
        }
        reader.readAsDataURL(file)
      })
    },
    [toast],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [".jpeg", ".jpg", ".png", ".gif", ".webp"],
      "video/*": [".mp4", ".avi", ".mov", ".wmv", ".webm"],
    },
    multiple: true,
    maxSize: 50 * 1024 * 1024,
    noClick: true,
  })

  const removeAttachment = (index: number) => {
    setAttachedFiles((prev) => {
      const file = prev[index]
      URL.revokeObjectURL(file.url)
      return prev.filter((_, i) => i !== index)
    })
  }

  const sendMessage = async () => {
    if (!inputMessage.trim() && attachedFiles.length === 0) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: inputMessage,
      timestamp: new Date(),
      attachments: attachedFiles.map((file) => ({
        name: file.name,
        type: file.type,
        url: file.url,
      })),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsProcessing(true)
    setApiError(null)

    try {
      const conversationHistory = messages.slice(-10).map((msg) => ({
        role: msg.type === "user" ? "user" : "assistant",
        content: msg.content,
      }))

      const response = await fetch("/api/chat-prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputMessage,
          attachedFiles: attachedFiles.map((file) => ({
            data: file.data.split(",")[1],
            mimeType: file.type,
            name: file.name,
          })),
          conversationHistory,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to process message")
      }

      // Update fallback mode status
      if (data.fallbackUsed && !fallbackMode) {
        setFallbackMode(true)
        toast({
          title: "Using backup AI mode",
          description: "Primary API is busy, using OpenRouter fallback",
        })
      }

      let assistantMessage: Message

      if (data.type === "prompt_generation") {
        assistantMessage = {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content: "I've created three variations of prompts for your project:",
          timestamp: new Date(),
          variations: {
            detailed: data.detailedPrompt,
            paragraph: data.paragraphPrompt,
            idea: data.ideaText,
          },
        }
      } else {
        assistantMessage = {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content: data.response,
          timestamp: new Date(),
        }
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error sending message:", error)
      const errorMessage = error instanceof Error ? error.message : "Failed to send message"

      // Check for credit-related errors
      if (errorMessage.includes("credits") || errorMessage.includes("upgrade")) {
        setApiError("OpenRouter API requires more credits. Please upgrade your account.")
        toast({
          title: "API Credit Issue",
          description: "OpenRouter needs more credits. Using reduced functionality.",
          variant: "destructive",
        })

        // Add a system message about the credit issue
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: "assistant",
          content:
            "I'm experiencing some API limitations due to credit constraints. You can still use the tools section for image and video analysis, or the OpenRouter account needs to be upgraded for full chat functionality.",
          timestamp: new Date(),
        }
        setMessages((prev) => [...prev, errorMessage])
      } else {
        toast({
          title: "Message failed",
          description: errorMessage,
          variant: "destructive",
        })
      }
    } finally {
      setIsProcessing(false)
      setInputMessage("")
      setAttachedFiles([])
    }
  }

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text)
    toast({
      title: `${type} copied!`,
      description: "Content has been copied to your clipboard.",
    })
  }

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        type: "assistant",
        content:
          "Hello! I'm your AI creative assistant powered by Gemini 2.5 Pro. I can help you create amazing video prompts, analyze your media files, and provide creative guidance. What kind of project are you working on today?",
        timestamp: new Date(),
      },
    ])
    localStorage.removeItem("veo3-chat-history")
    setFallbackMode(false)
    setApiError(null)
  }

  return (
    <section id="ai-chat" className="py-12 sm:py-16 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold mb-3">
            AI Creative{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">Assistant</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
            Chat with our AI to create custom video prompts, get creative guidance, and refine your ideas with
            intelligent assistance.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="h-[600px] flex flex-col chat-container card-red-shadow">
            <CardHeader className="pb-4 border-b border-red-medium/20 flex-shrink-0">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Bot className="h-5 w-5 text-primary" />
                AI Creative Assistant
                <div className="ml-auto flex items-center gap-2">
                  {apiError && (
                    <Badge variant="outline" className="text-xs bg-red-100 text-red-800 border-red-300">
                      <CreditCard className="h-3 w-3 mr-1" />
                      Credit Issue
                    </Badge>
                  )}
                  {fallbackMode && !apiError && (
                    <Badge variant="outline" className="text-xs bg-yellow-100 text-yellow-800 border-yellow-300">
                      <AlertCircle className="h-3 w-3 mr-1" />
                      Backup Mode
                    </Badge>
                  )}
                  <Badge variant="secondary" className="text-xs bg-red-light/30">
                    Gemini 2.5 Pro
                  </Badge>
                  <Button variant="ghost" size="sm" onClick={clearChat} className="text-xs">
                    Clear Chat
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>

            <CardContent className="flex-1 flex flex-col p-0 min-h-0">
              <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
                <div className="space-y-4 pb-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex gap-3 ${message.type === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`flex gap-3 max-w-[85%] ${message.type === "user" ? "flex-row-reverse" : "flex-row"}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                            message.type === "user"
                              ? "bg-primary text-primary-foreground"
                              : "bg-red-light/30 text-primary"
                          }`}
                        >
                          {message.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                        </div>

                        <div
                          className={`space-y-2 ${message.type === "user" ? "text-right" : "text-left"} min-w-0 flex-1`}
                        >
                          <div
                            className={`rounded-lg p-3 chat-message inner-red-shadow break-words ${
                              message.type === "user"
                                ? "bg-primary text-primary-foreground"
                                : "bg-background border border-red-medium/20"
                            }`}
                          >
                            <p className="text-sm whitespace-pre-wrap">{message.content}</p>

                            {message.attachments && message.attachments.length > 0 && (
                              <div className="mt-2 space-y-1">
                                {message.attachments.map((attachment, index) => (
                                  <div key={index} className="flex items-center gap-2 text-xs opacity-80">
                                    {attachment.type.startsWith("image/") ? (
                                      <ImageIcon className="h-3 w-3" />
                                    ) : (
                                      <Video className="h-3 w-3" />
                                    )}
                                    <span className="truncate">{attachment.name}</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>

                          {message.variations && (
                            <div className="space-y-3 mt-4">
                              <div className="bg-background rounded-lg p-4 border border-red-medium/20 inner-red-shadow">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-sm text-primary">Detailed Prompt</h4>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyToClipboard(message.variations!.detailed, "Detailed Prompt")}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                  {message.variations.detailed}
                                </p>
                              </div>

                              <div className="bg-background rounded-lg p-4 border border-red-medium/20 inner-red-shadow">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-sm text-primary">Paragraph Prompt</h4>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyToClipboard(message.variations!.paragraph, "Paragraph Prompt")}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                  {message.variations.paragraph}
                                </p>
                              </div>

                              <div className="bg-background rounded-lg p-4 border border-red-medium/20 inner-red-shadow">
                                <div className="flex items-center justify-between mb-2">
                                  <h4 className="font-semibold text-sm text-primary">Core Idea</h4>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => copyToClipboard(message.variations!.idea, "Core Idea")}
                                    className="h-6 w-6 p-0"
                                  >
                                    <Copy className="h-3 w-3" />
                                  </Button>
                                </div>
                                <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-wrap">
                                  {message.variations.idea}
                                </p>
                              </div>
                            </div>
                          )}

                          <div className="text-xs text-muted-foreground">{message.timestamp.toLocaleTimeString()}</div>
                        </div>
                      </div>
                    </div>
                  ))}

                  {isProcessing && (
                    <div className="flex gap-3 justify-start">
                      <div className="w-8 h-8 rounded-full bg-red-light/30 text-primary flex items-center justify-center">
                        <Bot className="h-4 w-4" />
                      </div>
                      <div className="bg-background rounded-lg p-3 chat-message border border-red-medium/20">
                        <div className="flex items-center gap-2">
                          <Loader2 className="h-4 w-4 animate-spin text-primary" />
                          <span className="text-sm text-muted-foreground">AI is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              <div className="border-t border-red-medium/20 p-4 flex-shrink-0">
                {apiError && (
                  <div className="mb-3 p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2 text-sm text-red-800">
                      <CreditCard className="h-4 w-4" />
                      <span>OpenRouter API needs more credits.</span>
                      <a
                        href="https://openrouter.ai/settings/credits"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="underline hover:no-underline"
                      >
                        Upgrade here
                      </a>
                    </div>
                  </div>
                )}

                {attachedFiles.length > 0 && (
                  <div className="mb-3 flex flex-wrap gap-2">
                    {attachedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 bg-red-light/20 rounded-lg px-3 py-1 text-xs">
                        {file.type.startsWith("image/") ? (
                          <ImageIcon className="h-3 w-3" />
                        ) : (
                          <Video className="h-3 w-3" />
                        )}
                        <span className="truncate max-w-[100px]">{file.name}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeAttachment(index)}
                          className="h-4 w-4 p-0 hover:bg-red-medium/20"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}

                <div {...getRootProps()} className={`relative ${isDragActive ? "bg-red-light/10" : ""}`}>
                  <input {...getInputProps()} />
                  <div className="flex gap-2">
                    <div className="flex-1 relative">
                      <Textarea
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        placeholder={
                          apiError
                            ? "Chat limited due to API credits. Try the Tools section instead."
                            : "Describe your project, ask for creative guidance, or upload files..."
                        }
                        className="min-h-[60px] max-h-[120px] pr-12 chat-input resize-none"
                        disabled={apiError !== null}
                        onKeyDown={(e) => {
                          if (e.key === "Enter" && !e.shiftKey && !apiError) {
                            e.preventDefault()
                            sendMessage()
                          }
                        }}
                      />
                      <Button
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-2 h-8 w-8 p-0"
                        disabled={apiError !== null}
                        onClick={() => document.querySelector('input[type="file"]')?.click()}
                      >
                        <Paperclip className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      onClick={sendMessage}
                      disabled={
                        isProcessing || (!inputMessage.trim() && attachedFiles.length === 0) || apiError !== null
                      }
                      className="h-[60px] px-4 bg-primary hover:bg-red-dark"
                    >
                      {isProcessing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                    </Button>
                  </div>
                </div>

                {isDragActive && !apiError && (
                  <div className="absolute inset-0 bg-red-light/20 border-2 border-dashed border-primary rounded-lg flex items-center justify-center z-10">
                    <div className="text-center">
                      <Sparkles className="h-8 w-8 mx-auto text-primary mb-2" />
                      <p className="text-sm font-medium text-primary">Drop files here to attach</p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
