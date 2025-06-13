'use client';

import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '@/app/firebase/config';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import AuthModal from '@/components/authModal';
import { useSearchParams } from 'next/navigation';
import { useToast } from "@/hooks/use-toast";

function Heading() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const searchParams = useSearchParams();
  const redirected = searchParams.get("redirected");
  const { toast } = useToast();


  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
      setLoading(false);
    });
    return () => unsub();
  }, []);

  // Show modal if redirected due to auth failure
  useEffect(() => {
    if (redirected === "unauthenticated") {
      toast({
        title: "Access Denied",
        description: "Please sign in to access the deck generator.",
        variant: "destructive",
      });
    }
  }, [redirected]);

  return (
    <div className="max-w-3xl space-y-2 pt-40">
      <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold">
        Your Ideas, Slides & Vision — Unified in <span className="underline">QuickDeck</span>
      </h1>
      <h3 className="text-base sm:text-xl md:text-2xl font-medium">
        QuickDeck helps you craft, manage, and share stunning presentations effortlessly.
      </h3>

      {!loading && user && (
        <Button asChild>
          <Link href="/deck-generator">
            Enter QuickDeck
            <ArrowRight className="h-4 w-4 ml-2" />
          </Link>
        </Button>
      )}

      {!loading && !user && (
        <Button onClick={() => setShowModal(true)}>
          Get QuickDeck Free
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      )}

      {showModal && <AuthModal onClose={() => setShowModal(false)} />}
    </div>
  );
}

export default Heading;
