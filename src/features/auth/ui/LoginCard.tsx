import { Button } from '@/shared/ui/button';
import { Card } from '@/shared/ui/card';

export function LoginCard() {
  return (
    <Card className="max-w-xl mx-auto mt-10 space-y-6">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Login</p>
        <h1 className="mt-4 text-3xl font-semibold text-slate-950 sm:text-4xl">Sign in to your Prooforio workspace</h1>
      </div>
      <div className="space-y-3 rounded-3xl border border-slate-200 bg-slate-50 p-6">
        <p className="text-sm text-slate-600">Google OAuth will be connected here in the next iteration.</p>
        <Button type="button">Continue with Google</Button>
      </div>
    </Card>
  );
}
