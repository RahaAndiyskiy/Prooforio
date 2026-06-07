import type { Review } from './types';

export const demoReviews: Review[] = [
  {
    id: 'review_001',
    profileId: 'profile_001',
    author: 'Lina',
    text: 'Proofio made it simple to collect feedback from our early users.',
    rating: 5,
    createdAt: '2026-05-28',
    reviewerGender: 'female',
  },
  {
    id: 'review_002',
    profileId: 'profile_001',
    author: 'Noah',
    text: 'The review link is a great way to gather honest responses quickly.',
    rating: 4,
    createdAt: '2026-05-27',
    reviewerGender: 'male',
  },
];
