import { getReviewerAvatarPublicPath } from '@/entities/review/avatar';
import { TEMPLATE_FORMAT_DIMENSIONS } from '../constants';
import type {
  ReviewExportPresetDefinition,
  ReviewExportPresetRenderContext,
  ReviewExportTemplateProps,
} from './types';

export function buildReviewExportPresetRenderContext(
  review: ReviewExportTemplateProps,
  preset: ReviewExportPresetDefinition
): ReviewExportPresetRenderContext {
  return {
    review,
    preset,
    dimensions: TEMPLATE_FORMAT_DIMENSIONS[preset.meta.format],
    // Нормализованный контекст отделяет данные от визуальной композиции и позволяет добавлять новые шаблоны без переписывания payload.
    content: {
      brand: {
        label: 'Proofio',
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
        meta: 'Клиент Proofio',
        date: review.createdAt,
        avatarSrc: review.reviewerAvatarSrc ?? getReviewerAvatarPublicPath(review.reviewerGender),
      },
    },
  };
}
