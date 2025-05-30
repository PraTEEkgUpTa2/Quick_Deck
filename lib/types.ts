export type UserRole = "professional" | "educator" | "student" | "marketer";

export interface Slide {
  title: string;
  bullets: string[];
}

export interface DeckGenerationRequest {
  text: string;
  role: UserRole;
}

export interface DeckGenerationResponse {
  slides: Slide[];
}