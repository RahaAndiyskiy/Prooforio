import { Header } from '@/widgets/header/Header';
import { LoginCard } from '@/features/auth/ui/LoginCard';

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <LoginCard />
      </main>
    </div>
  );
}
