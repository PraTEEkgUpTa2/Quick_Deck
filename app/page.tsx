import { DeckGenerator } from '@/components/deck-generator';
import { ThemeToggle } from '@/components/theme-toggle';
import { Logo } from '@/components/logo';

export default function Home() {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <header className="flex items-center justify-between mb-8">
          <Logo />
          <ThemeToggle />
        </header>
        <DeckGenerator />
      </div>
    </main>
  );
}