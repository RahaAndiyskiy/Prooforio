export type ReviewerGender = 'male' | 'female';

const REVIEWER_AVATAR_PUBLIC_PATHS: Record<ReviewerGender, string> = {
  male: '/Pictures/Муж.jpg',
  female: '/Pictures/Жен.jpg',
};

export function isReviewerGender(value: unknown): value is ReviewerGender {
  return value === 'male' || value === 'female';
}

export function getReviewerAvatarPublicPath(reviewerGender?: ReviewerGender) {
  return REVIEWER_AVATAR_PUBLIC_PATHS[reviewerGender ?? 'male'];
}