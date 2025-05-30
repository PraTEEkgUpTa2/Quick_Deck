export const dynamic = 'force-dynamic';

import { NextResponse } from 'next/server';
import { DeckGenerationRequest, DeckGenerationResponse, Slide } from '@/lib/types';
import { GoogleGenerativeAI } from '@google/generative-ai'
import * as dotenv from "dotenv"

dotenv.config({path: ".env"})

if (!process.env.GEMINI_API_KEY) {
  throw new Error('Missing GEMINI_API_KEY environment variable');
}

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model : "gemini-1.5-flash"});



export async function POST(request: Request) {
  try {
    const body: DeckGenerationRequest = await request.json();
    const { text, role } = body;

    if (!text || text.length < 100) {
      return NextResponse.json(
        { error: 'Text is too short. Please provide more content.' },
        { status: 400 }
      );
    }

    const prompt = `You are a presentation deck generator. From the given text, create a 5-slide presentation deck.
Each slide must be a JSON object with a "title" (string) and "bulletPoints" (array of strings).
Return as JSON: { "slides": [ { "title": "...", "bulletPoints": ["...", "..."] }, ... ] }
Target audience: ${role}
Text:
"""${text}"""`;

const result = await model.generateContent({
  contents: [{ role: 'user', parts: [{ text: prompt }] }],
  generationConfig: {
    temperature: 0.7,
    maxOutputTokens: 1024,
  },
});

const responseText = result.response.text();

const jsonMatch = responseText.match(/\{[\s\S]*\}/);
if (!jsonMatch) {
  return NextResponse.json(
    { error: 'Could not extract valid JSON from Gemini response' },
    { status: 500 }
  );
}

const parsed = JSON.parse(jsonMatch[0]);
const slides: Slide[] = parsed.slides.map((slide: any) => ({
  title: slide.title,
  bullets: slide.bulletPoints, // conform to Slide interface
}));

const responseData: DeckGenerationResponse = { slides };

    return NextResponse.json(responseData);
  } catch (error) {
    console.error('Error generating deck with Gemini:', error);
    return NextResponse.json(
      { error: 'Failed to generate deck' },
      { status: 500 }
    );
  }
}
