"use client";

import { Slide, UserRole } from '@/lib/types';

export async function generateDeckFromText(text: string, role: UserRole): Promise<Slide[]> {
  try {
    const response = await fetch('/api/generate-deck', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, role }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message || 'Failed to generate deck');
    }

    const data = await response.json();
    return data.slides;
  } catch (error) {
    console.error("Error generating deck:", error);
    throw error;
  }
}