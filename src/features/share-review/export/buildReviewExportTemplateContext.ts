import type { ReviewExportTemplateContext, ReviewExportTemplateProps } from './types';

export function buildReviewExportTemplateContext(review: ReviewExportTemplateProps): ReviewExportTemplateContext {
  return {
    review,
    // Нормализованный контекст отделяет данные от визуальной композиции и позволяет добавлять новые шаблоны без переписывания payload.
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
