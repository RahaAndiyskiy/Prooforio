import type { ReviewExportTemplateContext, ReviewExportTemplateProps } from './types';

export function buildReviewExportTemplateContext(review: ReviewExportTemplateProps): ReviewExportTemplateContext {
  return {
    review,
    content: {
      brand: {
        label: 'Prooforio',
      },
      header: {
        title: review.profileName,
        badge: 'Отзывы',
      },
      rating: {
        value: String(review.rating),
        icon: '★',
      },
      body: {
        quote: review.text,
      },
      footer: {
        author: review.author,
        meta: 'Клиент Prooforio',
        date: review.createdAt,
      },
    },
  };
}
