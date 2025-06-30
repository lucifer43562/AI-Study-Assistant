import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BookOpen, Image } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: number;
  text: string;
  sender: "user" | "ai";
  image?: string;
}

const ChatAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hello! I'm your AI study assistant. You can ask me questions, upload photos of problems, or get help with any subject. How can I help you today?",
      sender: "ai"
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const { toast } = useToast();

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview("");
  };

  const sendMessage = async () => {
    if (!inputText.trim() && !selectedImage) return;

    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your OpenAI API key to use the chat feature.",
        variant: "destructive"
      });
      return;
    }

    const userMessage: Message = {
      id: Date.now(),
      text: inputText,
      sender: "user",
      image: imagePreview
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputText("");
    setImagePreview("");
    setSelectedImage(null);
    setIsLoading(true);

    try {
      console.log("🔵 Sending request to OpenAI...");
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: "You are a helpful study assistant. Provide clear, educational explanations."
            },
            {
              role: "user",
              content: inputText + (imagePreview ? " [User uploaded an image]" : "")
            }
          ],
          max_tokens: 500,
          temperature: 0.7
        })
      });

      console.log("🟢 Response status:", response.status);
      const text = await response.text();
      console.log("🟢 Raw response body:", text);

      if (!response.ok) {
        throw new Error(`OpenAI returned HTTP ${response.status}: ${text}`);
      }

      const data = JSON.parse(text);

      const aiResponse: Message = {
        id: Date.now() + 1,
        text: data.choices[0].message.content,
        sender: "ai"
      };

      setMessages((prev) => [...prev, aiResponse]);
    } catch (error: any) {
      console.error("❌ Error calling OpenAI API:", error);
      toast({
        title: "Error",
        description: error.message || "Unknown error",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <BookOpen className="h-8 w-8 text-blue-600" />
              <h1 className="text-2xl font-bold text-gray-900">StudyBuddy AI</h1>
            </Link>
            <nav className="flex space-x-4">
              <Link to="/"><Button variant="ghost">Home</Button></Link>
              <Link to="/materials"><Button variant="ghost">Study Materials</Button></Link>
            </nav>
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">AI Study Assistant</h2>
          <p className="text-gray-600">Ask questions, upload images, and get instant help with your studies.</p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>OpenAI API Key</CardTitle>
          </CardHeader>
          <CardContent>
            <Input
              type="password"
              placeholder="Enter your OpenAI API key"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              className="mb-2"
            />
            <p className="text-sm text-gray-500">
              Your API key is stored locally. Get it from{" "}
              <a href="https://platform.openai.com/api-keys" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                OpenAI
              </a>.
            </p>
          </CardContent>
        </Card>

        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="h-96 overflow-y-auto mb-4 space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.sender === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                      message.sender === "user"
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-900"
                    }`}
                  >
                    {message.image && (
                      <img
                        src={message.image}
                        alt="Uploaded"
                        className="max-w-full h-32 object-cover rounded mb-2"
                      />
                    )}
                    <p className="whitespace-pre-wrap">{message.text}</p>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 px-4 py-2 rounded-lg">
                    <p>Thinking...</p>
                  </div>
                </div>
              )}
            </div>

            {imagePreview && (
              <div className="mb-4">
                <div className="relative inline-block">
                  <img
                    src={imagePreview}
                    alt="Preview"
                    className="max-w-xs h-32 object-cover rounded border"
                  />
                  <Button
                    onClick={removeImage}
                    size="sm"
                    variant="destructive"
                    className="absolute -top-2 -right-2"
                  >
                    ×
                  </Button>
                </div>
              </div>
            )}

            <div className="flex space-x-2">
              <div className="flex-1">
                <Textarea
                  placeholder="Ask a question..."
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  className="min-h-[60px]"
                  onKeyPress={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
              </div>
              <div className="flex flex-col space-y-2">
                <label htmlFor="image-upload">
                  <Button variant="outline" size="sm" className="cursor-pointer" asChild>
                    <span><Image className="h-4 w-4" /></span>
                  </Button>
                </label>
                <input
                  id="image-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
                <Button onClick={sendMessage} disabled={isLoading} size="sm">
                  Send
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ChatAssistant;
