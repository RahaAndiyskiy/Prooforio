import { Header } from '@/widgets/header/Header';
import { RegisterCard } from '@/features/auth/ui/RegisterCard';

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
        <RegisterCard />
      </main>
    </div>
  );
}
