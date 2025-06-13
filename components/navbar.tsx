"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, User } from "firebase/auth";
import { auth } from "@/app/firebase/config";
import { useScrollTop } from "@/hooks/use-scroll-top";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { ThemeToggle } from "@/components/theme-toggle";
import AuthModal from '@/components/authModal';
import { Button } from "@/components/ui/button";
import Link from "next/link";

function Navbar() {
  const scrolled = useScrollTop();
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/"); // redirect to home after logout
  };

  return (
    <div
      className={cn(
        "z-50 bg-background dark:bg-[#1F1F1F] top-0 flex items-center w-full p-6",
        scrolled && "border-b shadow-sm"
      )}
    >
      <Logo />
      <div className="md:ml-auto md:justify-end justify-between w-full flex items-center gap-x-2">
        {!user && (
          <Link href="/">
            <Button variant="ghost" size="sm" onClick={() => setShowModal(true)}>
              Log in
            </Button>
          </Link>
        )}
        {showModal && <AuthModal onClose={() => setShowModal(false)} />}

        {user && pathname === "/deck-generator" && (
          <Button variant="ghost" size="sm" onClick={handleLogout}>
            Log out
          </Button>
        )}

        <ThemeToggle />
      </div>
    </div>
  );
}

export default Navbar;
