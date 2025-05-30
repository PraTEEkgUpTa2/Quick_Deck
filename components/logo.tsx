import { Presentation } from "lucide-react";

export function Logo() {
  return (
    <div className="flex items-center gap-2">
      <Presentation className="h-8 w-8 text-primary" />
      <span className="text-2xl font-bold">QuickDeck</span>
    </div>
  );
}