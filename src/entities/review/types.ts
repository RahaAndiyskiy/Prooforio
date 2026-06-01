import type { ReviewerGender } from './avatar';

export type Review = {
  id: string;
  profileId: string;
  author: string;
  text: string;
  rating: number;
  createdAt: string;
  reviewerGender?: ReviewerGender;
};
