
"use client";
export const dynamic = "force-dynamic";

import { useState, useEffect } from "react";
import { TextInput } from "@/components/text-input";
import { SlidePreview } from "@/components/slide-preview";
import { UserRoleSelector } from "@/components/user-role-selector";
import { ExportOptions } from "@/components/export-options";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Slide, UserRole } from "@/lib/types";
import { generateDeckFromText } from "@/lib/deck-service";
import {useAuthState} from "react-firebase-hooks/auth"
import {auth} from "../firebase/config"
import { useRouter } from "next/navigation";

export default function DeckGenerator() {
  const [text, setText] = useState("");
  const [role, setRole] = useState<UserRole>("professional");
  const [slides, setSlides] = useState<Slide[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [activeView, setActiveView] = useState<"input" | "preview">("input");
  const { toast } = useToast();
  const router = useRouter()
  const [user] = useAuthState(auth);

  useEffect(() => {
    if (user === null) {
      router.push('/');
    }
  }, [user]);

  const handleGenerate = async () => {
    if (!text.trim()) {
      toast({
        title: "Empty input",
        description: "Please paste some text to generate a deck.",
        variant: "destructive",
      });
      return;
    }

    if (text.length < 100) {
      toast({
        title: "Text too short",
        description: "Please provide a longer text for better results.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    
    try {
      const generatedSlides = await generateDeckFromText(text, role);
      setSlides(generatedSlides);
      setActiveView("preview");
      toast({
        title: "Deck generated!",
        description: "Your presentation is ready to preview and export.",
      });
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "There was an error generating your deck. Please try again.",
        variant: "destructive",
      });
      console.error("Failed to generate deck:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col space-y-6">
      <div className="flex flex-col md:flex-row items-start gap-4">
        <UserRoleSelector role={role} setRole={setRole} />
        <div className="flex-1"></div>
        <Button
          onClick={handleGenerate}
          size="lg"
          disabled={isGenerating || !text.trim()}
          className="w-full md:w-auto"
        >
          {isGenerating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating Deck...
            </>
          ) : (
            "Generate Deck"
          )}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mt-4">
        <div className={`md:block ${activeView === "input" ? "block" : "hidden md:block"}`}>
          <TextInput text={text} setText={setText} />
        </div>
        <div className={`md:block ${activeView === "preview" ? "block" : "hidden md:block"}`}>
          <SlidePreview slides={slides} />
          {slides.length > 0 && <ExportOptions slides={slides} />}
        </div>
      </div>

      <div className="md:hidden">
        <Tabs value={activeView} onValueChange={(value) => setActiveView(value as "input" | "preview")}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="input">Input</TabsTrigger>
            <TabsTrigger value="preview">Preview</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}