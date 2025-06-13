import { Presentation } from "lucide-react";

export function Logo() {
  return (
    <div className="hidden md:flex items-center gap-x-2">
      <Presentation className="h-8 w-8 text-primary" />
      <span className="text-2xl font-bold">QuickDeck</span>
    </div>
  );
}