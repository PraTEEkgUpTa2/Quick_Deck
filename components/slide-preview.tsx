"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slide } from "@/lib/types";
import { cn } from "@/lib/utils";

interface SlidePreviewProps {
  slides: Slide[];
}

export function SlidePreview({ slides }: SlidePreviewProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = (index: number) => {
    if (index >= 0 && index < slides.length && index !== currentSlide) {
      setIsTransitioning(true);
      setCurrentSlide(index);
      
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    }
  };

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (slides.length === 0) return;
      
      if (e.key === "ArrowRight") {
        nextSlide();
      } else if (e.key === "ArrowLeft") {
        prevSlide();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentSlide, slides.length]);

  if (slides.length === 0) {
    return (
      <Card className="h-full flex items-center justify-center min-h-[400px]">
        <CardContent className="flex flex-col items-center justify-center p-6 text-center">
          <div className="text-4xl mb-4 opacity-20">📊</div>
          <h3 className="text-xl font-medium mb-2">No Slides Yet</h3>
          <p className="text-muted-foreground">
            Paste your content and click "Generate Deck" to create slides.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="relative" id="slide-preview">
      <Card className="overflow-hidden min-h-[400px]">
        <CardContent className="p-0">
          <div 
            className={cn(
              "p-8 min-h-[400px] transition-opacity duration-300 flex flex-col justify-center",
              isTransitioning ? "opacity-0" : "opacity-100"
            )}
          >
            <h2 className="text-2xl font-bold mb-6 text-center">
              {slides[currentSlide]?.title}
            </h2>
            <ul className="space-y-4">
              {slides[currentSlide]?.bullets.map((bullet, i) => (
                <li key={i} className="flex items-start">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary mt-2 mr-3"></span>
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>

      <div className="absolute bottom-4 left-0 right-0 flex justify-center space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide
                ? "bg-primary w-4"
                : "bg-muted hover:bg-primary/50"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="rounded-full"
          disabled={slides.length <= 1}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="rounded-full"
          disabled={slides.length <= 1}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>

      <div className="absolute top-4 right-4 bg-muted px-2 py-1 rounded text-xs">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
}