"use client";

import { useRef, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Clipboard, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface TextInputProps {
  text: string;
  setText: (text: string) => void;
}

export function TextInput({ text, setText }: TextInputProps) {
  const [charCount, setCharCount] = useState(0);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const { toast } = useToast();
  
  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    setText(newText);
    setCharCount(newText.length);
  };

  const handlePaste = async () => {
    try {
      const clipboardText = await navigator.clipboard.readText();
      setText(clipboardText);
      setCharCount(clipboardText.length);
      toast({
        title: "Text pasted",
        description: "Content from clipboard has been pasted.",
      });
    } catch (error) {
      toast({
        title: "Paste failed",
        description: "Unable to access clipboard. Please paste manually.",
        variant: "destructive",
      });
    }
  };

  const handleClear = () => {
    setText("");
    setCharCount(0);
    if (textareaRef.current) {
      textareaRef.current.focus();
    }
  };

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle>Paste Your Content</CardTitle>
          <div className="text-sm text-muted-foreground">
            {charCount} characters
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Textarea
            ref={textareaRef}
            placeholder="Paste your blog post, article, or long text here..."
            className="min-h-[400px] resize-none p-4"
            value={text}
            onChange={handleTextChange}
          />
          <div className="absolute right-2 top-2 flex gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePaste}
              title="Paste from clipboard"
            >
              <Clipboard className="h-4 w-4" />
            </Button>
            {text && (
              <Button
                variant="ghost"
                size="icon"
                onClick={handleClear}
                title="Clear text"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}