import type { Profile } from '@/entities/profile/types';
import { Card } from '@/shared/ui/card';

export function DashboardOverview({ profile }: { profile: Profile }) {
  const reviewLink = `https://prooforio.com/review/${profile.username}`;

  return (
    <div className="space-y-6">
      <Card>
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-accent">Welcome back</p>
          <h1 className="text-3xl font-semibold text-slate-950">{profile.fullName}</h1>
          <p className="max-w-2xl text-sm leading-7 text-slate-600">
            Share your personal review link and collect customer feedback in one place.
          </p>
        </div>
      </Card>
      <Card>
        <div className="space-y-3">
          <p className="text-sm font-medium text-slate-500">Your review link</p>
          <div className="rounded-3xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900">
            {reviewLink}
          </div>
        </div>
      </Card>
    </div>
  );
}
